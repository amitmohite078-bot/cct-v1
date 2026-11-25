import os

langs = ['en', 'hi', 'kn', 'te', 'ta', 'mr', 'gu', 'bn', 'ml', 'pa', 'or']
files = [
    'frontend/js/kbv_ui.js',
    'frontend/js/suitability.js',
    'frontend/js/app.js',
    'frontend/js/modules.js'
]

all_passed = True
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    print(f"Checking {f}:")
    missing = []
    for lang in langs:
        found = (f"{lang}:" in content) or (f'"{lang}":' in content) or (f"'{lang}':" in content)
        if not found:
            missing.append(lang)
    if missing:
        print(f"  FAILED: Missing languages {missing}")
        all_passed = False
    else:
        print(f"  SUCCESS: All {len(langs)} Indian languages present!")

if all_passed:
    print("\nALL 4 FRONTEND ENGINES HAVE COMPLETE 11-LANGUAGE COVERAGE!")

