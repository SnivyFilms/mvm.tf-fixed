var ATTRIBUTE_MINIBOSS = "MiniBoss";
var ATTRIBUTE_CRIT_BOOST = "AlwaysCrit";
var ATTRIBUTE_BOSS_HEALTH_BAR = "UseBossHealthBar";

var BOT_VIEWER_DEFAULT_TAB_NAME = "RevertGateBotsBehavior";

function cssrules(){
  var rules={}; var ds=document.styleSheets,dsl=ds.length;
  for (var i=0;i<dsl;++i){
    var dsi=ds[i].cssRules,dsil=dsi.length;
    for (var j=0;j<dsil;++j) rules[dsi[j].selectorText]=dsi[j];
  }
  return rules;
};

function cssGetClass(name) {
	var ss = document.styleSheets;

	for (var i in ss){
		var rules = ss[i].cssRules;
		for (var j in rules) {
			if (rules[j].selectorText==name) {
				return rules[j];
			}
		}
	}
	return null;
};
/*
function cssGetClass(name,createifnotfound){
  var rules=cssrules();
  if (!rules.hasOwnProperty(name)) throw 'todo:deal_with_notfound_case';
  return rules[name];
};*/

var BotViewer = function(parent)
{
	this.parent = parent;
	this.allowUpdate = true;
	this.init();
	this.tabList = {};

	this.create();
	globalPopulation.addMapListener(this);
}
BotViewer.prototype.createElement = CREATE_ELEMENT;

BotViewer.prototype.setBot = function(bot, type) {
	//console.log(type);
	//console.log(globalPopulation.currentTab);
	if (type&&type!=globalPopulation.currentTab) {
		return;
	}

	if (this.bot) {
		this.bot.setView(null);
	}
	bot.setView(this);
	this.bot = bot;
	this.onBotUpdated();
}

BotViewer.prototype.getBot = function() {
	if (this.bot) return this.bot;
	return this.dummyBot;
}

BotViewer.prototype.addTab = function(tabName) {
	var tab = this.tabList[tabName];
	if (tab == undefined) {
		tab = new Tab(null, {editable:true, classname:"botTab"});
		//tab.setClassName("botTab");
		tab.setUserData(tabName);
//		tab.htmlElement.unselectable = "on";
		tab.setContainer(this.htmlTabsHandler);
		tab.setHTML(tabName);
		this.tabList[tabName] = tab;
	}

	var that = this;
	if (tab.addNotification) tab.addNotification(Tab.EVENT_TAB_RENAMED,
		function(params) {
			that.tabRenamed(params);
		}
	);

	this.tabBar.addTab(tab);
	return tab;
}

BotViewer.prototype.tabRenamed = function(params) {
	//console.log(params);
	var oldName = params.tab.getUserData();
	var newName = params.newName;
	this.getBot().renameMutableAttributes(oldName, newName);
}

BotViewer.prototype.getTab = function(tabName) {

	var tab = this.tabList[tabName];
	if (tab == undefined) {
		this.addTab(tabName);
	}
	return tab;
}

BotViewer.prototype.onBotUpdated = function() {
	this.update();
}

BotViewer.prototype.update = function(field) {
	if (!this.allowUpdate){
		return;
	}

	for (var uf in BotViewer.prototype.updateFields) {
		if (uf==field || !field) {
			BotViewer.prototype.updateFields[uf].apply(this);

			if (uf==field) {
				break;
			}
		}
	}
}

BotViewer.prototype.allowRefresh = function(allowUpdate) {
	this.allowUpdate = allowUpdate;
	if (allowUpdate) {
		this.update();
	}
}

BotViewer.prototype.init = function() {
	this.bot = null;
	this.dummyBot = new Bot();
	this.classButtons = new Array();
	this.skillButtons = new Array();
	this.restrictionButtons = new Array();
	this.behaviourButtons = new Array();

	this.weaponSlot = new Array();
	this.items =  new Array();
	this.notifyList =  new Array();
	this.attributesList = {};
	this.htmlItemsBox = {};
	this.htmlItemsAttributesBox = {};

	this.characterAttributes =  new Array();
	this.itemsAttributes =  new Array();
	for (i=0; i<=SLOT_MAX; i++)
	{
		this.itemsAttributes[i] =  new Array();
	}
}

