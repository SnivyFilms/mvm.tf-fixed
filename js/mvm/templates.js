function Templates()
{
	this.templates = new Array();
	this.templateList = [];
	this.current = null;
	this.count = 0;

////////
    if (typeof Templates.initialized == "undefined")
	{
		Templates.prototype.createElement = CREATE_ELEMENT;

	    // addTemplate
        Templates.prototype.addTemplate = function(template, copyCurrent, newbot, userTemplate)
		{
		    if (template!=null&&template!="") {
				templateNoSpaces = template.replace(/[^\w]/gi, '_');
				template = template.replace(/"/g, "");//replace(/ /g, "_");
		        if (this.templates[templateNoSpaces]== undefined)
		        {
					if (newbot==undefined) {
			        	newbot = this.addBot(templateNoSpaces);
						newbot.setName(template);
						if (userTemplate) {
							newbot.isUserTemplate = true;
						}
					}
			        if (newbot)
			        {
						if (copyCurrent&&this.current) {
							newbot.copyBot(this.current);
							newbot.setName(template);//Keep new name
							newbot.setTemplateName(templateNoSpaces);
						}
						this.templates[templateNoSpaces] = newbot;this.count++;
						{
							var option = this.htmlTemplateList.namedItem(templateNoSpaces);
							if (!option) {
								option = this.createElement("option", this.htmlTemplateList, "templateList");
								this.templateList.push(option);
							}
							var botname = newbot.name;
							if (botname=="")
								botname = newbot.getClass();

							option.id = templateNoSpaces;option.tfbot=newbot;option.selected = true;
							option.innerHTML = "<div class='templateOption " + newbot.getClassIconStyle() +"' ></div>" + botname + " (" + newbot.templateName + ")";
							option.value = templateNoSpaces;
							option.templateBot = newbot;

							this.showTemplate(templateNoSpaces);
							if (typeof globalPopulation !== "undefined" && globalPopulation && globalPopulation.notifyBotTemplateAdded) {
								globalPopulation.notifyBotTemplateAdded(newbot);
							}
						}

						return newbot;
					}
				}
			}
			return false;
        };
	    // removeTemplate
        Templates.prototype.removeTemplate = function(template)
		{
			if (template=="") return;
      		var o = this.htmlTemplateList.namedItem(template);
		    var bot = this.templates[template];
		    //var index = this.templates.indexOf(bot);
		    if (o&&bot) {
				this.htmlTemplateList.removeChild(o);
		        delete this.templates[template];
				globalPopulation.removeBotTemplate(template);
				this.htmlBotsHandler.removeChild(bot.htmlElement);
				//this.htmlTemplateList.selectedIndex = 1;
				this.showTemplate(this.htmlTemplateList.value);

				return true;
		    }
			return false;
        };
	    // getTemplate
        Templates.prototype.getTemplate = function(templateName)
		{
		    if (templateName!=null) {
		        return this.templates[templateName];
			}
        };
	    // getTemplate
        Templates.prototype.getTemplateById = function(templateId)
		{
		    var i = 0;
			for (var index in this.templates) {
			    if (i==templateId)
			    {
			        return index;
			    }
			    ++i;
			}
			return null;
        };
	    // getCount
        Templates.prototype.getCount = function()
		{
	        return this.count;
        };

		Templates.prototype.create = function() {
			this.div = this.createElement("div", null, "tfTemplate", null, "help_templates");
			this.htmlHeader = this.createElement("div", this.div, "templateHeader");
			this.htmlTemplateInput = this.createElement("div", this.div, null);
			this.htmlBotsHandler = this.createElement("div", this.div, "templateBotHandler");
			this.showBotHandler();

			this.htmlTemplateText = this.createElement("input", this.htmlTemplateInput, "templateText templateInput", null, "help_templates_name");
			this.htmlTemplateAdd = this.createElement("button", this.htmlTemplateInput, "templateButton", null, "help_templates_add");
			this.htmlTemplateCopy = this.createElement("button", this.htmlTemplateInput, "templateButton", null, "help_templates_copy");
			this.createElement("br", this.htmlTemplateInput);
			this.htmlTemplateList = this.createElement("select", this.htmlTemplateInput, "templateList templateInput", null, "help_templates_list");
			this.htmlTemplateRemove = this.createElement("button", this.htmlTemplateInput, "templateButton", null, "help_templates_remove");
			this.htmlTemplateSave = this.createElement("button", this.htmlTemplateInput, "templateButton", null, "help_templates_save");

			this.htmlTemplateAdd.innerHTML = TEMPLATE_ADD;
			this.htmlTemplateCopy.innerHTML = TEMPLATE_COPY;
			this.htmlTemplateRemove.innerHTML = TEMPLATE_REMOVE;
			this.htmlTemplateSave.innerHTML = TEMPLATE_SAVE;
			this.htmlHeader.innerHTML = TEMPLATES;

			//addEvent(this.div, "mouseover", function() {this.ownerObject.showBotHandler();}, false);
			//addEvent(this.div, "mouseout", function() {this.ownerObject.hideBotHandler();}, false);
		//	addEvent(this.htmlTemplateText, "change", function() {this.ownerObject.addTemplate(this.ownerObject.htmlTemplateText.value);}, false);
			addEvent(this.htmlTemplateAdd, "click", function() {this.ownerObject.addTemplate(this.ownerObject.htmlTemplateText.value, false, null, true);}, false);
			addEvent(this.htmlTemplateCopy, "click", function() {this.ownerObject.addTemplate(this.ownerObject.htmlTemplateText.value, true, null, true);}, false);
			addEvent(this.htmlTemplateRemove, "click", function() {this.ownerObject.removeTemplate(this.ownerObject.htmlTemplateList.value);}, false);
 			addEvent(this.htmlTemplateSave, "click", function() {this.ownerObject.saveToServer();}, false);
			addEvent(this.htmlTemplateList, "change", function() {this.ownerObject.showTemplate(this.value);}, false);

			this.addFixedTemplates();
			this.addBuiltinTemplates();
		}

		Templates.prototype.addFixedTemplates = function() {
			for (var i = 0; i < FIXED_TEMPLATES.length; i++) {
				var item = FIXED_TEMPLATES[i];
				var option = this.createElement("option", this.htmlTemplateList, "templateList");
				option.id = item.id;
				option.value = item.id;
				if (item.id === "") {
					option.innerHTML = "";
				} else {
					option.innerHTML = "<div class='templateOption " + item.icon + "' ></div>" + item.label + " (" + item.id + ")";
				}
			}
		}

		Templates.prototype.addBuiltinTemplates = function() {
			for (var i = 0; i < BUILTIN_TEMPLATES.length; i++) {
				var template = BUILTIN_TEMPLATES[i];
				if (this.templates[template.id] != undefined) continue;
				var bot = this.addBot(template.id);
				if (!bot) continue;
				applyBuiltinTemplate(bot, template);
				this.addTemplate(template.id, false, bot);
			}
		}

		Templates.prototype.showBotHandler = function() {
			this.htmlBotsHandler.style.display = "";
		}

		Templates.prototype.hideBotHandler = function() {
			this.htmlBotsHandler.style.display = "none";
		}

		Templates.prototype.showTemplate = function(/*template*/) {
			var option = this.htmlTemplateList.options[this.htmlTemplateList.selectedIndex];
			if (option == undefined || !option.tfbot) {
				this.htmlTemplateText.value = "";
				return;
			}
			this.htmlTemplateText.value = option.tfbot.getName();

			var template = option.value;
			for (var i in this.templates) {
			    if (i!=template) {
					this.templates[i].htmlElement.style.display = 'none';
				} else {
					this.setCurrent(this.templates[i]);
					this.templates[i].htmlElement.style.display = '';
				}
			}
		}
		//addBot
		Templates.prototype.addBot= function(templateName) {
		    var bot = new Bot(templateName);
		    if (bot != null)
		    {
		        //this.bots.push(bot);
				this.htmlBotsHandler.appendChild(bot.htmlElement);
				return bot;
			}
			return false;
		}
		//loadXml
		Templates.prototype.loadXml = function(node, userDatas) {
			var lowernodename = node.nodeName.toLowerCase();
			if (lowernodename != "templates") return false;
			for (var i=0; i<node.childNodes.length; i++)
			{
				var template = node.childNodes[i];
				if (template.nodeType == 1/*template.ELEMENT_NODE*/) {
					if (this.templates[template.nodeName] == undefined)
		        	{
						var bot = this.addBot();
					    if (bot) {
					        bot.loadXml(template);
							if (userDatas==true)
								bot.isUserTemplate = true;
					    }
						this.addTemplate(template.nodeName, false, bot);
					}
				    //var bot = this.addTemplate(template.nodeName);
				}
			}
			var o =	this.htmlTemplateList.options[0];
			if (o!=undefined && o.tfbot) {
				o.selected = true;
			} else {
				for (var i = 0; i < this.htmlTemplateList.options.length; i++) {
					if (this.htmlTemplateList.options[i].tfbot) {
						this.htmlTemplateList.options[i].selected = true;
						break;
					}
				}
			}
			this.showTemplate();
		};
		//saveToServer
		Templates.prototype.saveToServer= function() {
			var xmlDoc = document.implementation.createDocument("", "population", null);
			var templates = xmlDoc.documentElement;

			GenerateTemplates(templates, true);

			var s = new XMLSerializer();
			var str = s.serializeToString(xmlDoc);
			var url  = "./templates/savetemplates.php";

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST", url, false);
			//xmlhttp.setRequestHeader('Content-Type', 'text/xml');
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlhttp.send("templates="+str);
			xmlDoc = xmlhttp.responseXML;


			var ok = xmlDoc.documentElement;
			if (ok.nodeName == "OK") {
				alert(TEMPLATE_SAVE_OK);
			} else {
				alert(TEMPLATE_SAVE_KO);
			}

			return false;
		}
        Templates.initialized = true;
    }
////////

	this.create();
	return this;
}

Templates.prototype.activate=function() {
	this.updateBotView();
}

Templates.prototype.setCurrent=function(bot) {
	this.current = bot;
	this.updateBotView();
}

Templates.prototype.updateBotView=function() {
	if (this.current && typeof globalBotViewer !== "undefined" && globalBotViewer) {
		globalBotViewer.setBot(this.current, 'Templates');
	}
}

// filter
Templates.prototype.filter = function(filter) {
	var filterArray = filter.replace(/^\s+|\s+$/g, '').toLowerCase().split(" ");
	for (var templateIndex=0; templateIndex<this.templateList.length; templateIndex++) {
		var template = this.templateList[templateIndex];
		//var name = template.templateName.toLowerCase();
		var name = template.templateBot.getExtendedName().toLowerCase();
		var show = true;

		for (var j=0; j<filterArray.length; j++) {
   			if (name.indexOf(filterArray[j])==-1) {
				show = false;
			}
		}
		if (show) {
			Show(template);
		} else {
			Hide(template);
		}
	}
}


var FIXED_TEMPLATES = [
	{ id: "", label: "", icon: "" },
	{ id: "T_TFBot_Micro_SentryBuster", label: "Micro Sentry Buster", icon: "TFClassIconSentryBuster" },
	{ id: "T_TFBot_Mini_SentryBuster", label: "Mini Sentry Buster", icon: "TFClassIconSentryBuster" },
	{ id: "T_TFBot_Sniper", label: "Sniper", icon: "TFClassIconSniper" },
	{ id: "T_TFBot_Sniper_Razorback", label: "Razorback Sniper", icon: "TFClassIconSniper" },
	{ id: "T_TFBot_Sniper_Sydney_Sleeper", label: "Sydney Sniper", icon: "TFClassIconSniperSydneysleeper" },
	{ id: "T_TFBot_Sniper_Huntsman", label: "Bowman", icon: "TFClassIconSniperBow" },
	{ id: "T_TFBot_Sniper_Huntsman_Spammer", label: "Bowman Rapid Fire", icon: "TFClassIconSniperBow TFClassIconGiant" },
	{ id: "T_TFBot_Scout_Melee", label: "Scout", icon: "TFClassIconScout" },
	{ id: "T_TFBot_Scout_Fish", label: "Scout", icon: "TFClassIconScout" },
	{ id: "T_TFBot_Scout_SunStick", label: "Scout", icon: "" },
	{ id: "T_TFBot_Scout_Bonk", label: "Scout", icon: "TFClassIconScoutBonk" },
	{ id: "T_TFBot_Scout_Sandman", label: "Minor League Scout", icon: "TFClassIconScoutStun" },
	{ id: "T_TFBot_Scout_Sandman_FastCharge", label: "Hyper League Scout", icon: "TFClassIconScoutStun" },
	{ id: "T_TFBot_Scout_Wrap_Assassin", label: "Wrap Assassin", icon: "TFClassIconScout" },
	{ id: "T_TFBot_Scout_Jumping_Sandman", label: "Scout", icon: "TFClassIconScoutJumping" },
	{ id: "T_TFBot_Scout_Scattergun_SlowFire", label: "Scout", icon: "TFClassIconScout" },
	{ id: "T_TFBot_Scout_FAN", label: "Force-A-Nature Scout", icon: "TFClassIconScoutFan" },
	{ id: "T_TFBot_Scout_Shortstop", label: "Shortstop Scout", icon: "TFClassIconScoutShortstop" },
	{ id: "T_TFBot_Spy", label: "Spy", icon: "TFClassIconSpy" },
	{ id: "T_TFBot_Medic", label: "Uber Medic", icon: "TFClassIconMedicUber" },
	{ id: "T_TFBot_Medic_QuickUber", label: "Uber Medic", icon: "TFClassIconMedicUber" },
	{ id: "T_TFBot_Medic_BigHeal", label: "Quick-Fix Medic", icon: "TFClassIconMedic" },
	{ id: "T_TFBot_Medic_QuickFix", label: "Quick-Fix Medic", icon: "TFClassIconMedic" },
	{ id: "T_TFBot_Medic_SlowRecharge", label: "Uber Medic", icon: "TFClassIconMedicUber" },
	{ id: "T_TFBot_Medic_Vaccinator_Bullet", label: "Medic", icon: "TFClassIconMedic" },
	{ id: "T_TFBot_Medic_Vaccinator_Blast", label: "Medic", icon: "TFClassIconMedic" },
	{ id: "T_TFBot_Medic_Vaccinator_Fire", label: "Medic", icon: "TFClassIconMedic" },
	{ id: "T_TFBot_Heavyweapons_Fist", label: "Steel Gauntlet", icon: "TFClassIconHeavySteelfist" },
	{ id: "T_TFBot_Heavyweapons_Heavyweight_Champ", label: "Heavyweight Champ", icon: "TFClassIconHeavyChamp" },
	{ id: "T_TFBot_Heavyweapons_Heavyweight_Champ_Fast", label: "Heavyweight Champ", icon: "TFClassIconHeavyGru" },
	{ id: "T_TFBot_Heavyweapons_Gnome", label: "Heavy Mittens", icon: "TFClassIconHeavyMittens" },
	{ id: "T_TFBot_Heavyweapons_Shotgun", label: "Heavy Shotgun", icon: "TFClassIconHeavyShotgun" },
	{ id: "T_TFBot_Heavy_IronFist_Airblast", label: "Steel Gauntlet Pusher", icon: "TFClassIconHeavySteelfist" },
	{ id: "T_TFBot_Demoman", label: "Demoman", icon: "TFClassIconDemoman" },
	{ id: "T_TFBot_Demoman_Knight", label: "Demoknight", icon: "TFClassIconDemoKnight" },
	{ id: "T_TFBot_Demoman_Samurai", label: "Samurai Demo", icon: "TFClassIconDemoknightSamurai" },
	{ id: "T_TFBot_Demo_Burst", label: "Burst Fire Demo", icon: "TFClassIconDemoBurst" },
	{ id: "T_TFBot_Soldier_Buff_Banner", label: "Buff Soldier", icon: "TFClassIconSoldierBuff" },
	{ id: "T_TFBot_Soldier_Extended_Buff_Banner", label: "Extended Buff Soldier", icon: "TFClassIconSoldierBuff" },
	{ id: "T_TFBot_Soldier_Extended_Concheror", label: "Extended Conch Soldier", icon: "TFClassIconSoldierConch" },
	{ id: "T_TFBot_Soldier_Extended_Battalion", label: "Extended Backup Soldier", icon: "TFClassIconSoldierBackup" },
	{ id: "T_TFBot_Soldier_RocketPush", label: "Blast Soldier", icon: "TFClassIconSoldierLiberty" },
	{ id: "T_TFBot_Soldier_RocketShotgun", label: "Black Box Soldier", icon: "TFClassIconSoldierBlackbox" },
	{ id: "T_TFBot_Pyro", label: "Pyro", icon: "TFClassIconPyro" },
	{ id: "T_TFBot_Pyro_Flaregun", label: "Flare Pyro", icon: "TFClassIconPyroFlare" },
	{ id: "T_TFBot_ScorchShot", label: "Pyro Pusher", icon: "TFClassIconPyroFlare" },
	{ id: "T_TFBot_ScorchShot_FastShot", label: "Fast Scorch Shot", icon: "TFClassIconPyroFlare" },
	{ id: "T_TFBot_Engineer_Sentry_Teleporter", label: "Engineer", icon: "TFClassIconEngineer" },
	{ id: "T_TFBot_Engineer_Sentry_Battle_TeleIn", label: "Engineer", icon: "TFClassIconEngineer" },
	{ id: "T_TFBot_Engineer_Sentry_Tele_Battle", label: "Engineer", icon: "TFClassIconEngineer" },
	{ id: "T_TFBot_Engineer_Sentry_Battle", label: "Engineer", icon: "TFClassIconEngineer" },
	{ id: "T_TFBot_Giant_Scout", label: "Giant Scout", icon: "TFClassIconScout TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier", label: "Giant Soldier", icon: "TFClassIconSoldier TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Pyro", label: "Giant Pyro", icon: "TFClassIconPyro TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Demoman", label: "Giant Rapid Fire Demoman", icon: "TFClassIconDemoman TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Demo_RapidFire", label: "Giant Rapid Fire Demoman", icon: "TFClassIconDemoman TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Heavyweapons", label: "Giant Heavy", icon: "TFClassIconHeavyWeapons TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Medic", label: "Giant Medic", icon: "TFClassIconMedic TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Heavyweapons_Deflector", label: "Giant Deflector Heavy", icon: "TFClassIconHeavyDeflector TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Heavyweapons_Shotgun", label: "Giant Shotgun Heavy", icon: "TFClassIconHeavyShotgun TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Heavyweapons_BrassBeast", label: "Giant Heavy", icon: "TFClassIconHeavyWeapons TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Heavyweapons_Natascha", label: "Giant Heavy", icon: "TFClassIconHeavyWeapons TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Heavyweapons_HealOnKill", label: "Giant Heavy", icon: "TFClassIconHeavyDeflectorHealOnKill TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Heavyweapons_HealOnKill", label: "Giant Heavy", icon: "TFClassIconHeavyDeflectorHealOnKill TFClassIconGiant" },
	{ id: "T_TFBot_Heavyweapons_Heater", label: "HeavyWeapons", icon: "TFClassIconHeavyHeater TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Scout_Fast", label: "Super Scout", icon: "TFClassIconScout TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Scout_FAN", label: "Force-a-Nature Super Scout", icon: "TFClassIconScoutFan TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Scout_Jumping_Sandman", label: "Giant Jumping Sandman", icon: "" },
	{ id: "T_TFBot_Giant_DemoMan_PrinceTavish", label: "Giant Demoknight", icon: "TFClassIconDemoKnight TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Scout_Baseball", label: "Major League Scout", icon: "TFClassIconScoutStun TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Scout_Baseball_Armored", label: "Armored Sandman Scout", icon: "TFClassIconScoutStun TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Scout_Bonk", label: "Scout", icon: "TFClassIconScoutBonk TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_Crit", label: "Giant Charged Soldier", icon: "TFClassIconSoldierCrit TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Pyro_Flare_Spammer", label: "Giant Flare Pyro", icon: "TFClassIconPyroFlare TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Pyro_Flare_Spammer_ScorchShot", label: "Giant Flare Pyro", icon: "TFClassIconPyroFlare TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Pyro_Pusher", label: "Giant Airblast Pyro", icon: "TFClassIconPyro TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Boxing_Heavy", label: "Super Heavyweight Champ", icon: "TFClassIconHeavyChamp TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Demo_Burst", label: "Giant Burst Fire Demo", icon: "TFClassIconDemoBurst TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Demo_Spammer_Reload_Chief", label: "Giant Rapid Fire Demo Chief", icon: "TFClassIconDemoman TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_Spammer", label: "Giant Rapid Fire Soldier", icon: "TFClassIconSoldierSpammer TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_Spammer_Reload", label: "Giant Burst Fire Soldier", icon: "TFClassIconSoldierBurstfire TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_Extended_Buff_Banner", label: "Giant Buff Banner Soldier", icon: "TFClassIconSoldierBuff TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_Extended_Concheror", label: "Giant Concheror Soldier", icon: "TFClassIconSoldierConch TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_Extended_Battalion", label: "Giant Battalion Soldier", icon: "TFClassIconSoldierBackup TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_RocketShotgun", label: "Giant Black Box Soldier", icon: "TFClassIconSoldierBlackbox TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Medic_Regen", label: "Giant Medic", icon: "TFClassIconMedic TFClassIconGiant" },
	{ id: "T_TFBot_SentryBuster", label: "Sentry Buster", icon: "TFClassIconSentryBuster TFClassIconGiant" },
	{ id: "T_TFBot_Soldier_BurstFire", label: "Giant Burst Fire Soldier", icon: "TFClassIconSoldierSpammer TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_SlowBarrage", label: "Colonel Barrage", icon: "TFClassIconSoldierBarrage TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Gauntlet", label: "Captain Punch", icon: "TFClassIconHeavyChief TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Heavyweapons_HealOnKill", label: "Giant Heavy", icon: "TFClassIconHeavyDeflectorHealOnKill TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Tavish", label: "Chief Tavish", icon: "TFClassIconDemoKnight TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Pyro", label: "Chief Pyro", icon: "TFClassIconPyro TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Soldier", label: "Sergeant Crits", icon: "TFClassIconSergeantCrits TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Soldier_SlowCrit", label: "Major Crits", icon: "TFClassIconSoldierMajorCrits TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Soldier_RocketPush", label: "Giant Blast Soldier", icon: "TFClassIconSoldierLiberty TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Soldier_RocketPush", label: "Chief Blast Soldier", icon: "TFClassIconSoldierLiberty TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Soldier_Atomic", label: "Major Crits", icon: "TFClassIconSergeantCrits TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Demo_Atomic", label: "Sir Nukesalot", icon: "TFClassIconDemoman TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Major_League", label: "Major League", icon: "TFClassIconScoutStun TFClassIconGiant" },
	{ id: "T_TFBot_Giant_Metalbeard", label: "Major Bomber", icon: "TFClassIconDemoBomber TFClassIconGiant" },
	{ id: "T_TFBot_Chief_Soldier_Extended_Concheror", label: "Chief Concheror Soldier", icon: "TFClassIconSoldierConch TFClassIconGiant" },
	{ id: "T_TFGateBot_Scout_Melee", label: "Scout", icon: "TFClassIconScout" },
	{ id: "T_TFGateBot_Scout_Normal", label: "Scout", icon: "TFClassIconScout" },
	{ id: "T_TFGateBot_Scout_Hard", label: "Scout", icon: "TFClassIconScout" },
	{ id: "T_TFGateBot_Scout_FAN", label: "Force-A-Nature Scout", icon: "TFClassIconScoutFan" },
	{ id: "T_TFGateBot_Scout_FAN_Crit", label: "Force-A-Nature Scout", icon: "TFClassIconScoutFan" },
	{ id: "T_TFGateBot_Sniper_Huntsman_Spammer_Crit", label: "Bowman Rapid Fire", icon: "TFClassIconSniperBow TFClassIconGiant" },
	{ id: "T_TFGateBot_Scout_Sandman_FastCharge", label: "Hyper League Scout", icon: "TFClassIconScoutStun" },
	{ id: "T_TFGateBot_Soldier_Easy", label: "Soldier", icon: "TFClassIconSoldier" },
	{ id: "T_TFGateBot_Soldier_Normal", label: "Soldier", icon: "TFClassIconSoldier" },
	{ id: "T_TFGateBot_Soldier_Normal_DirectHit_Crit", label: "Direct Hit Soldier", icon: "TFClassIconSoldier" },
	{ id: "T_TFGateBot_Soldier_Hard", label: "Soldier", icon: "TFClassIconSoldier" },
	{ id: "T_TFGateBot_Soldier_RocketPush", label: "Blast Soldier", icon: "TFClassIconSoldierLiberty" },
	{ id: "T_TFGateBot_Soldier_RocketShotgun_Expert", label: "Black Box Soldier", icon: "TFClassIconSoldierBlackbox" },
	{ id: "T_TFGateBot_Soldier_Extended_Battalion_Hard", label: "Extended Backup Soldier", icon: "TFClassIconSoldierBackup" },
	{ id: "T_TFGateBot_Soldier_Extended_Concheror_Normal", label: "Extended Conch Soldier", icon: "TFClassIconSoldierConch" },
	{ id: "T_TFGateBot_Soldier_Extended_Concheror_Normal_Crit", label: "Extended Conch Soldier", icon: "TFClassIconSoldierConch" },
	{ id: "T_TFGateBot_Pyro_Normal", label: "Pyro", icon: "TFClassIconPyro" },
	{ id: "T_TFGateBot_Pyro_Hard", label: "Pyro", icon: "TFClassIconPyro" },
	{ id: "T_TFGateBot_Pyro_Expert", label: "Pyro", icon: "TFClassIconPyro" },
	{ id: "T_TFGateBot_Pyro_AlwaysFireWeapon", label: "Pyro", icon: "TFClassIconPyro" },
	{ id: "T_TFGateBot_Pyro_Flaregun", label: "Flare Pyro", icon: "TFClassIconPyroFlare" },
	{ id: "T_TFGateBot_Demoman_Easy", label: "Demoman", icon: "TFClassIconDemoman" },
	{ id: "T_TFGateBot_Demoman_Normal", label: "Demoman", icon: "TFClassIconDemoman" },
	{ id: "T_TFGateBot_Demoman_Hard", label: "Demoman", icon: "TFClassIconDemoman" },
	{ id: "T_TFGateBot_Demo_Burst_Normal", label: "Burst Fire Demo", icon: "TFClassIconDemoBurst" },
	{ id: "T_TFGateBot_Demo_Burst_Normal_Crit", label: "Burst Fire Demo", icon: "TFClassIconDemoBurst" },
	{ id: "T_TFGateBot_Heavy_Easy", label: "HeavyWeapons", icon: "TFClassIconHeavyWeapons" },
	{ id: "T_TFGateBot_Heavy_Normal", label: "HeavyWeapons", icon: "TFClassIconHeavyWeapons" },
	{ id: "T_TFGateBot_Heavy_Hard", label: "HeavyWeapons", icon: "TFClassIconHeavyWeapons" },
	{ id: "T_TFGateBot_Heavy_Normal_Crit", label: "HeavyWeapons", icon: "TFClassIconHeavyWeapons" },
	{ id: "T_TFGateBot_Heavy_Expert_Crit", label: "HeavyWeapons", icon: "TFClassIconHeavyWeapons" },
	{ id: "T_TFGateBot_Heavyweapons_Shotgun", label: "Shotgun Heavy", icon: "TFClassIconHeavyShotgun" },
	{ id: "T_TFGateBot_Heavy_IronFist", label: "Steel Gauntlet", icon: "TFClassIconHeavySteelfist" },
	{ id: "T_TFGateBot_Heavy_IronFist_Airblast", label: "Steel Gauntlet Pusher", icon: "TFClassIconHeavySteelfist" },
	{ id: "T_TFGateBot_Heavy_IronFist_Crit", label: "Steel Gauntlet", icon: "TFClassIconHeavySteelfist" },
	{ id: "T_TFGateBot_Chief_Soldier_SlowCritBarrage", label: "Major Crits", icon: "TFClassIconSoldierBarrage TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_SlowCritBarrage", label: "Major Crits", icon: "TFClassIconSoldierBarrage TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_SlowBarrage", label: "Colonel Barrage", icon: "TFClassIconSoldierBarrage TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Heavyweapons_Deflector", label: "Giant Deflector Heavy", icon: "TFClassIconHeavyDeflector TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Heavyweapons_Heater", label: "HeavyWeapons", icon: "TFClassIconHeavyHeater TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Heavyweapons_Shotgun", label: "Giant Shotgun Heavy", icon: "TFClassIconHeavyShotgun TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Heavyweapons_Shotgun_Crit", label: "Giant Shotgun Heavy", icon: "TFClassIconHeavyShotgun TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Heavyweapons_HealOnKill", label: "Giant Heal-on-Kill Heavy", icon: "TFClassIconHeavyDeflectorHealOnKill TFClassIconGiant" },
	{ id: "T_TFGateBot_Chief_Heavyweapons_HealOnKill", label: "Giant Heal-On-Kill Heavy", icon: "TFClassIconHeavyDeflectorHealOnKill TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_Extended_Concheror", label: "Giant Concheror Soldier", icon: "TFClassIconSoldierConch TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_Extended_Concheror_Crit", label: "Giant Concheror Soldier", icon: "TFClassIconSoldierConch TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_RocketPush", label: "Giant Blast Soldier", icon: "TFClassIconSoldierLiberty TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_BurstFire", label: "Giant Burst Fire Soldier", icon: "TFClassIconSoldierBurstfire TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_BurstFire_Crit", label: "Giant Burst Fire Soldier", icon: "TFClassIconSoldierBurstfire TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_RocketShotgun", label: "Giant Black Box Soldier", icon: "TFClassIconSoldierBlackbox TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Demo_Burst", label: "Giant Burst Fire Demo", icon: "TFClassIconDemoBurst TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Demo_Burst_Crit", label: "Giant Burst Fire Demo", icon: "TFClassIconDemoBurst TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Scout_FAN", label: "Force-a-Nature Super Scout", icon: "TFClassIconScoutFan TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier", label: "Giant Soldier", icon: "TFClassIconSoldier TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_Spammer", label: "Giant Rapid Fire Soldier", icon: "TFClassIconSoldierSpammer TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_Spammer_Crit", label: "Giant Rapid Fire Soldier", icon: "TFClassIconSoldierSpammer TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Soldier_Spammer_Reload", label: "Giant Rapid Fire Soldier", icon: "TFClassIconSoldierBurstfire TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Pyro_AlwaysFire", label: "Giant Pyro", icon: "TFClassIconPyro TFClassIconGiant" },
	{ id: "T_TFGateBot_Giant_Pyro_AlwaysFire_Crit", label: "Giant Pyro", icon: "TFClassIconPyro TFClassIconGiant" },
	{ id: "MVM_TF_Santa_Heavy", label: "Santa Heavy", icon: "TFClassIconHeavyWeapons" },
	{ id: "MVM_TF_Moonraker", label: "Moonraker", icon: "TFClassIconPyro" },
	{ id: "MVM_TF_Moonman", label: "Moonman", icon: "TFClassIconPyro" },
	{ id: "MVM_TF_Pirate", label: "Pirate", icon: "TFClassIconDemoman" }
];

var BUILTIN_TEMPLATES = [
		{
			id: "T_TFBot_Giant_Scout",
			className: "Scout",
			name: "Giant Scout",
			classIcon: "scout_giant",
			skill: "Expert",
			health: 1600,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			characterAttributes: {
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5
			}
		},
		{
			id: "T_TFBot_Giant_Soldier",
			className: "Soldier",
			name: "Giant Soldier",
			classIcon: "soldier_giant",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["HoldFireUntilFullReload", "MiniBoss"],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3
			}
		},
		{
			id: "T_TFBot_Giant_Pyro",
			className: "Pyro",
			name: "Giant Pyro",
			classIcon: "pyro_giant",
			skill: "Expert",
			health: 3000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.6,
				"airblast vulnerability multiplier": 0.6,
				"override footstep sound set": 6
			}
		},
		{
			id: "T_TFBot_Giant_Demoman",
			className: "Demoman",
			name: "Giant Rapid Fire Demoman",
			classIcon: "demo_giant",
			skill: "Expert",
			health: 3300,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["HoldFireUntilFullReload", "MiniBoss"],
			itemAttributes: [{
				itemName: "TF_WEAPON_GRENADELAUNCHER",
				attributes: {
					"faster reload rate": -0.4,
					"fire rate bonus": 0.75
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.5,
				"airblast vulnerability multiplier": 0.5,
				"override footstep sound set": 4
			}
		},
		{
			id: "T_TFBot_Giant_Demo_RapidFire",
			className: "Demoman",
			name: "Giant Rapid Fire Demoman",
			classIcon: "demo_giant",
			skill: "Expert",
			health: 3000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["HoldFireUntilFullReload", "MiniBoss"],
			itemAttributes: [{
				itemName: "TF_WEAPON_GRENADELAUNCHER",
				attributes: {
					"fire rate bonus": 0.5,
					"damage force reduction": 0.5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"airblast vulnerability multiplier": 0.5,
				"override footstep sound set": 4
			}
		},
		{
			id: "T_TFBot_Giant_Heavyweapons",
			className: "Heavyweapons",
			name: "Giant Heavy",
			classIcon: "heavy_giant",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "PrimaryOnly",
			maxVisionRange: 1200,
			attributes: ["MiniBoss"],
			itemAttributes: [{
				itemName: "TF_WEAPON_MINIGUN",
				attributes: {
					"damage bonus": 1.5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Medic",
			className: "Medic",
			name: "Giant Medic",
			classIcon: "medic_giant",
			skill: "Expert",
			health: 4500,
			weaponRestrictions: "SecondaryOnly",
			attributes: ["SpawnWithFullCharge", "MiniBoss"],
			items: ["The Quick-Fix"],
			itemAttributes: [{
				itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
				attributes: {
					"damage penalty": 0.1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.6,
				"airblast vulnerability multiplier": 0.6,
				"heal rate bonus": 200
			}
		},
		{
			id: "T_TFBot_Giant_Heavyweapons_Deflector",
			className: "Heavyweapons",
			name: "Giant Deflector Heavy",
			classIcon: "heavy_deflector",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "PrimaryOnly",
			maxVisionRange: 1200,
			attributes: ["MiniBoss"],
			items: ["The U-clank-a", "Deflector"],
			itemAttributes: [{
				itemName: "Deflector",
				attributes: {
					"damage bonus": 1.5,
					"attack projectiles": 1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Heavyweapons_Shotgun",
			className: "Heavyweapons",
			name: "Giant Shotgun Heavy",
			classIcon: "heavy_shotgun",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "SecondaryOnly",
			maxVisionRange: 1200,
			attributes: ["MiniBoss"],
			itemAttributes: [{
				itemName: "TF_WEAPON_SHOTGUN_HWG",
				attributes: {
					"fire rate bonus": 2.5,
					"bullets per shot bonus": 10,
					"damage penalty": 0.5,
					"faster reload rate": 0.1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.7,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"attack projectiles": 1,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Heavyweapons_BrassBeast",
			className: "Heavyweapons",
			name: "Giant Heavy",
			classIcon: "heavy_giant",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			items: ["The Brass Beast"],
			itemAttributes: [{
				itemName: "The Brass Beast",
				attributes: {
					"damage bonus": 1.5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Heavyweapons_Natascha",
			className: "Heavyweapons",
			name: "Giant Heavy",
			classIcon: "heavy_giant",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			items: ["Natascha"],
			itemAttributes: [{
				itemName: "Natascha",
				attributes: {
					"damage bonus": 1.5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Heavyweapons_HealOnKill",
			className: "Heavyweapons",
			name: "Giant Heavy",
			classIcon: "heavy_deflector_healonkill",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "PrimaryOnly",
			maxVisionRange: 1200,
			attributes: ["MiniBoss"],
			itemAttributes: [{
				itemName: "Deflector",
				attributes: {
					"damage bonus": 1.2,
					"attack projectiles": 2,
					"heal on kill": 5000
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.35,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Chief_Heavyweapons_HealOnKill",
			className: "Heavyweapons",
			name: "Giant Heavy",
			classIcon: "heavy_deflector_healonkill",
			skill: "Expert",
			health: 70000,
			weaponRestrictions: "PrimaryOnly",
			maxVisionRange: 1600,
			scale: 1.8,
			attributes: ["UseBossHealthBar", "MiniBoss"],
			items: ["The Tungsten Toque", "Deflector"],
			itemAttributes: [{
				itemName: "Deflector",
				attributes: {
					"damage bonus": 1.2,
					"attack projectiles": 2,
					"heal on kill": 8000
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.4,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.4,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.9,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Heavyweapons_Heater",
			className: "Heavyweapons",
			classIcon: "heavy_heater_giant",
			skill: "Expert",
			health: 5000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			items: ["The Huo Long Heatmaker"],
			itemAttributes: [{
				itemName: "The Huo Long Heatmaker",
				attributes: {
					"damage bonus": 1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Scout_Fast",
			className: "Scout",
			name: "Super Scout",
			classIcon: "scout_giant_fast",
			skill: "Easy",
			health: 1200,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["Bonk Boy", "The Holy Mackerel"],
			characterAttributes: {
				"move speed bonus": 2,
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5
			}
		},
		{
			id: "T_TFBot_Giant_Scout_FAN",
			className: "Scout",
			name: "Force-a-Nature Super Scout",
			classIcon: "scout_fan_giant",
			skill: "Expert",
			health: 1200,
			maxVisionRange: 1200,
			attributes: ["MiniBoss", "HoldFireUntilFullReload"],
			items: ["The Fed-Fightin' Fedora", "The Bolt Boy", "The Force-a-Nature"],
			itemAttributes: [{
				itemName: "The Force-a-Nature",
				attributes: {
					"bullets per shot bonus": 2,
					"fire rate bonus": 0.5,
					"faster reload rate": 1.7,
					"scattergun knockback mult": 6,
					"damage penalty": 0.35,
					"weapon spread bonus": 0.4
				}
			}],
			characterAttributes: {
				"move speed bonus": 1.1,
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5
			}
		},
		{
			id: "T_TFBot_Giant_Scout_Jumping_Sandman",
			className: "scout",
			name: "Giant Jumping Sandman",
			classIcon: "scout_jumping_g",
			skill: "Expert",
			health: 1200,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss", "AutoJump"],
			items: ["The Sandman", "The Hanger-On Hood", "The Flight of the Monarch"],
			itemAttributes: [{
				itemName: "The Sandman",
				attributes: {
					"damage bonus": 2,
					"effect bar recharge rate increased": 0.1
				}
			}],
			characterAttributes: {
				"increased jump height": 2,
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5,
				"head scale": 1.5
			},
			properties: {
				AutoJumpMin: 5,
				AutoJumpMax: 5
			}
		},
		{
			id: "T_TFBot_Giant_DemoMan_PrinceTavish",
			className: "Demoman",
			name: "Giant Demoknight",
			classIcon: "demoknight_giant",
			skill: "Expert",
			health: 3300,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["Prince Tavish's Crown", "The Chargin' Targe", "The Eyelander", "Ali Baba's Wee Booties"],
			itemAttributes: [{
				itemName: "The Eyelander",
				attributes: {
					"critboost on kill": 3
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.5,
				"airblast vulnerability multiplier": 0.5,
				"override footstep sound set": 4
			}
		},
		{
			id: "T_TFBot_Giant_Scout_Baseball",
			className: "Scout",
			name: "Major League Scout",
			classIcon: "scout_stun_giant",
			skill: "Expert",
			health: 1600,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["Batter's Helmet", "MNC Mascot Outfit", "The Sandman"],
			itemAttributes: [{
				itemName: "The Sandman",
				attributes: {
					"effect bar recharge rate increased": 0.1
				}
			}],
			characterAttributes: {
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5
			}
		},
		{
			id: "T_TFBot_Giant_Scout_Baseball_Armored",
			className: "Scout",
			name: "Armored Sandman Scout",
			classIcon: "scout_stun_giant_armored",
			skill: "Expert",
			health: 3000,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["Batter's Helmet", "The Sandman"],
			itemAttributes: [{
				itemName: "The Sandman",
				attributes: {
					"effect bar recharge rate increased": 0.05
				}
			}],
			characterAttributes: {
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5,
				"move speed penalty": 0.75
			}
		},
		{
			id: "T_TFBot_Giant_Scout_Bonk",
			className: "Scout",
			classIcon: "scout_bonk_giant",
			skill: "Easy",
			health: 1600,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["Bonk! Atomic Punch", "Bonk Helm"],
			characterAttributes: {
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.7,
				"override footstep sound set": 5,
				"effect bar recharge rate increased": 0.55
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_Crit",
			className: "Soldier",
			name: "Giant Charged Soldier",
			classIcon: "soldier_crit",
			skill: "Normal",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["AlwaysCrit", "MiniBoss"],
			items: ["The Original"],
			itemAttributes: [{
				itemName: "The Original",
				attributes: {
					"faster reload rate": 0.2,
					"fire rate bonus": 2,
					"Projectile speed increased": 0.5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3
			}
		},
		{
			id: "T_TFBot_Giant_Pyro_Flare_Spammer",
			className: "Pyro",
			name: "Giant Flare Pyro",
			classIcon: "pyro_flare_giant",
			skill: "Expert",
			health: 3000,
			weaponRestrictions: "SecondaryOnly",
			attributes: ["MiniBoss"],
			items: ["The detonator", "Old Guadalajara"],
			itemAttributes: [{
				itemName: "The detonator",
				attributes: {
					"fire rate bonus": 0.3
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.6,
				"airblast vulnerability multiplier": 0.6,
				"override footstep sound set": 6
			}
		},
		{
			id: "T_TFBot_Giant_Pyro_Flare_Spammer_ScorchShot",
			className: "Pyro",
			name: "Giant Flare Pyro",
			classIcon: "pyro_flare_giant",
			skill: "Expert",
			health: 3000,
			weaponRestrictions: "SecondaryOnly",
			attributes: ["MiniBoss"],
			items: ["The Scorch Shot"],
			itemAttributes: [{
				itemName: "The Scorch Shot",
				attributes: {
					"fire rate bonus": 0.2,
					"damage causes airblast": 1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.35,
				"damage force reduction": 0.6,
				"airblast vulnerability multiplier": 0.6,
				"override footstep sound set": 6
			}
		},
		{
			id: "T_TFBot_Giant_Pyro_Pusher",
			className: "Pyro",
			name: "Giant Airblast Pyro",
			skill: "Expert",
			health: 3000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			items: ["The Degreaser", "Traffic Cone"],
			itemAttributes: [{
				itemName: "The Degreaser",
				attributes: {
					"damage bonus": 0.05,
					"fire rate bonus": 1,
					"airblast pushback scale": 5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.6,
				"airblast vulnerability multiplier": 0.6,
				"override footstep sound set": 6
			}
		},
		{
			id: "T_TFBot_Giant_Boxing_Heavy",
			className: "heavyweapons",
			name: "Super Heavyweight Champ",
			classIcon: "heavy_champ_giant",
			skill: "expert",
			health: 5000,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["the killing gloves of boxing", "Pugilist's Protector"],
			itemAttributes: [{
				itemName: "the killing gloves of boxing",
				attributes: {
					"fire rate bonus": 0.6,
					"damage bonus": 1.2
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2
			}
		},
		{
			id: "T_TFBot_Giant_Demo_Burst",
			className: "Demoman",
			name: "Giant Burst Fire Demo",
			classIcon: "demo_burst_giant",
			skill: "Expert",
			health: 3300,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss", "HoldFireUntilFullReload"],
			itemAttributes: [{
				itemName: "TF_WEAPON_GRENADELAUNCHER",
				attributes: {
					"faster reload rate": 0.65,
					"fire rate bonus": 0.1,
					"clip size upgrade atomic": 7.0,
					"projectile spread angle penalty": 5,
					"Projectile speed increased": 1.1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 4
			}
		},
		{
			id: "T_TFBot_Giant_Demo_Spammer_Reload_Chief",
			className: "Demoman",
			name: "Giant Rapid Fire Demo Chief",
			classIcon: "demo_giant",
			skill: "Expert",
			health: 60000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit", "MiniBoss", "HoldFireUntilFullReload"],
			itemAttributes: [{
				itemName: "TF_WEAPON_GRENADELAUNCHER",
				attributes: {
					"faster reload rate": 0.65,
					"fire rate bonus": 0.1,
					"clip size upgrade atomic": 7.0,
					"projectile spread angle penalty": 2,
					"Projectile speed increased": 1.1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 4
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_Spammer",
			className: "Soldier",
			name: "Giant Rapid Fire Soldier",
			classIcon: "soldier_spammer",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss"],
			itemAttributes: [{
				itemName: "TF_WEAPON_ROCKETLAUNCHER",
				attributes: {
					"faster reload rate": -0.8,
					"fire rate bonus": 0.5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"Projectile speed increased": 0.65
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_Spammer_Reload",
			className: "Soldier",
			name: "Giant Burst Fire Soldier",
			classIcon: "soldier_burstfire",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss", "HoldFireUntilFullReload"],
			itemAttributes: [{
				itemName: "TF_WEAPON_ROCKETLAUNCHER",
				attributes: {
					"move speed bonus": 0.5,
					"faster reload rate": 0.6,
					"fire rate bonus": 0.1,
					"clip size upgrade atomic": 5.0,
					"Projectile speed increased": 0.65
				}
			}],
			characterAttributes: {
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_Extended_Buff_Banner",
			className: "Soldier",
			name: "Giant Buff Banner Soldier",
			classIcon: "soldier_buff_giant",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
			items: ["The Buff Banner"],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"increase buff duration": 9.0
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_Extended_Concheror",
			className: "Soldier",
			name: "Giant Concheror Soldier",
			classIcon: "soldier_conch_giant",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
			items: ["The Concheror"],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"increase buff duration": 9.0
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_Extended_Battalion",
			className: "Soldier",
			name: "Giant Battalion Soldier ",
			classIcon: "soldier_backup_giant",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
			items: ["The Battalion's Backup"],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"increase buff duration": 9.0
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_RocketShotgun",
			className: "Soldier",
			name: "Giant Black Box Soldier",
			classIcon: "soldier_blackbox_giant",
			skill: "Expert",
			health: 4200,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss", "HoldFireUntilFullReload"],
			items: ["The Black Box"],
			itemAttributes: [{
				itemName: "The Black Box",
				attributes: {
					"damage bonus": 0.45,
					"fire rate bonus": 0.001,
					"clip size upgrade atomic": 0,
					"faster reload rate": 1.6,
					"blast radius increased": 1.25,
					"projectile spread angle penalty": 4,
					"heal on hit for rapidfire": 1000
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"Projectile speed increased": 0.9
			}
		},
		{
			id: "T_TFBot_Giant_Medic_Regen",
			className: "Medic",
			name: "Giant Medic",
			classIcon: "medic_giant",
			skill: "Expert",
			health: 4500,
			attributes: ["MiniBoss"],
			items: ["The Quick-Fix", "The Surgeon's Stahlhelm"],
			itemAttributes: [{
				itemName: "The Quick-Fix",
				attributes: {
					"ubercharge rate bonus": 0.01
				}
			}, {
				itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
				attributes: {
					"damage penalty": 0.1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.6,
				"airblast vulnerability multiplier": 0.6,
				"heal rate bonus": 200,
				"health regen": 40
			}
		},
		{
			id: "T_TFBot_SentryBuster",
			className: "Demoman",
			name: "Sentry Buster",
			classIcon: "sentry_buster",
			skill: "Expert",
			health: 2500,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss"],
			items: ["The Ullapool Caber"],
			characterAttributes: {
				"move speed bonus": 2,
				"damage force reduction": 0.5,
				"airblast vulnerability multiplier": 0.5,
				"override footstep sound set": 7,
				"cannot be backstabbed": 1
			}
		},
		{
			id: "T_TFBot_Soldier_BurstFire",
			className: "Soldier",
			name: "Giant Burst Fire Soldier",
			classIcon: "soldier_burstfire",
			skill: "Expert",
			health: 4200,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
			itemAttributes: [{
				itemName: "TF_WEAPON_ROCKETLAUNCHER",
				attributes: {
					"damage bonus": 2.0,
					"faster reload rate": 0.4,
					"fire rate bonus": 0.2,
					"clip size upgrade atomic": 5.0
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"Projectile speed increased": 0.9
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_SlowBarrage",
			className: "Soldier",
			name: "Colonel Barrage",
			classIcon: "soldier_barrage",
			skill: "Expert",
			health: 4000,
			weaponRestrictions: "PrimaryOnly",
			tags: ["bot_giant"],
			attributes: ["MiniBoss", "HoldFireUntilFullReload"],
			itemAttributes: [{
				itemName: "TF_WEAPON_ROCKETLAUNCHER",
				attributes: {
					"clip size upgrade atomic": 26.0,
					"faster reload rate": 0.22,
					"fire rate bonus": 0.2,
					"projectile spread angle penalty": 5
				}
			}],
			characterAttributes: {
				"health regen": 40,
				"move speed bonus": 0.5,
				"damage bonus": 1.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"airblast vertical vulnerability multiplier": 0.1,
				"Projectile speed increased": 0.4
			}
		},
		{
			id: "T_TFBot_Chief_Gauntlet",
			className: "Heavyweapons",
			name: "Captain Punch",
			classIcon: "heavy_chief",
			skill: "Expert",
			health: 60000,
			weaponRestrictions: "MeleeOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar"],
			items: ["War Head", "Fists of Steel"],
			itemAttributes: [{
				itemName: "Fists of Steel",
				attributes: {
					"fire rate bonus": 0.6,
					"damage bonus": 5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.4,
				"health regen": 250,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Tavish",
			className: "Demoman",
			name: "Chief Tavish",
			classIcon: "demoknight_giant",
			skill: "Expert",
			health: 55000,
			weaponRestrictions: "MeleeOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar"],
			items: ["Prince Tavish's Crown", "The Chargin' Targe", "The Eyelander", "Ali Baba's Wee Booties"],
			itemAttributes: [{
				itemName: "The Eyelander",
				attributes: {
					"damage bonus": 5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.4,
				"health regen": 500,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Pyro",
			className: "Pyro",
			name: "Chief Pyro",
			classIcon: "pyro_giant",
			skill: "Expert",
			health: 55000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar"],
			itemAttributes: [{
				itemName: "TF_WEAPON_FLAMETHROWER",
				attributes: {
					"airblast pushback scale": 2.0,
					"damage bonus": 5
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.4,
				"health regen": 500,
				"damage force reduction": 0.3,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 2,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Soldier",
			className: "Soldier",
			name: "Sergeant Crits",
			classIcon: "soldier_sergeant_crits",
			skill: "Expert",
			health: 60000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
			items: ["Tyrant's Helm"],
			itemAttributes: [{
				itemName: "TF_WEAPON_ROCKETLAUNCHER",
				attributes: {
					"damage bonus": 1.5,
					"faster reload rate": 0.6,
					"fire rate bonus": 0.2,
					"clip size upgrade atomic": 7.0,
					"Projectile speed increased": 1.3
				}
			}],
			characterAttributes: {
				"health regen": 250,
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Soldier_SlowCrit",
			className: "Soldier",
			name: "Major Crits",
			classIcon: "soldier_major_crits",
			skill: "Expert",
			health: 60000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
			items: ["Full Metal Drill Hat"],
			itemAttributes: [{
				itemName: "TF_WEAPON_ROCKETLAUNCHER",
				attributes: {
					"clip size upgrade atomic": 26.0,
					"faster reload rate": 0.4,
					"fire rate bonus": 0.2,
					"projectile spread angle penalty": 5,
					"Projectile speed increased": 0.4
				}
			}],
			characterAttributes: {
				"health regen": 250,
				"move speed bonus": 0.5,
				"damage bonus": 1.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Giant_Soldier_RocketPush",
			className: "Soldier",
			name: "Giant Blast Soldier",
			classIcon: "soldier_libertylauncher_giant",
			skill: "Expert",
			health: 3800,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["MiniBoss", "HoldFireUntilFullReload"],
			items: ["The Liberty Launcher"],
			itemAttributes: [{
				itemName: "The Liberty Launcher",
				attributes: {
					"damage causes airblast": 1,
					"damage bonus": 0.75,
					"fire rate bonus": 0.25,
					"clip size upgrade atomic": 5,
					"faster reload rate": 0.2,
					"Blast radius decreased": 1.2,
					"projectile spread angle penalty": 4
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"override footstep sound set": 3,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"airblast vertical vulnerability multiplier": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Soldier_RocketPush",
			className: "Soldier",
			name: "Chief Blast Soldier",
			classIcon: "soldier_libertylauncher",
			skill: "Expert",
			health: 60000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.8,
			attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload"],
			items: ["The Liberty Launcher"],
			itemAttributes: [{
				itemName: "The Liberty Launcher",
				attributes: {
					"damage causes airblast": 1,
					"damage bonus": 1,
					"fire rate bonus": 0.25,
					"clip size upgrade atomic": 5,
					"faster reload rate": 0.4,
					"Blast radius decreased": 1.2,
					"projectile spread angle penalty": 4
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.5,
				"override footstep sound set": 3,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.15
			}
		},
		{
			id: "T_TFBot_Chief_Soldier_Atomic",
			className: "Soldier",
			name: "Major Crits",
			classIcon: "soldier_sergeant_crits",
			skill: "Expert",
			health: 40000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
			items: ["The Team Captain", "The Black Box", "Fancy Dress Uniform", "The Gunboats"],
			itemAttributes: [{
				itemName: "The Black Box",
				attributes: {
					"damage bonus": 5,
					"damage causes airblast": 1,
					"faster reload rate": 3,
					"fire rate bonus": 2,
					"projectile spread angle penalty": 1,
					"use large smoke explosion": 1,
					"blast radius increased": 2,
					"Projectile speed increased": 1
				}
			}],
			characterAttributes: {
				"health regen": 1,
				"move speed bonus": 0.4,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"airblast vertical vulnerability multiplier": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Demo_Atomic",
			className: "Demoman",
			name: "Sir Nukesalot",
			classIcon: "demo_giant",
			skill: "Expert",
			health: 50000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.9,
			attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysFireWeapon", "AlwaysCrit"],
			items: ["The Loose Cannon"],
			itemAttributes: [{
				itemName: "The Loose Cannon",
				attributes: {
					"grenade launcher mortar mode": 0,
					"faster reload rate": 1.8,
					"fire rate bonus": 2,
					"clip size penalty": 0.5,
					"Projectile speed increased": 0.8,
					"projectile spread angle penalty": 5,
					"damage bonus": 7,
					"damage causes airblast": 1,
					"blast radius increased": 1.2,
					"use large smoke explosion": 1
				}
			}],
			characterAttributes: {
				"move speed bonus": 0.35,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 4
			}
		},
		{
			id: "T_TFBot_Giant_Major_League",
			className: "Scout",
			name: "Major League",
			classIcon: "scout_stun_giant",
			skill: "Expert",
			health: 10000,
			weaponRestrictions: "MeleeOnly",
			attributes: ["MiniBoss", "UseBossHealthBar"],
			items: ["Genuine Cockfighter", "The Boston Boom-Bringer", "Summer Shades", "The Sandman"],
			itemAttributes: [{
				itemName: "The Sandman",
				attributes: {
					"effect bar recharge rate increased": 0.001
				}
			}],
			characterAttributes: {
				"move speed bonus": 8,
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 3.0,
				"override footstep sound set": 5,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Giant_Metalbeard",
			className: "Demoman",
			name: "Major Bomber",
			classIcon: "demo_bomber",
			skill: "Normal",
			health: 40000,
			weaponRestrictions: "PrimaryOnly",
			attributes: ["AlwaysCrit", "MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload"],
			items: ["Prince Tavish's Crown"],
			itemAttributes: [{
				itemName: "TF_WEAPON_GRENADELAUNCHER",
				attributes: {
					"fire rate bonus": 0.2,
					"faster reload rate": 0.3,
					"clip size penalty": 3.0,
					"Projectile speed increased": 1.5
				}
			}],
			characterAttributes: {
				"health regen": 200,
				"move speed bonus": 0.32,
				"damage force reduction": 0.7,
				"airblast vulnerability multiplier": 0.3,
				"override footstep sound set": 4,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
		{
			id: "T_TFBot_Chief_Soldier_Extended_Concheror",
			className: "Soldier",
			name: "Chief Concheror Soldier",
			classIcon: "soldier_conch_giant",
			skill: "Expert",
			health: 50000,
			weaponRestrictions: "PrimaryOnly",
			scale: 1.8,
			attributes: ["UseBossHealthBar", "HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
			items: ["The Concheror"],
			characterAttributes: {
				"move speed bonus": 0.5,
				"damage force reduction": 0.4,
				"airblast vulnerability multiplier": 0.4,
				"override footstep sound set": 3,
				"increase buff duration": 9.0,
				"airblast vertical vulnerability multiplier": 0.1,
				"rage giving scale": 0.1
			}
		},
	{
		id: "T_TFBot_Sniper",
		className: "Sniper",
		skill: "Hard",
		maxVisionRange: 2500
	},
	{
		id: "T_TFBot_Sniper_Razorback",
		className: "Sniper",
		name: "Razorback Sniper",
		skill: "Hard",
		maxVisionRange: 2500,
		items: ["The Razorback"]
	},
	{
		id: "T_TFBot_Sniper_Sydney_Sleeper",
		className: "Sniper",
		name: "Sydney Sniper",
		classIcon: "sniper_sydneysleeper",
		skill: "Hard",
		maxVisionRange: 3000,
		items: ["The Sydney Sleeper"]
	},
	{
		id: "T_TFBot_Sniper_Huntsman",
		className: "Sniper",
		name: "Bowman",
		classIcon: "sniper_bow",
		skill: "Hard",
		weaponRestrictions: "PrimaryOnly",
		items: ["The Huntsman"],
		itemAttributes: [{
			itemName: "The Huntsman",
			attributes: {
				"damage bonus": 0.5
			}
		}]
	},
	{
		id: "T_TFBot_Sniper_Huntsman_Spammer",
		className: "Sniper",
		name: "Bowman Rapid Fire",
		classIcon: "sniper_bow",
		skill: "Hard",
		health: 1200,
		items: ["The Huntsman"],
		itemAttributes: [{
			itemName: "The Huntsman",
			attributes: {
				"fire rate bonus": 0.6
			}
		}],
		characterAttributes: {
			"head scale": 0.7,
			"move speed bonus": 0.85
		},
		properties: {
			scale: 1.5
		}
	},
	{
		id: "T_TFBot_Scout_Melee",
		className: "Scout",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly"
	},
	{
		id: "T_TFBot_Scout_Fish",
		className: "Scout",
		skill: "Easy",
		weaponRestrictions: "MeleeOnly",
		items: ["The Holy Mackerel"]
	},
	{
		id: "T_TFBot_Scout_SunStick",
		className: "Scout",
		classIcon: "scout_sunstick",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly",
		items: ["Sun-on-a-Stick", "The Bolt Boy"]
	},
	{
		id: "T_TFBot_Scout_Bonk",
		className: "Scout",
		classIcon: "scout_bonk",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly",
		items: ["Bonk! Atomic Punch", "Bonk Helm"]
	},
	{
		id: "T_TFBot_Scout_Sandman",
		className: "Scout",
		name: "Minor League Scout",
		classIcon: "scout_stun",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly",
		items: ["The Sandman", "Batter's Helmet"]
	},
	{
		id: "T_TFBot_Scout_Sandman_FastCharge",
		className: "Scout",
		name: "Hyper League Scout",
		classIcon: "scout_stun",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly",
		items: ["The Sandman", "Batter's Helmet"],
		itemAttributes: [{
			itemName: "The Sandman",
			attributes: {
				"effect bar recharge rate increased": 0.25
			}
		}]
	},
	{
		id: "T_TFBot_Scout_Wrap_Assassin",
		className: "Scout",
		name: "Wrap Assassin",
		skill: "Easy",
		weaponRestrictions: "MeleeOnly",
		items: ["The Wrap Assassin"]
	},
	{
		id: "T_TFBot_Scout_Jumping_Sandman",
		className: "scout",
		classIcon: "scout_jumping",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly",
		attributes: ["AutoJump"],
		items: ["The Sandman", "The Hanger-On Hood", "The Flight of the Monarch"],
		itemAttributes: [{
			itemName: "The Sandman",
			attributes: {
				"effect bar recharge rate increased": 0.5
			}
		}],
		characterAttributes: {
			"increased jump height": 2
		},
		properties: {
			AutoJumpMin: 5,
			AutoJumpMax: 5
		}
	},
	{
		id: "T_TFBot_Scout_Scattergun_SlowFire",
		className: "scout",
		skill: "Easy",
		itemAttributes: [{
			itemName: "TF_WEAPON_SCATTERGUN",
			attributes: {
				"fire rate bonus": 1.15
			}
		}]
	},
	{
		id: "T_TFBot_Scout_FAN",
		className: "Scout",
		name: "Force-A-Nature Scout",
		classIcon: "scout_fan",
		skill: "Expert",
		maxVisionRange: 500,
		items: ["The Fed-Fightin' Fedora", "The Bolt Boy", "The Force-a-Nature"],
		itemAttributes: [{
			itemName: "The Force-a-Nature",
			attributes: {
				"faster reload rate": 1.6,
				"scattergun knockback mult": 1.5,
				"damage bonus": 0.65
			}
		}]
	},
	{
		id: "T_TFBot_Scout_Shortstop",
		className: "Scout",
		name: "Shortstop Scout",
		classIcon: "scout_shortstop",
		skill: "Easy",
		health: 650,
		scale: 1.4,
		items: ["The Shortstop"],
		characterAttributes: {
			"head scale": 0.7,
			"move speed bonus": 1.25
		}
	},
	{
		id: "T_TFBot_Spy",
		className: "Spy",
		skill: "Expert"
	},
	{
		id: "T_TFBot_Medic",
		className: "Medic",
		name: "Uber Medic",
		classIcon: "medic_uber",
		skill: "Normal",
		attributes: ["SpawnWithFullCharge"],
		itemAttributes: [{
			itemName: "TF_WEAPON_MEDIGUN",
			attributes: {
				"ubercharge rate bonus": 2
			}
		}, {
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"heal rate bonus": 5
		}
	},
	{
		id: "T_TFBot_Medic_QuickUber",
		className: "Medic",
		name: "Uber Medic",
		classIcon: "medic_uber",
		skill: "Normal",
		attributes: ["SpawnWithFullCharge"],
		itemAttributes: [{
			itemName: "TF_WEAPON_MEDIGUN",
			attributes: {
				"ubercharge rate bonus": 5,
				"uber duration bonus": -3
			}
		}, {
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"heal rate bonus": 0.1
		}
	},
	{
		id: "T_TFBot_Medic_BigHeal",
		className: "Medic",
		name: "Quick-Fix Medic",
		skill: "Normal",
		items: ["The Quick-Fix"],
		itemAttributes: [{
			itemName: "The Quick-Fix",
			attributes: {
				"ubercharge rate bonus": 0.1
			}
		}, {
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"heal rate bonus": 10
		}
	},
	{
		id: "T_TFBot_Medic_QuickFix",
		className: "Medic",
		name: "Quick-Fix Medic",
		skill: "Easy",
		items: ["The Quick-Fix"],
		itemAttributes: [{
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}]
	},
	{
		id: "T_TFBot_Medic_SlowRecharge",
		className: "Medic",
		name: "Uber Medic",
		classIcon: "medic_uber",
		skill: "Normal",
		attributes: ["SpawnWithFullCharge"],
		itemAttributes: [{
			itemName: "TF_WEAPON_MEDIGUN",
			attributes: {
				"ubercharge rate bonus": 0.25
			}
		}, {
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"heal rate bonus": 5
		}
	},
	{
		id: "T_TFBot_Medic_Vaccinator_Bullet",
		className: "Medic",
		skill: "Expert",
		attributes: ["SpawnWithFullCharge", "VaccinatorBullets"],
		items: ["The Vaccinator MVM"],
		itemAttributes: [{
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"ubercharge rate bonus": 25,
			"heal rate bonus": 1,
			"uber duration bonus": 100,
			"medigun bullet resist passive": 1,
			"medigun bullet resist deployed": 1
		}
	},
	{
		id: "T_TFBot_Medic_Vaccinator_Blast",
		className: "Medic",
		skill: "Expert",
		attributes: ["SpawnWithFullCharge", "VaccinatorBlast"],
		items: ["The Vaccinator MVM"],
		itemAttributes: [{
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"ubercharge rate bonus": 25,
			"heal rate bonus": 1,
			"uber duration bonus": 100,
			"medigun blast resist passive": 1,
			"medigun blast resist deployed": 1
		}
	},
	{
		id: "T_TFBot_Medic_Vaccinator_Fire",
		className: "Medic",
		skill: "Expert",
		attributes: ["SpawnWithFullCharge", "VaccinatorFire"],
		items: ["The Vaccinator MVM"],
		itemAttributes: [{
			itemName: "TF_WEAPON_SYRINGEGUN_MEDIC",
			attributes: {
				"damage penalty": 0.1
			}
		}],
		characterAttributes: {
			"ubercharge rate bonus": 25,
			"heal rate bonus": 1,
			"uber duration bonus": 100,
			"medigun fire resist passive": 1,
			"medigun fire resist deployed": 1
		}
	},
	{
		id: "T_TFBot_Heavyweapons_Fist",
		className: "Heavyweapons",
		name: "Steel Gauntlet",
		classIcon: "heavy_steelfist",
		skill: "Hard",
		health: 900,
		weaponRestrictions: "MeleeOnly",
		scale: 1.5,
		items: ["Fists of Steel"]
	},
	{
		id: "T_TFBot_Heavyweapons_Heavyweight_Champ",
		className: "Heavyweapons",
		name: "Heavyweight Champ",
		classIcon: "heavy_champ",
		skill: "Easy",
		weaponRestrictions: "MeleeOnly",
		items: ["the killing gloves of boxing", "Pugilist's Protector"]
	},
	{
		id: "T_TFBot_Heavyweapons_Heavyweight_Champ_Fast",
		className: "Heavyweapons",
		name: "Heavyweight Champ",
		classIcon: "heavy_gru",
		skill: "Easy",
		weaponRestrictions: "MeleeOnly",
		items: ["Gloves of Running Urgently"]
	},
	{
		id: "T_TFBot_Heavyweapons_Gnome",
		className: "Heavyweapons",
		name: "Heavy Mittens",
		classIcon: "heavy_mittens",
		skill: "Easy",
		health: 60,
		weaponRestrictions: "MeleeOnly",
		attributes: ["AlwaysCrit"],
		items: ["The Holiday Punch"],
		itemAttributes: [{
			itemName: "The Holiday Punch",
			attributes: {
				"damage bonus": 0.2
			}
		}],
		characterAttributes: {
			"move speed bonus": 1.3
		}
	},
	{
		id: "T_TFBot_Heavyweapons_Shotgun",
		className: "Heavyweapons",
		name: "Heavy Shotgun",
		classIcon: "heavy_shotgun",
		skill: "Hard",
		weaponRestrictions: "SecondaryOnly",
		itemAttributes: [{
			itemName: "TF_WEAPON_SHOTGUN_HWG",
			attributes: {
				"faster reload rate": 0.1,
				"fire rate bonus": 2.5,
				"bullets per shot bonus": 3,
				"damage bonus": 0.33
			}
		}]
	},
	{
		id: "T_TFBot_Heavy_IronFist_Airblast",
		className: "Heavyweapons",
		name: "Steel Gauntlet Pusher",
		classIcon: "heavy_steelfist",
		skill: "Expert",
		health: 900,
		weaponRestrictions: "MeleeOnly",
		scale: 1.5,
		items: ["The carl", "Fists of Steel"],
		itemAttributes: [{
			itemName: "Fists of Steel",
			attributes: {
				"damage causes airblast": 1,
				"damage bonus": 1.5
			}
		}]
	},
	{
		id: "T_TFBot_Demoman",
		className: "Demoman",
		skill: "Easy"
	},
	{
		id: "T_TFBot_Demoman_Knight",
		className: "Demoman",
		name: "Demoknight",
		classIcon: "demoknight",
		skill: "Hard",
		weaponRestrictions: "MeleeOnly",
		items: ["The Chargin' Targe", "The Eyelander"],
		itemAttributes: [{
			itemName: "The Eyelander",
			attributes: {
				"critboost on kill": 3
			}
		}]
	},
	{
		id: "T_TFBot_Demoman_Samurai",
		className: "Demoman",
		name: "Samurai Demo",
		classIcon: "demoknight_samurai",
		skill: "Expert",
		health: 650,
		weaponRestrictions: "MeleeOnly",
		scale: "1.3",
		attributes: ["AirChargeOnly", "AutoJump"],
		items: ["The Half-Zatoichi", "The Splendid Screen", "Demo Kabuto"],
		itemAttributes: [{
			itemName: "The Splendid Screen",
			attributes: {
				"Attack not cancel charge": 1
			}
		}],
		characterAttributes: {
			"charge time increased": 2,
			"charge recharge rate increased": 7,
			"increased jump height": 2.3,
			"bot custom jump particle": 1,
			"damage bonus": 1.5
		},
		properties: {
			AutoJumpMin: 10,
			AutoJumpMax: 10
		}
	},
	{
		id: "T_TFBot_Demo_Burst",
		className: "Demoman",
		name: "Burst Fire Demo",
		classIcon: "demo_burst",
		skill: "Expert",
		weaponRestrictions: "PrimaryOnly",
		attributes: ["HoldFireUntilFullReload"],
		itemAttributes: [{
			itemName: "TF_WEAPON_GRENADELAUNCHER",
			attributes: {
				"faster reload rate": 1.75,
				"fire rate bonus": 0.05,
				"clip size penalty": 0.5,
				"projectile spread angle penalty": 3
			}
		}]
	},
	{
		id: "T_TFBot_Soldier_Buff_Banner",
		className: "Soldier",
		name: "Buff Soldier",
		classIcon: "soldier_buff",
		skill: "Hard",
		attributes: ["SpawnWithFullCharge"],
		items: ["The Buff Banner"]
	},
	{
		id: "T_TFBot_Soldier_Extended_Buff_Banner",
		className: "Soldier",
		name: "Extended Buff Soldier",
		classIcon: "soldier_buff",
		skill: "Normal",
		attributes: ["SpawnWithFullCharge"],
		items: ["The Buff Banner"],
		characterAttributes: {
			"increase buff duration": 9.0
		}
	},
	{
		id: "T_TFBot_Soldier_Extended_Concheror",
		className: "Soldier",
		name: "Extended Conch Soldier",
		classIcon: "soldier_conch",
		skill: "Normal",
		attributes: ["SpawnWithFullCharge"],
		items: ["The Concheror"],
		characterAttributes: {
			"increase buff duration": 9.0
		}
	},
	{
		id: "T_TFBot_Soldier_Extended_Battalion",
		className: "Soldier",
		name: "Extended Backup Soldier",
		classIcon: "soldier_backup",
		skill: "Normal",
		attributes: ["SpawnWithFullCharge"],
		items: ["The Battalion's Backup"],
		characterAttributes: {
			"increase buff duration": 9.0
		}
	},
	{
		id: "T_TFBot_Soldier_RocketPush",
		className: "Soldier",
		name: "Blast Soldier",
		classIcon: "soldier_libertylauncher",
		skill: "Expert",
		weaponRestrictions: "PrimaryOnly",
		attributes: ["HoldFireUntilFullReload"],
		items: ["The Liberty Launcher"],
		itemAttributes: [{
			itemName: "The Liberty Launcher",
			attributes: {
				"damage causes airblast": 1,
				"damage bonus": ".45",
				"fire rate bonus": 0.001,
				"clip size upgrade atomic": -2,
				"faster reload rate": 1.5,
				"Blast radius decreased": 1.2,
				"projectile spread angle penalty": 2
			}
		}]
	},
	{
		id: "T_TFBot_Soldier_RocketShotgun",
		className: "Soldier",
		name: "Black Box Soldier",
		classIcon: "soldier_blackbox",
		skill: "Normal",
		weaponRestrictions: "PrimaryOnly",
		attributes: ["HoldFireUntilFullReload"],
		items: ["The Black Box"],
		itemAttributes: [{
			itemName: "The Black Box",
			attributes: {
				"damage bonus": 0.33,
				"fire rate bonus": 0.001,
				"clip size upgrade atomic": 0,
				"faster reload rate": 0.9,
				"blast radius increased": 1.25,
				"projectile spread angle penalty": 2,
				"heal on hit for rapidfire": 60
			}
		}]
	},
	{
		id: "T_TFBot_Pyro",
		className: "Pyro",
		skill: "Normal",
		weaponRestrictions: "PrimaryOnly"
	},
	{
		id: "T_TFBot_Pyro_Flaregun",
		className: "Pyro",
		name: "Flare Pyro",
		classIcon: "pyro_flare",
		skill: "Normal",
		weaponRestrictions: "SecondaryOnly",
		items: ["The Flare Gun"]
	},
	{
		id: "T_TFBot_ScorchShot",
		className: "Pyro",
		name: "Pyro Pusher",
		classIcon: "pyro_flare",
		skill: "Expert",
		weaponRestrictions: "SecondaryOnly",
		attributes: ["AlwaysCrit"],
		items: ["The Scorch Shot"],
		itemAttributes: [{
			itemName: "The Scorch Shot",
			attributes: {
				"damage bonus": 1,
				"fire rate bonus": 0.75,
				"faster reload rate": 1.25,
				"Projectile speed increased": 0.35
			}
		}]
	},
	{
		id: "T_TFBot_ScorchShot_FastShot",
		className: "Pyro",
		name: "Fast Scorch Shot",
		classIcon: "pyro_flare",
		skill: "Expert",
		weaponRestrictions: "SecondaryOnly",
		items: ["The Scorch Shot"],
		itemAttributes: [{
			itemName: "The Scorch Shot",
			attributes: {
				"damage bonus": 1,
				"fire rate bonus": 0.75,
				"faster reload rate": 1,
				"Projectile speed increased": 1.3
			}
		}]
	},
	{
		id: "T_TFBot_Engineer_Sentry_Teleporter",
		className: "Engineer",
		name: "Engineer",
		skill: "Expert",
		health: 500,
		attributes: ["TeleportToHint"],
		properties: {
			TeleportWhere: "spawnbot"
		}
	},
	{
		id: "T_TFBot_Engineer_Sentry_Battle_TeleIn",
		className: "Engineer",
		name: "Engineer",
		skill: "Expert",
		health: 275,
		attributes: ["TeleportToHint"]
	},
	{
		id: "T_TFBot_Engineer_Sentry_Tele_Battle",
		className: "Engineer",
		name: "Engineer",
		skill: "Expert",
		health: 275,
		properties: {
			TeleportWhere: "spawnbot"
		}
	},
	{
		id: "T_TFBot_Engineer_Sentry_Battle",
		className: "Engineer",
		name: "Engineer",
		skill: "Expert",
		health: 275
	},
	{
		id: "T_TFGateBot_Scout_Melee",
		className: "Scout",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_Normal",
		className: "Scout",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_Hard",
		className: "Scout",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_FAN",
		className: "Scout",
		name: "Force-A-Nature Scout",
		classIcon: "scout_fan",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 2,
						"damage penalty": 0.65
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 1.7,
						"damage penalty": 0.65
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_FAN_Crit",
		className: "Scout",
		name: "Force-A-Nature Scout",
		classIcon: "scout_fan",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 2,
						"damage penalty": 0.65
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 1.7,
						"damage penalty": 0.65
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Sniper_Huntsman_Spammer_Crit",
		className: "Sniper",
		name: "Bowman Rapid Fire",
		classIcon: "sniper_bow",
		health: 1200,
		characterAttributes: {
			"head scale": 0.7,
			"move speed bonus": 0.85
		},
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Sniper", "The Huntsman"],
				itemAttributes: [{
					itemName: "The Huntsman",
					attributes: {
						"fire rate bonus": 0.6
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Sniper", "The Huntsman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Sniper",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Huntsman",
					attributes: {
						"fire rate bonus": 0.6
					}
				}]
			}
		},
		properties: {
			scale: 1.5
		}
	},
	{
		id: "T_TFGateBot_Scout_Sandman_FastCharge",
		className: "Scout",
		name: "Hyper League Scout",
		classIcon: "scout_stun",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout", "The Sandman", "Batter's Helmet"],
				itemAttributes: [{
					itemName: "The Sandman",
					attributes: {
						"effect bar recharge rate increased": 0.25
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["The Sandman", "Batter's Helmet", "MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "The Sandman",
					attributes: {
						"effect bar recharge rate increased": 0.25
					}
				}, {
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Easy",
		className: "Soldier",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Normal",
		className: "Soldier",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Normal_DirectHit_Crit",
		className: "Soldier",
		name: "Direct Hit Soldier",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Direct Hit"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Direct Hit"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Hard",
		className: "Soldier",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_RocketPush",
		className: "Soldier",
		name: "Blast Soldier",
		classIcon: "soldier_libertylauncher",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Liberty Launcher"],
				itemAttributes: [{
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": ".6",
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": -2,
						"faster reload rate": 1.5,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 2
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Liberty Launcher"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": ".6",
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": -2,
						"faster reload rate": 1.5,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 2
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_RocketShotgun_Expert",
		className: "Soldier",
		name: "Black Box Soldier",
		classIcon: "soldier_blackbox",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Black Box"],
				itemAttributes: [{
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.45,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 0.9,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 2,
						"heal on hit for rapidfire": 60
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Black Box"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.33,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 0.9,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 2,
						"heal on hit for rapidfire": 60
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Extended_Battalion_Hard",
		className: "Soldier",
		name: "Extended Backup Soldier",
		classIcon: "soldier_backup",
		characterAttributes: {
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag", "SpawnWithFullCharge"],
				items: ["The Battalion's Backup", "MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				attributes: ["SpawnWithFullCharge"],
				items: ["The Battalion's Backup", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Extended_Concheror_Normal",
		className: "Soldier",
		name: "Extended Conch Soldier",
		classIcon: "soldier_conch",
		characterAttributes: {
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Extended_Concheror_Normal_Crit",
		className: "Soldier",
		name: "Extended Conch Soldier",
		classIcon: "soldier_conch",
		characterAttributes: {
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit", "SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Normal",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Hard",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Expert",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_AlwaysFireWeapon",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag", "AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				attributes: ["AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Flaregun",
		className: "Pyro",
		name: "Flare Pyro",
		classIcon: "pyro_flare",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro", "The Flare Gun"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				items: ["MvM GateBot Light Pyro", "The Flare Gun"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demoman_Easy",
		className: "Demoman",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Demoman"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demoman_Normal",
		className: "Demoman",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Demoman"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demoman_Hard",
		className: "Demoman",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Demoman"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demo_Burst_Normal",
		className: "Demoman",
		name: "Burst Fire Demo",
		classIcon: "demo_burst",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demo_Burst_Normal_Crit",
		className: "Demoman",
		name: "Burst Fire Demo",
		classIcon: "demo_burst",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Easy",
		className: "Heavy",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Normal",
		className: "Heavy",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Hard",
		className: "Heavy",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Normal_Crit",
		className: "Heavy",
		classIcon: "heavy_crit",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Expert_Crit",
		className: "Heavy",
		classIcon: "heavy_crit",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavyweapons_Shotgun",
		className: "Heavyweapons",
		name: "Shotgun Heavy",
		classIcon: "heavy_shotgun",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"faster reload rate": 0.1,
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 3,
						"damage penalty": 0.33
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"faster reload rate": 0.1,
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 3,
						"damage penalty": 0.33
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_IronFist",
		className: "Heavyweapons",
		name: "Steel Gauntlet",
		classIcon: "heavy_steelfist",
		health: 900,
		scale: 1.5,
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				tags: ["bot_giant"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_IronFist_Airblast",
		className: "Heavyweapons",
		name: "Steel Gauntlet Pusher",
		classIcon: "heavy_steelfist",
		health: 900,
		scale: 1.5,
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag"],
				items: ["The carl", "Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "Fists of Steel",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 1.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				items: ["The carl", "Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "Fists of Steel",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 1.5
					}
				}, {
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_IronFist_Crit",
		className: "Heavyweapons",
		name: "Steel Gauntlet",
		classIcon: "heavy_steelfist",
		health: 900,
		scale: 1.5,
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Chief_Soldier_SlowCritBarrage",
		className: "Soldier",
		name: "Major Crits",
		classIcon: "soldier_barrage",
		health: 32000,
		scale: 1.7,
		characterAttributes: {
			"health regen": 40,
			"move speed bonus": 0.5,
			"damage bonus": 1.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.2,
			"Projectile speed increased": 0.35
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_SlowCritBarrage",
		className: "Soldier",
		name: "Major Crits",
		classIcon: "soldier_barrage",
		health: 4000,
		characterAttributes: {
			"health regen": 40,
			"move speed bonus": 0.5,
			"damage bonus": 1.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"airblast vertical vulnerability multiplier": 0.1,
			"Projectile speed increased": 0.35
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_SlowBarrage",
		className: "Soldier",
		name: "Colonel Barrage",
		classIcon: "soldier_barrage",
		health: 4000,
		characterAttributes: {
			"health regen": 40,
			"move speed bonus": 0.5,
			"damage bonus": 1.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"airblast vertical vulnerability multiplier": 0.1,
			"Projectile speed increased": 0.4,
			"rage giving scale": 0.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.22,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.22,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Deflector",
		className: "Heavyweapons",
		name: "Giant Deflector Heavy",
		classIcon: "heavy_deflector",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["The U-clank-a", "Deflector", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.5,
						"attack projectiles": 1
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["The U-clank-a", "Deflector", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.5,
						"attack projectiles": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Heater",
		className: "Heavyweapons",
		classIcon: "heavy_heater_giant",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Huo Long Heatmaker"],
				itemAttributes: [{
					itemName: "The Huo Long Heatmaker",
					attributes: {
						"damage bonus": 1.2
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Huo Long Heatmaker"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Huo Long Heatmaker",
					attributes: {
						"damage bonus": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Shotgun",
		className: "Heavyweapons",
		name: "Giant Shotgun Heavy",
		classIcon: "heavy_shotgun_giant",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.7,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"attack projectiles": 1,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Shotgun_Crit",
		className: "Heavyweapons",
		name: "Giant Shotgun Heavy",
		classIcon: "heavy_shotgun_giant",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.7,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"attack projectiles": 1,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_HealOnKill",
		className: "Heavyweapons",
		name: "Giant Heal-on-Kill Heavy",
		classIcon: "heavy_deflector_healonkill",
		health: 5500,
		characterAttributes: {
			"move speed bonus": 0.4,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.4,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.9,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 5000
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 5000
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Chief_Heavyweapons_HealOnKill",
		className: "Heavyweapons",
		name: "Giant Heal-On-Kill Heavy",
		classIcon: "heavy_deflector_healonkill",
		health: 70000,
		scale: 1.8,
		characterAttributes: {
			"move speed bonus": 0.4,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.4,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.6,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 8000
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 8000
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Extended_Concheror",
		className: "Soldier",
		name: "Giant Concheror Soldier",
		classIcon: "soldier_conch_giant",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Extended_Concheror_Crit",
		className: "Soldier",
		name: "Giant Concheror Soldier",
		classIcon: "soldier_conch_giant",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_RocketPush",
		className: "Soldier",
		name: "Giant Blast Soldier",
		classIcon: "soldier_libertylauncher_giant",
		health: 4000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"override footstep sound set": 3,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Liberty Launcher", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 0.75,
						"fire rate bonus": 0.25,
						"clip size upgrade atomic": 5,
						"faster reload rate": 0.2,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 4
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["Dr's Dapper Topper", "The Liberty Launcher", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 0.75,
						"fire rate bonus": 0.25,
						"clip size upgrade atomic": 5,
						"faster reload rate": 0.2,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 4
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_BurstFire",
		className: "Soldier",
		name: "Giant Burst Fire Soldier",
		classIcon: "soldier_burstfire",
		health: 4200,
		characterAttributes: {
			"damage bonus": 2,
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.9
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"damage bonus": 2.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"damage bonus": 2,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_BurstFire_Crit",
		className: "Soldier",
		name: "Giant Burst Fire Soldier",
		classIcon: "soldier_burstfire",
		health: 4200,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.9
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"damage bonus": 2.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_RocketShotgun",
		className: "Soldier",
		name: "Giant Black Box Soldier",
		classIcon: "soldier_blackbox_giant",
		health: 4200,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.9
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Black Box", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.45,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 1.6,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 4,
						"heal on hit for rapidfire": 1000
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Black Box", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.33,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 1.6,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 4,
						"heal on hit for rapidfire": 1000
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Demo_Burst",
		className: "Demoman",
		name: "Giant Burst Fire Demo",
		classIcon: "demo_burst_giant",
		health: 3300,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 4,
			"Projectile speed increased": 1.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Demo_Burst_Crit",
		className: "Demoman",
		name: "Giant Burst Fire Demo",
		classIcon: "demo_burst_giant",
		health: 3300,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 4,
			"Projectile speed increased": 1.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Scout_FAN",
		className: "Scout",
		name: "Force-a-Nature Super Scout",
		classIcon: "scout_fan_giant",
		health: 1200,
		characterAttributes: {
			"move speed bonus": 1.1,
			"damage force reduction": 0.7,
			"airblast vulnerability multiplier": 0.7,
			"override footstep sound set": 5
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Bolt Boy", "The Force-a-Nature", "MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "The Force-a-Nature",
					attributes: {
						"bullets per shot bonus": 2,
						"fire rate bonus": 0.5,
						"faster reload rate": 1.7,
						"scattergun knockback mult": 6,
						"damage penalty": 0.35,
						"weapon spread bonus": 0.4
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Bolt Boy", "The Force-a-Nature", "MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Force-a-Nature",
					attributes: {
						"bullets per shot bonus": 2,
						"fire rate bonus": 0.5,
						"faster reload rate": 1.7,
						"scattergun knockback mult": 6,
						"damage penalty": 0.35,
						"weapon spread bonus": 0.4
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier",
		className: "Soldier",
		name: "Giant Soldier",
		classIcon: "soldier_giant",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["HoldFireUntilFullReload", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Spammer",
		className: "Soldier",
		name: "Giant Rapid Fire Soldier",
		classIcon: "soldier_spammer",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.65
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Spammer_Crit",
		className: "Soldier",
		name: "Giant Rapid Fire Soldier",
		classIcon: "soldier_spammer",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.65
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Spammer_Reload",
		className: "Soldier",
		name: "Giant Rapid Fire Soldier",
		classIcon: "soldier_burstfire",
		health: 4000,
		characterAttributes: {
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"move speed bonus": 0.5,
						"faster reload rate": 0.6,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 5.0,
						"Projectile speed increased": 0.65
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"move speed bonus": 0.5,
						"faster reload rate": 0.6,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 5.0,
						"Projectile speed increased": 0.65
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Pyro_AlwaysFire",
		className: "Pyro",
		name: "Giant Pyro",
		classIcon: "pyro_giant",
		health: 3000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.6,
			"airblast vulnerability multiplier": 0.6,
			"override footstep sound set": 6
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Pyro_AlwaysFire_Crit",
		className: "Pyro",
		name: "Giant Pyro",
		classIcon: "pyro_giant",
		health: 3000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.6,
			"airblast vulnerability multiplier": 0.6,
			"override footstep sound set": 6
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "AlwaysFireWeapon", "AlwaysCrit"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "AlwaysFireWeapon", "AlwaysCrit"],
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	}
];

function applyTemplateValues(bot, templateData, mutableAttributes) {
	if (templateData.name) bot.setName(templateData.name);
	if (templateData.skill) bot.setSkill(templateData.skill, mutableAttributes);
	if (templateData.classIcon) bot.setClassIcon(templateData.classIcon);
	if (templateData.weaponRestrictions) bot.setWeaponRestriction(templateData.weaponRestrictions, mutableAttributes);
	if (templateData.health !== undefined) bot.setHealth(templateData.health);
	if (templateData.scale !== undefined) bot.setScale(templateData.scale);
	if (templateData.teleportWhere) bot.setTeleportWhere(templateData.teleportWhere);
	if (templateData.maxVisionRange !== undefined) bot.setMaxVisionRange(templateData.maxVisionRange, mutableAttributes);
	if (templateData.behaviorModifiers) bot.setBehaviour(templateData.behaviorModifiers, mutableAttributes);

	if (templateData.tags) {
		for (var i = 0; i < templateData.tags.length; i++) {
			bot.setTag(templateData.tags[i], true, mutableAttributes);
		}
	}

	if (templateData.attributes) {
		for (var j = 0; j < templateData.attributes.length; j++) {
			bot.setAttribute(templateData.attributes[j], true, mutableAttributes);
		}
	}

	if (templateData.items) {
		for (var k = 0; k < templateData.items.length; k++) {
			var itemName = templateData.items[k];
			var item = itemList.getItemByClass(bot.getClassId(), itemName);
			if (item) {
				bot.setItem(item, item.slotId, mutableAttributes);
			} else {
				console.warn("Unknown item for template " + templateData.id + ": " + itemName);
			}
		}
	}

	if (templateData.itemAttributes) {
		for (var m = 0; m < templateData.itemAttributes.length; m++) {
			var entry = templateData.itemAttributes[m];
			var attrItem = itemList.getItemByClass(bot.getClassId(), entry.itemName);
			if (!attrItem) {
				console.warn("Unknown item for template attributes " + templateData.id + ": " + entry.itemName);
				continue;
			}
			for (var attrName in entry.attributes) {
				var newAttr = bot.createItemAttribute(attrItem.slotId, attrName, mutableAttributes);
				if (newAttr) {
					newAttr.setValue(entry.attributes[attrName]);
				}
			}
		}
	}

	if (templateData.characterAttributes) {
		for (var charAttr in templateData.characterAttributes) {
			var newCharAttr = bot.createCharacterAttribute(charAttr, mutableAttributes);
			if (newCharAttr) {
				newCharAttr.setValue(templateData.characterAttributes[charAttr]);
			}
		}
	}
}

function applyBuiltinTemplate(bot, templateData) {
	var classId = classesreverse[templateData.className];
	if (classId === undefined) {
		var lower = templateData.className.toLowerCase();
		classId = classesreverse[lower];
	}
	if (classId !== undefined) {
		bot.setClass(classId, true);
	}

	applyTemplateValues(bot, templateData);
	if (templateData.autoJumpMin !== undefined) bot.setAutoJumpMin(templateData.autoJumpMin);
	if (templateData.autoJumpMax !== undefined) bot.setAutoJumpMax(templateData.autoJumpMax);

	if (templateData.changeAttributes) {
		for (var changeEvent in templateData.changeAttributes) {
			if (!templateData.changeAttributes.hasOwnProperty(changeEvent)) continue;
			bot.addMutableAttributes(changeEvent);
			applyTemplateValues(bot, templateData.changeAttributes[changeEvent], changeEvent);
		}
		bot.setCurrentMutableAttributes();
	}

	bot.setTemplateName(templateData.id);
}
