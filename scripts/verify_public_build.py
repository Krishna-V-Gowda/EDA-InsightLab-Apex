#!/usr/bin/env python3
"""Dependency-free public release checks for EDA InsightLab Apex."""
from pathlib import Path
from html.parser import HTMLParser
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'index.html', '404.html', 'assets/css/styles.css', 'assets/js/app.js',
    'assets/brand/mark.svg', 'assets/brand/social-preview.png',
    'README.md', 'LICENSE', 'CHANGELOG.md', 'ROADMAP.md'
]
BANNED = [
    'DATA801', 'Vidyashilp', 'Prof. Shital', 'UEN:',
    'Summer Internship', 'mentor acknowledgement', 'course plan'
]
TEXT_SUFFIXES = {'.html', '.css', '.js', '.md', '.txt', '.yml', '.yaml', '.xml', '.py', '.cff'}

class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.tags = []
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
        values = dict(attrs)
        for key in ('src', 'href'):
            value = values.get(key, '')
            if value and not value.startswith(('#', 'http://', 'https://', 'mailto:', 'data:', 'javascript:')):
                self.refs.append(value.split('#')[0].split('?')[0])

def fail(message, errors):
    print(f'FAIL: {message}')
    errors.append(message)

def main():
    errors = []
    for rel in REQUIRED:
        if not (ROOT / rel).is_file():
            fail(f'missing required file: {rel}', errors)

    for path in ROOT.rglob('*'):
        if not path.is_file() or '.git' in path.parts:
            continue
        size = path.stat().st_size
        if size > 24 * 1024 * 1024:
            fail(f'file exceeds 24 MiB browser-upload guardrail: {path.relative_to(ROOT)}', errors)
        if path.resolve() == Path(__file__).resolve():
            continue
        if path.suffix.lower() in TEXT_SUFFIXES or path.name in {'LICENSE'}:
            try:
                text = path.read_text(encoding='utf-8')
            except UnicodeDecodeError:
                continue
            for banned in BANNED:
                if banned.lower() in text.lower():
                    fail(f'public academic branding found in {path.relative_to(ROOT)}: {banned}', errors)

    index = ROOT / 'index.html'
    if index.exists():
        html = index.read_text(encoding='utf-8')
        parser = RefParser(); parser.feed(html)
        for ref in parser.refs:
            ref_path = ROOT / ref
            if not ref_path.exists():
                fail(f'broken local index reference: {ref}', errors)
        required_fragments = [
            '<html', 'lang="en"', 'name="viewport"', 'name="description"',
            '<main', '<nav', '<h1', 'class="skip-link"', 'aria-live="polite"'
        ]
        for fragment in required_fragments:
            if fragment.lower() not in html.lower():
                fail(f'index missing accessibility/metadata fragment: {fragment}', errors)
        if html.lower().count('<h1') != 1:
            fail('index should contain exactly one H1', errors)

    file_count = sum(1 for p in ROOT.rglob('*') if p.is_file() and '.git' not in p.parts)
    print(f'Checked {file_count} files in {ROOT.name}.')
    if errors:
        print(f'Public build failed with {len(errors)} error(s).')
        return 1
    print('Public build verification passed.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