BotViewer.prototype.create = function() {
	this.htmlElement = this.createElement("div", this.parent, "TFBotViewer", null, "help_bot");
	this.htmlLargeElement = this.createElement("div", this.htmlElement, "tfBotLarge", null/*, "help_bot_large"*/);
	/*this.htmlSmallElement = this.createElement("div", this.htmlElement, "tfBotSmall", null, "help_bot_small");
	this.htmlSmallElement.style.display = "none";*/

	this.htmlDummy = this.createElement("div", this.htmlElement, "TFBotViewerDummy");
	this.htmlDummy.appendChild(this.dummyBot.htmlElement);

	  //header
	                                                                                                                     
	this.htmlContainer = this.createElement("div", this.htmlLargeElement, "botContent");
	this.htmlBackground = this.createElement("div", this.htmlLargeElement, "botBackGround"/*, null, "help_bot_header"*/);
	var header = this.createElement("div", this.htmlContainer, "botheader"/*, null, "help_bot_header"*/);

	for (var i=0; i<10; i++) {
		this.classButtons[i] = this.createElement("div", header, 'TFClassIcon' + classes[i] + " TFClassIcon TFClassIconGrey", null, "help_class_button");
		this.classButtons[i].classId = i;
		addEvent(this.classButtons[i], "click", function() {this.ownerObject.setClass(this.classId, false);}, false);
	}
	var removeButton = this.createElement("div", header, "removebutton removebot", null, "help_bot_remove_button");
	removeButton.appendChild(document.createTextNode("x"));
	addEvent(removeButton, "click", function() {this.ownerObject.remove();}, false);

	//attributes
	var attributes = this.createElement("div", this.htmlContainer, "botAttributes");
	var attributes1 = this.createElement("div", attributes, "botRobotAttributes");
	var attributes2 = this.createElement("div", attributes, "botRobotAttributes");
	var attributes21 = this.createElement("div", attributes2, "botRobotSubAttributes");
	var attributes22 = this.createElement("div", attributes2, "botRobotSubAttributes");
	var attributes3 = this.createElement("div", attributes, "botRobotAttributes");

	{
		var htmlTemplates = this.createElement("div", attributes1, "botOnly", null, "help_bot_templates");
		htmlTemplates.appendChild(document.createTextNode(BOT_TEMPLATE_LIST));
		this.htmlTemplateList = this.createElement("select", htmlTemplates, "mvminput botinput botTemplateList");
		//addEvent(this.htmlTemplateList, "change", function() {if (this.ownerObject.setTemplate(this.value))this.ownerObject.applyTemplate();}, false);
		addEvent(this.htmlTemplateList, "change", function() {this.ownerObject.setTemplate(this.value);}, false);
		this.notifyBotTemplateAdded(null);
		this.updateTemplates();
	}

	{	//Name
		var htmlName = this.createElement("div", attributes1, null, null, "help_bot_name");
		htmlName.appendChild(document.createTextNode(BOT_NAME));
		this.htmlInputName = this.createElement("input", htmlName, "mvminput botinput botName");
		addEvent(this.htmlInputName, "change", function() {if (this.ownerObject.setName(this.value));}, false);
	}

	{   //class icon
		var htmlClassIcon = this.createElement("div", attributes1, "botOnly", null, "help_bot_class_icon");
		htmlClassIcon.appendChild(document.createTextNode(BOT_CLASSICON_LIST));
		this.htmlClassIconList = this.createElement("select", htmlClassIcon, "mvminput botinput botClassIconList");
		addEvent(this.htmlClassIconList, "change", function() {this.ownerObject.setClassIcon(this.value);}, false);
		this.updateClassIcons();
	}

	this.tankAttribs = this.createElement("div", attributes);
	{   //Health
		var health = this.createElement("div", attributes22, "botAttribute", null, "help_bot_health");
		health.appendChild(document.createTextNode(BOT_HEALTH));
		this.inputHealth = this.createElement("input", health, "mvminput botinput");
		addEvent(this.inputHealth, "change", function() {this.ownerObject.setHealth(this.value);}, false);
	}
	{	//Scale
		var scale = this.createElement("div", attributes22, "botOnly", null, "help_bot_scale");
		scale.appendChild(document.createTextNode(BOT_SCALE));
		this.inputScale = this.createElement("input", scale, "mvminput botinput");
		addEvent(this.inputScale, "change", function() {this.ownerObject.setScale(this.value);}, false);
	}

	{	//max vision range
		var maxVisionRange = this.createElement("div", attributes22, "botOnly", null, "help_bot_vision");
		maxVisionRange.appendChild(document.createTextNode(BOT_MAX_VISION_RANGE));
		this.inputMaxVisionRange = this.createElement("input", maxVisionRange);
		this.inputMaxVisionRange.className="mvminput botinput";
		addEvent(this.inputMaxVisionRange, "change", function() {this.ownerObject.setMaxVisionRange(this.value);}, false);
	}
	
	{   //jumpMin
		var jumpMin = this.createElement("div", attributes22, "botOnly", null, "help_bot_auto_jump_min");
		jumpMin.appendChild(document.createTextNode(BOT_AUTO_JUMP_MIN));
		this.inputAutoJumpMin = this.createElement("input", jumpMin, "mvminput botinput");
		addEvent(this.inputAutoJumpMin, "change", function() {this.ownerObject.setAutoJumpMin(this.value);}, false);
	}

	{   //jumpMax
		var jumpMax = this.createElement("div", attributes22, "botOnly", null, "help_bot_auto_jump_max");
		jumpMax.appendChild(document.createTextNode(BOT_AUTO_JUMP_MAX));
		this.inputAutoJumpMax = this.createElement("input", jumpMax, "mvminput botinput");
		addEvent(this.inputAutoJumpMax, "change", function() {this.ownerObject.setAutoJumpMax(this.value);}, false);
	}	

	{   //Tag
		var div = this.createElement("div", attributes22, "botOnly", null, "help_bot_navtag");
		div.appendChild(document.createTextNode(BOT_TAGS));
		this.htmlTagList = this.createElement("select", div, "mvminput botinput botTagList");
		this.htmlTagList.multiple = true;
		addEvent(this.htmlTagList, "change", function() {this.ownerObject.setTagsList();}, false);
		this.createTagList(globalPopulation.mapName);
	}

	{	//skill
		var skill = this.createElement("div", attributes22, "botOnly", null, "help_bot_skill");

		skill.appendChild(document.createTextNode("Skill "));
		for (var i in Skills) {
		    var div = this.createElement("div", skill, "botskill botskill" + i);
			div.skillvalue = Skills[i];
			div.innerHTML = Skills[i];
			addEvent(div, "click", function() {this.ownerObject.setSkill(this.skillvalue);}, false);
			this.skillButtons[i] = div;
		}
		//this.robotattributes.appendChild(document.createElement("br"));
	}

	{	//weapon restriction
		var weaponRestriction = this.createElement("div", attributes3, "botOnly", null, "help_bot_weapon_restriction");
		weaponRestriction.appendChild(document.createTextNode("Weapon restriction "));
		for (var i in WeaponsRestrictions) {
			if (i==2) {
				weaponRestriction.appendChild(document.createElement("br"));
			}
		    var div = this.createElement("div", weaponRestriction, "WeaponRestriction");
			div.restrictionValue = WeaponsRestrictions[i];
			div.innerHTML = WeaponsRestrictions[i];
			addEvent(div, "click", function() {this.ownerObject.setWeaponRestriction(this.restrictionValue);}, false);
			this.restrictionButtons[i] = div;
		}
		//this.robotattributes.appendChild(document.createElement("br"));
	}

	{	//behaviour
		var behaviour = this.createElement("div", attributes3, "botOnly", null, "help_bot_behaviour");
		behaviour.appendChild(document.createTextNode(BOT_BEHAVIOUR));
		for (var i in BotsBehaviour) {
		    var div = this.createElement("div", behaviour, "botBehaviour"/*, null, "help_bot_behaviour"*/);
			div.behaviourValue = BotsBehaviour[i];
			div.innerHTML = BotsBehaviour[i];
			addEvent(div, "click", function() {this.ownerObject.setBehaviour(this.behaviourValue);}, false);
			this.behaviourButtons[i] = div;
		}
		//this.robotattributes.appendChild(document.createElement("br"));
	}

	{	//attributes
		var htmlAttributes = this.createElement("div", attributes22, "botOnly", null, "help_bot_attributes");
		//htmlAttributes.appendChild(document.createTextNode(BOT_ATTRIBUTE));
		this.htmlAttributeList = this.createElement("select", htmlAttributes, "mvminput botinput botAttributeList");
		this.htmlAttributeList.multiple = true;
		addEvent(this.htmlAttributeList, "change", function() {this.ownerObject.setAttributesList();}, false);

		this.addAttribute("");
		for (var i=0; i<BotAttributesList.length; i++) {
			this.addAttribute(BotAttributesList[i]);
		}
	}

	{	//Items
		var items = this.createElement("div", attributes21, "botOnly", null, "help_bot_items");
		for (i=0; i<=SLOT_CHARACTER; i++)
		{
			this.htmlItemsBox[i] = this.createElement("div", items, "botItemBox botOnly", null, "help_bot_character_attributes");
			var sel = this.createElement("div", this.htmlItemsBox[i], "ItemSelectorElement");
			this.htmlItemsAttributesBox[i] = this.createElement("div", this.htmlItemsBox[i], "botCharactersAttributes botOnly", null, "help_bot_character_attributes");
			//sel.className = "ItemSelectorElement";
			/*sel.appendChild(document.createTextNode(Slots[i]));
			sel.appendChild(document.createElement("br"));*/

			//div0 = this.createElement("div", sel, "" //TODO);
			div = this.createElement("div", sel, "ItemSelectorElementImg ItemSelectedElementImg");
/*			div2 = this.createElement("div", div, "ItemAddElementImg");
			div2.style.backgroundSize="10px 10px";
			div2.style.height="10px";
			div2.style.width="10px";*/
			this.weaponSlot[i] = div;
			this.htmlItemsBox[i].slotId = i;
			div.slotId = i;
			//addEvent(div, "click", function() {this.ownerObject.showItemSelector(this.slotId);}, false);
			if (i!=SLOT_CHARACTER) {
				addEvent(div, "click", function() {this.ownerObject.getBot().showItemSelector(this.slotId);}, false);   
				addEvent(this.htmlItemsBox[i], "drop", function(event) {this.ownerObject.dropItemAttribute(event, this.slotId);}, false);
			} else {
				addEvent(this.htmlItemsBox[i], "drop", function(event) {this.ownerObject.dropCharacterAttribute(event);}, false);
			}
			addEvent(this.htmlItemsBox[i], "dragenter", function(event) {this.ownerObject.dragEnter(event);}, false);
			addEvent(this.htmlItemsBox[i], "dragover", function(event) {this.ownerObject.dragOver(event);}, false);

//			this.htmlItemsAttributesBox[i] = this.createElement("div", this.robotattributes2, "botCharactersAttributes botOnly", null, "help_bot_character_attributes");
/*			var itemAttributeTitle = this.createElement("div", this.htmlItemsAttributesBox[i], "botItemsAttributesTitle", null);
			var title;
			switch (i) {
				case 0: title = "Primary weapon attributes"; break;
				case 1: title = "Secondary weapon attributes"; break;
				case 2: title = "Melee weapon attributes"; break;
				case 3: title = "Hat attributes"; break;
				default: title = "Misc " + i + " attributes"; break;
			}
			itemAttributeTitle.innerHTML = title;     */
			this.htmlItemsAttributesBox[i].this=this;
			this.htmlItemsAttributesBox[i].slotId = i;

			addEvent(this.htmlItemsAttributesBox[i], "dragenter", function(event) {this.ownerObject.dragEnter(event);}, false);
			addEvent(this.htmlItemsAttributesBox[i], "dragover", function(event) {this.ownerObject.dragOver(event);}, false);
			addEvent(this.htmlItemsAttributesBox[i], "drop", function(event) {this.ownerObject.dropItemAttribute(event, this.slotId);}, false);
		}

/////////// character attributes
		this.htmlAttributesBox = this.htmlItemsAttributesBox[SLOT_CHARACTER];
/////////// end of character attributes
	}

/////////// tank attributes
	//this.tankAttribs = this.createElement("div", attributes);
	{//tank speed

		var speed = this.createElement("div", this.tankAttribs, "tankOnly", null, "help_bot_tank_speed");
		speed.appendChild(document.createTextNode("Speed "));
		this.inputSpeed = this.createElement("input", speed, "mvminput botinput");
		addEvent(this.inputSpeed, "change", function() {this.ownerObject.setTankSpeed(this.value);}, false);
		speed.appendChild(document.createElement("br"));
	}
	{//tank skin

		var skin = this.createElement("div", this.tankAttribs, "tankOnly", null, "help_bot_tank_skin");
		skin.appendChild(document.createTextNode(BOT_TANK_SKIN));
		this.htmlTankSkin = this.createElement("input", skin, "mvminput botinput");
		this.htmlTankSkin.type = "checkbox";
		addEvent(this.htmlTankSkin, "change", function() {this.ownerObject.setTankSkin(this.checked);}, false);
		skin.appendChild(document.createElement("br"));
	}

	{//tank starting track
		var track = this.createElement("div", this.tankAttribs, "tankOnly", null, "help_bot_tank_track");
		track.appendChild(document.createTextNode(BOT_TANK_STARTING_TRACK));
		this.htmlTrackList = this.createElement("select", track, "mvminput botinput botTankTrack");
		addEvent(this.htmlTrackList, "change", function() {this.ownerObject.setTankTrack(this.value);}, false);
		track.appendChild(document.createElement("br"));
		this.updateMapName(globalPopulation.mapName);
	}
/////////// end of tank attributes


	this.htmlTabsHandler = this.createElement("div", attributes, "botTabHandler botOnly", null, null, "botTabs");
	{
		this.addWaveButton = this.createElement("div", this.htmlTabsHandler, "botTab botAddTab botOnly", null, "TODO");
		addEvent(this.addWaveButton, "click", function() {this.ownerObject.addChangeEvent();}, false);
		this.addWaveButton.appendChild(document.createTextNode("+"));
	}
	this.tabBar = new TabBar("botTabs");

	var that = this;
	if (this.tabBar.addNotification) this.tabBar.addNotification(TabBar.EVENT_TAB_ACTIVATED,
		function(params) {
			that.tabActivated(params)
		}
	);


};

