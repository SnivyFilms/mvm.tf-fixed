//var Missions = new Array();
var ObjectiveList = ["DestroySentries", "Engineer", "Sniper", "Spy"];
var MissionsBot= {	"T_TFBot_Spy":{"icon":"TFClassIconSpy", "objective":"Spy", "spawn":"spawnbot_mission_spy", "cooldown":30, "initial":30, "count":2},
					"T_TFBot_Sniper":{"icon":"TFClassIconSniper", "objective":"Sniper", "spawn":"spawnbot_mission_sniper", "cooldown":30, "initial":30, "count":2},
					"T_TFBot_Sniper_Sydney_Sleeper":{"icon":"TFClassIconSniperSydneysleeper", "objective":"Sniper", "spawn":"spawnbot_mission_sniper", "cooldown":30, "initial":30, "count":2},
					"T_TFBot_Mini_SentryBuster":{"icon":"TFClassIconMiniSentryBuster", "objective":"DestroySentries", "spawn":"spawnbot", "cooldown":30, "initial":30, "count":2},
					"T_TFBot_SentryBuster":{"icon":"TFClassIconSentryBuster", "objective":"DestroySentries", "spawn":"spawnbot", "cooldown":30, "initial":30, "count":1},
					"T_TFBot_Engineer_Sentry_Teleporter":{"icon":"TFClassIconTeleporter", "objective":"Engineer", "spawn":"spawnbot", "cooldown":30, "initial":30, "count":1},
				}
var MissionCount = 5;
var CLASS_ENGINEER = "Engineer";

function applyMissionBotFallback(bot, templateName) {
	var fallback = {
		"T_TFBot_Spy": { className: "Spy", classIcon: "spy", name: "Spy" },
		"T_TFBot_Sniper": { className: "Sniper", classIcon: "sniper", name: "Sniper" },
		"T_TFBot_Sniper_Sydney_Sleeper": { className: "Sniper", classIcon: "sniper_sydneysleeper", name: "Sniper" },
		"T_TFBot_Engineer_Sentry_Teleporter": { className: "Engineer", classIcon: "teleporter", name: "Engineer" },
		"T_TFBot_SentryBuster": { className: "Demoman", classIcon: "sentry_buster", name: "Sentry Buster" },
		"T_TFBot_Mini_SentryBuster": { className: "Demoman", classIcon: "mini_sentry_buster", name: "Mini Sentry Buster" }
	};

	var config = fallback[templateName];
	if (!config) return false;

	var classId = classesreverse[config.className];
	if (classId !== undefined) {
		bot.setClass(classId, true);
	}
	bot.setClassIcon(config.classIcon);
	bot.setName(config.name);
	bot.setSkill("Normal");
	bot.setTemplateName(templateName);

	if (templateName == "T_TFBot_SentryBuster" || templateName == "T_TFBot_Mini_SentryBuster") {
		bot.setAttribute("MiniBoss", true);
	}

	return true;
}

