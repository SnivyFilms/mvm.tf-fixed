var VpkImport = (function () {
	"use strict";

	var classIds = {
		scout: 0,
		soldier: 1,
		pyro: 2,
		demoman: 3,
		heavy: 4,
		heavyweapons: 4,
		medic: 5,
		sniper: 6,
		spy: 7,
		engineer: 8
	};

	function readUint32(view, offset) {
		return view.getUint32(offset, true);
	}

	function readUint16(view, offset) {
		return view.getUint16(offset, true);
	}

	function text(buffer) {
		return new TextDecoder("utf-8", { fatal: false }).decode(buffer);
	}

	function normalizePath(path) {
		return path.replace(/\\/g, "/").replace(/^\/+/, "").toLowerCase();
	}

	function readCString(buffer, offset) {
		var start = offset;
		while (offset < buffer.byteLength && buffer[offset] !== 0) {
			offset++;
		}
		return { value: text(buffer.slice(start, offset)), offset: offset + 1 };
	}

	function parseVpkDirectory(buffer) {
		if (buffer.byteLength < 12) {
			throw new Error("Not a valid VPK file.");
		}
		var view = new DataView(buffer);
		var bytes = new Uint8Array(buffer);
		if (readUint32(view, 0) !== 0x55aa1234) {
			throw new Error("Not a valid VPK file.");
		}
		var version = readUint32(view, 4);
		var treeSize = readUint32(view, 8);
		if (version !== 1 && version !== 2) {
			throw new Error("Unsupported VPK version: " + version);
		}

		var offset = version === 2 ? 28 : 12;
		var entries = [];
		for (;;) {
			var extRead = readCString(bytes, offset);
			offset = extRead.offset;
			var ext = extRead.value;
			if (!ext) break;

			for (;;) {
				var pathRead = readCString(bytes, offset);
				offset = pathRead.offset;
				var path = pathRead.value;
				if (!path) break;

				for (;;) {
					var nameRead = readCString(bytes, offset);
					offset = nameRead.offset;
					var name = nameRead.value;
					if (!name) break;

					var crc = readUint32(view, offset);
					var preloadBytes = readUint16(view, offset + 4);
					var archiveIndex = readUint16(view, offset + 6);
					var entryOffset = readUint32(view, offset + 8);
					var entryLength = readUint32(view, offset + 12);
					offset += 16;
					if (readUint16(view, offset) !== 0xffff) {
						throw new Error("Invalid VPK directory terminator.");
					}
					offset += 2;

					var preloadEnd = offset + preloadBytes;
					var preload = buffer.slice(offset, preloadEnd);
					offset = preloadEnd;

					var fullPath = (path === " " ? "" : path + "/") + name;
					if (ext) fullPath += "." + ext;
					entries.push({
						path: normalizePath(fullPath),
						crc: crc,
						preload: preload,
						archiveIndex: archiveIndex,
						entryOffset: entryOffset,
						entryLength: entryLength
					});
				}
			}
		}

		return { entries: entries, treeSize: treeSize, buffer: buffer };
	}

	function lexKeyValues(input) {
		var tokens = [];
		var i = 0;
		while (i < input.length) {
			if (input[i] === "/" && input[i + 1] === "/") {
				i += 2;
				while (i < input.length && input[i] !== "\n") i++;
				continue;
			}
			if (input[i] === "/" && input[i + 1] === "*") {
				i += 2;
				while (i < input.length && !(input[i] === "*" && input[i + 1] === "/")) i++;
				i += 2;
				continue;
			}
			if (/\s/.test(input[i])) {
				i++;
				continue;
				}
			if (input[i] === "{" || input[i] === "}") {
				tokens.push(input[i++]);
				continue;
			}
			if (input[i] === "\"") {
				i++;
				var quoted = "";
				while (i < input.length && input[i] !== "\"") {
					if (input[i] === "\\" && i + 1 < input.length) {
						i++;
					}
					quoted += input[i++];
				}
				if (i < input.length) i++;
				tokens.push(quoted);
				continue;
			}
			var start = i;
			while (i < input.length && !/\s/.test(input[i]) && input[i] !== "{" && input[i] !== "}") i++;
			tokens.push(input.slice(start, i));
		}
		return tokens;
	}

	function parseKeyValues(input) {
		var tokens = lexKeyValues(input);
		var index = 0;

		function parseObject() {
			var result = {};
			while (index < tokens.length) {
				if (tokens[index] === "}") {
					index++;
					break;
				}
				var key = tokens[index++];
				if (!key) continue;
				if (tokens[index] === "{") {
					index++;
					result[key] = parseObject();
				} else if (index < tokens.length) {
					result[key] = tokens[index++];
				}
			}
			return result;
		}

		if (!tokens.length) return {};
		return parseObject();
	}

	function mergePrefab(item, prefabs) {
		var result = {};
		var prefabName = item.prefab;
		if (prefabName) {
			var names = prefabName.split(/\s+/);
			for (var i = 0; i < names.length; i++) {
				var prefab = prefabs[names[i]];
				if (prefab) {
					var parent = mergePrefab(prefab, prefabs);
					for (var key in parent) result[key] = parent[key];
				}
			}
		}
		for (var ownKey in item) result[ownKey] = item[ownKey];
		return result;
	}

	function slotFor(item) {
		var slot = (item.item_slot || item.loadout_slot || "").toLowerCase();
		return slotForValue(slot);
	}

	function isClutterItem(item) {
		var searchable = [
			item.name,
			item.item_name,
			item.item_type_name,
			item.image_inventory,
			item.prefab
		].filter(function(value) { return value; }).join(" ").toLowerCase();
		return /(crate|key|taunt|badge|medal|rgl|ugc|etf2l|asia.?fortress|brazil.?fortress|madness|ultiduo|cheated.?detected|oz.?fortress|tournament|league|championship|participant|division\s*[0-9ivx]+|[123](st|nd|rd|th)\s+place|season\s*[0-9]+|cup\b|donat|supporter|contributor|patreon|charity)/.test(searchable);
	}

	function slotForValue(slot) {
		slot = String(slot).toLowerCase();
		if (slot === "primary") return 0;
		if (slot === "secondary" || slot === "pda" || slot === "pda2" || slot === "building") return 1;
		if (slot === "melee") return 2;
		if (slot === "cosmetic" || slot === "head" || slot === "face" || slot === "misc" ||
			slot === "neck" || slot === "medal" || slot === "action" || slot === "taunt") return 3;
		return null;
	}

	function dxt1Block(view, offset, output, x, y, width, height) {
		var c0 = view.getUint16(offset, true);
		var c1 = view.getUint16(offset + 2, true);
		var code = view.getUint32(offset + 4, true);
		var colors = [[], [], [], []];
		function unpack(c) {
			return [(c & 31) * 255 / 31, ((c >> 5) & 63) * 255 / 63, ((c >> 11) & 31) * 255 / 31];
		}
		colors[0] = unpack(c0);
		colors[1] = unpack(c1);
		if (c0 > c1) {
			colors[2] = [(2 * colors[0][0] + colors[1][0]) / 3, (2 * colors[0][1] + colors[1][1]) / 3, (2 * colors[0][2] + colors[1][2]) / 3];
			colors[3] = [(colors[0][0] + 2 * colors[1][0]) / 3, (colors[0][1] + 2 * colors[1][1]) / 3, (colors[0][2] + 2 * colors[1][2]) / 3];
		} else {
			colors[2] = [(colors[0][0] + colors[1][0]) / 2, (colors[0][1] + colors[1][1]) / 2, (colors[0][2] + colors[1][2]) / 2];
			colors[3] = [0, 0, 0];
		}
		for (var py = 0; py < 4; py++) {
			for (var px = 0; px < 4; px++) {
				var dx = x + px;
				var dy = y + py;
				if (dx >= width || dy >= height) continue;
				var index = (code >> (2 * (py * 4 + px))) & 3;
				var alpha = index === 3 && c0 <= c1 ? 0 : 255;
				var i = (dy * width + dx) * 4;
				output[i] = colors[index][0];
				output[i + 1] = colors[index][1];
				output[i + 2] = colors[index][2];
				output[i + 3] = alpha;
			}
		}
	}

	function dxt5Block(view, offset, output, x, y, width, height) {
		var alpha0 = view.getUint8(offset);
		var alpha1 = view.getUint8(offset + 1);
		var alphas = new Array(8);
		alphas[0] = alpha0;
		alphas[1] = alpha1;
		if (alpha0 > alpha1) {
			for (var i = 2; i < 8; i++) alphas[i] = ((8 - i) * alpha0 + (i - 1) * alpha1) / 7;
		} else {
			for (var j = 2; j < 6; j++) alphas[j] = ((6 - j) * alpha0 + (j - 1) * alpha1) / 5;
			alphas[6] = 0;
			alphas[7] = 255;
		}
		var alphaBits = [
			view.getUint16(offset + 2, true),
			view.getUint16(offset + 4, true),
			view.getUint16(offset + 6, true)
		];
		var code1 = view.getUint32(offset + 12, true);
		var c0 = view.getUint16(offset + 8, true);
		var c1 = view.getUint16(offset + 10, true);
		var colors = [[], [], [], []];
		function unpack(c) {
			return [(c & 31) * 255 / 31, ((c >> 5) & 63) * 255 / 63, ((c >> 11) & 31) * 255 / 31];
		}
		colors[0] = unpack(c0);
		colors[1] = unpack(c1);
		colors[2] = [(2 * colors[0][0] + colors[1][0]) / 3, (2 * colors[0][1] + colors[1][1]) / 3, (2 * colors[0][2] + colors[1][2]) / 3];
		colors[3] = [(colors[0][0] + 2 * colors[1][0]) / 3, (colors[0][1] + 2 * colors[1][1]) / 3, (colors[0][2] + 2 * colors[1][2]) / 3];
		for (var py = 0; py < 4; py++) {
			for (var px = 0; px < 4; px++) {
				var dx = x + px;
				var dy = y + py;
				if (dx >= width || dy >= height) continue;
				var p = py * 4 + px;
				var alphaIndex = 0;
				if (p < 2) alphaIndex = (view.getUint16(offset + 2, true) >> (p * 3)) & 7;
				else if (p < 5) alphaIndex = (view.getUint16(offset + 4, true) >> ((p - 2) * 3)) & 7;
				else alphaIndex = (view.getUint16(offset + 6, true) >> ((p - 5) * 3)) & 7;
				var colorIndex = (code1 >> (2 * p)) & 3;
				var i = (dy * width + dx) * 4;
				output[i] = colors[colorIndex][0];
				output[i + 1] = colors[colorIndex][1];
				output[i + 2] = colors[colorIndex][2];
				output[i + 3] = alphas[alphaIndex];
			}
		}
	}

	function vtfToBlob(buffer) {
		if (buffer.byteLength < 80) return Promise.resolve(null);
		var view = new DataView(buffer);
		var width = readUint16(view, 16);
		var height = readUint16(view, 18);
		var format = readUint32(view, 52);
		var mipCount = buffer[56];
		if (format !== 13 && format !== 15) return Promise.resolve(null);
		var blockSize = format === 13 ? 8 : 16;

		var headerSize = readUint32(view, 12);
		var smallerMipSize = 0;
		for (var mip = mipCount - 1; mip > 0; mip--) {
			var mipWidth = Math.max(1, Math.floor(width / Math.pow(2, mip)));
			var mipHeight = Math.max(1, Math.floor(height / Math.pow(2, mip)));
			smallerMipSize += Math.ceil(mipWidth / 4) * Math.ceil(mipHeight / 4) * blockSize;
		}
		var candidates = [headerSize + smallerMipSize, headerSize, 80];

		var output = new Uint8ClampedArray(width * height * 4);
		var found = false;
		for (var c = 0; c < candidates.length && !found; c++) {
			var offset = candidates[c];
			var blocksX = Math.ceil(width / 4);
			var blocksY = Math.ceil(height / 4);
			var needed = blocksX * blocksY * blockSize;
			if (offset + needed > buffer.byteLength) continue;
			for (var y = 0, bi = 0; y < height; y += 4) {
				for (var x = 0; x < width; x += 4, bi++) {
					var blockOffset = offset + bi * blockSize;
					if (format === 13) dxt1Block(view, blockOffset, output, x, y, width, height);
					else dxt5Block(view, blockOffset, output, x, y, width, height);
				}
			}
			found = true;
		}
		if (!found) return Promise.resolve(null);

		var canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext("2d");
		context.putImageData(new ImageData(output, width, height), 0, 0);
		return new Promise(function(resolve) {
			canvas.toBlob(function(blob) { resolve(blob); }, "image/png");
		});
	}

	function blobUrl(blob) {
		return blob ? URL.createObjectURL(blob) : null;
	}

	async function importFiles(files) {
		var dirFile = null;
		var archives = {};
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			if (/(_dir)\.vpk$/i.test(file.name)) dirFile = file;
			else if (/\.vpk$/i.test(file.name)) {
				var match = file.name.match(/_(\d+)\.vpk$/i);
				archives[match ? parseInt(match[1], 10) : 0] = file;
			}
		}
		if (!dirFile) {
			throw new Error("Select the VPK's _dir.vpk file; include archive chunks in the same selection too.");
		}

		var dirBuffer = await dirFile.arrayBuffer();
		var parsed = parseVpkDirectory(dirBuffer);
		var fileMap = {};
		for (var e = 0; e < parsed.entries.length; e++) {
			fileMap[parsed.entries[e].path] = parsed.entries[e];
		}

		async function readEntry(entry) {
			if (entry.preload && entry.preload.byteLength) return entry.preload;
			if (entry.archiveIndex === 0x7fff) {
				return dirBuffer.slice(12 + parsed.treeSize + entry.entryOffset, 12 + parsed.treeSize + entry.entryOffset + entry.entryLength);
			}
			var archive = archives[entry.archiveIndex];
			if (!archive) return null;
			var buffer = await archive.arrayBuffer();
			return buffer.slice(entry.entryOffset, entry.entryOffset + entry.entryLength);
		}

		var itemsEntry = fileMap["scripts/items/items_game.txt"];
		if (!itemsEntry) throw new Error("items_game.txt was not found in this VPK.");
		var itemsBuffer = await readEntry(itemsEntry);
		var itemsText = text(itemsBuffer);
		var game = parseKeyValues(itemsText);
		var root = game.items_game || game;
		var prefabs = root.prefabs || {};
		var items = root.items || {};

		var count = 0;
		var missingImages = 0;
		for (var defIndex in items) {
			var item = mergePrefab(items[defIndex], prefabs);
			var slot = slotFor(item);
			if (slot === null || isClutterItem(item)) continue;

			var classNames = item.used_by_classes;
			var classes = [];
			if (classNames && typeof classNames === "object") {
				for (var className in classNames) {
					var normalizedClassName = className.toLowerCase();
					if (classIds[normalizedClassName] !== undefined) {
						classes.push(classIds[normalizedClassName]);
					} else if (classIds[normalizedClassName.replace(/\s/g, "")] !== undefined) {
						classes.push(classIds[normalizedClassName.replace(/\s/g, "")]);
					}
				}
			}
			if (!classes.length) {
				for (var all = 0; all < 9; all++) classes.push(all);
			}

			var internalName = item.name || item.item_name || defIndex;
			var displayName = item.name || item.item_name || defIndex;
			if (/^#/.test(displayName)) displayName = displayName.slice(1);
			var imageInventory = item.image_inventory;
			var imageUrl = null;
			if (imageInventory) {
				var base = normalizePath(String(imageInventory).replace(/^materials\//, "").replace(/\.(vtf|png)$/i, ""));
				var candidates = [
					"materials/" + base + "_large.vtf",
					"materials/" + base + ".vtf",
					base + "_large.png",
					base + ".png"
				];
				for (var c = 0; c < candidates.length && !imageUrl; c++) {
					var imageEntry = fileMap[normalizePath(candidates[c])];
					if (!imageEntry) continue;
					var imageBuffer = await readEntry(imageEntry);
					if (!imageBuffer) continue;
					if (/\.png$/i.test(candidates[c])) {
						imageUrl = blobUrl(new Blob([imageBuffer], { type: "image/png" }));
					} else {
						var imageBlob = await vtfToBlob(imageBuffer);
						imageUrl = blobUrl(imageBlob);
					}
				}
			}
			if (!imageUrl) missingImages++;

			for (var ci = 0; ci < classes.length; ci++) {
				itemList.addItem(classes[ci], slot, internalName, imageUrl || "backpack/player/items/all_class/all_missing", displayName);
				count++;
			}
		}

		if (typeof document !== "undefined" && typeof document.dispatchEvent === "function") {
			document.dispatchEvent(new CustomEvent("vpk-items-ready", {
				detail: { count: count, missingImages: missingImages }
			}));
		}

		return { count: count, missingImages: missingImages };
	}

	async function importLocalAssets() {
		var itemsResponse = await fetch("style/vpk/scripts/items_game.txt");
		if (!itemsResponse.ok) {
			throw new Error("Could not load local items_game.txt.");
		}
		var itemsText = await itemsResponse.text();

		var manifest = {};
		try {
			var manifestResponse = await fetch("style/vpk/icon_manifest.json");
			if (manifestResponse.ok) {
				manifest = await manifestResponse.json();
			}
		} catch (manifestError) {
			manifest = {};
		}

		var fileMap = {};
		var dirBuffer = null;
		var parsed = null;
		if (Object.keys(manifest).length === 0) {
			var dirResponse = await fetch("style/vpk/textures/tf2_textures_dir.vpk");
			if (!dirResponse.ok) {
				throw new Error("Could not load the local texture VPK directory.");
			}
			dirBuffer = await dirResponse.arrayBuffer();
			parsed = parseVpkDirectory(dirBuffer);
			for (var e = 0; e < parsed.entries.length; e++) {
				fileMap[parsed.entries[e].path] = parsed.entries[e];
			}
		}

		var archiveCache = {};
		async function readEntry(entry) {
			if (entry.preload && entry.preload.byteLength) return entry.preload;
			if (entry.archiveIndex === 0x7fff) {
				return dirBuffer.slice(28 + parsed.treeSize + entry.entryOffset,
					28 + parsed.treeSize + entry.entryOffset + entry.entryLength);
			}
			if (!archiveCache[entry.archiveIndex]) {
				var index = ("000" + entry.archiveIndex).slice(-3);
				var archiveResponse = await fetch("style/vpk/textures/tf2_textures_" + index + ".vpk");
				if (!archiveResponse.ok) return null;
				archiveCache[entry.archiveIndex] = await archiveResponse.arrayBuffer();
			}
			var archive = archiveCache[entry.archiveIndex];
			return archive.slice(entry.entryOffset, entry.entryOffset + entry.entryLength);
		}

		var game = parseKeyValues(itemsText);
		var root = game.items_game || game;
		var prefabs = root.prefabs || {};
		var items = root.items || {};
		var count = 0;
		var missingImages = 0;
		var imageCache = {};

		for (var defIndex in items) {
			var item = mergePrefab(items[defIndex], prefabs);
			var slot = slotFor(item);
			if (slot === null || isClutterItem(item)) continue;

			var classNames = item.used_by_classes;
			var classes = [];
			if (classNames && typeof classNames === "object") {
				for (var className in classNames) {
					var normalizedClassName = className.toLowerCase();
					var classId = classIds[normalizedClassName];
					if (classId !== undefined) classes.push(classId);
				}
			}
			if (!classes.length) {
				if (slot === 3) {
					for (var all = 0; all < 9; all++) classes.push(all);
			 } else {
					continue;
				}
			}

			var internalName = item.name || defIndex;
			var displayName = item.name || item.item_name || defIndex;
			if (/^#/.test(displayName)) displayName = displayName.slice(1);

			var imageUrl = null;
			var imageInventory = item.image_inventory;
			if (imageInventory) {
				var inventoryPath = normalizePath(String(imageInventory).replace(/^materials\//, "").replace(/\.(vtf|png)$/i, ""));
				if (imageCache[inventoryPath] !== undefined) {
					imageUrl = imageCache[inventoryPath];
				} else {
					imageUrl = manifest[inventoryPath] || manifest["materials/" + inventoryPath] || null;
					if (!imageUrl) {
						var candidates = [
							"materials/" + inventoryPath + "_large.vtf",
							"materials/" + inventoryPath + ".vtf",
							inventoryPath + "_large.png",
							inventoryPath + ".png"
						];
						for (var c = 0; c < candidates.length && !imageUrl; c++) {
							var imageEntry = fileMap[normalizePath(candidates[c])];
							if (!imageEntry) continue;
							var imageBuffer = await readEntry(imageEntry);
							if (!imageBuffer) continue;
							if (/\.png$/i.test(candidates[c])) {
								imageUrl = blobUrl(new Blob([imageBuffer], { type: "image/png" }));
							} else {
								var imageBlob = await vtfToBlob(imageBuffer);
								imageUrl = blobUrl(imageBlob);
							}
						}
					}
					imageCache[inventoryPath] = imageUrl;
				}
			}
			if (!imageUrl) missingImages++;

			for (var ci = 0; ci < classes.length; ci++) {
				itemList.addItem(classes[ci], slot, internalName, imageUrl || "backpack/player/items/all_class/all_missing", displayName);
				count++;
			}
		}

		return { count: count, missingImages: missingImages };
	}

	window.VpkImport = {
		importFiles: importFiles,
		importLocalAssets: importLocalAssets,
		parseKeyValues: parseKeyValues,
		parseVpkDirectory: parseVpkDirectory
	};
})();