//notifyBotTemplateAdded
BotViewer.prototype.notifyBotTemplateAdded = function(newbot) {
	//if (newbot!=undefined&&newbot.isSentryBuster) return;
	var option = this.createElement("option", this.htmlTemplateList, null, null, "help_template_option");
	if (newbot)
	{
		var botname = newbot.name;
		if (botname=="")
		botname = newbot.getClass();

		option.id = newbot.templateName;option.tfbot=newbot;//option.selected = true;
		option.innerHTML = "<div class='templateOption " + newbot.getClassIconStyle() +"' ></div>" + botname + " (" + newbot.templateName + ")";
		option.value = newbot.templateName;
	}
};

//updateTemplates
BotViewer.prototype.updateTemplates = function() {
	for (var i in templateList.templates) {
		this.notifyBotTemplateAdded(templateList.templates[i]);
	}
};

//notifyClassIconAdded
BotViewer.prototype.notifyClassIconAdded = function(classicon) {
	var option = this.createElement("option", this.htmlClassIconList, null, null, "help_classicon_option");
	if (classicon)
	{
		option.id = classicon;//newbot.templateName;option.tfbot=newbot;//option.selected = true;
		option.innerHTML = "<div class='classIconOption " + ClassIcons[classicon] +"' ></div>" + classicon;
		option.value = classicon;//newbot.templateName;
	}
};

