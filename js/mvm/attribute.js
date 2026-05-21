
function Attribute(attributeName)
{
	this.name = "";
	this.value = "";
	this.type = "";
	this.defaultValue;
	this.warningMinValue = "";
	this.warningMaxValue = "";
	this.effectType = "";
	this.parentBot = null;
	
////////
    if (typeof Attribute.initialized == "undefined")
	{
		Attribute.prototype.createElement = CREATE_ELEMENT;

		//setName
		Attribute.prototype.setName = function(name) {
			this.name = name;
			var attributeName = name.replace(/_colon_/g, ":").replace(/_/g, " ");
			var attribute = GlobalAttributesList[attributeName];
			if (attribute!==undefined) {
				//this.setDefaultValue(attribute["min_value"]);
				//this.setValue(attribute["min_value"], true);
				//this.warningMinValue = attribute["min_value"];
				//this.warningMaxValue = attribute["max_value"];
				this.effectType = attribute["effect_type"];
				this.htmlElement.helpAddText = "<br />" + attribute["description_string"];
				
				this.update();
			}
		}
		//remove
		Attribute.prototype.remove = function() {
			if (this.parentBot) {
				if (isNumber(this.slotId)) {
					this.parentBot.removeItemAttribute(this.slotId, this.name);
				} else {
					this.parentBot.removeCharacterAttribute(this.name);
				}
			}
		}
		//getName
		Attribute.prototype.getName = function() {
			return this.name;
		}
		//setValue
		Attribute.prototype.setValue = function(value, noWarning) {
			if (this.value != value) {
				this.htmlValue.value = value;
				this.value = value;
			}
		}
		//getValue
		Attribute.prototype.getValue = function() {
			return this.value;
		}
		//setDefaultValue
		Attribute.prototype.setDefaultValue = function(defaultValue) {
			this.defaultValue = defaultValue;
		}
		//getDefaultValue
		Attribute.prototype.getDefaultValue = function() {
			return this.defaultValue;
		}
		//getParentBot
		Attribute.prototype.getParentBot = function() {
			return this.parentBot;
		}
		//setParentBot
		Attribute.prototype.setParentBot = function(bot) {
			this.parentBot = bot;
			this.update();
		}
		//startDrag
		Attribute.prototype.startDrag = function(event) {
		    /* autoriser les drag and drop de type "copy" */
		    event.dataTransfer.effectAllowed = 'copy';
		    /* transmettre en donnée de drag and drop l'id de la boite
		       déplacée */
		    event.dataTransfer.setData('Text', "attribute|" + this.name);
		    //return false;
		}
		//update
		Attribute.prototype.update = function() {
			this.htmlText.innerHTML = this.getName().replace(/_colon_/g, ":").replace(/_/g, " ");

			if (this.parentBot!=null) {
				this.htmlAttribute.style.display = '';
			}else{
				this.htmlAttribute.style.display = 'none';
			}

			switch (this.effectType){
		        case "positive":
		            this.htmlIcon.className = "attributeIconPositive";
					this.htmlText.className = "attributePositive";
		            break;
		        case "negative":
		            this.htmlIcon.className = "attributeIconNegative";
					this.htmlText.className = "attributeNegative";
		            break;
		        default:
		            this.htmlIcon.className = "attributeIconNeutral";
					this.htmlText.className = "attributeNeutral";
		            break;
			}
			this.setSelector();
		}

		//create
		Attribute.prototype.create = function() {
			this.htmlElement = this.createElement("div", null, "attribute", null, "help_attribute");
			//this.htmlElement.href = "#";//lame hack for IE
			//this.htmlElement.draggable = true;
			this.htmlIcon = this.createElement("div", this.htmlElement, "attributeIcon");
			this.htmlText = this.createElement("a", this.htmlElement, "attributeIcon");
			this.htmlText.href = "javascript: void(0)";//lame hack for IE
			this.htmlText.draggable = true;
			this.htmlAttribute = this.createElement("div", this.htmlElement, "attributeValue");
			this.htmlSelector = this.createElement("select", this.htmlAttribute, "attributeSelector");
			this.htmlValue = this.createElement("input", this.htmlAttribute, "attributeInput");


			var removeButton = this.createElement("div", this.htmlAttribute, "removebutton attributeRemove", null, "help_attribute_remove_button");
			removeButton.appendChild(document.createTextNode("x"));
			addEvent(removeButton, "click", function() {this.ownerObject.remove();}, false);

			addEvent(this.htmlText, "dragstart", function(event) {this.ownerObject.startDrag(event);}, false);
			addEvent(this.htmlValue, "change", function(event) {this.ownerObject.setValue(this.value);}, false);
			addEvent(this.htmlSelector, "change", function() {if (this.ownerObject.setValue(this.value));}, false);
		}
		//onModified
		Attribute.prototype.onModified = function() {
			return true;
		};
		//show
		Attribute.prototype.show = function() {
			this.htmlElement.style.display = "";
		};
		//hide
		Attribute.prototype.hide = function() {
			this.htmlElement.style.display = "none";
		};

        Attribute.initialized = true;
    }
////////
	this.create();
	this.setName(attributeName);

	return this;
}

Attribute.prototype.setSelector = function() {
	var showSelector = false;
	var helper = Attribute.prototype.helperList[this.name]||Attribute.prototype.helperList[Attribute.prototype.helperSynonymList[this.name]];
	this.htmlSelector.innerHTML = "";
	if (helper) {
		for (var i in helper) {
			//var o = helper[i];
			var option = this.createElement("option", this.htmlSelector, null);
			option.innerHTML = i;
			option.value = helper[i];
		}

		showSelector = true;
	}
	if (showSelector) {
		this.htmlSelector.style.display = "";
	} else {
		this.htmlSelector.style.display = "none";
	}
}

