var waves = new Array();
function Wave()
{
	this.name = "";
	this.template = "";
	this.checkpoint = "";
	this.waitwhendone = "";
	this.totalCurrency = 0;
	this.wavespawns = new Array();
	this.waveDescription = "";
	this.waveStartingSound = "";
	this.startWaveOutput = "";

////////
    if (typeof Wave.initialized == "undefined")
	{
		Wave.prototype.createElement = CREATE_ELEMENT;

		//setNumber
		Wave.prototype.setNumber = function(number) {
		    this.number = number;
			this.updateHeader();
		};
		//updateHeader
		Wave.prototype.updateHeader = function() {
		    this.header.innerHTML = WAVE + " #" + this.number + " $" + this.totalCurrency;
			this.waveTab.setHTML('<a href="#">' + WAVE + " #" + this.number + '</a>');    //TODO
		};
		//renumWaveSpawn
		Wave.prototype.renumWaveSpawn = function() {
		    var i = 1;
			for (var index in this.wavespawns) {
				this.wavespawns[index].setNumber(i);
				++i;
		    }
		};
		//removeFromParent
		Wave.prototype.removeFromParent = function() {
		    this.div.parentElement.ownerObject.removeWave(this);
		}
		//remove
		Wave.prototype.remove = function() {
		    //this.div.parentElement.ownerObject.removeWave(this);
			if (this.waveTab) this.waveTab.remove();
			this.removeAllWaveSpawns();
		}
		//removeAllWaveSpawns
		Wave.prototype.removeAllWaveSpawns = function() {
		    while (this.wavespawns.length)
		    {
		    	this.removeWaveSpawn(this.wavespawns[0], true);
		    }
		};
		//randomize
		Wave.prototype.randomize = function(numwavesspawns) {
		    if (isNumber(numwavesspawns))
			{
				var hastank = (getRandom(0,1)==0?true:false);
				var tankspawn = getRandom(0,numwavesspawns)
				var tank=false;
				var waitbefore = 0;
				this.removeAllWaveSpawns();
				for (var i=0; i<numwavesspawns; i++) {
					tank = hastank&&(i==tankspawn);
				    this.addWaveSpawn().randomize(getRandom(RANDOMIZE_NB_BOTS_MIN,RANDOMIZE_NB_BOTS_MAX), tank, waitbefore);
					waitbefore += getRandom(0,2)*5;
				}
				this.setCurrentWaveSpawn(this.wavespawns[0]);
		    }
		};
		//notifyBotTemplateAdded
		Wave.prototype.notifyBotTemplateAdded = function(template) {
			for (var i in this.wavespawns) {
				this.wavespawns[i].notifyBotTemplateAdded(template);
			}
		};
		//notifyWaveSpawnUpdated
		Wave.prototype.notifyWaveSpawnUpdated = function(wavespawn) {
			//var currency = 0;
			this.totalCurrency = 0;
			for (var i in this.wavespawns) {
				//this.wavespawns[i].notifyBotTemplateAdded(template);
				this.totalCurrency += this.wavespawns[i].currency*1;
			}
			this.updateHeader();
		//	console.log(currency);
		};
		//updateMapName
		Wave.prototype.updateMapName = function(mapName) {
			this.updateStartWaveOutputDropdown(mapName);
			for (var i in this.wavespawns) {
				this.wavespawns[i].updateMapName(mapName);
			}
		};
	    // setCurrentWaveSpawn @wave: wave objsct
		Wave.prototype.setCurrentWaveSpawn = function(waveSpawn) {
		    if (waveSpawn != null)
		    {
				for (var i in this.wavespawns) {
					this.wavespawns[i].div.style.display = "none";
				}
				waveSpawn.div.style.display = "";
				this.currentWaveSpawn = waveSpawn;
			}
			return false;
		}
		//loadXml
		Wave.prototype.loadXml = function(node) {
			var lowernodename = node.nodeName.toLowerCase();
			if (lowernodename != "wave") return false;
			for (var i=0; i<node.attributes.length; i++)
			{
			    var attribute = node.attributes[i];
			    var lowernodename = attribute.nodeName.toLowerCase();

			    switch (lowernodename){
					case "startwaveoutput":
						this.setStartWaveOutput(attribute.nodeValue);
						break;
			        case "waitwhendone":
						this.waitwhendone = attribute.nodeValue;
			            break;
			        case "checkpoint":
						this.checkpoint = attribute.nodeValue;
			            break;     
			        case "description":
						this.setDescription(attribute.nodeValue);
			            break;
			        case "sound":
						this.setStartingSound(attribute.nodeValue);
			            break;
			    }
			}

			for (var i=0; i<node.childNodes.length; i++)
			{
			    var child = node.childNodes[i];
			    var lowernodename = child.nodeName.toLowerCase();
			    switch (lowernodename){
					case "startwaveoutput":
						for (var j=0; j<child.attributes.length; j++) {
							var childAttribute = child.attributes[j];
							if (childAttribute.nodeName.toLowerCase() === "target") {
								this.setStartWaveOutput(childAttribute.nodeValue);
								break;
							}
						}
						if (this.startWaveOutput === "" && child.textContent) {
							this.setStartWaveOutput(child.textContent);
						}
						break;
			        case "wavespawn":
						var wavespawn = this.addWaveSpawn(true);
						wavespawn.loadXml(child);
			            break;
			    }
			}
		}
		//addFirstWaveSpawn
		Wave.prototype.addFirstWaveSpawn = function() {
			var ws = this.addWaveSpawn(true);
			ws.addChoice(true);
			ws.addBot();
		};

        Wave.initialized = true;
    }
////////

	this.div = this.createElement("div", null, "wave", null, "help_wave");
	this.waveTab = new Tab(null, {draggable:true, classname:"waveTab"});
	this.waveTab.setContainer(this.div);
	this.waveTab.setUserData({type:"wave", wave:this});
	
	
	this.addWaveSpawnButton = null;
	
	this.addWaveSpawn= function(setCurrent) {
		//this.wavespawnsHandler.appendChild(new WaveSpawn().div);
	    var wavespawn = new WaveSpawn(this);
	    if (wavespawn != null)
	    {
	        this.wavespawns.push(wavespawn);
			this.tabBar.addTab(wavespawn.waveSpawnTab);
			wavespawn.waveSpawnTab.activate();

			this.wavespawnsHandler.appendChild(wavespawn.div);
			wavespawn.setNumber(this.wavespawns.length);
			if (setCurrent) this.setCurrentWaveSpawn(wavespawn);
			this.notifyWaveSpawnUpdated(wavespawn);
			return wavespawn;
		}
		return false;


	}

	this.removeWaveSpawn= function(wavespawn, force) {
	    if (this.wavespawns.length<2&&force!=true)
	        return false;
	    var index = this.wavespawns.indexOf(wavespawn);
	    if (index!=-1)
	    {
	        this.wavespawns.splice(index, 1);
	        this.wavespawnsHandler.removeChild(wavespawn.div);
			//this.htmlTabsHandler.removeChild(wavespawn.htmlWaveSpawnTab);
	        
	        this.renumWaveSpawn();
			if (!force) this.setCurrentWaveSpawn(this.wavespawns[0]);
			wavespawn.remove();
	        return true;
	    }
	    return false;
	}
	
	this.create = function() {
	
	    {//header

			this.header = this.createElement("div", this.div, "waveHeader", null, "help_wave");

	    }

			var header2 = this.createElement("div", this.div, "waveHeader2", null, "help_wave");

			var removeButton = this.createElement("div", null, null, null, "help_wave_remove_button");
			removeButton.className = "removebutton removewave";
			header2.appendChild(removeButton);
			removeButton.appendChild(document.createTextNode("x"));
			addEvent(removeButton, "click", function() {this.ownerObject.removeFromParent();}, false);
	    
	    {//add buttons
			var div = this.createElement("div", this.div, null, null, "help_wave");
			this.htmlTabsHandler = this.createElement("div", div, "populationTabHandler", null, null , "wavesTabs"/*, null, "help_wave_tabs"*/);
			//add wave
			{
				this.addWaveSpawnButton = this.createElement("div", this.htmlTabsHandler, "waveSpawnTab waveSpawnAddTab", null, "help_wave_add_squad");
				addEvent(this.addWaveSpawnButton, "click", function() {this.ownerObject.addFirstWaveSpawn();}, false);
				this.addWaveSpawnButton.appendChild(document.createTextNode("+"));
			}

		}

		//attributes
		var attributes = this.createElement("div", this.div, "waveattribute", null, "help_wave_attributes");
		this.wavespawnsHandler = this.createElement("div", this.div, "wavewavespawnshandler", null, "help_wave");
		//attributes.innerHTML = "attributes";
		{//name
			var div = this.createElement("div", attributes, null, null, "help_wave_description");
			div.appendChild(document.createTextNode(WAVE_DESCRIPTION));
			this.inputDescription = this.createElement("input", div, "mvminput waveInput waveInputDescription");
			addEvent(this.inputDescription, "change", function() {this.ownerObject.setDescription(this.value);}, false);
		}

		{//starting sound
			var div = this.createElement("div", attributes, null, null, "help_wave_starting_sound");
			div.appendChild(document.createTextNode(WAVE_SOUND));
			this.inputStartingSound = this.createElement("input", div, "mvminput waveInput waveInputSound");
			addEvent(this.inputStartingSound, "change", function() {this.ownerObject.setStartingSound(this.value);}, false);
		}

		{//wave start output
			this.htmlStartWaveOutputDiv = this.createElement("div", attributes, null, null, "help_wave_start_output");
			this.htmlStartWaveOutputDiv.appendChild(document.createTextNode(WAVE_START_OUTPUT));
			this.htmlStartWaveOutput = this.createElement("select", this.htmlStartWaveOutputDiv, "mvminput populationDropDown waveDropDown");
			addEvent(this.htmlStartWaveOutput, "change", function() {this.ownerObject.setStartWaveOutput(this.value);}, false);
			this.htmlStartWaveOutputDiv.style.display = "none";
		}




		this.tabBar = new TabBar(this.htmlTabsHandler);
		var that = this;
		if (this.tabBar.addNotification) this.tabBar.addNotification(TabBar.EVENT_TAB_ACTIVATED,
			function(params) {
				that.tabActivated(params)
			}
		);
	}
	this.create();
	waves.push(this);
	return this;
}

