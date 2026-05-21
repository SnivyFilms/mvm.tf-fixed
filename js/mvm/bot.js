var ATTRIBUTE_MINIBOSS = "MiniBoss";
var ATTRIBUTE_CRIT_BOOST = "AlwaysCrit";
var ATTRIBUTE_BOSS_HEALTH_BAR = "UseBossHealthBar";

var DEFAUT_EVENT_CHANGE = "Default";

function Bot(templateName, isUserTemplate)
{
	this.mutableAttributes = {};


	this.name = "";
	this.templateBot = null;
	this.template = "";
	this.className = "";
	this.classIcon = "";
	this.classId = 0;
	this.health = "";
	this.autoJumpMin = "";
	this.autoJumpMax = "";
	this.scale = "";
	this.tankSpeed = "";
	this.hasFinalTankSkin = 0;
	this.tankStartingPath = "";

	this.inputHealth = null;
	this.inputAutoJumpMin = null;
	this.inputAutoJumpMax = null;
	this.locked = false;
	this.stockTemplate = false;

	this.selected = false;
	this.weaponSlot = new Array();
	this.notifyList =  new Array();
	this.attributesList = {};

	this.isUserTemplate = false;

	this.waveSpawn = null;
	this.isMiniBoss = false;
	this.isCritBoosted = false;
	this.hasBossHealthBar = false;
	this.teleportWhere = ""; 
	this.create();   
	
	this.addMutableAttributes();


////////
	if (typeof Bot.initialized == "undefined")
	{

		Bot.itemSelectorPanel = this.createElement("div", document.body, "itemSelectorPanel");
		Bot.itemSelector = this.createElement("div", Bot.itemSelectorPanel, "ItemSelector", null, "help_item_selector");

		Bot.itemSelectorPanel.style.visibility = 'hidden';
		addEvent(Bot.itemSelectorPanel, "click", function(event) {Bot.itemSelectorPanel.style.visibility = 'hidden';}, false);

		// reloadWeapons
		Bot.prototype.reloadWeapons = function(slot)
		{
			Bot.itemSelector.innerHTML="";
			
			var primary = itemList.getItems(this.classId, slot);
			if (slot>2) primary.unshift(null);// add a remove button for hat & misc
			for (var i in primary) {
				var w = primary[i];

				var itemDiv = this.createElement("div", Bot.itemSelector, "ItemSelectorElement", null/*, "help_selector_element"*/);
				var div = this.createElement("div", Bot.itemSelector, "ItemSelectorElementImg");
				div.item = w;
				if (w!= null) {
					itemDiv.innerHTML = w.itemName;
					div.style.backgroundImage = 'url("img/' + w.image + '.png")';
				}
				else {
	   				addClassName(div, "ItemRemoveElementImg");
				}
				
				addEvent(div, "click", function() {this.ownerObject.setItem(this.item, slot);}, false);
				
				itemDiv.appendChild(div);
				//Bot.itemSelector.appendChild(itemDiv);
			}
			
		};
		// setTankSpeed @speed: integer
		Bot.prototype.setTankSpeed = function(tankSpeed) {
			if (!this.tankSpeed != tankSpeed)
			{
				if (isNumber(tankSpeed))
				{
					this.tankSpeed = tankSpeed;
				}
				else{
					this.tankSpeed = NaN;
				}
			}
			this.onModified();
		}
		// setTankSkin @finalSkin: bool
		Bot.prototype.setTankSkin = function(finalSkin) {
			this.hasFinalTankSkin = finalSkin;
		}
		// getTankSkin
		Bot.prototype.getTankSkin = function() {
			return this.hasFinalTankSkin;
		}
		// getTankSpeed
		Bot.prototype.getTankSpeed = function() {
			return this.tankSpeed;
		}
		// setTankStartingPath
		Bot.prototype.setTankStartingPath = function(tankStartingPath) {
			this.tankStartingPath = tankStartingPath;
			//this.htmlTankSkin.checked  = finalSkin;
			this.htmlTankTrack.value = tankStartingPath;
		}
		//setScale
		Bot.prototype.setScale = function(scale) {
			if (this.stockTemplate&&this.locked) return false;
			if (this.scale != scale)
			{
				if (scale != ""&&!isNumber(scale)) {
					this.scale = NaN;
				}
				else {
					if (isNumber(scale))
					{
						if (scale>2.5) scale = 2.5;
						if (scale<0.25) scale = 0.25;
					}
					this.scale = scale;
				}
				this.onModified();
			}
		}

		//randomize
		Bot.prototype.randomize = function() {
			var templatecount = templateList.getCount()
			if (templatecount>0&&globalPopulation.randomizeTemplatesOnly)
			{
				var template = templateList.getTemplateById(getRandom(0,templatecount));
				this.setTemplate(template);
				this.applyTemplate();
			}
			else { //no template
				// pickup a class
				this.setClass(getRandom(0,9), true);

				//Give him some items
				for (var slotid=0; slotid<5; slotid++)
				{
					var count = itemList.getItemsCount(this.classId, slotid);
					var rand = getRandom(0, count);
					//console.log("Slot: " + slotid + " item : " + rand);
					this.setItem(itemList.getItem(this.classId, slotid, rand),slotid);
				}

				var geant = getRandom(1,10);
				if (geant==1)
				{
					this.setScale(2);
					this.setHealth(this.health*10);
				}
				else
				{
					var dwarf = getRandom(1,20);
					if (dwarf==1)
					{
						this.setScale(0.5);
						this.setHealth(Math.floor(this.health/2));
					}
				}
			}
		};

		//setTemplate
		Bot.prototype.setTemplate = function(template) {
			if (this.stockTemplate&&this.locked) return false;
			if (this.locked) return false;
			
			this.template = template;
			var bot = templateList.getTemplate(this.template);
			if (bot!=undefined) {
				bot.addChild(this);
				this.templateBot = bot;
				this.setClass(bot.getClassId(), true);
			}else{
				this.templateBot = null;
				this.setClass(0, true);
			}
			this.onModified();
			return true;
		};
		//getTemplate
		Bot.prototype.getTemplate = function() {
			return this.template;
		}
		//getClassIcon
		Bot.prototype.getClassIcon = function() {
			if (this.templateBot) {
				return this.templateBot.getClassIcon();
			}
			return this.classIcon;
		}
		//addAttribute
		Bot.prototype.addAttribute = function(attribute) {
			if (this.stockTemplate&&this.locked) return false;
			var option = this.createElement("option", this.htmlAttributeList, "botOption", null, "help_bot_attribute");
			option.value = attribute;option.id = attribute;option.innerHTML = attribute;
		};
		/*//setAttribute
		Bot.prototype.setAttribute = function(attribute) {
			if (this.stockTemplate&&this.locked) return false;
			var o=null;
			if (attribute!="") {
				o = this.htmlAttributeList.namedItem(attribute);
			}else{
				o = this.htmlAttributeList[0];
			}
			if (o) o.selected = true;

			this.attributesList = attribute;
			this.onModified();
		};        */
		//attributesListChange
		Bot.prototype.attributesListChange = function() {
			var opts = this.htmlAttributeList.options;
			for(var i=0; i<opts.length; i++) {
				this.setAttribute(opts[i].value, opts[i].selected);
			}
		};
		//setName
		Bot.prototype.setName = function(name) {
			//if (this.stockTemplate&&this.locked) return false;
			this.name = name;
			//this.htmlInputName.value = name;
			//this.onModified();
		};
	/*	//getName
		Bot.prototype.getName = function() {
			if (this.name!="") return this.name;
			return this.className;
		};*/
		//setClassIcon
		Bot.prototype.setClassIcon = function(classIcon) {
			/*var pos = classIcon.lastIndexOf("_giant")
			if (pos!=-1) {
				classIcon=classIcon.substring(0, pos);
			}*/
			this.classIcon = classIcon;   
			this.onModified();
			//this.onModified();
		};
		//applyTemplate
		Bot.prototype.applyTemplate = function() {
			var bot = templateList.getTemplate(this.template);
			this.copyBot(bot);
		};
		//copyBot
		Bot.prototype.copyBot = function(bot) {
			if (bot == null) return;

			this.removeAllAttributes();
			this.removeAllCharacterAttribute();

			this.templateName = bot.templateName;
			this.setName(bot.getName());
			this.setClass(bot.getClassId(), true);
			this.setHealth(bot.getHealth());
			this.setAutoJumpMin(bot.getAutoJumpMin());
			this.setAutoJumpMax(bot.getAutoJumpMax());
			
			this.setMaxVisionRange(bot.getMaxVisionRange());
			this.setScale(bot.getScale());
			this.classIcon = bot.classIcon;
			/*for (var i=0; i<5; i++) {
				this.setItem(bot.getItem(i),i);
			}*/

			/*for (var i in bot.attributesList) {
				this.setAttribute(i,bot.attributesList[i]);
			} */

			for (var mA in bot.mutableAttributes) {
				var copyMutableAttributes = bot.mutableAttributes[mA];
				//Add new mutable attribute
				var newMutableAttributes = this.addMutableAttributes(mA);
                              
				newMutableAttributes.copyBotAttributes(copyMutableAttributes);
				        

				for (var i in bot.getAttributes(mA)) {
					this.setAttribute(i,bot.getAttribute(i, mA), mA);
				}

				for (var i=0; i<5; i++) {
					this.setItem(bot.getItem(i, mA),i, mA);
				}				
				
				//copy character attributes
				var characterAttributes = bot.getCharacterAttributes(mA);
				for (var i in characterAttributes) {
					var newAttribute = this.createCharacterAttribute(i);
					if (newAttribute){
						newAttribute.setValue(characterAttributes[i].getValue());
					}
				}

				var itemAttributes = bot.getItemAttributes(mA);
				for (var i in itemAttributes) {
					for (var j in itemAttributes[i]) {
						var newAttribute = this.createItemAttribute(i, j);
						if (newAttribute){
							newAttribute.setValue(itemAttributes[i][j].getValue());
						}
					}
				}
			}

			this.setCurrentMutableAttributes();
			this.onModified();
		};
		//getClass
		Bot.prototype.getClass = function() {
			return this.className;
		};
		//getClassId
		Bot.prototype.getClassId = function() {
			if (this.templateBot) {
				return this.templateBot.getClassId();
			}
			return this.classId;
		};
		//getHealth
		Bot.prototype.getHealth = function() {
			if (this.templateBot&&this.health=="") {
				return this.templateBot.health;
			}
			return this.health;
		}; 
		//getAutoJumpMin
		Bot.prototype.getAutoJumpMin = function() {
			if (this.templateBot&&this.autoJumpMin=="") {
				return this.templateBot.autoJumpMin;
			}
			return this.autoJumpMin;
		};
		//getAutoJumpMax
		Bot.prototype.getAutoJumpMax = function() {
			if (this.templateBot&&this.autoJumpMax=="") {
				return this.templateBot.autoJumpMax;
			}
			return this.autoJumpMax;
		};
		//getTeleportWhere
		Bot.prototype.getTeleportWhere = function() {
			if (this.templateBot&&this.teleportWhere=="") {
				return this.templateBot.teleportWhere;
			}
			return this.teleportWhere;
		};
		//getName
		Bot.prototype.getName = function() {
			if (this.templateBot&&this.name=="") {
				return this.templateBot.name;
			}
			if (this.name!="") return this.name;
			return this.className;
			//return this.name;
		};
		//getScale
		Bot.prototype.getScale = function() {
			if (this.templateBot&&this.scale=="") {
				return this.templateBot.scale;
			}
			return this.scale;
		};
		//setView
		Bot.prototype.setView = function(view) {
			this.view = view;
		};
		//notifyTemplateModified
		Bot.prototype.notifyTemplateModified = function() {
			this.applyTemplate();
		};
		//addChild
		Bot.prototype.addChild = function(bot) {
			this.notifyList.push(bot);
		};
		//setTemplateName
		Bot.prototype.setTemplateName = function(templateName) {
			this.templateName = templateName;
			if (templateName!=undefined&&templateName.toLowerCase().indexOf("sentrybuster")!=-1)
				this.isSentryBuster = true;
			else
				this.isSentryBuster = false;
		};
		//loadXml
		Bot.prototype.loadXml = function(node, lockMe) {
			var lowernodename = node.nodeName.toLowerCase();
			if (lowernodename != "tfbot"&&lowernodename != "tank") this.setTemplateName(node.nodeName);
			if (lowernodename == "tank")
				this.setClass(9, true);

			// ensure class property is set first
			for (var i=0; i<node.attributes.length; i++)
			{
				var attribute = node.attributes[i];
				var lowernodename = attribute.nodeName.toLowerCase();
				switch (lowernodename){
					case "class":
						var id = classesreverse[attribute.nodeValue];
						if (id != undefined)
							this.setClass(id, true);
						break;
				}
			}

			for (var i=0; i<node.attributes.length; i++)
			{
				var attribute = node.attributes[i];
				var lowernodename = attribute.nodeName.toLowerCase();
				switch (lowernodename){
					case "class":
						//var id = classesreverse[attribute.nodeValue];
						//if (id != undefined)
						//	this.setClass(id, true);
						break;
					case "skill":
						this.setSkill(attribute.nodeValue);
						break;
					case "weaponrestrictions":
						this.setWeaponRestriction(attribute.nodeValue);
						break;
					case "health":
						this.setHealth(attribute.nodeValue);
						break;
					case "autojumpmin":
						this.setAutoJumpMin(attribute.nodeValue);
						break;
					case "autojumpmax":
						this.setAutoJumpMax(attribute.nodeValue);
						break;
					case "teleportwhere":
						this.setTeleportWhere(attribute.nodeValue);
						break;
					case "scale":
						this.setScale(attribute.nodeValue);
						break;
					case "speed":
						this.setTankSpeed(attribute.nodeValue);
						break;
/*					case "attributes":
						this.setAttribute(attribute.nodeValue);
						break;*/
					case "behaviormodifiers":
						this.setBehaviour(attribute.nodeValue);
						break;
					case "name":
						this.setName(attribute.nodeValue);
						break;
					case "classicon":
						this.setClassIcon(attribute.nodeValue);
						break;
					case "stock":
						this.stockTemplate=true;
						//this.htmlAttributesBox.style.display = "none";
						break;
					case "template":
						if (this.setTemplate(attribute.nodeValue))
							this.applyTemplate();
						//this.stockTemplate=true;
						break;
					case "skin":
						this.setTankSkin((attribute.nodeValue==1)?true:false);
						break;
					case "startingpathtracknode":
						this.setTankTrack(attribute.nodeValue);
						break;
					case "tag":
						this.setTag(attribute.nodeValue, true);
						break;
					case "maxvisionrange":
						this.setMaxVisionRange(attribute.nodeValue);
						break;
						
				}
			}

			this.setCurrentMutableAttributes();
			for (var i=0; i<node.childNodes.length; i++)
			{
				var child = node.childNodes[i];
				var lowernodename = child.nodeName.toLowerCase();
				switch (lowernodename){
					case "eventchangeattributes":
						//console.log(node);
						this.loadXmlChangeAttributes(child);
						//console.log(child);
						break;
					case "item":
						var itemName = child.textContent || child.text;
						var item = itemList.getItemByClass(this.getClassId(), itemName);
						if (item) {
							this.setItem(item, item.slotId);
						}
						else {
							console.log("Unkown item : " + itemName);
						}
						break;
					case "attributes":
						var attributeName = child.textContent || child.text;
						this.setAttribute(attributeName, true);
						break;
					case "tag":
						var attributeName = child.textContent || child.text;
						this.setTag(attributeName, true);
						break;
					case "characterattributes":
						for (var j=0; j<child.attributes.length; j++)
						{
							var attribute = child.attributes[j];
							var newAttribute = this.createCharacterAttribute(attribute.nodeName);
							if (newAttribute){
								newAttribute.setValue(attribute.nodeValue);
							}
						}

						break;
					case "itemattributes":
						var itemname = "";
						// First we look for item name
						for (var j=0; j<child.attributes.length; j++)
						{
							var attribute = child.attributes[j];
							if (attribute.nodeName.toLowerCase() == "itemname") {
								itemname = attribute.nodeValue;//.toLowerCase();
								break;
	   						}
						}
						var item = itemList.getItemByClass(this.getClassId(), itemname);
						if (item) {
							// second, use item name to put attributes on right slot
							for (var j=0; j<child.attributes.length; j++)
							{
								var attribute = child.attributes[j];
								if (attribute.nodeName.toLowerCase() != "itemname") {
									var newAttribute = this.createItemAttribute(item.slotId, attribute.nodeName);
									if (newAttribute){
										newAttribute.setValue(attribute.nodeValue);
									}
								}
							}
						} else {
							console.warn("Unknown item while processing itemattributes: " + itemname + " for class " + this.getClassId());
						}
						break;
				}
			}
			if (lockMe!=false) {
				this.locked = true;
			}
		};
		//removeAllAttributes
		Bot.prototype.removeAllAttributes = function() {
			for(var i in this.mutableAttributes) {
				if (i!=DEFAUT_EVENT_CHANGE) {
					delete this.mutableAttributes[i];
				}
			}
		};
		//removeAllCharacterAttribute
		Bot.prototype.removeAllCharacterAttribute = function() {
			for(var i in this.mutableAttributes) {
				this.mutableAttributes[i].removeAllCharacterAttribute();
			}
		};
		//removeAllItemsAttribute
		Bot.prototype.removeAllItemsAttribute = function() {
			for (var i in this.itemsAttributes) {
				this.removeAllItemAttribute(i);
			}
		};
		//removeAllItemAttribute
		Bot.prototype.removeAllItemsAttribute = function(slot) {
			for (var i in this.itemsAttributes[slot]) {
				this.removeItemAttribute(slot, i);
			}
		};
		//removeCharacterAttribute
		Bot.prototype.removeCharacterAttribute = function(attributeName, mutableAttributes) {
			if (this.isLocked()) return null;

			mutableAttributes = mutableAttributes||this.currentMutableAttributes;
			if (this.getMutableAttribute(mutableAttributes).removeCharacterAttribute(attributeName)) {
				this.onModified();
			}
		};
		//removeItemAttribute
		Bot.prototype.removeItemAttribute = function(slot, attributeName, mutableAttributes) {
			if (this.isLocked()) return null;

			mutableAttributes = mutableAttributes||this.currentMutableAttributes;
			if (this.getMutableAttribute(mutableAttributes).removeItemAttribute(slot, attributeName)) {
				this.onModified();
			}
		};
		//dragLeave
		Bot.prototype.dragLeave = function(event) {
			event.dataTransfer.dropEffect = 'move';

			var attributeName = event.dataTransfer.getData('Text');
			if (this.removeCharacterAttribute(attributeName)) {
				this.onModified();
			}
			event.preventDefault();
			return false;
		};
		//drop
		Bot.prototype.drop = function(event) {
			var attributeName = event.dataTransfer.getData('Text');

			if (attributeName.substring(0, 10)=="attribute|")
			{
				this.createCharacterAttribute(attributeName.substring(10, attributeName.length));
			}
			event.stopPropagation();
			return false;
		};
		//drop
		/*Bot.prototype.drop2 = function(event, slot) {
			var attributeName = event.dataTransfer.getData('Text');
			if (attributeName.substring(0, 10)=="attribute|")
			{
				this.createItemAttribute(slot, attributeName.substring(10, attributeName.length));
			}
			event.stopPropagation();
			return false;
		};*/
		/*//clearTagList
		Bot.prototype.clearTagList = function() {
			while (this.htmlTagList.options.length>0) {
				this.htmlTagList.removeChild(this.htmlTagList.options[0]);
				delete this.htmlTagList.options[0];
			}
		}*/
		//clearTrackList
		Bot.prototype.clearTrackList = function() {
			while (this.htmlTrackList.options.length>0) {
				this.htmlTrackList.removeChild(this.htmlTrackList.options[0]);
				delete this.htmlTrackList.options[0];
			}
		}
		//updateMapName TODO:remove
		Bot.prototype.updateMapName = function(mapName) {
			//this.updateTagList(mapName);
			//this.updateTrackList(mapName);
		}
		//updateTagList
		/*Bot.prototype.updateTagList = function(mapName) {
			var map = MapList[mapName];
			if (map==undefined) return;
			this.clearTagList();

			for (var i in map.navs) {
				var nav = map.navs[i];
				var option = this.createElement("option", this.htmlTagList, "spawnList");
				option.id = nav;
				option.innerHTML = nav;//"<div class='templateOption " + newbot.getClassIconStyle() +"' ></div>" + botname;
				option.value = nav;
			}
		}*/
		//updateTrackList
		/*Bot.prototype.updateTrackList = function(mapName) {
			var map = MapList[mapName];
			if (map==undefined) return;
			this.clearTrackList();

			for (var i in map.tankPaths) {
				var nav = map.tankPaths[i];
				var option = this.createElement("option", this.htmlTrackList, "spawnList");
				option.id = nav;
				option.innerHTML = nav;//"<div class='templateOption " + newbot.getClassIconStyle() +"' ></div>" + botname;
				option.value = nav;
			}
			if (map.tankPaths.length>0) {
				this.setTankTrack(map.tankPaths[0]);
			}
		}*/
		//setTankTrack
		Bot.prototype.setTankTrack = function(tankStartingPath) {
			if (this.tankStartingPath == tankStartingPath) return;
			this.tankStartingPath = tankStartingPath;

			/*for (var i =0; i< this.htmlTrackList.options.length; i++) {
				var option = this.htmlTrackList.options[i];
				if (option.value==tankStartingPath) {
					this.htmlTrackList.selectedIndex = i;
					return;
				}
			}*/
		}
		//setWaveSpawn
		Bot.prototype.setWaveSpawn = function(waveSpawn) {
			if (waveSpawn==undefined)this.waveSpawn = null;
			else this.waveSpawn = waveSpawn;
		};
		//showUnselected
		Bot.prototype.showUnselected = function() {
			this.updateIcon(false);
		};
		//showSelected
		Bot.prototype.showSelected = function() {
			this.updateIcon(true);
		};
		//showItemSelector
		Bot.prototype.showItemSelector = function(slotId) {
			if (this.stockTemplate&&this.locked) return false;
			this.reloadWeapons(slotId);
			Bot.itemSelectorPanel.style.visibility = 'visible';
		};
/*		//getHelpText
		Bot.prototype.getHelpText = function() {
			return "this is a bot";
		};*/
		Bot.initialized = true;
	}
////////
	
	this.classButtons = new Array();
	this.skillButtons = new Array();
	this.restrictionButtons = new Array();
	this.behaviourButtons = new Array();

	this.setClass = function(classId, force) {
		if (!force) {
			if (this.locked) return false;
			if (this.templateBot) return false;
		}
		if (classId>=0&&classId<10)
		{
			this.className = classes[classId];
			this.classIcon = this.className.toLowerCase();
			this.classId = classId;
			
			for (var i in this.classButtons) {
				addClassName(this.classButtons[i], "TFClassIconGrey")
			}
			removeClassName(this.classButtons[classId], "TFClassIconGrey")
			this.setHealth(classeshealth[classId]);
			this.setScale("");
			/*this.setSkill("Normal");
			this.setWeaponRestriction("All");
			this.setBehaviour("None");*/
			//this.reloadWeapons();
			Bot.itemSelectorPanel.style.visibility = 'hidden';
			
			if (classId<9)
			{
				for (var mA in this.mutableAttributes) {
					this.setStockItems(mA);
				}
			} else {
				if (this.htmlElement.parentElement.ownerObject.setSpawnCount != undefined) {
					this.htmlElement.parentElement.ownerObject.setSpawnCount(1);
				}
			}
		}
		this.htmlSmallElement.className = "tfBotSmall " + this.getClassIconStyle();
		this.onModified();
	}

	this.setHealth = function(health) {
		if (this.health != health)
		{
		 	if (isNumber(health))
			{
				this.health = health;
			}
			else {
				this.health = NaN;
			}   
			this.onModified();
		}
	}	 

	this.setAutoJumpMin = function(autoJumpMin) {
		if (this.autoJumpMin != autoJumpMin)
		{
			if (isNumber(autoJumpMin))
			{
				this.autoJumpMin = autoJumpMin;
			} else {
				this.autoJumpMin = NaN;
			}
			this.onModified();
		}
	}  

	this.setAutoJumpMax = function(autoJumpMax) {
		if (this.autoJumpMax != autoJumpMax)
		{
			if (isNumber(autoJumpMax))
			{
				this.autoJumpMax = autoJumpMax;
			} else {
				this.autoJumpMax = NaN;
			}
			this.onModified();
		}
	}

	this.setTeleportWhere = function(where) {
		this.teleportWhere = where;
	}

	this.remove = function() {
		if (this.htmlElement.parentElement.ownerObject.removeBot != undefined)
			this.htmlElement.parentElement.ownerObject.removeBot(this);
	}
	this.setClass(0, true);
	this.setScale("");
	this.setSkill("Normal");
	this.setWeaponRestriction("All");
	this.setBehaviour("None");
	this.setTankSpeed(75);//only for tank
	this.setTemplateName(templateName);
	
	return this;
}
Bot.prototype.createElement = CREATE_ELEMENT;

