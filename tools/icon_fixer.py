import os
import re
import sys


def fix_icons(content):
    content = re.sub(
        r'(^\s*ClassIcon\s+)heavyweapons(\s*$)',
        r'\1heavy\2',
        content,
        flags=re.MULTILINE
    )

    content = re.sub(
        r'(^\s*ClassIcon\s+)demoman(\s*$)',
        r'\1demo\2',
        content,
        flags=re.MULTILINE
    )

    return content


def main():
    if len(sys.argv) != 2:
        print("Usage:")
        print(f"  {os.path.basename(sys.argv[0])} <path_to_pop_file>")
        sys.exit(1)

    input_path = sys.argv[1]

    if not os.path.isfile(input_path):
        print(f"Error: File not found: {input_path}")
        sys.exit(1)

    base, ext = os.path.splitext(input_path)

    if ext.lower() != ".pop":
        print("Error: Input file must be a .pop file")
        sys.exit(1)

    output_path = f"{base}_fixedicons.pop"

    try:
        with open(input_path, "r", encoding="utf-8") as f:
            content = f.read()

        fixed_content = fix_icons(content)

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(fixed_content)

        print(f"Fixed file written to:")
        print(output_path)

    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()