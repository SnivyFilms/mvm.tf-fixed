#!/usr/bin/env python3
"""Convert MvM bot type text into JS object notation."""

from __future__ import annotations

import argparse
import re
from collections import OrderedDict
from dataclasses import dataclass
from typing import Any, Dict, List, Optional


IDENTIFIER_RE = re.compile(r"^[A-Za-z_$][A-Za-z0-9_$]*$")


@dataclass
class Context:
    kind: str
    data: Any


def strip_comments(line: str) -> str:
    result = []
    in_quote = False
    i = 0
    while i < len(line):
        ch = line[i]
        if ch == "\"" and (i == 0 or line[i - 1] != "\\"):
            in_quote = not in_quote
        if not in_quote and ch == "/" and i + 1 < len(line) and line[i + 1] == "/":
            break
        result.append(ch)
        i += 1
    return "".join(result)


def normalize_lines(text: str) -> List[str]:
    out: List[str] = []
    for raw in text.splitlines():
        line = strip_comments(raw).strip()
        if not line:
            continue
        buf = []
        in_quote = False
        i = 0
        while i < len(line):
            ch = line[i]
            if ch == "\"" and (i == 0 or line[i - 1] != "\\"):
                in_quote = not in_quote
            if not in_quote and ch in "{}":
                if buf:
                    out.append("".join(buf).strip())
                    buf = []
                out.append(ch)
            else:
                buf.append(ch)
            i += 1
        if buf:
            out.append("".join(buf).strip())
    return [line for line in out if line]


def parse_value(token: str) -> Any:
    token = token.strip()
    if token.startswith("\"") and token.endswith("\""):
        return token[1:-1]
    if re.fullmatch(r"-?\d+", token):
        return int(token)
    if re.fullmatch(r"-?\d+\.\d+", token):
        return float(token)
    return token


def parse_key_value(line: str) -> tuple[str, Any]:
    # Key can be quoted (attribute names with spaces)
    line = line.strip()
    if line.startswith("\""):
        end = line.find("\"", 1)
        key = line[1:end]
        value = line[end + 1 :].strip()
        return key, parse_value(value)
    parts = line.split(None, 1)
    if len(parts) == 1:
        return parts[0], ""
    return parts[0], parse_value(parts[1])


def ensure_list(container: Dict[str, Any], key: str) -> List[Any]:
    if key not in container or container[key] is None:
        container[key] = []
    return container[key]


def parse_bot_text(text: str) -> Dict[str, Any]:
    bots = parse_bots(text)
    if not bots:
        raise ValueError("Input is empty")
    return bots[0]


def _new_bot(bot_id: str) -> Dict[str, Any]:
    bot: Dict[str, Any] = OrderedDict()
    bot["id"] = bot_id
    bot["className"] = None
    bot["changeAttributes"] = OrderedDict()
    bot["items"] = []
    bot["attributes"] = []
    bot["tags"] = []
    bot["itemAttributes"] = []
    bot["characterAttributes"] = OrderedDict()
    bot["properties"] = OrderedDict()
    return bot


def _set_property(target: Dict[str, Any], key: str, value: Any) -> None:
    if key not in target:
        target[key] = value
        return
    existing = target[key]
    if isinstance(existing, list):
        existing.append(value)
    else:
        target[key] = [existing, value]