Bot.prototype.setWaveSpawnCurrentBot = function() {
	if (!this.waveSpawn) {
		return false
	}
	this.waveSpawn.setCurrentBot(this);
	return true;
}

////////////// Mutable Attributes
//addMutableAttributes //TODO
Bot.prototype.addMutableAttributes = function(changeEvent) {
	changeEvent = changeEvent||DEFAUT_EVENT_CHANGE;
	if (this.mutableAttributes[changeEvent] == undefined) {
		this.mutableAttributes[changeEvent] = new BotAttributes();
		this.setStockItems(changeEvent);
	}
	this.currentMutableAttributes = changeEvent;
	return this.mutableAttributes[changeEvent];
}

//renameMutableAttributes //TODO
Bot.prototype.renameMutableAttributes = function(oldName, newName) {
	if (oldName==newName || oldName==DEFAUT_EVENT_CHANGE || this.mutableAttributes[oldName]==undefined) {
		return;
	}
	this.mutableAttributes[newName] = this.mutableAttributes[oldName];
	delete this.mutableAttributes[oldName];
	this.setCurrentMutableAttributes(newName);
	this.onModified();
}

//getMutableAttributes //TODO
Bot.prototype.getMutableAttributes = function() {
	return this.mutableAttributes;
}

//getMutableAttribute //TODO
Bot.prototype.getMutableAttribute = function(changeEvent) {
	return this.mutableAttributes[changeEvent];
}

