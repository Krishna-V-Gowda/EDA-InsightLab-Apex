import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(testsDir, '..');
const sourcePath = path.join(root, 'assets', 'js', 'app.js');
const runtimePath = path.join(testsDir, 'support', 'exact_source_runtime.mjs');

function call(request) {
  const completed = spawnSync(process.execPath, [runtimePath, sourcePath], {
    input: JSON.stringify(request),
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(completed.error, undefined, completed.error?.message);
  const output = completed.stdout.trim();
  assert.ok(output, `runtime emitted no JSON; stderr=${completed.stderr}`);
  const response = JSON.parse(output);
  assert.equal(completed.status, 0, response.error || completed.stderr);
  assert.equal(response.ok, true, response.error);
  return response.result;
}

function assertClose(actual, expected, tolerance = 1e-9) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

function highCardinalityFixture() {
  const rows = [];
  for (let level = 0; level < 20; level += 1) {
    for (let repetition = 0; repetition < 4; repetition += 1) {
      rows.push({ a: `L${String(level).padStart(2, '0')}`, b: repetition < 2 ? 'B0' : 'B1' });
    }
  }
  for (let level = 20; level < 30; level += 1) {
    for (let repetition = 0; repetition < 4; repetition += 1) {
      rows.push({ a: `L${String(level).padStart(2, '0')}`, b: level < 25 ? 'B0' : 'B1' });
    }
  }
  return rows;
}

test('the harness executes declarations extracted from the shipped source', () => {
  const manifest = call({ op: 'manifest' });
  const expectedHash = crypto.createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex');
  assert.equal(manifest.sourceSha256, expectedHash);
  assert.equal(manifest.extractedFunctions.length, 27);
});

test('ingestion preserves duplicate-header fields and descriptive estimators stay named', () => {
  const [rows, skew] = call({
    op: 'batch',
    requests: [
      { op: 'parse_csv', text: 'measure,measure\n1,2\n' },
      { op: 'skewness', values: [1, 2, 3, 100] },
    ],
  });
  assert.deepEqual(rows, [{ measure: 1, measure_2: 2 }]);
  assertClose(skew, 1.9983346633184749, 1e-12);
});

test('numeric identifier keys are excluded from measurement semantics', () => {
  const data = Array.from({ length: 20 }, (_, index) => ({
    account_id: 100_000 + index,
    signal: index % 3,
  }));
  const schema = call({ op: 'schema', data });
  assert.equal(schema.find((column) => column.name === 'account_id').type, 'identifier');
});

test("Cramer's V matches the full table and is invariant to row order", () => {
  const data = highCardinalityFixture();
  const reordered = [...data].sort((left, right) => {
    const leftLevel = Number(left.a.slice(1));
    const rightLevel = Number(right.a.slice(1));
    return (rightLevel >= 20) - (leftLevel >= 20) || left.a.localeCompare(right.a);
  });
  const [original, permuted] = call({
    op: 'batch',
    requests: [
      { op: 'cramers_v', data, columnA: 'a', columnB: 'b' },
      { op: 'cramers_v', data: reordered, columnA: 'a', columnB: 'b' },
    ],
  });
  assertClose(original, 0.5773502691896257, 1e-12);
  assertClose(permuted, original, 1e-12);
});

test('feature screening uses target evidence and blocks exact target copies', () => {
  const rankingData = Array.from({ length: 40 }, (_, index) => ({
    target: index,
    signal: index < 20 ? 'low' : 'high',
    noise: index % 2 === 0 ? 'even' : 'odd',
  }));
  const proxyData = Array.from({ length: 30 }, (_, index) => ({
    target: index,
    untracked_proxy: index,
    noise: (index * 7) % 11,
  }));
  const [rankings, proxyRankings] = call({
    op: 'batch',
    requests: [
      { op: 'feature_selection', data: rankingData, target: 'target' },
      { op: 'feature_selection', data: proxyData, target: 'target' },
    ],
  });
  const byName = Object.fromEntries(rankings.map((row) => [row.name, row]));
  assert.ok(byName.signal.score > byName.noise.score);
  assert.equal(byName.signal.reason, 'target group separation = 0.75');
  assert.equal(proxyRankings.some((row) => row.name === 'untracked_proxy'), false);
});

test('PCA uses every eligible numeric predictor and follows impute-then-scale order', () => {
  const wideData = Array.from({ length: 30 }, (_, index) => Object.fromEntries(
    Array.from({ length: 12 }, (__, column) => [
      `x${String(column).padStart(2, '0')}`,
      index * (column + 1) + ((index + column) % 5) * 0.1,
    ]),
  ));
  const missingData = Array.from({ length: 10 }, (_, offset) => {
    const index = offset + 1;
    return {
      x: index,
      y: index < 5 ? index * 2 : null,
      z: ((-1) ** index) * index,
    };
  });
  const [wide, missing] = call({
    op: 'batch',
    requests: [
      { op: 'pca', data: wideData },
      { op: 'pca', data: missingData },
    ],
  });
  assert.equal(wide.cols.length, 12);
  assert.deepEqual(wide.cols, Array.from({ length: 12 }, (_, column) => `x${String(column).padStart(2, '0')}`));
  assertClose(missing.exp1, 0.450018130619, 1e-9);
  assertClose(missing.exp2, 0.300244184643, 1e-9);
});

test('the current missing-token vocabulary remains an explicit, reviewable contract', () => {
  const result = call({ op: 'is_missing', values: [null, '', 'NA', 'n/a', '-', 'None', '0', 0] });
  assert.deepEqual(result, [true, true, true, true, true, false, false, false]);
});