Wave.prototype.activate= function() {
	if (this.currentWaveSpawn) {
		this.currentWaveSpawn.activate();
	}
}

//tabActivated
Wave.prototype.tabActivated = function(params) {
	var userdata = params.tabActivated.getUserData();
	if (userdata.type == "wavespawn") {
		this.setCurrentWaveSpawn(userdata.wavespawn);
	}
	/*if (this.currentWave) {//TODO
		this.currentWave.activate();
	} */

	this.activate();
}


//////////SETTERS

/**
 * Set the wave description
 * @param {String} description Description
 */
Wave.prototype.setDescription = function(description) {
	this.waveDescription = description;
	if (this.inputDescription.value!=description) {
		this.inputDescription.value = description;
	}
}

/**
 * Set the wave description
 * @param {String} description Description
 */
Wave.prototype.setStartingSound = function(startingSound) {
	this.waveStartingSound = startingSound;
	if (this.inputStartingSound.value!=startingSound) {
		this.inputStartingSound.value = startingSound;
	}
}

/**
 * Set the wave start output.
 * @param {String} startWaveOutput Relay target.
 */
Wave.prototype.setStartWaveOutput = function(startWaveOutput) {
	if (typeof startWaveOutput !== "string") {
		startWaveOutput = "";
	}
	this.startWaveOutput = startWaveOutput;
	if (this.htmlStartWaveOutput && this.htmlStartWaveOutput.value != startWaveOutput) {
		this.htmlStartWaveOutput.value = startWaveOutput;
	}
}