//getCurrentMutableAttributes //TODO
Bot.prototype.getCurrentMutableAttributeName = function() {
	return this.currentMutableAttributes;
}

//getCurrentMutableAttributes //TODO
Bot.prototype.getCurrentMutableAttribute = function() {
	return this.mutableAttributes[this.currentMutableAttributes];
}

//setCurrentMutableAttributes //TODO
Bot.prototype.setCurrentMutableAttributes = function(mutableAttributes) {
	if (mutableAttributes) {
		if (this.mutableAttributes[mutableAttributes]) {
			this.currentMutableAttributes = mutableAttributes;
		}
	} else {
		this.currentMutableAttributes = DEFAUT_EVENT_CHANGE;
	}
}

//removeMutableAttributes //TODO
Bot.prototype.removeMutableAttributes = function(mutableAttributes) {
	if (mutableAttributes && mutableAttributes != DEFAUT_EVENT_CHANGE) {
		if (this.mutableAttributes[mutableAttributes]) {
			delete this.mutableAttributes[mutableAttributes];
			this.currentMutableAttributes = DEFAUT_EVENT_CHANGE;
		}
	}
}

/////////////////// SETTERS
// setSkill //TODO
Bot.prototype.setSkill = function(skill, mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	if (this.stockTemplate&&this.locked) {
		return false;
	}

	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setSkill(skill);
		this.onModified();
	}
};