//updateClassIcons
BotViewer.prototype.updateClassIcons = function() {
	for (var i in ClassIcons) {
		this.notifyClassIconAdded(i);
	}
};

//clearTagList
BotViewer.prototype.clearTagList = function() {
	while (this.htmlTagList.options.length>0) {
		this.htmlTagList.removeChild(this.htmlTagList.options[0]);
		delete this.htmlTagList.options[0];
	}
}
//clearTrackList
BotViewer.prototype.clearTrackList = function() {
	while (this.htmlTrackList.options.length>0) {
		this.htmlTrackList.removeChild(this.htmlTrackList.options[0]);
		delete this.htmlTrackList.options[0];
	}
}

//updateMapName
BotViewer.prototype.updateMapName = function(mapName) {
	this.createTagList(mapName);
	this.updateTrackList(mapName);
}

//createTagList
BotViewer.prototype.createTagList = function(mapName) {
	var map = MapList[mapName];
	if (map==undefined) return;
	this.clearTagList();

	for (var i in map.tags) {
		var nav = map.tags[i];
		var option = this.createElement("option", this.htmlTagList, "spawnList");
		option.id = nav;
		option.innerHTML = nav;
		option.value = nav;
	}
	this.update(UPDATE_FIELD_TAG_LIST);
}

//updateTrackList
BotViewer.prototype.updateTrackList = function(mapName) {
	var map = MapList[mapName];
	if (map==undefined) return;
	this.clearTrackList();

	for (var i in map.tankPaths) {
		var nav = map.tankPaths[i];
		var option = this.createElement("option", this.htmlTrackList, "spawnList");
		option.id = nav;
		option.innerHTML = nav;
		option.value = nav;
	}
	if (map.tankPaths.length>0) {
		this.setTankTrack(map.tankPaths[0]);
	}
}

//addAttribute
BotViewer.prototype.addAttribute = function(attribute) {
	//if (this.stockTemplate&&this.locked) return false;
	var option = this.createElement("option", this.htmlAttributeList, "" /*TODO*/, null, "help_bot_attribute");
	option.value = attribute;option.id = attribute;option.innerHTML = attribute;
};