/**
 * Update the wave start output dropdown for the current map.
 * @param {String} mapName Map name.
 */
Wave.prototype.updateStartWaveOutputDropdown = function(mapName) {
	if (!this.htmlStartWaveOutput || !this.htmlStartWaveOutputDiv) return;

	var map = MapList[mapName];
	var options = (map && map.getStartWaveOutputOptions) ? map.getStartWaveOutputOptions() : [];
	this.htmlStartWaveOutput.innerHTML = "";

	if (options.length <= 1) {
		this.htmlStartWaveOutputDiv.style.display = "none";
		if (options.length === 1 && this.startWaveOutput !== options[0]) {
			this.startWaveOutput = options[0];
		}
		return;
	}

	this.htmlStartWaveOutputDiv.style.display = "";
	var selectedValue = this.startWaveOutput;
	var selectedExists = false;

	for (var i = 0; i < options.length; i++) {
		var option = document.createElement("option");
		option.value = options[i];
		option.innerHTML = options[i];
		this.htmlStartWaveOutput.appendChild(option);
		if (options[i] === selectedValue) {
			selectedExists = true;
		}
	}

	if (!selectedExists) {
		selectedValue = options[0];
		this.startWaveOutput = selectedValue;
	}
	this.htmlStartWaveOutput.value = selectedValue;
}

//////////GETTERS

/**
 * Get the wave description
 * @return {String} Wave description
 */
Wave.prototype.getDescription = function() {
	return this.waveDescription;
}

/**
 * Get the wave starting sound
 * @return {String} Wave strating sound
 */
Wave.prototype.getStartingSound = function() {
	return this.waveStartingSound;
}

/**
 * Get the wave start output.
 * @param {String} mapName Map name.
 * @param {Boolean|String} fallback Default relay target.
 * @return {String} Relay target.
 */
Wave.prototype.getStartWaveOutput = function(mapName, fallback) {
	if (this.startWaveOutput !== "") {
		return this.startWaveOutput;
	}
	if (MapList[mapName]) {
		return MapList[mapName].getStartWaveOutput(fallback);
	}
	if (typeof fallback === "string") {
		return fallback;
	}
	return "";
}

/**
 * Get all templates used y this population
 * @return {Array} Template name array
 */
Wave.prototype.getUsedTemplates = function() {
	var templateArray = [];
	var wavespawns = this.wavespawns;
	for (var wavespawnIndex in wavespawns) {
		//templateArray = templateArray.concat(wavespawns[wavespawnIndex].getUsedTemplates());
		var list = wavespawns[wavespawnIndex].getUsedTemplates();
		for (var i in list) {
			templateArray[i] = 1;
		}
	}
	return templateArray;
}

//////////ACTIONS