// setBehaviour @behaviour //TODO
Bot.prototype.setBehaviour = function(behaviour, mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	if (this.stockTemplate&&this.locked) {
		return false;
	}
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setBehaviour(behaviour);
		this.onModified();
	}
};

// setWeaponRestriction @weapon = 0, 1, 2, 3
Bot.prototype.setWeaponRestriction = function(weapon, mutableAttributes)
{
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	if (this.stockTemplate&&this.locked) {
		return false;
	}

	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setWeaponRestriction(weapon);
		this.onModified();
	}
};

//setMaxVisionRange
Bot.prototype.setMaxVisionRange = function(maxVisionRange, mutableAttributes)
{
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	if (this.stockTemplate&&this.locked) {
		return false;
	}
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setMaxVisionRange(maxVisionRange);
		this.onModified();
	}
};

// setItem @weapon: Weapon object
Bot.prototype.setItem = function(weapon, slot, mutableAttributes)
{
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setItem(weapon, slot);
		this.onModified();
	}
};

//createCharacterAttribute
Bot.prototype.createCharacterAttribute = function(attributeName, mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var botAttributes = this.getMutableAttribute(mutableAttributes);
	if (botAttributes && botAttributes.characterAttributes[attributeName]==undefined) {
		var attribute = new Attribute(attributeName);
		if (attribute) {
			attribute.setParentBot(this);
			attribute.hide();
			botAttributes.characterAttributes[attributeName] = attribute;
			this.onModified();
			return attribute;
		}
	}
	return null;
};

