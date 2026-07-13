function GenerateXML(population)
{
    var xmlDoc = document.implementation.createDocument("", "population", null);
    var pop = xmlDoc.documentElement;

    pop.setAttribute("StartingCurrency",  population.currency);
    if (population.respawnTime!="")
        pop.setAttribute("RespawnWaveTime",  population.respawnTime);

    pop.setAttribute("CanBotsAttackWhileInSpawnRoom",  population.canBotsAttackWhileInSpawnRoom?"yes":"no");
    if (population.fixedRespawnWaveTime)
        pop.setAttribute("FixedRespawnWaveTime",  "Yes");
    if (population.zombieBots)
        pop.setAttribute("EventPopfile",  "Halloween");

    if (population.addSentryBusterWhenDamageDealtExceeds!=="")
        pop.setAttribute("AddSentryBusterWhenDamageDealtExceeds",  population.addSentryBusterWhenDamageDealtExceeds);
    if (population.addSentryBusterWhenKillCountExceeds!=="")
        pop.setAttribute("AddSentryBusterWhenKillCountExceeds",  population.addSentryBusterWhenKillCountExceeds);
    if (population.advanced==true)
        pop.setAttribute("Advanced",  "1");

    GenerateTemplates(pop, false, true);
    GenerateMissions(pop);
    GenerateWaves(population.waves, pop, population.mapName, population.resetBomb);

    var s = new XMLSerializer();
    var str = s.serializeToString(xmlDoc);

    return str;
}

function GeneratePopKV(population)
{
    var xmlContent = GenerateXML(population);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    var popNode = xmlDoc.documentElement;

    var lines = [];
    lines.push("#base robot_giant.pop");
    lines.push("#base robot_standard.pop");
    lines.push("#base robot_gatebot.pop");

    appendElementKV(popNode, "", lines);
    return lines.join("\n");
}

function normalizeKvAttributeName(name)
{
    return name.replace(/_colon_/g, ":").replace(/_/g, " ");
}

function shouldQuoteKvToken(value)
{
    if (value === null || value === undefined) return false;
    var str = "" + value;
    return /\s/.test(str) || /["\\]/.test(str);
}

function formatKvToken(value)
{
    var str = "" + value;
    if (!shouldQuoteKvToken(str)) return str;
    return "\"" + str.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"") + "\"";
}

function appendElementKV(node, indent, lines)
{
    if (!node || node.nodeType !== 1) return;

    var name = node.nodeName;
    var hasElementChildren = false;
    var textValue = "";

    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType === 1) {
            hasElementChildren = true;
        } else if (child.nodeType === 3) {
            var trimmed = child.nodeValue.replace(/\s+/g, " ").trim();
            if (trimmed) {
                textValue = trimmed;
            }
        }
    }

    var hasAttributes = node.attributes && node.attributes.length > 0;

    if (!hasElementChildren && !hasAttributes && textValue !== "") {
        lines.push(indent + name + "\t" + formatKvToken(textValue));
        return;
    }

    lines.push(indent + name);
    lines.push(indent + "{");

    if (hasAttributes) {
        for (var a = 0; a < node.attributes.length; a++) {
            var attr = node.attributes[a];
            var attrName = formatKvToken(normalizeKvAttributeName(attr.name));
            var attrValue = formatKvToken(attr.value);
            lines.push(indent + "\t" + attrName + "\t" + attrValue);
        }
    }

    for (var j = 0; j < node.childNodes.length; j++) {
        var childNode = node.childNodes[j];
        if (childNode.nodeType === 1) {
            appendElementKV(childNode, indent + "\t", lines);
        } else if (childNode.nodeType === 3) {
            var childText = childNode.nodeValue.replace(/\s+/g, " ").trim();
            if (childText) {
                lines.push(indent + "\t" + "Value" + "\t" + formatKvToken(childText));
            }
        }
    }

    lines.push(indent + "}");
}

function SaveXML(population)
{
    console.log('SaveXML called with:', population);

    var popContent = GeneratePopKV(population);
    console.log('Pop file generated, length:', popContent.length);

    var filename = (population.mapName || "mission") + ".pop";
    console.log('Filename:', filename);

    var blob = new Blob([popContent], { type: 'text/plain' });
    console.log('Blob created:', blob.size, 'bytes');

    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    console.log('Triggering download...');
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    console.log('Download triggered successfully');
}

function TestXML(population)
{
    var popContent = GeneratePopKV(population);
    var filename = (population.mapName || "mission") + ".pop";

    console.log('=== Generated .pop file: ' + filename + ' ===');
    console.log(popContent);
    console.log('=== End of file ===');
    console.log('\nTo use: Copy the content above and save as ' + filename);
    console.log('Place in: tf/scripts/population/');

    if (DEBUG_XML) {
        var newWindow = window.open();
        newWindow.document.write('<pre>' + popContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>');
    } else {
        alert("Mission generated!\n\nCheck console for full content.\nFile will download as: " + filename + "\n\nPlace in: tf/scripts/population/");
    }
}
