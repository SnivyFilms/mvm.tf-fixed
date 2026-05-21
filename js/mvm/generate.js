var DEBUG_XML = false;

function setAttributeNoSpace(node, attribute, value) {
	if (value !="") {
		value = ""+value;
		var pos = value.indexOf(" ");
		/*if (pos!=-1) {
			value = "\"" + value + "\"";
		}*/
		node.setAttribute(attribute,  value);
	}
}

function GenerateTemplates(parentNode, userOnly, onlyUsedByPopulation)
{
	var xmlDoc = parentNode.ownerDocument;
	var templatesXml = xmlDoc.createElement("Templates");
	var onlyTemplates = {};

	if (onlyUsedByPopulation) {
		onlyTemplates = globalPopulation.getUsedTemplates();
	}

	for (var iTemplate in templateList.templates)
	{
	    var template = 	templateList.templates[iTemplate];
	    //var templateXml = xmlDoc.createElement(iTemplate);

		if (!userOnly||(userOnly&&template.isUserTemplate)) {
			if (template.stockTemplate==false) {
				if (!onlyUsedByPopulation||onlyUsedByPopulation&&onlyTemplates[template.getTemplateName()]) {
	        		var resultOk = GenerateBot(template, templatesXml, iTemplate);
				}
			}
		}
        //if (resultOk) {templatesXml.appendChild(templateXml);} else {return false;}
        
	}
	parentNode.appendChild(templatesXml);
	return true;
}

function GenerateMissions(parentNode)
{
	var xmlDoc = parentNode.ownerDocument;
	//var templatesXml = xmlDoc.createElement("Miss");

	for (var iMission in globalmissions.missionList)
	{
		var mission = globalmissions.missionList[iMission];

		var missionXmlNode = xmlDoc.createElement("Mission");

		missionXmlNode.setAttribute("Objective",  mission.objective/*"DestroySentries"*/);
		missionXmlNode.setAttribute("Where",  mission.where/*"spawnbot"*/);

		if (mission.beginAtWave!="") missionXmlNode.setAttribute("BeginAtWave",  mission.beginAtWave);
		if (mission.beginAtWave!=""&&mission.endAtWave!="") missionXmlNode.setAttribute("RunForThisManyWaves",  mission.endAtWave-mission.beginAtWave+1);
		if (mission.initialCooldownTime!="") missionXmlNode.setAttribute("InitialCooldown",  mission.initialCooldownTime);
		if (mission.cooldownTime!="") missionXmlNode.setAttribute("CooldownTime",  mission.cooldownTime);
		if (mission.desiredCount!="") missionXmlNode.setAttribute("DesiredCount",  mission.desiredCount);
		//if (mission.teleportWhere!="") missionXmlNode.setAttribute("TeleportWhere",  mission.teleportWhere);

		GenerateBot(mission.bot, missionXmlNode);
		parentNode.appendChild(missionXmlNode);
	}
	return true;
}

