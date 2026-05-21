function parseKeyValues(text) {
	var tokens = [];
	var i = 0;
	var length = text.length;

	function isWhitespace(ch) {
		return ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || ch === "\f";
	}

	function readQuotedString() {
		i++; // Skip opening quote.
		var value = "";
		while (i < length) {
			var ch = text[i];
			if (ch === "\\") {
				var next = text[i + 1];
				if (next !== undefined) {
					value += next;
					i += 2;
					continue;
				}
			}
			if (ch === "\"") {
				i++;
				break;
			}
			value += ch;
			i++;
		}
		return value;
	}

	function readBareWord() {
		var start = i;
		while (i < length) {
			var ch = text[i];
			if (isWhitespace(ch) || ch === "{" || ch === "}" || ch === "\"") {
				break;
			}
			i++;
		}
		return text.slice(start, i);
	}

	while (i < length) {
		var ch = text[i];
		if (isWhitespace(ch)) {
			i++;
			continue;
		}
		if (ch === "/" && text[i + 1] === "/") {
			while (i < length && text[i] !== "\n") {
				i++;
			}
			continue;
		}
		if (ch === "/" && text[i + 1] === "*") {
			i += 2;
			while (i < length && !(text[i] === "*" && text[i + 1] === "/")) {
				i++;
			}
			i += 2;
			continue;
		}
		if (ch === "{") {
			tokens.push({ type: "{", value: "{" });
			i++;
			continue;
		}
		if (ch === "}") {
			tokens.push({ type: "}", value: "}" });
			i++;
			continue;
		}
		if (ch === "\"") {
			var quoted = readQuotedString();
			tokens.push({ type: "string", value: quoted });
			continue;
		}
		var word = readBareWord();
		if (word.length > 0) {
			tokens.push({ type: "word", value: word });
			continue;
		}
		i++;
	}

	var index = 0;

	function nextToken() {
		return tokens[index++];
	}

	function peekToken() {
		return tokens[index];
	}

	function parseBlock() {
		var items = [];
		while (index < tokens.length) {
			var tok = peekToken();
			if (!tok) {
				break;
			}
			if (tok.type === "}") {
				nextToken();
				break;
			}
			var keyTok = nextToken();
			if (!keyTok) {
				break;
			}
			var valueTok = nextToken();
			if (!valueTok) {
				items.push({ key: keyTok.value, value: "" });
				break;
			}
			if (valueTok.type === "{") {
				items.push({ key: keyTok.value, value: parseBlock() });
			} else {
				items.push({ key: keyTok.value, value: valueTok.value });
			}
		}
		return items;
	}

	var rootItems = [];
	while (index < tokens.length) {
		var key = nextToken();
		if (!key) {
			break;
		}
		var value = nextToken();
		if (!value) {
			rootItems.push({ key: key.value, value: "" });
			break;
		}
		if (value.type === "{") {
			rootItems.push({ key: key.value, value: parseBlock() });
		} else {
			rootItems.push({ key: key.value, value: value.value });
		}
	}

	return rootItems;
}

function normalizeXmlName(name) {
	var safe = name.replace(/:/g, "_colon_").replace(/[^A-Za-z0-9_]/g, "_");
	if (/^[0-9]/.test(safe)) {
		safe = "_" + safe;
	}
	return safe;
}

function isTextChildKey(key) {
	var lower = key.toLowerCase();
	return lower === "item" || lower === "attributes" || lower === "tag";
}

function keyValuesToXmlDocument(rootItems) {
	var populationNode = null;
	for (var i = 0; i < rootItems.length; i++) {
		var item = rootItems[i];
		if (Array.isArray(item.value) && item.key.toLowerCase() === "population") {
			populationNode = item;
			break;
		}
	}
	if (!populationNode && rootItems.length === 1 && Array.isArray(rootItems[0].value)) {
		populationNode = rootItems[0];
	}

	var xmlDoc = document.implementation.createDocument("", "population", null);
	var root = xmlDoc.documentElement;

	if (!populationNode || !Array.isArray(populationNode.value)) {
		return xmlDoc;
	}

	addKeyValuesToElement(xmlDoc, root, populationNode.value);
	return xmlDoc;
}

function addKeyValuesToElement(xmlDoc, element, items) {
	var counts = {};
	for (var i = 0; i < items.length; i++) {
		var keyLower = items[i].key.toLowerCase();
		counts[keyLower] = (counts[keyLower] || 0) + 1;
	}

	for (var i = 0; i < items.length; i++) {
		var key = items[i].key;
		var value = items[i].value;
		if (key.charAt(0) === "$") {
			continue;
		}
		if (Array.isArray(value)) {
			var child = xmlDoc.createElement(normalizeXmlName(key));
			element.appendChild(child);
			addKeyValuesToElement(xmlDoc, child, value);
			continue;
		}
		var lowerKey = key.toLowerCase();
		var duplicate = counts[lowerKey] > 1;
		if (duplicate || isTextChildKey(key)) {
			var childText = xmlDoc.createElement(normalizeXmlName(key));
			childText.appendChild(xmlDoc.createTextNode(value));
			element.appendChild(childText);
		} else {
			element.setAttribute(normalizeXmlName(key), value);
		}
	}
}

var PopFileParser = {
	parseToXmlDoc: function(popText) {
		var keyValues = parseKeyValues(popText || "");
		return keyValuesToXmlDocument(keyValues);
	}
};