/*//setTankTrack
BotViewer.prototype.setTankTrack = function(tankStartingPath) {
//	if (!this.bot) return;
	if (this.getBot().tankStartingPath == tankStartingPath) return;
	this.getBot().tankStartingPath = tankStartingPath;

	this.update({field:"tankStartingPath"});
}     */

//tabActivated
BotViewer.prototype.tabActivated = function(params) {
	if (params.tabActivated&&!this.disableNotification) {
		this.getBot().setCurrentMutableAttributes(params.tabActivated.getUserData());
		this.update();
	}
}

//remove
BotViewer.prototype.remove = function() {
	this.getBot().remove();
}

/*********************
 * SETTERS
 *********************/
var UPDATE_FIELD_TANK_STARTING_PATH = "tankStartingPath";
var UPDATE_FIELD_SCALE = "scale";
var UPDATE_FIELD_SKILL = "skill";
var UPDATE_FIELD_BEHAVIOUR = "behaviour";
var UPDATE_FIELD_WEAPON_RESTRICTION = "weaponrestriction";
var UPDATE_FIELD_MAX_VISION_RANGE = "maxvisionrange";
var UPDATE_FIELD_AUTO_JUMP_MIN = "autojumpmin";
var UPDATE_FIELD_AUTO_JUMP_MAX = "autojumpmax";
var UPDATE_FIELD_HEALTH = "health";
var UPDATE_FIELD_TEMPLATE = "template";
var UPDATE_FIELD_CLASSICON = "classicon";
var UPDATE_FIELD_CLASS = "class";
var UPDATE_FIELD_ATTRIBUTE_LIST = "attributelist";
var UPDATE_FIELD_ITEM_ATTRIBUTES = "itemAttribute";
var UPDATE_FIELD_CHARACTER_ATTRIBUTES = "characterAttribute";
var UPDATE_FIELD_CHANGE_ATTRIBUTES = "changeAttribute";
var UPDATE_FIELD_TANK_SKIN = "tankSkin";
var UPDATE_FIELD_STARTING_PATH = "startingPath";
var UPDATE_FIELD_TANK_SPEED = "tankSpeed";
var UPDATE_FIELD_NAME = "name";
var UPDATE_FIELD_HEALTH = "health";   
var UPDATE_FIELD_TAG_LIST = "tags";  
var UPDATE_FIELD_ITEMS = "items";



BotViewer.prototype.updateFields = {};

//setTag //TODO
BotViewer.prototype.setTag = function(navTag) {
	/*mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	this.getMutableAttribute(mutableAttributes).setNavTag(navTag, checked);
	this.onModified();*/

	this.getBot().setTag(navTag, true);
	this.update(UPDATE_FIELD_TAG_LIST);
}

//setName
BotViewer.prototype.setName = function(name) {
	this.getBot().setName(name);
	this.update(UPDATE_FIELD_NAME);
}

//setTankTrack
BotViewer.prototype.setTankTrack = function(tankStartingPath) {
//	if (!this.bot) return;
	this.getBot().setTankTrack(tankStartingPath);
	this.update(UPDATE_FIELD_TANK_STARTING_PATH);
}

//setScale
BotViewer.prototype.setScale = function(scale) {
	//if (!this.bot) return;
	this.getBot().setScale(scale);
	this.update(UPDATE_FIELD_SCALE);
}

// setSkill @skill TODO: desc
BotViewer.prototype.setSkill = function(skill) {
//	if (!this.bot) return;
	this.getBot().setSkill(skill);
	this.update(UPDATE_FIELD_SKILL);
};

// setBehaviour @behaviour TODO: desc
BotViewer.prototype.setBehaviour = function(behaviour) {
	//if (!this.bot) return;
	this.getBot().setBehaviour(behaviour);
	this.update(UPDATE_FIELD_BEHAVIOUR);
};

// setWeaponRestriction @weapon = 0, 1, 2, 3
BotViewer.prototype.setWeaponRestriction = function(weapon) {
	//if (!this.bot) return;
	this.getBot().setWeaponRestriction(weapon);
	this.update(UPDATE_FIELD_WEAPON_RESTRICTION);
};

//setMaxVisionRange
BotViewer.prototype.setMaxVisionRange = function(maxVisionRange) {
	//if (!this.bot) return;
	this.getBot().setMaxVisionRange(maxVisionRange);
	this.update(UPDATE_FIELD_MAX_VISION_RANGE);
};    

//setAutoJumpMin
BotViewer.prototype.setAutoJumpMin = function(autoJumpMin) {
	this.getBot().setAutoJumpMin(autoJumpMin);
	this.update(UPDATE_FIELD_AUTO_JUMP_MIN);
}; 

//setAutoJumpMax
BotViewer.prototype.setAutoJumpMax = function(autoJumpMax) {
	this.getBot().setAutoJumpMax(autoJumpMax);
	this.update(UPDATE_FIELD_AUTO_JUMP_MAX);
};

BotViewer.prototype.setHealth = function(health) {
	if (isNumber(health)/*||health==""*/)
	{
		//if (!this.bot) return;
		this.getBot().setHealth(health);
		this.update(UPDATE_FIELD_HEALTH);
	}
	else
	    this.inputHealth.id = "mvmNaNinput";
}

//setTemplate
BotViewer.prototype.setTemplate = function(template) {
	var bot = this.getBot();
	if (bot.setTemplate(template)) {
		bot.applyTemplate();
		this.update();
	}
};

//setClassIcon
BotViewer.prototype.setClassIcon = function(icon) {
	this.getBot().setClassIcon(icon);
	this.update(UPDATE_FIELD_CLASSICON);
};