function Mission()
{
	this.objective = "";
	this.where = "";
	this.teleportWhere = "";
	this.cooldownTime = -1;
	this.initialCooldownTime = -1;
	this.desiredCount = -1;
	this.bot = null;
	this.beginAtWave = 0;
	this.endAtWave = 2;
	this.htmlClassButtons = new Array();
	
////////
    if (typeof Mission.initialized == "undefined")
	{
		Mission.prototype.createElement = CREATE_ELEMENT;
		
		//setNumber
		Mission.prototype.setNumber = function(number) {
		    this.number = number;
			this.updateHeader();
		};
		//renumWaveSpawn
		Mission.prototype.renumWaveSpawn = function() {
		    var i = 1;
			for (var index in this.wavespawns) {
				this.wavespawns[index].setNumber(i);
				++i;
		    }
		};
		//remove
		Mission.prototype.remove = function() {
		    this.htmlElement.parentElement.ownerObject.removeMission(this);
		}
		//removeAllWaveSpawns
		Mission.prototype.removeAllWaveSpawns = function() {
		    while (this.wavespawns.length)
		    {
		    	this.removeWaveSpawn(this.wavespawns[0], true);
		    }
		};
		//randomize
		Mission.prototype.randomize = function(wave) {
			var mission = getRandom(0,MissionCount-1);
			var i = 0;
			var missionTemplate = ""
			for (var index in MissionsBot) {
				if (i==mission) {
					missionTemplate = index;
					break;
				}
				++i;
			}
			if (missionTemplate=="") return;
			this.setClass(missionTemplate);
			this.setBeginAtWave(wave, true);
			this.setEndAtWave(wave, true);
		};
	    // setClass @templateName name of the template, @updateBot true if we have to update the bot
		Mission.prototype.setClass = function(templateName, updateBot) {
			var bot = null;
			if (this.bot==null) {
				bot = new Bot();
				this.setBot(bot);
			} else {
				bot = this.bot;
			}

			if (bot)
			{
				this.bot = bot;
				var missiontemplate = MissionsBot[templateName];
				if (missiontemplate!=undefined) {
					this.setObjective(MissionsBot[templateName]["objective"]);
					this.where = MissionsBot[templateName]["spawn"];
					this.setDesiredCount(MissionsBot[templateName]["count"]);
					this.setCooldownTime(MissionsBot[templateName]["cooldown"])
					this.setInitialCooldownTime(MissionsBot[templateName]["initial"]);
				}else{
					//TODO
				}

				if (updateBot) {
					var templateBot = templateList.getTemplate(templateName);
					if (templateBot) {
						bot.setTemplate(templateName);
						bot.applyTemplate();
					} else {
						applyMissionBotFallback(bot, templateName);
					}
				}

				if (bot.className == CLASS_ENGINEER) {
					this.attrib7.style.display = "";
				}
				else {
					this.attrib7.style.display = "none";
				}

				for (var i in this.htmlClassButtons) {
					addClassName(this.htmlClassButtons[i], "TFClassIconGrey");
				}
				removeClassName(this.htmlClassButtons[templateName], "TFClassIconGrey");
				this.updateHeader();
				return true;
			}
			return false;
		}
		// updateHeader
		Mission.prototype.updateHeader = function(templateName) {
			//this.htmlHeader.innerHTML = MISSION_MISSION + this.bot.name;

			var s = MISSION + " #" + this.number + " " + this.bot.getName();
		    this.htmlHeader.innerHTML = s
			this.htmlMissionTab.innerHTML = this.bot.getName();
		}

	    // setInitialCooldownTime
		Mission.prototype.setInitialCooldownTime = function(initialCooldownTime) {
			this.htmlInputInitialCooldown.id = "";
		    if (this.initialCooldownTime != initialCooldownTime)
		    {
				//if (initialCooldownTime != "")
				{
			        if (isNumber(initialCooldownTime)||initialCooldownTime=="")
			        {
						this.initialCooldownTime = initialCooldownTime;
						this.htmlInputInitialCooldown.value =  initialCooldownTime;
						this.onModified();
					}
					else
					    this.htmlInputInitialCooldown.id = "mvmNaNinput";
				}
			}
		}

	    // setCooldownTime
		Mission.prototype.setCooldownTime = function(cooldownTime) {
			this.htmlInputCooldown.id = "";
		    if (this.cooldownTime != cooldownTime)
		    {
				//if (cooldownTime != "")
				{
			        if (isNumber(cooldownTime)||cooldownTime=="")
			        {
						this.cooldownTime = cooldownTime;
						this.htmlInputCooldown.value =  cooldownTime;
						this.onModified();
					}
					else
					    this.htmlInputCooldown.id = "mvmNaNinput";
				}
			}
		}
	    // setDesiredCount
		Mission.prototype.setDesiredCount = function(desiredCount) {
			this.htmlInputCount.id = "";
		    if (this.desiredCount != desiredCount)
		    {
				//if (desiredCount != "")
				{
			        if (isNumber(desiredCount)||desiredCount=="")
			        {
						this.desiredCount = desiredCount;
						this.htmlInputCount.value =  desiredCount;
						this.onModified();
					}
					else
					    this.htmlInputCount.id = "mvmNaNinput";
				}
			}
		}
	    // setBeginAtWave
		Mission.prototype.setBeginAtWave = function(beginAtWave, force) {
			this.htmlInputBeginAt.id = "";
		    if (this.beginAtWave != beginAtWave)
		    {
				//if (beginAtWave != "")
				{
			        if (isNumber(beginAtWave)&&(force||beginAtWave<=this.endAtWave)||beginAtWave=="")
			        {
						this.beginAtWave = beginAtWave;
						this.htmlInputBeginAt.value =  beginAtWave;
						this.onModified();
					}
					else
					    this.htmlInputBeginAt.id = "mvmNaNinput";
				}
			}
		}
	    // setEndAtWave
		Mission.prototype.setEndAtWave = function(endAtWave, force) {
			this.htmlInputEndAt.id = "";
		    if (this.endAtWave != endAtWave)
		    {
				//if (endAtWave != "")
				{
			        if (isNumber(endAtWave)&&(force||endAtWave>=this.beginAtWave)||endAtWave=="")
			        {
//					    this.htmlInputEndAt.id = "";
						this.endAtWave = endAtWave;
						this.htmlInputEndAt.value =  endAtWave;
						this.onModified();
					}
					else
					    this.htmlInputEndAt.id = "mvmNaNinput";
				}
			}
		}
	    //setSpawn
        Mission.prototype.setSpawn = function(spawnName) {
			this.where = spawnName;

			for (var i =0; i< this.htmlSpawnList.options.length; i++) {
				var option = this.htmlSpawnList.options[i];
				if (option.value==spawnName) {
					this.htmlSpawnList.selectedIndex = i;
					return;
				}
			}
		}
	    //setTeleportWhere
        Mission.prototype.setTeleportWhere = function(spawnName) {
			this.teleportWhere = spawnName;
			this.bot.setTeleportWhere(spawnName);

			for (var i =0; i< this.htmlTeleportWhereList.options.length; i++) {
				var option = this.htmlTeleportWhereList.options[i];
				if (option.value==spawnName) {
					this.htmlTeleportWhereList.selectedIndex = i;
					return;
				}
			}
		}
	    //clearList
        Mission.prototype.clearList = function(list) {
			while (list.options.length>0) {
				list.removeChild(list.options[0]);
				delete list.options[0];
			}
		}
	    //clearSpawnList
        Mission.prototype.clearSpawnList = function() {
			this.clearList(this.htmlSpawnList);
			this.clearList(this.htmlTeleportWhereList);
		}
	    //createSpawnOption
        Mission.prototype.createSpawnOption = function(parent, spawn) {
			var option = this.createElement("option", parent, "spawnList");
			option.id = spawn;
			option.innerHTML = spawn;
			option.value = spawn
		}
	    //updateSpawnList
        Mission.prototype.updateSpawnList = function(mapName) {
			var map = MapList[mapName];
			if (map==undefined) return;
			this.clearSpawnList();

			this.createSpawnOption(this.htmlTeleportWhereList, "");
			for (var i in map.spawns) {
				var spawn = map.spawns[i];
				this.createSpawnOption(this.htmlSpawnList, spawn);
				this.createSpawnOption(this.htmlTeleportWhereList, spawn);
			}
		}
		//updateMapName
		Mission.prototype.updateMapName = function(mapName) {
			this.updateSpawnList(mapName);
		};
		//create
		Mission.prototype.create = function() {
			this.htmlElement = this.createElement("div", null, "mission", null, "help_mission");

			var removeButton = this.createElement("div", this.htmlElement, "removebutton missionRemove", null, "help_mission_remove_button");
			removeButton.appendChild(document.createTextNode("x"));
			addEvent(removeButton, "click", function() {this.ownerObject.remove();}, false);

			this.htmlHeader = this.createElement("div", this.htmlElement, "missionHeader");
			this.htmlTemplates = this.createElement("div", this.htmlElement, "missionTemplates");
			this.htmlAttributes = this.createElement("div", this.htmlElement, "missionAttributes");
			//this.htmlMissionTab = this.createElement("div", null, "missionTab missionTabremoveme");
			//var attrib0 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_template");
			var attrib1 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_begin");
			var attrib2 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_end");
			var attrib3 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_initial_cooldown");
			var attrib4 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_cooldown");
			var attrib5 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_bot_count");
			var attrib6 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_spawn_location");
			this.attrib7 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_teleport_where");
			this.attrib8 = this.createElement("div", this.htmlAttributes, "missionAttribute", null, "help_mission_objective");

			//attrib0.appendChild(document.createTextNode(MISSION_TEMPLATE));
			attrib1.appendChild(document.createTextNode(MISSION_BEGIN_AT));
			attrib2.appendChild(document.createTextNode(MISSION_END_AT));
			attrib3.appendChild(document.createTextNode(MISSION_INITIAL_COOLDOWN));
			attrib4.appendChild(document.createTextNode(MISSION_COOLDOWN));
			attrib5.appendChild(document.createTextNode(MISSION_COUNT));
			attrib6.appendChild(document.createTextNode(MISSION_SPAWN));
			this.attrib7.appendChild(document.createTextNode(MISSION_TELEPORT_WHERE));
			this.attrib8.appendChild(document.createTextNode(MISSION_OBJECTIVE));

			for (var i in MissionsBot) {
				this.htmlClassButtons[i] = this.createElement("div", this.htmlTemplates, "TFClassIcon " + MissionsBot[i]["icon"], null, "help_mission_class_button");
				this.htmlClassButtons[i].tfTemplate = i;

				addEvent(this.htmlClassButtons[i], "click", function() {this.ownerObject.setClass(this.tfTemplate, true);}, false);
			}

			/*{
				//var htmlTemplates = this.createElement("div", attrib0, null, null, "help_bot_templates");
				//htmlTemplates.appendChild(document.createTextNode(BOT_TEMPLATE_LIST));
				this.htmlTemplateList = this.createElement("select", attrib0, "mvminput botinput botTemplateList");
				addEvent(this.htmlTemplateList, "change", function() {this.ownerObject.setTemplate(this.value);}, false);
				//this.notifyBotTemplateAdded(null);

				this.updateTemplates();
			}     */

			this.htmlInputBeginAt = this.createElement("input", attrib1, "");
			this.htmlInputEndAt = this.createElement("input", attrib2, "");
			this.htmlInputInitialCooldown = this.createElement("input", attrib3, "");
			this.htmlInputCooldown = this.createElement("input", attrib4, "");
			this.htmlInputCount = this.createElement("input", attrib5, "");

			{//spawn loc
				this.htmlSpawnList = this.createElement("select", attrib6, "wavespawnWhereList");
				addEvent(this.htmlSpawnList, "change", function() {this.ownerObject.setSpawn(this.value);}, false);
			}

			{//teleport where
				this.htmlTeleportWhereList = this.createElement("select", this.attrib7, "wavespawnWhereList");
				addEvent(this.htmlTeleportWhereList, "change", function() {this.ownerObject.setTeleportWhere(this.value);}, false);
			}

			{//objective
				this.htmlObjectiveList = this.createElement("select", this.attrib8, "wavespawnWhereList");
				addEvent(this.htmlObjectiveList, "change", function() {this.ownerObject.setObjective(this.value);}, false);
			}

			this.updateSpawnList(globalPopulation.mapName);
			this.updateOjectiveList();

			addEvent(this.htmlInputBeginAt, "change", function() {this.ownerObject.setBeginAtWave(this.value);}, false);
			addEvent(this.htmlInputEndAt, "change", function() {this.ownerObject.setEndAtWave(this.value);}, false);
			addEvent(this.htmlInputInitialCooldown, "change", function() {this.ownerObject.setInitialCooldownTime(this.value);}, false);
			addEvent(this.htmlInputCooldown, "change", function() {this.ownerObject.setCooldownTime(this.value);}, false);
			addEvent(this.htmlInputCount, "change", function() {this.ownerObject.setDesiredCount(this.value);}, false);

			this.htmlMissionTab = this.createElement("div", null, "waveTab", null, "help_mission_tab");
		}
		//onModified
		Mission.prototype.onModified = function() {
			return true;
		};
		//loadXml
		Mission.prototype.loadXml = function(node) {
			var lowernodename = node.nodeName.toLowerCase();
			if (lowernodename != "mission") return false;

			for (var i=0; i<node.childNodes.length; i++)
			{
			    var child = node.childNodes[i];
			    var lowernodename = child.nodeName.toLowerCase();
			    switch (lowernodename){
			        case "tfbot":
						this.bot.loadXml(child, false);
						if (this.bot.template!="") {
							this.setClass(this.bot.template);
						}
						else {
							switch (this.bot.getClass()) {
								case "Spy":
									this.setClass("T_TFBot_Spy", true);
									break;
								case "Sniper":
									this.setClass("T_TFBot_Sniper", true);
									break;
							}
						}
						break;
			    }
			}

			this.setInitialCooldownTime("");
			this.setCooldownTime("");
			this.setDesiredCount("");

			for (var i=0; i<node.attributes.length; i++)
			{
			    var attribute = node.attributes[i];
			    var lowernodename = attribute.nodeName.toLowerCase();

			    switch (lowernodename){
			        case "objective":
						this.setObjective(attribute.nodeValue);
			            break;
			        case "where":
						this.where = attribute.nodeValue;
			            break;
			        case "beginatwave":
			            this.setBeginAtWave(attribute.nodeValue, true);
			            break;
			        case "runforthismanywaves":
			            this.setEndAtWave(attribute.nodeValue*1+this.beginAtWave*1-1, true);
			            break;
			        case "initialcooldown":
			            this.setInitialCooldownTime(attribute.nodeValue);
			            break;
			        case "cooldowntime":
			            this.setCooldownTime(attribute.nodeValue);
			            break;
			        case "desiredcount":
			            this.setDesiredCount(attribute.nodeValue);
			            break;
			    }
			}
		}

        Mission.initialized = true;
    }
////////

	this.create();
	this.setBot(new Bot());
	//this.setBeginAtWave(1);
	//this.setEndAtWave(1);
	this.setInitialCooldownTime(30);
	this.setCooldownTime(60);
	this.setDesiredCount(2);
	this.setClass("T_TFBot_Spy", true);
	globalPopulation.addMapListener(this);
	return this;
}