function GenerateChangeEvent(bot, changeEvent, botNode, xmlDoc) {
    var templateBot = bot.getTemplateBot();

    if (!templateBot||templateBot&&(templateBot.getSkill(changeEvent)!=bot.getSkill(changeEvent))&&bot.getSkill(changeEvent)!="") {
        setAttributeNoSpace(botNode, "Skill",  bot.getSkill(changeEvent));
    }

    if (!templateBot||templateBot&&(templateBot.getMaxVisionRange(changeEvent)!=bot.getMaxVisionRange(changeEvent))) {
        setAttributeNoSpace(botNode, "MaxVisionRange",  bot.getMaxVisionRange(changeEvent));
    }

    if (!templateBot||templateBot&&(templateBot.getBehaviour(changeEvent)!=bot.getBehaviour(changeEvent))) {
        if (bot.getBehaviour(changeEvent)!="None") {
            setAttributeNoSpace(botNode, "BehaviorModifiers",  bot.getBehaviour(changeEvent));
        }
    }

    if (bot.getWeaponRestriction(changeEvent)=="PrimaryOnly"||bot.getWeaponRestriction(changeEvent)=="SecondaryOnly"||bot.getWeaponRestriction(changeEvent)=="MeleeOnly") {
        if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getWeaponRestriction(changeEvent)!=bot.getWeaponRestriction(changeEvent))&&bot.getWeaponRestriction(changeEvent)!="")
            setAttributeNoSpace(botNode, "WeaponRestrictions",  bot.getWeaponRestriction(changeEvent));
    }

    var tags = bot.getTags(changeEvent);
    var tagsTemplate = {};
    if (bot.getTemplateBot()) {
        var tagsTemplate = bot.templateBot.getTags(changeEvent);
    }
    for (var tagIndex in tags)
    {
        if (tags[tagIndex]&&(tags[tagIndex]!=tagsTemplate[tagIndex])) {
            var tagXml = xmlDoc.createElement("Tag");
            tagXml.appendChild(xmlDoc.createTextNode(tagIndex));
            botNode.appendChild(tagXml);
        }
    }

    var attributes = bot.getAttributes(changeEvent);
    var attributesT = {};
    if (templateBot) {
        var attributesT = bot.templateBot.getAttributes(changeEvent);
    }
    for (var j in attributes)
    {
        if (attributes[j]==true&&(attributes[j]!=attributesT[j])) {
            var attributesXml = xmlDoc.createElement("Attributes");
            attributesXml.appendChild(xmlDoc.createTextNode(j));
            botNode.appendChild(attributesXml);
        }
    }

    var itemsAttributes = bot.getItemAttributes(changeEvent);
    var itemsAttributesTemplate = {};
    if (templateBot) {
        var itemsAttributesTemplate = templateBot.getItemAttributes(changeEvent);
    }
    for (var slot in itemsAttributes)
    {
        var itemAttributesCount = 0;
        var attributesXml = xmlDoc.createElement("ItemAttributes");
        if (bot.getItem(slot, changeEvent)) {
            setAttributeNoSpace(attributesXml, "ItemName" ,  bot.getItem(slot, changeEvent).name);
        }
        for (var attribute in itemsAttributes[slot])
        {
            var value = itemsAttributes[slot][attribute].getValue();
            var valuet = "";
            if (templateBot&&(itemsAttributesTemplate[slot][attribute]!==undefined)) {
                valuet = itemsAttributesTemplate[slot][attribute].getValue();
            }

            if (value&&(value!=valuet))
            {
                setAttributeNoSpace(attributesXml, attribute.replace(/ /g, "_").replace(/:/g, "_colon_"),  value);
                ++itemAttributesCount;
            }
        }
        if (itemAttributesCount>0) {
            botNode.appendChild(attributesXml);
        }
    }

    var attributesXml = xmlDoc.createElement("CharacterAttributes");
    var characterAttributesCount = 0;
    var characterAttributes = bot.getCharacterAttributes(changeEvent);
    for (var attribute in characterAttributes)
    {
        var value = characterAttributes[attribute].getValue();
        var valuet = "";
        if (bot.templateBot&&(bot.templateBot.getCharacterAttributes(changeEvent)[attribute]!==undefined))
            valuet = bot.templateBot.getCharacterAttributes(changeEvent)[attribute].getValue();

        if (value&&(value!=valuet))
        {
            setAttributeNoSpace(attributesXml, attribute.replace(/ /g, "_").replace(/:/g, "_colon_"),  value);
            ++characterAttributesCount;
        }
    }
    if (characterAttributesCount>0) {
        botNode.appendChild(attributesXml);
    }

    var items = bot.getItems(changeEvent);
    for (var j in items)
    {
        var item = bot.getItem(j, changeEvent);
        var itemt = null;
        if (bot.templateBot) {
            itemt = bot.templateBot.getItem(j, changeEvent);
        }
        if (item&&(item.name.toLowerCase().indexOf("tf_weapon")!=0)&&(item!=itemt))
        {
            var itemXml = xmlDoc.createElement("Item");
            itemXml.appendChild(xmlDoc.createTextNode(item.name));
            botNode.appendChild(itemXml);
        }
    }
}

function GenerateBot(bot, parentNode, template)
{
	var xmlDoc = parentNode.ownerDocument;
	var botNode = null;
	if (template)
	    botNode = xmlDoc.createElement(template);
	else {
		if (bot.className=="Tank")
	    	botNode = xmlDoc.createElement("Tank");
		else
			botNode = xmlDoc.createElement("TFBot");
	}

	//setAttributeNoSpace(botNode, "stock",  "1");
	
	if (bot.className!="Tank") { 
		if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getClassIcon()!=bot.getClassIcon())) {
			setAttributeNoSpace(botNode, "ClassIcon",  bot.getClassIcon()); 
		}
	}

	if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getHealth()!=bot.getHealth()))
		setAttributeNoSpace(botNode, "Health",  bot.getHealth()); 
		
	if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getAutoJumpMin()!=bot.getAutoJumpMin()))
		setAttributeNoSpace(botNode, "AutoJumpMin",  bot.getAutoJumpMin());     
		
	if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getAutoJumpMax()!=bot.getAutoJumpMax()))
		setAttributeNoSpace(botNode, "AutoJumpMax",  bot.getAutoJumpMax());

	//if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getMaxVisionRange()!=bot.getMaxVisionRange()))