//createItemAttribute  //TODO
Bot.prototype.createItemAttribute = function(slot, attributeName, mutableAttributes) {
	if (this.isLocked()) return null;

	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var botAttributes = this.getMutableAttribute(mutableAttributes);

	if (botAttributes && botAttributes.itemsAttributes[slot][attributeName]==undefined) {
		var attribute = new Attribute(attributeName);
		if (attribute) {
			attribute.slotId = slot;
			attribute.setParentBot(this);
			attribute.hide();
			//this.htmlItemsAttributesBox[slot].appendChild(attribute.htmlElement);
			botAttributes.itemsAttributes[slot][attributeName] = attribute;
			this.onModified();
			return attribute;
		}
	}
	return null;
};

//setTag //TODO
Bot.prototype.setTag = function(navTag, checked, mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;

	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setNavTag(navTag, checked);
		//this.onModified();TODO ?
	}
}

//setAttribute         //TODO
Bot.prototype.setAttribute = function(attribute, checked, mutableAttributes) {

	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		mA.setAttribute(attribute, checked);
		//this.onModified();
	}
};

/////////////////// GETTERS
//getSkill //TODO
Bot.prototype.getSkill = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var currentSkill = "";
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		currentSkill = mA.getSkill();
	}

	if (this.templateBot&&currentSkill=="") {
		return this.templateBot.getSkill(mutableAttributes);
	}
	return currentSkill;
};
//getBehaviour //TODO
Bot.prototype.getBehaviour = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var currentBehaviour = "";
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		currentBehaviour = mA.getBehaviour();
	}

	if (this.templateBot&&this.currentBehaviour=="") {
		return this.templateBot.getBehaviour(mutableAttributes);
	}
	return currentBehaviour;
};
//getWeaponRestriction  //TODO
Bot.prototype.getWeaponRestriction = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var currentWeaponRestriction = "";
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		currentWeaponRestriction = mA.getWeaponRestriction();
	}

	if (this.templateBot&&currentWeaponRestriction=="") {
		return this.templateBot.getWeaponRestriction(mutableAttributes);
	}
	return currentWeaponRestriction ;
};
//getMaxVisionRange //TODO
Bot.prototype.getMaxVisionRange = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var currentVisionRange = "";
	var mA = this.getMutableAttribute(mutableAttributes);
	if (mA) {
		currentVisionRange = mA.getMaxVisionRange();
	}

	if (this.templateBot&&currentVisionRange=="") {
		return this.templateBot.getMaxVisionRange(mutableAttributes);
	}
	return currentVisionRange;
};
//getItem //TODO
Bot.prototype.getItem = function(slot, mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	var currentItem = this.getMutableAttribute(mutableAttributes).getItem(slot);
	//TODO ?
	/*if (this.templateBot&&currentVisionRange=="") {
		//return this.templateBot.maxVisionrange;
		return this.templateBot.getMaxVisionRange(mutableAttributes);
	} */
	return currentItem;
};
//getItems //TODO
Bot.prototype.getItems = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	return this.getMutableAttribute(mutableAttributes).getItems();
};