// setTankSkin @finalSkin: bool
BotViewer.prototype.setTankSkin = function(finalSkin) {
	this.getBot().setTankSkin(finalSkin);
	this.update(UPDATE_FIELD_TANK_SKIN);
}
// setTankStartingPath
BotViewer.prototype.setTankStartingPath = function(tankStartingPath) {
	this.getBot().setTankStartingPath(tankStartingPath);
	this.update(UPDATE_FIELD_STARTING_PATH);
}

// setTankSpeed @speed: integer
BotViewer.prototype.setTankSpeed = function(tankSpeed) {
	this.getBot().setTankSpeed(tankSpeed);
	this.update(UPDATE_FIELD_TANK_SPEED);
}



//setClass
BotViewer.prototype.setClass = function(classId, force) {
	this.getBot().setClass(classId, force);
	this.update(UPDATE_FIELD_CLASS);
};

//dragEnter
BotViewer.prototype.dragEnter = function(event) {
	return this._processDrag(event);
};

//dragOver
BotViewer.prototype.dragOver = function(event) {
	return this._processDrag(event);
};

//_processDrag
BotViewer.prototype._processDrag = function(event) {
	var bot = this.getBot();
	var attributeName = event.dataTransfer.getData('Text');
	if (attributeName.substring(0, 10)=="attribute|"&&bot.getCharacterAttributes()[attributeName]==undefined) {
	//if (attributeName.substring(0, 10)=="attribute|"&&bot.characterAttributes[attributeName]==undefined) {

       event.dataTransfer.dropEffect = 'copy';
	}else{
    	event.dataTransfer.dropEffect = 'none';
	}
	// Hack for chrome
	if (window.chrome) {
       event.dataTransfer.dropEffect = 'copy';
	}

    event.preventDefault();
    return false;
};

//dragLeave
BotViewer.prototype.dragLeave = function(event) {
    event.dataTransfer.dropEffect = 'move';

	var attributeName = event.dataTransfer.getData('Text');
	var attribute = this.characterAttributes[attributeName];
	if (attribute!=undefined) {
		attribute.setParentBot(null);
		this.htmlAttributesBox.removeChild(attribute.htmlElement);
		delete this.characterAttributes[attributeName];
	}

    event.preventDefault();
    return false;
};

//dropCharacterAttribute
BotViewer.prototype.dropCharacterAttribute = function(event) {
	var bot = this.getBot();
	var attributeName = event.dataTransfer.getData('Text');

	if (attributeName.substring(0, 10)=="attribute|")
	{
		bot.createCharacterAttribute(attributeName.substring(10, attributeName.length));
	}
    event.stopPropagation();
    return false;
};

//dropItemAttribute
BotViewer.prototype.dropItemAttribute = function(event, slot) {
	var bot = this.getBot();
	var attributeName = event.dataTransfer.getData('Text');
	if (attributeName.substring(0, 10)=="attribute|")
	{
		bot.createItemAttribute(slot, attributeName.substring(10, attributeName.length));
	}
    event.stopPropagation();
    return false;
};

//setAttributesList
BotViewer.prototype.setAttributesList = function() {
	var bot = this.getBot();
	var opts = this.htmlAttributeList.options;
	for(var i=0; i<opts.length; i++) {
		bot.setAttribute(opts[i].value, opts[i].selected);
	}
	this.update(UPDATE_FIELD_ATTRIBUTE_LIST);
};

//setTagsList
BotViewer.prototype.setTagsList = function() {
	var bot = this.getBot();
	var opts = this.htmlTagList.options;
	//for(var i=0; i<opts.length; i++) {
	for(var i in opts) {
		bot.setTag(opts[i].value, opts[i].selected);
	}
	this.update(UPDATE_FIELD_TAG_LIST);
};

//addChangeEvent
BotViewer.prototype.addChangeEvent = function() {
	var bot = this.getBot();
	bot.addMutableAttributes(BOT_VIEWER_DEFAULT_TAB_NAME);
	//bot.setStockItems(BOT_VIEWER_DEFAULT_TAB_NAME);
	this.update();
};

/*********************
 * UPDATE
 *********************/

BotViewer.prototype.updateTankStartingPath = function() {
	var startingPath = this.getBot().tankStartingPath;
	for (var i =0; i< this.htmlTrackList.options.length; i++) {
		var option = this.htmlTrackList.options[i];
		if (option.value == startingPath) {
			this.htmlTrackList.selectedIndex = i;
			break;
		}
	}
}

BotViewer.prototype.updateScale = function() {
	//this.inputScale.value =  this.getBot().getScale();
	this.updateNumeric(this.inputScale, this.getBot().getScale());
}

BotViewer.prototype.updateSkill = function() {
	var skill = this.getBot().getSkill();
	for (var i in this.skillButtons) {
		if (this.skillButtons[i].skillvalue == skill) {
			this.skillButtons[i].id = "botskillselected";
		} else {
			this.skillButtons[i].id = "";
		}
	}
}

BotViewer.prototype.updateBehaviour = function() {
	var behaviour = this.getBot().getBehaviour().toLowerCase();
	for (var i in this.behaviourButtons) {
		if (this.behaviourButtons[i].behaviourValue.toLowerCase() == behaviour) {
			this.behaviourButtons[i].id = "botBehaviourSelected";
		} else {
			this.behaviourButtons[i].id = "";
		}
	}
}

