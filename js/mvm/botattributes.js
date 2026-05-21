var ATTRIBUTE_MINIBOSS = "MiniBoss";
var ATTRIBUTE_CRIT_BOOST = "AlwaysCrit";
var ATTRIBUTE_BOSS_HEALTH_BAR = "UseBossHealthBar";

function BotAttributes()
{
	this.skill = "";                                           //gen
	//this.maxVisionRange = "";
	this.weaponRestriction = "";                               //gen
	this.behaviour = "";                                       //gen
	this.maxVisionRange = "";                                  //gen

	this.weaponSlot = new Array();
	this.items =  new Array();
	this.attributesList = {};                                   //gen
	this.tagList = {};

	this.characterAttributes =  {};
	this.itemsAttributes =  new Array();
	for (i=0; i<=SLOT_MAX; i++)
	{
		this.itemsAttributes[i] =  new Array();
   }
	this.isMiniBoss = false;
	this.isCritBoosted = false;
	this.hasBossHealthBar = false;

	this.setSkill("Normal");
	this.setWeaponRestriction("All");
	this.setBehaviour("None");
}

////////// SKILL
// setSkill
BotAttributes.prototype.setSkill = function(skill)
{
	this.skill = skill;
};
// getSkill
BotAttributes.prototype.getSkill = function()
{
	return this.skill;
};
////////// WEAPON RESTRICTION
// setWeaponRestriction @weapon = 0, 1, 2, 3
BotAttributes.prototype.setWeaponRestriction = function(weapon)
{
	this.weaponRestriction = weapon;
};
// getWeaponRestriction @weapon = 0, 1, 2, 3
BotAttributes.prototype.getWeaponRestriction = function()
{
	return this.weaponRestriction;
};
////////// BEHAVIOUR
// setBehaviour @//TODO
BotAttributes.prototype.setBehaviour = function(behaviour)
{
	this.behaviour = behaviour;
};
// getBehaviour
BotAttributes.prototype.getBehaviour = function(behaviour)
{
	return this.behaviour;
};
////////// ITEMS
// setItem @weapon: Weapon object
BotAttributes.prototype.setItem = function(weapon, slot) {            
	if (slot>=SLOT_COSMETIC&&this.items[slot]!=null&&weapon!=null) {   
		if (this.items[SLOT_COSMETIC+1]!=null) {  
			this.items[SLOT_COSMETIC]=this.items[SLOT_COSMETIC+1];
		}
		this.items[SLOT_COSMETIC+1]=weapon; 
	} else {      
		this.items[slot]=weapon;
	}
};
// getItem
BotAttributes.prototype.getItem = function(slot)
{
	return this.items[slot];
};
// getItems
BotAttributes.prototype.getItems = function()
{
	return this.items;
};


////////// ATTRIBUTES
//setAttribute //TODO
BotAttributes.prototype.setAttribute = function(attribute, checked) {
	this.attributesList[attribute] = checked;
	// Set miniboss
	if (attribute==ATTRIBUTE_MINIBOSS) {
		this.isMiniBoss = checked;
	}
	if (attribute==ATTRIBUTE_CRIT_BOOST) {
		this.isCritBoosted = checked;
	}
	if (attribute==ATTRIBUTE_BOSS_HEALTH_BAR) {
		this.hasBossHealthBar = checked;
	}
};
//getAttribute //TODO
BotAttributes.prototype.getAttribute = function(attribute) {
	return this.attributesList[attribute];
};
//getAttributes //TODO
BotAttributes.prototype.getAttributes = function() {
	return this.attributesList;
};
//getTag //TODO
BotAttributes.prototype.getTag = function(tag) {
	return this.tagList[tag];
};
//getTags //TODO
BotAttributes.prototype.getTags = function() {
	return this.tagList;
};

////////// MAX VISION RANGE
//setMaxVisionRange //TODO
BotAttributes.prototype.setMaxVisionRange = function(maxVisionRange) {
	this.maxVisionRange = maxVisionRange;

	/*if (isNumber(maxVisionRange)||maxVisionRange=="") TODO
	{
		this.maxVisionRange = maxVisionRange;
		this.getMutableAttributes(mutableAttributes).setMaxVisionRange(weapon);
	}
	else {
		this.maxVisionRange = NaN;
	}*/
};
//getMaxVisionRange //TODO
BotAttributes.prototype.getMaxVisionRange = function() {
	return this.maxVisionRange;
};
////////// ITEM ATTRIBUTES
//removeAllCharacterAttribute
BotAttributes.prototype.removeAllCharacterAttribute = function() {
	for (var i in this.characterAttributes) {
		this.removeCharacterAttribute(i);
	}
};
//removeAllItemsAttribute
BotAttributes.prototype.removeAllItemsAttribute = function() {
	for (var i in this.itemsAttributes) {
		this.removeAllItemAttribute(i);
	}
};
//removeAllItemAttribute
BotAttributes.prototype.removeAllItemsAttribute = function(slot) {
	for (var i in this.itemsAttributes[slot]) {
		this.removeItemAttribute(slot, i);
	}
};
//removeCharacterAttribute  //TODO
BotAttributes.prototype.removeCharacterAttribute = function(attributeName) {
	var attribute = this.characterAttributes[attributeName];
	if (attribute != undefined){
		delete this.characterAttributes[attributeName];
		return true;
	}
	return false;
};
//removeItemAttribute //TODO
BotAttributes.prototype.removeItemAttribute = function(slot, attributeName) {
	var attribute = this.itemsAttributes[slot][attributeName];
	if (attribute != undefined){
		delete this.itemsAttributes[slot][attributeName];
		return true
	}
	return false;
};
//createCharacterAttribute
BotAttributes.prototype.createCharacterAttribute = function(attributeName) {
	if (this.characterAttributes[attributeName]==undefined) {
		var attribute = new Attribute(attributeName);
		if (attribute) {
			//attribute.setParentBot(this);
			//attribute.hide();
			//this.htmlAttributesBox.appendChild(attribute.htmlElement);
			this.characterAttributes[attributeName] = attribute;
			return attribute;
		}
	}
	return null;
};
//createItemAttribute
BotAttributes.prototype.createItemAttribute = function(slot, attributeName) {
	if (this.itemsAttributes[slot][attributeName]==undefined) {
		var attribute = new Attribute(attributeName);
		if (attribute) {
			attribute.slotId = slot;
			//attribute.setParentBot(this);
			//attribute.hide();
			//this.htmlItemsAttributesBox[slot].appendChild(attribute.htmlElement);
			this.itemsAttributes[slot][attributeName] = attribute;
			//this.onModified();
			return attribute;
		}
	}
	return null;
};
//clearTagList
BotAttributes.prototype.clearTagList = function() {
	while (this.htmlTagList.options.length>0) {
		//this.htmlTagList.removeChild(this.htmlTagList.options[0]);
		delete this.htmlTagList.options[0];
	}
}
//setNavTag
BotAttributes.prototype.setNavTag = function(navTag, checked) {
	if (this.tagList[navTag]==checked) {
		return false;
	}
	this.tagList[navTag] = checked;
	return true;
}

//copyBotAttributes
BotAttributes.prototype.copyBotAttributes = function(botAttributes) {
	this.setWeaponRestriction(botAttributes.getWeaponRestriction());
	this.setSkill(botAttributes.getSkill());

	for (var i in botAttributes.tagList) {
		this.tagList[i] = botAttributes.tagList[i];
	}
}