//getItemAttributes //TODO
Bot.prototype.getItemAttributes = function(/*slot, */mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	return this.getMutableAttribute(mutableAttributes).itemsAttributes;//[slot];
};

//getCharacterAttributes //TODO
Bot.prototype.getCharacterAttributes = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	return this.getMutableAttribute(mutableAttributes).characterAttributes;
};

//getAttributes
Bot.prototype.getAttributes = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	return this.getMutableAttribute(mutableAttributes).getAttributes();
};

//getAttribute
Bot.prototype.getAttribute = function(attribute,  mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	return this.getMutableAttribute(mutableAttributes).getAttribute(attribute);
};

//getNavTags //TODO
Bot.prototype.getTags = function(mutableAttributes) {
	mutableAttributes = mutableAttributes||this.currentMutableAttributes;
	return this.getMutableAttribute(mutableAttributes).getTags();
}

/**
 * Get the template name
 * @return {String} Template name
 */
Bot.prototype.getTemplateName = function() {
	return this.templateName;
}

/**
 * Get template bot
 * @return {Object} Template bot
 */
Bot.prototype.getTemplateBot = function() {
	return this.templateBot;
}

////////////////////////////

//loadXmlChild
Bot.prototype.loadXmlChild = function(node, changeAttributes) {
	var lowernodename = node.nodeName.toLowerCase();

	for (var i=0; i<node.childNodes.length; i++)
	{
		var child = node.childNodes[i];
		var lowernodename = child.nodeName.toLowerCase();
		switch (lowernodename){
			case "item":
				var itemName = child.textContent || child.text;
				var item = itemList.getItemByClass(this.getClassId(), itemName);
				if (item) {
					this.setItem(item, item.slotId);
				}
				else {
					console.log("Unkown item : " + itemName);
				}
				break;
			case "attributes":
				var attributeName = child.textContent || child.text;
				this.setAttribute(attributeName, true);
				break;
			case "tag":
				var attributeName = child.textContent || child.text;
				this.setTag(attributeName, true);
				break;
			case "characterattributes":
				for (var j=0; j<child.attributes.length; j++)
				{
					var attribute = child.attributes[j];
					var newAttribute = this.createCharacterAttribute(attribute.nodeName);
					if (newAttribute){
						newAttribute.setValue(attribute.nodeValue);
					}
				}

				break;
			case "itemattributes":
				var itemname = "";
				// First we look for item name
				for (var j=0; j<child.attributes.length; j++)
				{
					var attribute = child.attributes[j];
					if (attribute.nodeName.toLowerCase() == "itemname") {
						itemname = attribute.nodeValue;
						break;
 					}
				}
				var item = itemList.getItemByClass(this.getClassId(), itemname);
				if (item) {
					// second, use item name to put attributes on right slot
					for (var j=0; j<child.attributes.length; j++)
					{
						var attribute = child.attributes[j];
						if (attribute.nodeName.toLowerCase() != "itemname") {
							var newAttribute = this.createItemAttribute(item.slotId, attribute.nodeName);
							if (newAttribute){
								newAttribute.setValue(attribute.nodeValue);
							}
						}
					}
				} else {
					console.warn("Unknown item while processing itemattributes: " + itemname + " for class " + this.getClassId());
					console.warn(node)
				}
				break;
		}
	}
	//if (lockMe!=false) this.locked = true;
};