//		setAttributeNoSpace(botNode, "MaxVisionRange",  bot.getMaxVisionRange());

	if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getTeleportWhere()!=bot.getTeleportWhere()))
		setAttributeNoSpace(botNode, "TeleportWhere",  bot.getTeleportWhere());
	//if (mission.teleportWhere!="") missionXmlNode.setAttribute("TeleportWhere",  mission.teleportWhere);


	if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getName()!=bot.getName()))
		setAttributeNoSpace(botNode, "Name",  bot.getName());
		//botNode.setAttribute("Name",  "\"" + bot.getName() +"\"");

	if (!bot.templateBot||bot.templateBot&&(bot.templateBot.getScale()!=bot.getScale())) {
		setAttributeNoSpace(botNode, "Scale",  bot.getScale());
	}

    if (bot.classId<=8)
	{
		if (!bot.templateBot)
			setAttributeNoSpace(botNode, "Class",  bot.className);

		var mA = bot.getMutableAttributes();
		
		var changeEventCount = 0;
		for(var mAa in mA) ++changeEventCount;
		var eventChangeAttributesNode = botNode; 
		
		//if (changeEventCount>1) {
			eventChangeAttributesNode = xmlDoc.createElement("EventChangeAttributes");
//			botNode.appendChild(eventChangeAttributesNode);
//		}

		for(var mAa in mA) {
			var xmlDoc = botNode.ownerDocument;
			var changeEventNode = botNode;			
			//if (changeEventCount>1) {
				var changeEventNode = xmlDoc.createElement(mAa);
				//eventChangeAttributesNode.appendChild(changeEventNode);
			//}
            if (changeEventCount>1) {
                GenerateChangeEvent(bot, mAa, changeEventNode, xmlDoc); // Already correct
            } else {
                GenerateChangeEvent(bot, mAa, botNode, xmlDoc); // Add xmlDoc here too
            }
			//if (changeEventNode.childNodes.length>0)
			{
				eventChangeAttributesNode.appendChild(changeEventNode);
			}
			console.log(changeEventNode);
		}
		if (eventChangeAttributesNode.childNodes.length>1) {
			botNode.appendChild(eventChangeAttributesNode);
		}



		if (bot.template) {
			botNode.setAttribute("Template",  bot.template);
		}
	}
	else { //tank
		botNode.setAttribute("Speed",  bot.tankSpeed);
		if (bot.hasFinalTankSkin)
			botNode.setAttribute("Skin",  1);

		if (bot.tankStartingPath!="")
			botNode.setAttribute("StartingPathTrackNode",  bot.tankStartingPath);

		var OnKilledOutputNode = xmlDoc.createElement("OnKilledOutput");
		var OnBombDroppedOutput = xmlDoc.createElement("OnBombDroppedOutput");

		OnKilledOutputNode.setAttribute("Target",  "boss_dead_relay");
		OnKilledOutputNode.setAttribute("Action",  "Trigger");
		botNode.appendChild(OnKilledOutputNode);

		OnBombDroppedOutput.setAttribute("Target",  "boss_deploy_relay");
		OnBombDroppedOutput.setAttribute("Action",  "Trigger");
		botNode.appendChild(OnBombDroppedOutput);

	}
	parentNode.appendChild(botNode);
	return true;
}

