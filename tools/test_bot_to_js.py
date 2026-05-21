#!/usr/bin/env python3
"""Tiny test harness for bot_to_js.py."""

from __future__ import annotations

from pathlib import Path

from bot_to_js import parse_bot_text, to_js_object


def main() -> int:
    root = Path(__file__).resolve().parent
    sample_in = root / "sample_input_single.txt"
    sample_out = root / "sample_output_single.js"

    bot = parse_bot_text(sample_in.read_text(encoding="utf-8"))
    js = to_js_object(bot).strip() + "\n"
    expected = sample_out.read_text(encoding="utf-8")

    if js != expected:
        raise AssertionError("Sample output mismatch")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