//loadXmlChangeAttributes
Bot.prototype.loadXmlChangeAttributes = function(node) {
	var lowernodename = node.nodeName.toLowerCase();


	for (var i=0; i<node.childNodes.length; i++)
	{
		var child = node.childNodes[i];
		if (child.nodeType == child.ELEMENT_NODE) {

			// First, create event change attribute
			var eventChangeAttribute = child.nodeName
			this.addMutableAttributes(eventChangeAttribute);

			// Load attributes for this event change attribute
			this.loadXmlChildAttributes(child);

			// Load subelements for this event change attribute
			this.loadXmlChild(child, eventChangeAttribute);
  			this.setCurrentMutableAttributes();
		}
	}
};

//isLocked
Bot.prototype.isLocked = function() {
	return this.locked;
}

//isStockTemplate
Bot.prototype.isStockTemplate = function() {
	return this.stockTemplate;
}
//loadXmlChildAttributes
Bot.prototype.loadXmlChildAttributes = function(node) {
	var lowernodename = node.nodeName.toLowerCase();

	for (var i=0; i<node.attributes.length; i++)
	{
		var attribute = node.attributes[i];
		var lowernodename = attribute.nodeName.toLowerCase();
		switch (lowernodename){
			case "skill":
				this.setSkill(attribute.nodeValue);
				break;
			case "weaponrestrictions":
				this.setWeaponRestriction(attribute.nodeValue);
				break;
			case "health":
				this.setHealth(attribute.nodeValue);
				break;
			case "autojumpmin":
				this.setAutoJumpMin(attribute.nodeValue);
				break;
			case "autojumpmax":
				this.setAutoJumpMax(attribute.nodeValue);
				break;
			case "teleportwhere":
				this.setTeleportWhere(attribute.nodeValue);
				break;
			case "scale":
				this.setScale(attribute.nodeValue);
				break;
			case "speed":
				this.setTankSpeed(attribute.nodeValue);
				break;
/*					case "attributes":
				this.setAttribute(attribute.nodeValue);
				break;*/
			case "behaviormodifiers":
				this.setBehaviour(attribute.nodeValue);
				break;
			case "name":
				this.setName(attribute.nodeValue);
				break;
			case "classicon":
				this.setClassIcon(attribute.nodeValue);
				break;
			case "stock":
				this.stockTemplate=true;
				//this.htmlAttributesBox.style.display = "none";
				break;
			case "template":
				if (this.setTemplate(attribute.nodeValue))
					this.applyTemplate();
				//this.stockTemplate=true;
				break;
			case "skin":
				this.setTankSkin((attribute.nodeValue==1)?true:false);
				break;
			case "startingpathtracknode":
				this.setTankTrack(attribute.nodeValue);
				break;
			case "tag":
				this.setTag(attribute.nodeValue, true);
				break;
			case "maxvisionrange":
				this.setMaxVisionRange(attribute.nodeValue);
				break;

		}
	}
};