function GenerateWaveSpawn(waveSpawn, parentNode)
{
	var xmlDoc = parentNode.ownerDocument;
	var waveSpawnXml = xmlDoc.createElement("WaveSpawn");

	var maxBots = waveSpawn.getMaxBots();
	//maxBots = 1;

	if (waveSpawn.name!=="")
		waveSpawnXml.setAttribute("Name",  waveSpawn.name);
	if (waveSpawn.waitForAllSpawned!=="")
		waveSpawnXml.setAttribute("WaitForAllSpawned",  waveSpawn.waitForAllSpawned);
	if (waveSpawn.waitForAllDead!=="")
		waveSpawnXml.setAttribute("WaitForAllDead",  waveSpawn.waitForAllDead)

	waveSpawnXml.setAttribute("TotalCurrency",  waveSpawn.currency);

	if (waveSpawn.totalCount!=="") {
		waveSpawnXml.setAttribute("TotalCount",  waveSpawn.totalCount*maxBots);
		waveSpawnXml.setAttribute("GroupTotalCount",  waveSpawn.totalCount*1);
	}

	if (waveSpawn.maxActive!=="") {
		waveSpawnXml.setAttribute("MaxActive",  waveSpawn.maxActive*maxBots);
		waveSpawnXml.setAttribute("GroupMaxActive",  waveSpawn.maxActive*1);
	}

	if (waveSpawn.spawnCount!=="") {
		waveSpawnXml.setAttribute("SpawnCount",  waveSpawn.spawnCount*maxBots);
		waveSpawnXml.setAttribute("GroupSpawnCount",  waveSpawn.spawnCount*1);
	}

	//waveSpawnXml.setAttribute("Where",  waveSpawn.where);

	var spawnLocations = waveSpawn.getSpawnLocations();
	var count = 0;
	for (var spawnIndex in spawnLocations) {
		if (spawnLocations[spawnIndex]) {
        	++count;
			var whereXml = xmlDoc.createElement("Where");
			whereXml.appendChild(xmlDoc.createTextNode(spawnIndex));
			waveSpawnXml.appendChild(whereXml);
		}
	}
	if (count==0) {
		var whereXml = xmlDoc.createElement("Where");
		whereXml.appendChild(xmlDoc.createTextNode("spawnbot"));
		waveSpawnXml.appendChild(whereXml);
	}

	if (waveSpawn.waitBefore!=="")
		waveSpawnXml.setAttribute("WaitBeforeStarting",  waveSpawn.waitBefore);

	if (waveSpawn.waitBetween!=="")
		waveSpawnXml.setAttribute("WaitBetweenSpawns",  waveSpawn.waitBetween);


	if (waveSpawn.isSupport)
		waveSpawnXml.setAttribute("Support",  waveSpawn.isSupport);
	if (waveSpawn.isRandomSpawn)
		waveSpawnXml.setAttribute("RandomSpawn",  1);

	var randomXml = xmlDoc.createElement("RandomChoice");
	var isRandom = waveSpawn.randomChoices.length>1?true:false;
	for (var k in waveSpawn.randomChoices)
	{
	    var randomChoice = waveSpawn.randomChoices[k];
		var squadXml = xmlDoc.createElement("Squad");
		for (var l in randomChoice.bots)
		{
			var bot = randomChoice.bots[l];
   			var resultOk = GenerateBot(bot, squadXml);
		}
		if (isRandom) {
	    	randomXml.appendChild(squadXml);
		}
		if (!waveSpawn.isRandom) break;
	}
	if (isRandom) {
    	waveSpawnXml.appendChild(randomXml);
	}else{
    	waveSpawnXml.appendChild(squadXml);
	}
    parentNode.appendChild(waveSpawnXml);
	return true;
}

function GenerateWaves(waves, parentNode, map, resetBomb)
{
	var xmlDoc = parentNode.ownerDocument;
	
	for (var i in waves)
	{
	    var waveXml = xmlDoc.createElement("Wave");
	    var wave = waves[i];

		waveXml.setAttribute("WaitWhenDone",  65);
		waveXml.setAttribute("Checkpoint",  "Yes");

		setAttributeNoSpace(waveXml, "Description",  wave.getDescription());
		setAttributeNoSpace(waveXml, "Sound",  wave.getStartingSound());
		//waveXml.setAttribute("Description",  wave.getDescription());

 //USELESS ?
		var StartWaveOutput = xmlDoc.createElement("StartWaveOutput");
		var DoneOutput = xmlDoc.createElement("DoneOutput");

		if (MapList[map]) {
			StartWaveOutput.setAttribute("Target",  MapList[map].getStartWaveOutput(resetBomb));
			StartWaveOutput.setAttribute("Action",  "Trigger");
			waveXml.appendChild(StartWaveOutput);

			DoneOutput.setAttribute("Target",  MapList[map].getDoneOutput());
			DoneOutput.setAttribute("Action",  "Trigger");
			waveXml.appendChild(DoneOutput);
		}

		for (var j in wave.wavespawns)
		{
		    var waveSpawn = wave.wavespawns[j];
			GenerateWaveSpawn(waveSpawn, waveXml);
		}


	    parentNode.appendChild(waveXml);
	}
	return true;
}