def parse_bots(text: str) -> List[Dict[str, Any]]:
    tokens = normalize_lines(text)
    if not tokens:
        return []

    bots: List[Dict[str, Any]] = []
    stack: List[Context] = []
    pending_section: Optional[str] = None

    i = 0
    while i < len(tokens):
        token = tokens[i]
        next_token = tokens[i + 1] if i + 1 < len(tokens) else None

        if not stack and token not in {"{", "}"} and next_token == "{":
            current_bot = _new_bot(token)
            bots.append(current_bot)
            stack.append(Context("bot", current_bot))
            pending_section = "__bot__"
            i += 1
            continue

        if token == "{":
            if not pending_section:
                if not stack:
                    i += 1
                    continue
                stack.append(Context("generic", {}))
                i += 1
                continue
            if pending_section == "__bot__":
                pending_section = None
                i += 1
                continue
            if pending_section == "EventChangeAttributes":
                bot_ctx = stack[-1]
                stack.append(Context("eventChange", bot_ctx.data["changeAttributes"]))
            elif pending_section == "ItemAttributes":
                item_obj = OrderedDict()
                item_obj["itemName"] = None
                item_obj["attributes"] = OrderedDict()
                stack.append(Context("itemAttributes", item_obj))
            elif pending_section == "CharacterAttributes":
                stack.append(Context("characterAttributes", OrderedDict()))
            else:
                current = stack[-1] if stack else None
                if current and current.kind == "eventChange":
                    block = OrderedDict()
                    block_name = pending_section
                    current.data[block_name] = block
                    stack.append(Context("block", block))
                else:
                    stack.append(Context("generic", {}))
            pending_section = None
            i += 1
            continue

        if token == "}":
            if not stack:
                i += 1
                continue
            ctx = stack.pop()
            if ctx.kind == "itemAttributes":
                attached = False
                for j in range(len(stack) - 1, -1, -1):
                    if stack[j].kind == "block":
                        block = stack[j].data
                        ensure_list(block, "itemAttributes").append(ctx.data)
                        attached = True
                        break
                if not attached:
                    for j in range(len(stack) - 1, -1, -1):
                        if stack[j].kind == "bot":
                            ensure_list(stack[j].data, "itemAttributes").append(ctx.data)
                            break
            if ctx.kind == "characterAttributes":
                for j in range(len(stack) - 1, -1, -1):
                    if stack[j].kind == "bot":
                        stack[j].data["characterAttributes"].update(ctx.data)
                        break
            i += 1
            continue

        if next_token == "{":
            pending_section = token
            i += 1
            continue

        if not stack:
            i += 1
            continue

        ctx = stack[-1]
        if ctx.kind == "bot":
            key, value = parse_key_value(token)
            if key == "Class":
                ctx.data["className"] = str(value)
            elif key == "Name":
                ctx.data["name"] = str(value)
            elif key == "ClassIcon":
                ctx.data["classIcon"] = str(value)
            elif key == "Skill":
                ctx.data["skill"] = str(value)
            elif key == "Health":
                ctx.data["health"] = value
            elif key == "WeaponRestrictions":
                ctx.data["weaponRestrictions"] = str(value)
            elif key == "MaxVisionRange":
                ctx.data["maxVisionRange"] = value
            elif key == "Scale":
                ctx.data["scale"] = value
            elif key == "Attributes":
                ensure_list(ctx.data, "attributes").append(str(value))
            elif key == "Tag":
                ensure_list(ctx.data, "tags").append(str(value))
            elif key == "Item":
                ensure_list(ctx.data, "items").append(str(value))
            else:
                _set_property(ctx.data["properties"], key, value)
        elif ctx.kind == "block":
            key, value = parse_key_value(token)
            if key == "BehaviorModifiers":
                ctx.data["behaviorModifiers"] = str(value)
            elif key == "Attributes":
                ensure_list(ctx.data, "attributes").append(str(value))
            elif key == "Tag":
                ensure_list(ctx.data, "tags").append(str(value))
            elif key == "Item":
                ensure_list(ctx.data, "items").append(str(value))
            elif key == "Skill":
                ctx.data["skill"] = str(value)
        elif ctx.kind == "itemAttributes":
            key, value = parse_key_value(token)
            if key == "ItemName":
                ctx.data["itemName"] = str(value)
            else:
                ctx.data["attributes"][key] = value
        elif ctx.kind == "characterAttributes":
            key, value = parse_key_value(token)
            ctx.data[key] = value

        i += 1

    return bots


def format_js_key(key: str) -> str:
    if IDENTIFIER_RE.fullmatch(key):
        return key
    return f"\"{key}\""


def format_js(value: Any, indent: int = 0) -> str:
    spacer = "\t" * indent
    next_spacer = "\t" * (indent + 1)

    if isinstance(value, dict):
        items: List[str] = []
        # Prefer a stable, readable order for known block keys
        if set(value.keys()) == {"itemName", "attributes"}:
            ordered_keys = ["itemName", "attributes"]
        else:
            preferred_order = [
                "id",
                "className",
                "name",
                "classIcon",
                "skill",
                "health",
                "weaponRestrictions",
                "maxVisionRange",
                "scale",
                "tags",
                "attributes",
                "items",
                "itemAttributes",
                "characterAttributes",
                "changeAttributes",
                "properties",
                "behaviorModifiers",
                "itemName",
            ]
            ordered_keys = []
            for key in preferred_order:
                if key in value and key not in ordered_keys:
                    ordered_keys.append(key)
            for key in value:
                if key not in ordered_keys:
                    ordered_keys.append(key)
        for key in ordered_keys:
            child = value[key]
            if child is None:
                continue
            if isinstance(child, (list, dict)) and not child:
                continue
            items.append(
                f"{next_spacer}{format_js_key(key)}: {format_js(child, indent + 1)}"
            )
        if not items:
            return "{}"
        return "{\n" + ",\n".join(items) + f"\n{spacer}}}"

    if isinstance(value, list):
        if not value:
            return "[]"
        inner = ", ".join(format_js(v, indent) for v in value)
        return f"[{inner}]"

    if isinstance(value, str):
        return f"\"{value}\""

    return str(value)


def to_js_object(bot: Dict[str, Any]) -> str:
    return format_js(bot, 0) + ","


def to_js_output(bots: List[Dict[str, Any]]) -> str:
    if len(bots) == 1:
        return to_js_object(bots[0])
    items = ",\n".join("\t" + format_js(bot, 1) for bot in bots)
    return "[\n" + items + "\n]\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert MvM bot type text to JS object.")
    parser.add_argument("-i", "--input", required=True, help="Input text file")
    parser.add_argument("-o", "--output", required=True, help="Output JS file")
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as handle:
        text = handle.read()

    bots = parse_bots(text)
    js_output = to_js_output(bots)

    with open(args.output, "w", encoding="utf-8") as handle:
        handle.write(js_output)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