//setStockItems
Bot.prototype.setStockItems = function(mutableAttributes) {
	// Set weapons
	for (var j=0; j<=2; j++) {
		this.setItem(itemList.getStockWeapon(this.classId, j), j, mutableAttributes);
	}

	// Set hat / misc
	for (var j=3; j<=SLOT_MAX; j++) {
		this.setItem(null, j, mutableAttributes);
	}
}

//getExtendedName
Bot.prototype.getExtendedName = function() {
	var name = [];
	name.push(this.templateName);
	name.push(this.getClass());
	name.push(this.getHealth());

	for (var i in this.mutableAttributes) {
		for (var j=0; j<=SLOT_MAX; j++) {
			var item = this.getItem(j, i);
			if (item) {
				name.push(item.itemName);
			}
		}
		name.push(this.getWeaponRestriction(i)); 

		var attributes = this.getAttributes(i);
		for (var att in  attributes) {
			name.push(att);
		}

		var itemAttributes = this.getItemAttributes(i);
		for (var iA in  itemAttributes) {
			name.push(iA);
		}

		var characterAttributes = this.getCharacterAttributes(i);
		for (var cA in  characterAttributes) {
			name.push(cA);
		}
	}
	return name.join(" ");
}     
    
//showSmall
Bot.prototype.showSmall = function() {
	Show(this.htmlElement);
};
                                    
//hideLarge
Bot.prototype.hideSmall = function() {
	Hide(this.htmlElement);
};      
//onModified
Bot.prototype.onModified = function() {
	for (var i in this.notifyList) {
		var bot = this.notifyList[i];
		if (bot!=undefined) {
			bot.notifyTemplateModified();
		}
	}
	this.updateIcon();
	if (this.waveSpawn)this.waveSpawn.onBotUpdated();
	if (this.view)this.view.onBotUpdated();
};        
//updateIcon
Bot.prototype.updateIcon = function(selected) {
	if (selected!=undefined) this.selected = selected;
	if (this.selected) {
		this.htmlSmallElement.className = "tfBotSmall tfBotSmallSelected " + this.getClassIconStyle();
	} else {
		this.htmlSmallElement.className = "tfBotSmall " + this.getClassIconStyle();
	}
	this.htmlSmallElement.style.display = "";
};        
//getClassIconStyle
Bot.prototype.getClassIconStyle = function() {
	var classIcon = this.classIcon;
	var giant = (this.health > 1000)?true:false;

	var pos = classIcon.lastIndexOf("_giant")
	if (pos!=-1) {
		classIcon=classIcon.substring(0, pos);
		giant = true;
	}
	if (classIcon=="demo") classIcon = "demoman";
	if (classIcon=="heavy") classIcon = "heavyweapons";

	var style = ClassIcons[classIcon.toLowerCase()]
	if (style == undefined) return "";
	if (giant||this.isMiniBoss) style += " TFClassIconGiant";
	if (this.isCritBoosted) style += " TFClassIconCritBoost";
	if (this.hasBossHealthBar) style += " TFClassIconBossHealthBar";

	return style;
};       

//create	
Bot.prototype.create = function() {
	this.htmlElement = this.createElement("div", null, "TFBot", null, "help_bot");
	this.htmlSmallElement = this.createElement("div", this.htmlElement, "tfBotSmall", null, "help_bot_small");
	this.htmlSmallElement.style.display = "none";

	addEvent(this.htmlSmallElement, "click", function() {this.ownerObject.setWaveSpawnCurrentBot();}, false);

	this.hideSmall();
}