BotViewer.prototype.updateWeaponRestriction = function() {
	var weapon = this.getBot().getWeaponRestriction();
	for (var i in this.weaponSlot) {
		removeClassName(this.weaponSlot[i], "TFClassIconGrey");
		removeClassName(this.htmlItemsBox[i], "botItemAttributesRestricted");
	}

	for (var i in this.restrictionButtons) {
		if (this.restrictionButtons[i].restrictionValue == weapon) {
			this.restrictionButtons[i].id="WeaponRestrictionSelected";
			if (i!=0) {
				removeClassName(this.weaponSlot[i-1], "TFClassIconGrey");
				removeClassName(this.htmlItemsBox[i-1], "botItemAttributesRestricted");
			}
		} else {
			this.restrictionButtons[i].id="";
			if (i!=0&&weapon!="All") {
				addClassName(this.weaponSlot[i-1], "TFClassIconGrey");
				addClassName(this.htmlItemsBox[i-1], "botItemAttributesRestricted");
			}
		}
	}
}

BotViewer.prototype.updateMaxVisionRange = function() {
	this.updateNumeric(this.inputMaxVisionRange, this.getBot().getMaxVisionRange());
}    

BotViewer.prototype.updateAutoJumpMin = function() {
	this.updateNumeric(this.inputAutoJumpMin, this.getBot().getAutoJumpMin());
}        

BotViewer.prototype.updateAutoJumpMax = function() {
	this.updateNumeric(this.inputAutoJumpMax, this.getBot().getAutoJumpMax());
}
		   /*
BotViewer.prototype.updateMaxVisionRange = function() {
	this.inputMaxVisionRange.value =  this.getBot().getMaxVisionRange();
}            */

BotViewer.prototype.updateTankSpeed = function() {
	this.inputSpeed.value =  this.getBot().getTankSpeed();
}

BotViewer.prototype.updateTemplate = function() {
	var o = null;
	var template = this.getBot().getTemplate();
	if (template!="") {//invalid argument in ie if named item called with ""
		o = this.htmlTemplateList.namedItem(template);
	}else{
		o = this.htmlTemplateList[0];
	}
	if (o) {
		o.selected = true;
	}
}

BotViewer.prototype.updateClassIcon = function() {
	var o = null;
	var classIcon = this.getBot().getClassIcon();
	if (classIcon!="") {//invalid argument in ie if named item called with ""
		o = this.htmlClassIconList.namedItem(classIcon);
	}else{
		o = this.htmlClassIconList[0];
	}
	if (o) {
		o.selected = true;
	}
}

BotViewer.prototype.updateClass = function() {
	var classId = this.getBot().getClassId();
    if (classId>=0&&classId<10) //TODO:const
    {
    	this.className = classes[classId];
		this.classIcon = this.className.toLowerCase();

		for (var i in this.classButtons) {
			addClassName(this.classButtons[i], "TFClassIconGrey")
		}
		removeClassName(this.classButtons[classId], "TFClassIconGrey")

		//this.htmlBackground.className = "botBackGround TFClassLarge " + ClassLarge[this.className.toLowerCase()];
		this.htmlLargeElement.className = "tfBotLarge " + ClassLarge[this.className.toLowerCase()];
		
		
         
		var tankClass = cssGetClass('.tankOnly'); 
		var botClass = cssGetClass('.botOnly');
		if (classId<9)
		{ 
			if (tankClass) {
				tankClass.style.display="none";
			}
			if (botClass) {
				botClass.style.display="";
			}
			//cssGetClass('.botOnly').style.display="";
			// set character head
			var div = this.weaponSlot[SLOT_CHARACTER];
			var style = "ItemSelectorElementImg ItemSelectedElementImg " + ClassThumb[this.className.toLowerCase()];
			div.className = style;
		} else {
			/*cssGetClass('.botOnly').style.display="none";
			cssGetClass('.tankOnly').style.display="";*/      
			if (tankClass) {
				tankClass.style.display="";
			}
			if (botClass) {
				botClass.style.display="none";
			}
		}
	}
}

BotViewer.prototype.updateAttributeList = function() {
	var bot = this.getBot();
	var opts = this.htmlAttributeList.options;
	var attributesList = bot.getAttributes();

	//for(var i=0; i<opts.length; i++) {
	for(var i in opts) {
		var o = opts[i];
		if (o) {
			if (o.selected != attributesList[o.value]) {
				o.selected = attributesList[o.value];
			}
		}
	}
}

BotViewer.prototype.updateTagList = function() {
	var bot = this.getBot();
	var opts = this.htmlTagList.options;
	var attributesList = bot.getTags();

	//for(var i=0; i<opts.length; i++) {
	for(var i in opts) {
		var o = opts[i];
		if (o) {
			if (o.selected != attributesList[o.value]) {
				o.selected = attributesList[o.value];
			}
		}
	}
}

//updateCharacterAttributes
BotViewer.prototype.updateCharacterAttributes = function() {
	var bot = this.getBot();
	var attributes = bot.getCharacterAttributes();//characterAttributes;
	//for (var attrib=0; attrib<attributes.length; attrib++) {
	this.htmlAttributesBox.innerHTML = "";
	for (var attrib in attributes) {
		//this.characterAttributes[attributeName] = attribute;
		var attribute = attributes[attrib];
		attribute.show();
		this.htmlAttributesBox.appendChild(attribute.htmlElement);
	}
	//this.htmlAttributesBox.appendChild(attribute.htmlElement);
	//this.characterAttributes[attributeName] = attribute;
}