Mission.prototype.activate= function() {
	if (this.bot) {
		this.setBot(this.bot);
	}
}

// setCurrentBot @bot: Bot
Mission.prototype.setBot = function(bot) {
	if (bot != null)
	{
		if (this.bot != bot) {
			if (this.bot) {
				this.bot.showUnselected();
			}
			bot.showSelected();
			this.bot = bot;
		}
		globalBotViewer.setBot(bot, 'Missions');
	}
	return false;
}

// setObjective @objective objective of this mission
Mission.prototype.setObjective = function(objective) {
	this.objective = objective;
	for (var i =0; i< this.htmlObjectiveList.options.length; i++) {
		var option = this.htmlObjectiveList.options[i];
		if (option.value==objective) {
			this.htmlObjectiveList.selectedIndex = i;
			return;
		}
	}
}

//updateOjectiveList
Mission.prototype.updateOjectiveList = function() {
	this.clearList(this.htmlObjectiveList);
	ObjectiveList

	this.createSpawnOption(this.htmlObjectiveList, "");
	for (var i in ObjectiveList) {
		var objective = ObjectiveList[i];
		this.createSpawnOption(this.htmlObjectiveList, objective);
	}
}
		 /*
//addTemplate
Mission.prototype.addTemplate = function(template)
{
	if (template) {
		templateNoSpaces = template.templateName.replace(/[^\w]/gi, '_');//replace(/ /g, "_");
//		template = template.templateName.replace(/"/g, "");//replace(/ /g, "_");
		var option = this.createElement("option", this.htmlTemplateList, "templateList");
		var botname = template.getName();

					option.id = templateNoSpaces;option.tfbot=template;option.selected = true;
					option.innerHTML = "<div class='templateOption " + template.getClassIconStyle() +"' ></div>" + botname + " (" + template.templateName + ")";
					option.value = templateNoSpaces;
					//option.className = "templateOption ";// + newbot.getClassIconStyle();

					//this.showTemplate(templateNoSpaces);
					//globalPopulation.notifyBotTemplateAdded(newbot);
					//this.notifyBotTemplateAdded(newbot);

	}
	return false;
};

//notifyBotTemplateAdded
Mission.prototype.notifyBotTemplateAdded = function(template) {
	this.addTemplate(template);
};

//updateTemplates
Mission.prototype.updateTemplates = function() {
	for (var i in templateList.templates) {
		this.notifyBotTemplateAdded(templateList.templates[i]);
	}
};                       */          

/**
 * Get the template used by this mission
 * @return {Array} Template name array
 */
Mission.prototype.getUsedTemplates = function() {
	var templateArray = {};
	templateArray[this.bot.getTemplateName()] = 1;
	return templateArray;
}