Attribute.prototype.helperList = {
"attach particle effect":{"Burning player":1, "Flying bits":2, "Sparkling community":4, "Honest Halo":5, "Green fetti":6, "Purple fetti":7, "Haunted Ghosts":8
,"Green energy":9, "Purple Energy":10, "Circling TF Logo":11, "Massed Flies":12, "Burning Flames":13, "Scorching Flames":14, "Searing Plasma":15, "Vivid Plasma":16
,"Sunbeams":17, "Circling Peace Sign":18,"Circling Heart":19,"Stamps":20,"Pipe smoke":28,"Stormy Storm":29,"Blizzardy Storm":30,"Nuts n' Bolts":31,"Orbiting Planets":32,
"Orbiting Fire":33,"Bubbling":34,"Smoking":35,"Steaming":36,"Flaming Lantern":37,"Cloudy Moon":38,"Cauldron Bubbles":39,"Eerie Orbiting Fire":40,"Knifestorm":43,
"Misty Skull":44,"Harvest Moon":45,"It's A Secret To Everybody":46,"Stormy 13th Hour":47,"Aces High blu":55,"Kill-a-Watt":56,"Terror-Watt":57,"Cloud 9":58,"Aces High red":59,
"Dead Presidents":60,"Miami Nights":61,"Disco Beat Down":62,"Phosphorous":63,"Sulphurous":64,"Memory Leak":65,"Overclocked":66,"Electrostatic":67,"Power Surge":68,
"Anti-Freeze":69,"Time Warp":70,"Green Black Hole":71,"Roboactive":72,"Arcana":73,"Spellbound":74,"Chiroptera Venenata":75,"Poisoned Shadows":76,"Something Burning This Way Comes":77,
"Hellfire":78,"Darkblaze":79,"Demonflame":80,"Bonzo The All-Gnawing":81,"Amaranthine":82,"Stare From Beyond":83,"The Ooze":84,"Ghastly Ghosts Jr":85,"Haunted Phantasm Jr":86,
"Hot":701,"Isotope":702,"Cool":703,"Energy Orb":704},
"override projectile type":{"Bullet":1,"Rocket":2,"Syringe":5,"Flare":6,"### Warning: projectiles below":0,"### work only for some weapons":0,
"Pipebomb":3,"Arrow":8,"Crossbow Syringe":11,"Cow Mangler":12,"Bison":13,"Cannonball":17,"Rescue Ranger":18,"Festive arrow":19,
"### Warning: projectiles below ":0,"### can't detonate":0,"Sticky":4,"Sticky jump":14
},


"mod soldier buff type":{"Mini-crit":1,"Damage Reduction":2,"Healing":3,"Medic Healing fills Rage meter":4},
"airblast pushback scale":{"Low":2.0,"Middle":2.5,"High":5.0},
"deflection size multiplier":{"Low":100.0,"High":1000.0},
"mult airblast refire time":{"Fast":80,"Faster":60,"More faster":40,"Even moore faster":20,"god like":0},

// set item tint RGB
"set item tint RGB":{"Indubitably Green":7511618,"Zepheniah's Greed":4345659,"Noble Hatter's Violet":5322826,"Color No. 216-190-216":14204632,
"Deep Commitment to Purple":8208497,"Mann Co. Orange":13595446,Muskelmannbraun:10843461,"Peculiarly Drab Tincture":12955537,"Radigan Conagher Brown":6901050,
"Ye Olde Rustic Color":8154199,"Australium Gold":15185211,"Aged Moustache Grey":8289918,"An Extraordinary Abundance of Tinge":15132390,
"A Distinctive Lack of Hue":1315860,"Pink as Hell":16738740,"Color Similar to Slate":3100495,"Drably Olive":8421376,"The Bitter Taste of Defeat and Lime":3329330,
"The Color of a Gentlemann's Business Pants":15787660,"Salmon Injustice":15308410,"A Mann's Mint":12377523,"After Eight":2960676,
"Team Spirit (RED)":12073019,"Team Spirit (BLU)":5801378,"Operator's Overalls (RED)":4732984,"Operator's Overalls (BLU)":3686984,
"Waterlogged Lab Coat (RED)":11049612,"Waterlogged Lab Coat (BLU)":8626083,"Balaclava's Are Forever (RED)":3874595,"Balaclava's Are Forever (BLU)":1581885,
"Air of Debonair (RED)":6637376,"Air of Debonair (BLU)":2636109,"The Value of Teamwork (RED)":8400928,"The Value of Teamwork (BLU)":2452877,
"Cream Spirit (RED)":12807213,"Cream Spirit (BLU)":12091445},

// SPELL: set Halloween footstep type
"SPELL: set item tint RGB":{"Putrescent Pigmentation":2,"Die Job":0,"Chromatic Corruption":1,"Spectral Spectrum":3,"Sinister Staining":4},

// SPELL: set Halloween footstep type
"SPELL: set Halloween footstep type":{"Team Spirit Footprints":1,"Gangreen Footprints":8421376,"Corpse Gray Footprints":3100495,"Violent Violet Footprints":5322826,
"Rotten Orange Footprints":13595446,"Bruised Purple Footprints":8208497,"Headless Horseshoes":2}
}

Attribute.prototype.helperSynonymList = {
"attach particle effect static":"attach particle effect"
}
/*


						"attach particle effect"	1
						"attach particle effect static"	1
}*/