//updateItemAttributes
BotViewer.prototype.updateItemAttributes = function() {
	var bot = this.getBot()
 	var iA = bot.getItemAttributes();
	for (slot=0; slot<=SLOT_MAX; slot++)
	{
		//var itemAttributes = bot.itemsAttributes[slot];
		//var itemAttributes = bot.getItemAttributes(/*slot*/)[slot];
		var itemAttributes = iA[slot];


		this.htmlItemsAttributesBox[slot].innerHTML = "";
		//for (var attrib=0; attrib<itemAttributes.length; attrib++) {
		for (var attrib in itemAttributes) {
			var attribute = itemAttributes[attrib];
			attribute.show();
			this.htmlItemsAttributesBox[slot].appendChild(attribute.htmlElement);
		}
	}
}

//updateItems
BotViewer.prototype.updateItems = function() {
	var bot = this.getBot();
	for (slot=0; slot<=SLOT_MAX; slot++)
	{
		var weapon = bot.getItem(slot);
		if (weapon!=null) {
			removeClassName(this.weaponSlot[slot], "ItemAddElementImg");
			this.weaponSlot[slot].style.backgroundImage = 'url("img/' + weapon.image + '.png")';
		} else {
			this.weaponSlot[slot].style.backgroundImage = 'url("../style/img/add.svg")';
			this.weaponSlot[slot].style.backgroundImage = '';
			if (slot>2) {
				addClassName(this.weaponSlot[slot], "ItemAddElementImg");
			}
		}
	}
}

//updateTankSkin
BotViewer.prototype.updateTankSkin = function() {
	this.htmlTankSkin.checked  =  this.getBot().getTankSkin();
}

//updateName
BotViewer.prototype.updateName = function() {
	this.htmlInputName.value  =  this.getBot().getName();
}

//updateHealth
BotViewer.prototype.updateHealth = function() {
	/*var health = this.getBot().getHealth();

	if (isNaN(health)) {
	    this.inputHealth.id = "mvmNaNinput";

	} else {
		this.inputHealth.value = health;
	    this.inputHealth.id = "";
	}     */
	this.updateNumeric(this.inputHealth, this.getBot().getHealth());
}

//updateNumeric
BotViewer.prototype.updateNumeric = function(input, value) {
	if (isNaN(value)) {
	    input.id = "mvmNaNinput";

	} else {
		input.value = value;
	    input.id = "";
	}
}



//updateEventChangeAttributes
BotViewer.prototype.updateEventChangeAttributes = function() {
	var bot = this.getBot();
	this.tabBar.removeAllTabs();

	var changeAttributesList = bot.getMutableAttributes();
	for (var attribute in changeAttributesList) {
		var tab = this.addTab(attribute);

	}


	this.disableNotification=true;
	try {
		this.getTab(bot.getCurrentMutableAttributeName()).activate();
	}
	finally {
		this.disableNotification=false;
	}
}

BotViewer.prototype.updateFields[UPDATE_FIELD_TANK_STARTING_PATH] = BotViewer.prototype.updateTankStartingPath;
BotViewer.prototype.updateFields[UPDATE_FIELD_SCALE] = BotViewer.prototype.updateScale;
BotViewer.prototype.updateFields[UPDATE_FIELD_SKILL] = BotViewer.prototype.updateSkill;
BotViewer.prototype.updateFields[UPDATE_FIELD_BEHAVIOUR] = BotViewer.prototype.updateBehaviour;
BotViewer.prototype.updateFields[UPDATE_FIELD_WEAPON_RESTRICTION] = BotViewer.prototype.updateWeaponRestriction;
BotViewer.prototype.updateFields[UPDATE_FIELD_MAX_VISION_RANGE] = BotViewer.prototype.updateMaxVisionRange;   
BotViewer.prototype.updateFields[UPDATE_FIELD_AUTO_JUMP_MIN] = BotViewer.prototype.updateAutoJumpMin;   
BotViewer.prototype.updateFields[UPDATE_FIELD_AUTO_JUMP_MAX] = BotViewer.prototype.updateAutoJumpMax;
BotViewer.prototype.updateFields[UPDATE_FIELD_TEMPLATE] = BotViewer.prototype.updateTemplate;
BotViewer.prototype.updateFields[UPDATE_FIELD_CLASSICON] = BotViewer.prototype.updateClassIcon;
BotViewer.prototype.updateFields[UPDATE_FIELD_CLASS] = BotViewer.prototype.updateClass;
BotViewer.prototype.updateFields[UPDATE_FIELD_ATTRIBUTE_LIST] = BotViewer.prototype.updateAttributeList;
BotViewer.prototype.updateFields[UPDATE_FIELD_CHARACTER_ATTRIBUTES] = BotViewer.prototype.updateCharacterAttributes;
BotViewer.prototype.updateFields[UPDATE_FIELD_ITEM_ATTRIBUTES] = BotViewer.prototype.updateItemAttributes;
BotViewer.prototype.updateFields[UPDATE_FIELD_CHANGE_ATTRIBUTES] = BotViewer.prototype.updateEventChangeAttributes;
BotViewer.prototype.updateFields[UPDATE_FIELD_TANK_SKIN] = BotViewer.prototype.updateTankSkin;
//BotViewer.prototype.updateFields[UPDATE_FIELD_STARTING_PATH] = BotViewer.prototype.updateTankSkin;
BotViewer.prototype.updateFields[UPDATE_FIELD_TANK_SPEED] = BotViewer.prototype.updateTankSpeed;
BotViewer.prototype.updateFields[UPDATE_FIELD_NAME] = BotViewer.prototype.updateName;
BotViewer.prototype.updateFields[UPDATE_FIELD_HEALTH] = BotViewer.prototype.updateHealth;
BotViewer.prototype.updateFields[UPDATE_FIELD_TAG_LIST] = BotViewer.prototype.updateTagList;
BotViewer.prototype.updateFields[UPDATE_FIELD_ITEMS] = BotViewer.prototype.updateItems;