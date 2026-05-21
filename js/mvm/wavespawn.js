function WaveSpawn(wave)
{
	this.name = "";
	//this.where = "spawnbot";
	this.spawnLocationList = {};
	this.isRandomSpawn = false;
	this.template = "";
	this.totalCount = "";
	this.maxActive = "";
	this.spawnCount = "";
	this.isSupport = 0;
	this.isRandom = 0;
	this.inputTotalCount = null;
	this.inputMaxActive = null;
	this.inputSpawnCount = null;
	this.inputWaitBefore = null;
	this.inputWaitBetween = null;
	this.inputCurrency = null;
	this.wave = wave;
	this.templatesList = new Array();

	this.randomChoices = new Array();
	this.currentChoice = null;
	this.currentBot = null;
	this.preventTabUpdate = false;//prevents multiple useless tab updates when loading or randomize

	this.waitForAllSpawned = "";
	this.waitForAllDead = "";
////////
    if (typeof WaveSpawn.initialized == "undefined")
	{
	    //createElement
		WaveSpawn.prototype.createElement = CREATE_ELEMENT;
		
	    // setSpawnCount
        WaveSpawn.prototype.setSpawnCount = function(spawnCount) {
			this.inputSpawnCount.id = "";
		    if (this.spawnCount != spawnCount)
		    {
		        if (isNumber(spawnCount)||spawnCount == "")
		        {
					this.spawnCount = spawnCount;
					this.inputSpawnCount.value =  spawnCount;
					this.onModified();
				}
				else
				    this.inputSpawnCount.id = "mvmNaNinput";
			}
		}
	    // setWaitBefore
        WaveSpawn.prototype.setWaitBefore = function(waitbefore) {
			this.inputWaitBefore.id = "";
		    if (this.waitBefore != waitbefore)
		    {
		        if (isNumber(waitbefore)||waitbefore == "")
		        {
					this.waitBefore = waitbefore;
					this.inputWaitBefore.value =  waitbefore;
					this.onModified();
				}
				else
				    this.inputWaitBefore.id = "mvmNaNinput";
			}
		}
	    // setWaitBetween
        WaveSpawn.prototype.setWaitBetween = function(waitbetween) {
			this.inputWaitBetween.id = "";
		    if (this.waitBetween != waitbetween)
		    {
		        if (isNumber(waitbetween)||waitbetween == "")
		        {
					this.waitBetween = waitbetween;
					this.inputWaitBetween.value =  waitbetween;
					this.onModified();
				}
				else
				    this.inputWaitBetween.id = "mvmNaNinput";
			}
		}
	    // setCurrency
        WaveSpawn.prototype.setCurrency = function(currency) {
			this.inputCurrency.id = "";
		    if (this.currency != currency)
		    {
		        if (isNumber(currency))
		        {
					this.currency = currency;
					this.inputCurrency.value =  currency;
					this.onModified();
				}
				else
				    this.inputCurrency.id = "mvmNaNinput";
			}
		}
	    // setIsSupport
        WaveSpawn.prototype.setIsSupport = function(isSupport) {
		    //if (!this.isSupport != isSupport)
		    {
		        //if (isNumber(currency))
		        {
				    //this.inputCurrency.id = "";
					if (isSupport) this.isSupport = 1;
					else this.isSupport = 0;
					//this.isSupport = isSupport;
					this.htmlIsSupport.checked =  isSupport;
				}
			}
		}

		//setNumber
		WaveSpawn.prototype.setNumber = function(number) {
		    this.number = number;
			this.updateTab();
		};
		//updateTab
		WaveSpawn.prototype.updateTab = function() {
			//this.htmlWaveSpawnTab.innerHTML = WAVE_SPAWN + " #" + this.number + " ";


			var choiceCount=0;
			var s = ""
			for (var i in this.randomChoices) {
				var randomchoice = this.randomChoices[i];
				//if (choiceCount>0)this.htmlWaveSpawnTab.innerHTML += "|";
				for (var j in randomchoice.bots) {
					s += "<div class='waveSpawnTabIcon " + randomchoice.bots[j].getClassIconStyle() +"' ></div>";
				}
				++choiceCount;
			}
			//this.htmlWaveSpawnTab.innerHTML = s + "x" + this.totalCount;
			this.waveSpawnTab.setHTML(s);
			if (this.name == "") {
				this.header.innerHTML =  WAVE_SPAWN + " #" + this.number + " " + s + "x" + this.totalCount;
			}else{
				this.header.innerHTML =  this.name + " " + s + "x" + this.totalCount;
			}
			this.header.innerHTML += " (max active " + this.maxActive*this.getMaxBots() + " bots)";
		};
		//removeAllBots
		WaveSpawn.prototype.removeAllBots = function() {
/*		    while (this.bots.length)
		    {
		    	this.removeBot(this.bots[0], true);
		    }*/
		    while (this.randomChoices.length)
		    {
				this.removeChoice(this.randomChoices[0], true);
		    }
		};
		//removeChoice @choice: RandomChoice
		WaveSpawn.prototype.removeChoice= function(choice, force) {
		    if (this.randomChoices.length<2&&force!=true)
		        return false;
		    var index = this.randomChoices.indexOf(choice);
		    if (index!=-1)
		    {
		        this.randomChoices.splice(index, 1);
		        this.botshandler.removeChild(choice.htmlElement);
				//this.htmlTabHandler.removeChild(choice.htmlTab);
		        return true;
		    }
		    return false;
		}

		//randomize
		WaveSpawn.prototype.randomize = function(numbots, withTank, waitBefore) {
			this.preventTabUpdate = true;
			//var timebefore = getRandom(0, 10)*5;
			this.setWaitBefore(waitBefore);
		    if (isNumber(numbots))
			{
				this.removeAllBots();
				this.addChoice(true);
				for (i=0; i<numbots; i++) {
				    this.addBot().randomize();
				}
		    }
			if (withTank) {
				var newBot = this.addBot().setClass(9, true);//tank
				this.setTotalCount(1);
				this.setMaxActive(1);
				this.setSpawnCount(1);
			}
			this.preventTabUpdate = false;
			this.updateTab();
		};
		//notifyBotTemplateAdded
		WaveSpawn.prototype.notifyBotTemplateAdded = function(template) {
			if (template.isSentryBuster) return;
			this.addTemplate(template);
		};
		//addTemplate
		WaveSpawn.prototype.addTemplate = function(template) {
			if (template)
			{
				var div = this.createElement("div", this.htmlTemplatesList, "choiceTemplate", null, "help_squad_template_list");
				this.templatesList.push(div);
				var botname = template.name;
				if (botname=="")
					botname = template.getClass();
				div.ownerBot = template;

				botname += " (" + template.templateName + ")";
				//div.id = newbot.templateName;option.tfbot=newbot;//option.selected = true;
				div.templateName = template.templateName;
				div.innerHTML = "<div class='choiceTemplateIcon " + template.getClassIconStyle() +"' ></div>" + botname;// + " (" + template.templateName + ")";
				//option.value = newbot.templateName;
				addEvent(div, "click", function(){this.ownerObject.addBotApplyTemplate(this.templateName);}, false);
			}
		};
		//updateTemplates
		WaveSpawn.prototype.updateTemplates = function() {
			for (var i in templateList.templates) {
				this.notifyBotTemplateAdded(templateList.templates[i]);
			}
		};
		//addBotApplyTemplate
		WaveSpawn.prototype.addBotApplyTemplate = function(templateName) {
			this.preventTabUpdate = true;
			var bot = this.addBot();
			if (bot)
			{
				bot.setTemplate(templateName);
				bot.applyTemplate();
				this.updateTab();
			}
			this.preventTabUpdate = false;
		};
		//updateMapName
		WaveSpawn.prototype.updateMapName = function(mapName) {
			this.updateSpawnList(mapName);
			for (var i in this.randomChoices) {
				var randomchoice = this.randomChoices[i];
				for (var j in randomchoice.bots) {
					randomchoice.bots[j].updateMapName(mapName);
				}
			}
		};

		//addChoice
		WaveSpawn.prototype.addChoice= function(setCurrent) {
		    var choice = new RandomChoice(this);
		    if (choice != null)
		    {

		        //this.wavespawns.push(wavespawn);
				this.tabBar.addTab(choice.choiceTab);
				choice.choiceTab.activate();

		        this.randomChoices.push(choice);
				this.botshandler.appendChild(choice.htmlElement);
				if (setCurrent) this.setCurrentChoice(choice);
				//this.htmlTabHandler.appendChild(choice.htmlTab);

				//addEvent(choice.htmlTab, "click", function() {this.parentElement.ownerObject.setCurrentChoice(this.ownerObject);}, false);
				//this.addBot();
				return choice;
			}
			return false;
		}
	    // setCurrentChoice @choice: RandomChoice
		WaveSpawn.prototype.setCurrentChoice = function(choice) {
		    if (choice != null)
		    {
				for (var i in this.randomChoices) {
					this.randomChoices[i].hide();
				}
				choice.show();
				this.currentChoice = choice;
				/*if (choice.htmlBotsHandler.firstChild()==undefined)
					choice.htmlBotsHandler.appendChild(this.htmlBotsAdd);
				else*/
					choice.htmlBotsHandler.insertBefore(this.htmlBotsAdd, choice.htmlBotsHandler.firstChild);
			}
			return false;
		}
	    // setCurrentBot @bot: Bot
		WaveSpawn.prototype.setCurrentBot = function(bot) {
		    if (bot != null)
		    {
				if (this.currentBot != bot) {
					if (this.currentBot) {
						this.currentBot.showUnselected();
					}
					bot.showSelected();
					this.currentBot = bot;
					if (this.currentChoice) {
						this.currentChoice.setCurrentBot(bot);
					}

				}
				globalBotViewer.setBot(bot, 'Waves');
			}
			return false;
		}
	    // getMaxBots
		WaveSpawn.prototype.getMaxBots = function() {
			var max = 0;
			for (var i in this.randomChoices) {
				max = Math.max(max,this.randomChoices[i].bots.length);
				
			}
			return max;
		}
	    //setIsRandom
        WaveSpawn.prototype.setIsRandom = function(isRandom) {
			this.isRandom = isRandom;
			this.htmlIsRandom.checked =  isRandom;
			if (isRandom) {
				this.htmlTabHandler.style.display = "";
			} else {
				this.htmlTabHandler.style.display = "none";
				this.setCurrentChoice(this.randomChoices[0]);
			}
		}
	    //setIsRandomSpawn
        WaveSpawn.prototype.setIsRandomSpawn = function(isRandomSpawn) {
			this.isRandomSpawn = isRandomSpawn;
			this.htmlIsRandomSpawn.checked =  isRandomSpawn;
		}
	    //setName
        WaveSpawn.prototype.setName = function(name) {
			this.name = name;
			this.inputName.value = this.name;
			this.updateTab();
		}
	    //setWaitForAllSpawned
        WaveSpawn.prototype.setWaitForAllSpawned = function(waitForAllSpawned) {
			this.waitForAllSpawned = waitForAllSpawned;//.replace(/ /g, "_");
			this.inputWaitForAllSpawned.value = this.waitForAllSpawned;
		}
	    //setWaitForAllDead
        WaveSpawn.prototype.setWaitForAllDead = function(waitForAllDead) {
			this.waitForAllDead = waitForAllDead;//.replace(/ /g, "_");
			this.inputWaitForAllDead.value = this.waitForAllDead;
		}
	    //clearSpawnList
        WaveSpawn.prototype.clearSpawnList = function(mapName) {
			while (this.htmlWhereList.options.length>0) {
			//for (var i =0; i< this.htmlWhereList.options.length; i++) {
				this.htmlWhereList.removeChild(this.htmlWhereList.options[0]);
				delete this.htmlWhereList.options[0];
			}
		}
	    //updateSpawnList
        WaveSpawn.prototype.updateSpawnList = function(mapName) {
			var map = MapList[mapName];
			if (map==undefined) return;
			this.clearSpawnList();

			for (var i in map.spawns) {
				var spawn = map.spawns[i];
				var option = this.createElement("option", this.htmlWhereList, "spawnList");
				option.id = spawn;
				option.innerHTML = spawn;//"<div class='templateOption " + newbot.getClassIconStyle() +"' ></div>" + botname;
				option.value = spawn
			}
		}
	    //resetOptions
        WaveSpawn.prototype.resetOptions = function() {
			this.setCurrency(0);
			this.setTotalCount("");
			this.setMaxActive("");
			this.setSpawnCount("");
			this.setWaitBefore("");
			this.setWaitBetween("");
			this.setIsSupport(false);
		}
		//loadXml
		WaveSpawn.prototype.loadXml = function(node, parentIsRandom) {
			var lowernodename = node.nodeName.toLowerCase();
			var divide = true;
			if (lowernodename != "wavespawn"&&lowernodename != "randomchoice"&&lowernodename != "squad") return false;

			if (lowernodename == "wavespawn") {
				this.preventTabUpdate = true;
				this.resetOptions();
			}

			for (var i=0; i<node.attributes.length; i++)
			{
			    var attribute = node.attributes[i];
			    var attriblowernodename = attribute.nodeName.toLowerCase();
//<WaveSpawn TotalCurrency="400" TotalCount="30" MaxActive="15" SpawnCount="6" Where="spawnbot" WaitBeforeStarting="20" WaitBetweenSpawns="10">
			    switch (attriblowernodename){
			        case "name":
						this.setName(attribute.nodeValue);
			            break;
			        case "waitforallspawned":
						this.setWaitForAllSpawned(attribute.nodeValue);
			            break;
			        case "waitforalldead":
						this.setWaitForAllDead(attribute.nodeValue);
			            break;
			        case "totalcurrency":
						this.setCurrency(attribute.nodeValue);
			            break;
			        case "totalcount":
						if (this.totalCount=="")
							this.setTotalCount(attribute.nodeValue);
			            break;
			        case "maxactive":
						if (this.maxActive=="")
							this.setMaxActive(attribute.nodeValue);
			            break;
			        case "spawncount":
						if (this.spawnCount=="")
							this.setSpawnCount(attribute.nodeValue);
			            break;
			        case "grouptotalcount":
						this.setTotalCount(attribute.nodeValue);
						divide = false;
			            break;
			        case "groupmaxactive":
						this.setMaxActive(attribute.nodeValue);
						divide = false;
			            break;
			        case "groupspawncount":
						this.setSpawnCount(attribute.nodeValue);
						divide = false;
			            break;
			        case "waitbeforestarting":
						this.setWaitBefore(attribute.nodeValue);
			            break;
			        case "waitbetweenspawns":
						this.setWaitBetween(attribute.nodeValue);
			            break;
			        case "where":
						//this.where = (attribute.nodeValue);
						//this.setSpawn(attribute.nodeValue);
						this.setSpawnLocation(attribute.nodeValue, true);                
			            break;
			        case "support":
						this.setIsSupport((attribute.nodeValue==1)?true:false);
			            break;
			        case "randomspawn":
						this.setIsRandomSpawn((attribute.nodeValue==1)?true:false);
			            break;
			    }
			}

			for (var i=0; i<node.childNodes.length; i++)
			{
			    var child = node.childNodes[i];
			    var childlowernodename = child.nodeName.toLowerCase();
			    switch (childlowernodename){
					case "randomchoice":
						this.setIsRandom(true);
						this.loadXml(child, true);
						break;
			        case "squad":
						this.addChoice(true);
						this.loadXml(child);
						break;   
			        case "where":
						this.setSpawnLocation(child.firstChild.nodeValue, true);                
			            break;
			        case "tfbot":
			        case "tank":
						if (parentIsRandom==true) this.addChoice(true);
						var bot = this.addBot();
						bot.loadXml(child, false);
			            break;
			    }
			}
			if (lowernodename == "wavespawn") {

				this.preventTabUpdate = false;
				this.updateTab();
				if (divide){
					var maxBots = this.getMaxBots();

					this.setTotalCount(this.totalCount/maxBots);
					this.setMaxActive(this.maxActive/maxBots);
					this.setSpawnCount(this.spawnCount/maxBots);
				}
			}

		}
	    //onBotUpdated
        WaveSpawn.prototype.onBotUpdated = function() {
			if (this.preventTabUpdate)return;
			this.updateTab();
		}
		//onModified
		WaveSpawn.prototype.onModified = function() {
			if (this.preventTabUpdate)return;
			this.updateTab();
			this.wave.notifyWaveSpawnUpdated(this);
		};
/*		//getHelpText
		WaveSpawn.prototype.getHelpText = function() {
			return "this is a squad";
		};*/
		
        WaveSpawn.initialized = true;
    }
////////

	this.setTotalCount = function(totalCount) {
		this.inputTotalCount.id = "";
	    if (this.totalCount != totalCount)
	    {
	        if (isNumber(totalCount)||totalCount == "")
	        {
				this.totalCount = totalCount;
				this.inputTotalCount.value =  totalCount;
				this.onModified();
			}
			else
			    this.inputTotalCount.id = "mvmNaNinput";
		}
	}

	this.setMaxActive = function(maxActive) {
		this.inputMaxActive.id = "";
	    if (this.maxActive != maxActive)
	    {
	        if (isNumber(maxActive)||maxActive == "")
	        {
				this.maxActive = maxActive;
				this.inputMaxActive.value =  maxActive;
				this.onModified();
			}
			else
			    this.inputMaxActive.id = "mvmNaNinput";
		}
	}

/*	this.setSpawnCount = function(spawnCount) {
	    if (!this.spawnCount != spawnCount)
	    {
	        if (isNumber(spawnCount))
	        {
			    this.inputSpawnCount.id = "";
				this.spawnCount = spawnCount;
				this.inputSpawnCount.value =  spawnCount;
			}
			else
			    this.inputSpawnCount.id = "mvmNaNinput";
		}
	}*/

	this.addBot= function() {
	    var bot = new Bot();   
		bot.showSmall();
	    if (bot != null)
	    {
			bot.setWaveSpawn(this);
	        /*this.bots.push(bot);
			this.botshandler.appendChild(bot.div);*/
			if (this.currentChoice==null) this.addChoice(true);

	        this.currentChoice.bots.push(bot);
			//this.currentChoice.htmlBotsHandler.insertBefore(bot.htmlElement, this.htmlBotsAdd);
			this.currentChoice.htmlBotsHandler.appendChild(bot.htmlElement);
			this.setCurrentBot(bot);
			this.onBotUpdated();
			return bot;
		}
		return false;
	}

	this.removeBot= function(bot, force) {
	    if (this.currentChoice.bots.length<2&&force!=true)
	        return false;
	    var index = this.currentChoice.bots.indexOf(bot);
	    //alert(this.bots.indexOf(bot));
	    if (index!=-1)
	    {
	        this.currentChoice.bots.splice(index, 1);
	        this.currentChoice.htmlBotsHandler.removeChild(bot.htmlElement);

			var sel = Math.max(0, index-1);
			//globalBotViewer.setBot(this.bots[sel]);
			this.setCurrentBot(this.bots[sel]);
			this.updateTab();
	        return true;
	    }
	    return false;
	}

/*	this.remove = function() {
	    this.div.parentElement.ownerObject.removeWaveSpawn(this);

		if (this.waveSpawnTab) this.waveSpawnTab.remove();
			//this.removeAllWaveSpawns();
		this.wave.notifyWaveSpawnUpdated(this);
	}                */
	
	this.create = function() {
		this.div = this.createElement("div", null, "TFWaveSpawn", null, "help_squad");

	    this.header = this.createElement("div", this.div, "waveHeader", null, "help_squad_header");
		//this.htmlWaveSpawnTab = this.createElement("div", null, "waveSpawnTab waveSpawnTabremoveme", null, "help_squad_tab");
		
		
		var header2 = document.createElement("div");
		header2.className = "wavespawnheader2";
		this.div.appendChild(header2);

		{//spawn loc
			var div = this.createElement("div", header2, "wavespawnAttribute", null, "help_squad_spawn");
			div.appendChild(document.createTextNode(WAVE_SPAWN_WHERE_SPAWN));
			this.htmlWhereList = this.createElement("select", div, "wavespawnWhereList");
			this.htmlWhereList.multiple=true;
			addEvent(this.htmlWhereList, "change", function() {this.ownerObject.setSpawnList();}, false);
			this.updateSpawnList(globalPopulation.mapName);
		}

		{//remove button
			var removeButton = this.createElement("div", header2, "removebutton removewavespawn", null, "help_squad_remove_button");
			/*removeButton.className = "removebutton removewavespawn";
			header2.appendChild(removeButton);*/
			removeButton.appendChild(document.createTextNode("x"));
			addEvent(removeButton, "click", function() {this.ownerObject.removeFromParent();}, false);
		}
		
		//attributes
		var attributes = document.createElement("div");
		attributes.className = "wavespawnAttributes";
		this.div.appendChild(attributes);

		{//name
			var div = this.createElement("div", attributes, null, null, "help_squad_name");
			div.appendChild(document.createTextNode(WAVE_SPAWN_NAME));
			this.inputName = this.createElement("input", div, "mvminput wavespawninput wavespawnInputName");
			addEvent(this.inputName, "change", function() {this.ownerObject.setName(this.value);}, false);
		}

		{//wait for all spawned
			var div = this.createElement("div", attributes, null, null, "help_squad_wait_for_all_spawned");
			div.appendChild(document.createTextNode(WAVE_SPAWN_WAIT_FOR_ALL_SPAWNED));
			this.inputWaitForAllSpawned = this.createElement("input", div, "mvminput wavespawninput wavespawnInputName");
			addEvent(this.inputWaitForAllSpawned, "change", function() {this.ownerObject.setWaitForAllSpawned(this.value);}, false);
			//attributes.appendChild(document.createElement("br"));
		}

		{//wait for all dead
			var div = this.createElement("div", attributes, null, null, "help_squad_wait_for_all_dead");
			div.appendChild(document.createTextNode(WAVE_SPAWN_WAIT_FOR_ALL_DEAD));
			this.inputWaitForAllDead = this.createElement("input", div, "mvminput wavespawninput wavespawnInputName");
			addEvent(this.inputWaitForAllDead, "change", function() {this.ownerObject.setWaitForAllDead(this.value);}, false);
			//attributes.appendChild(document.createElement("br"));
		}

		{//currency
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_currency");
			
			var cashImg = this.createElement("div", div, "cashImg");
			//div.appendChild(document.createTextNode(WAVE_SPAWN_CURRENCY));
			this.inputCurrency = this.createElement("input", div, "mvminput wavespawninput");
			//this.inputCurrency.className="mvminput wavespawninput";
			addEvent(this.inputCurrency, "change", function() {this.ownerObject.setCurrency(this.value);}, false);
			//div.appendChild(this.inputCurrency);
			//attributes.appendChild(document.createElement("br"));
		}

		{//total count
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_total_count");
			div.appendChild(document.createTextNode(WAVE_SPAWN_TOTAL_COUNT));
			this.inputTotalCount = this.createElement("input", div, "mvminput wavespawninput");
			//this.inputTotalCount.className="mvminput wavespawninput";
			addEvent(this.inputTotalCount, "change", function() {this.ownerObject.setTotalCount(this.value);}, false);
			//attributes.appendChild(this.inputTotalCount);
			//attributes.appendChild(document.createElement("br"));
		}

		{
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_max_active");
			div.appendChild(document.createTextNode(WAVE_SPAWN_MAX_ACTIVE));
			this.inputMaxActive = this.createElement("input", div, "mvminput wavespawninput");
			//this.inputMaxActive.className="mvminput wavespawninput";
			addEvent(this.inputMaxActive, "change", function() {this.ownerObject.setMaxActive(this.value);}, false);
			//attributes.appendChild(this.inputMaxActive);
			//attributes.appendChild(document.createElement("br"));
		}
		
		{
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_spawn_count");
			div.appendChild(document.createTextNode(WAVE_SPAWN_SPAWN_COUNT));
			this.inputSpawnCount = this.createElement("input", div, "mvminput wavespawninput");
			//this.inputSpawnCount.className="mvminput wavespawninput";
			addEvent(this.inputSpawnCount, "change", function() {this.ownerObject.setSpawnCount(this.value);}, false);
			//attributes.appendChild(this.inputSpawnCount);
			//attributes.appendChild(document.createElement("br"));
		}

		{//wait before
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_wait_before");
			div.appendChild(document.createTextNode(WAVE_SPAWN_WAIT_BEFORE));
			this.inputWaitBefore = this.createElement("input", div, "mvminput wavespawninput");
			//this.inputWaitBefore.className="mvminput wavespawninput";
			addEvent(this.inputWaitBefore, "change", function() {this.ownerObject.setWaitBefore(this.value);}, false);
			//attributes.appendChild(this.inputWaitBefore);
			//attributes.appendChild(document.createElement("br"));
		}

		{//wait between
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_wait_between");
			div.appendChild(document.createTextNode(WAVE_SPAWN_WAIT_BETWEEN));
			this.inputWaitBetween = this.createElement("input", div, "mvminput wavespawninput");
			//this.inputWaitBetween.className="mvminput wavespawninput";
			addEvent(this.inputWaitBetween, "change", function() {this.ownerObject.setWaitBetween(this.value);}, false);
			//attributes.appendChild(this.inputWaitBetween);
			attributes.appendChild(document.createElement("br"));
		}

		//is support checkbox
		{
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_support");
			this.htmlIsSupport = this.createElement("input", div, "waveSpawnCheckBox");
			this.htmlIsSupport.type = "checkbox";
			//this.htmlRandomizeTemplatesOnly.value = POPULATION_RANDOMIZE_TEMPLATE_ONLY;
			div.appendChild(document.createTextNode(WAVE_SPAWN_IS_SUPPORT));
			addEvent(this.htmlIsSupport, "change", function() {this.ownerObject.setIsSupport(this.checked);}, false);
		}

		//random choice
		{
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_random_choice");
			this.htmlIsRandom = this.createElement("input", div, "waveSpawnCheckBox");
			this.htmlIsRandom.type = "checkbox";
			//this.htmlRandomizeTemplatesOnly.value = POPULATION_RANDOMIZE_TEMPLATE_ONLY;
			div.appendChild(document.createTextNode(WAVE_SPAWN_RANDOM_CHOICE));
			addEvent(this.htmlIsRandom, "change", function() {this.ownerObject.setIsRandom(this.checked);}, false);
		}

		//random spawn
		{
			var div = this.createElement("div", attributes, "wavespawnAttribute", null, "help_squad_random_spawn");
			this.htmlIsRandomSpawn = this.createElement("input", div, "waveSpawnCheckBox");
			this.htmlIsRandomSpawn.type = "checkbox";
			//this.htmlRandomizeTemplatesOnly.value = POPULATION_RANDOMIZE_TEMPLATE_ONLY;
			div.appendChild(document.createTextNode(WAVE_SPAWN_RANDOM_SPAWN));
			addEvent(this.htmlIsRandomSpawn, "change", function() {this.ownerObject.setIsRandomSpawn(this.checked);}, false);
		}


		this.htmlTabHandler = this.createElement("div", this.div, "waveSpawnTabHandler");
		//add choice
		{
			this.htmladdChoiceButton = this.createElement("div", this.htmlTabHandler, "waveSpawnTab waveSpawnAddTab", null, "help_squad_add_choice");
			addEvent(this.htmladdChoiceButton, "click", function() {this.ownerObject.addChoice(true);this.ownerObject.addBot();}, false);
			this.htmladdChoiceButton.appendChild(document.createTextNode("+"));
		}

		this.botshandler = this.createElement("div", this.div, "wavespawnbotshandler");



		{
			this.htmlBotsAdd = this.createElement("div", this.botshandler, "choiceAddBot");
			this.htmlBotsAdd.innerHTML = WAVE_SPAWN_ADD_BOT;

			{
				this.htmlTemplatesListFilter = this.createElement("div", this.htmlBotsAdd, "choiceTemplateListFilter");
				this.htmlTemplatesListFilter.appendChild(document.createTextNode(WAVE_SPAWN_FILTER));
				this.htmlFilter = this.createElement("input", this.htmlTemplatesListFilter, "mvmInput");
				addEvent(this.htmlFilter, "change", function(event) {this.ownerObject.filter(this.value);}, false);
				addEvent(this.htmlFilter, "keyup", function(event) {this.ownerObject.filter(this.value);}, false);
			}
			this.htmlTemplatesList = this.createElement("div", this.htmlBotsAdd, "choiceTemplateList");
			this.htmlBotsAddButton = this.createElement("div", this.htmlBotsAdd, "choiceAddBotButton", null, "help_squad_add_bot");
			addEvent(this.htmlBotsAddButton, "click", function() {this.ownerObject.addBot();}, false);
			this.htmlBotsAddButton.innerHTML = WAVE_SPAWN_ADD_STD_BOT;
		}


		this.waveSpawnTab = new Tab(null, {draggable:true, classname:"waveSpawnTab"});
		this.waveSpawnTab.setContainer(this.div);
		this.waveSpawnTab.setUserData({type:"wavespawn", wavespawn:this});


		this.tabBar = new TabBar(this.htmlTabHandler);
		var that = this;
		if (this.tabBar.addNotification) this.tabBar.addNotification(TabBar.EVENT_TAB_ACTIVATED,
			function(params) {
				that.tabActivated(params)
			}
		);
	    //create
	}
	this.create();
	this.setCurrency(400);
	this.setTotalCount(10);
	this.setMaxActive(5);
	this.setSpawnCount(2);
	this.setWaitBefore(0);
	this.setWaitBetween(10);
	this.setIsSupport(false);
	//this.addChoice(true);
	//this.addBot();
	this.setIsRandom(false);
	this.updateTemplates();
	return this;
}

WaveSpawn.prototype.activate= function() {
	if (this.currentChoice) {
		var currentBot = this.currentChoice.getCurrentBot();
		if (currentBot) {
			this.setCurrentBot(currentBot);
		}
	}

/*	if (this.currentBot) {
		this.setCurrentBot(this.currentBot);
	}*/
}
// filter
WaveSpawn.prototype.filter = function(filter) {
//templateName
	var filterArray = filter.replace(/^\s+|\s+$/g, '').toLowerCase().split(" ");
	for (var i=0; i<this.templatesList.length; i++) {
		var template = this.templatesList[i];
		//var name = template.templateName.toLowerCase();
		var name = template.ownerBot.getExtendedName().toLowerCase();
		console.log(name);
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

WaveSpawn.prototype.remove = function() {
	if (this.waveSpawnTab) {
		this.waveSpawnTab.remove();
	}
	this.removeAllBots();
}

//removeFromParent
WaveSpawn.prototype.removeFromParent = function() {
    this.div.parentElement.ownerObject.removeWaveSpawn(this);
}

//tabActivated
WaveSpawn.prototype.tabActivated = function(params) {
	var userdata = params.tabActivated.getUserData();
	if (userdata.type == "choice") {
		this.setCurrentChoice(userdata.choice);
	}
	/*if (this.currentWave) {//TODO
		this.currentWave.activate();
	} */

	this.activate();
}

/**
 * Get all templates used y this population
 * @return {Array} Template name array
 */
WaveSpawn.prototype.getUsedTemplates = function() {
	var templateArray = {};
	var randomChoices = this.randomChoices;
	for (var randomChoiceIndex in randomChoices) {
		var list = randomChoices[randomChoiceIndex].getUsedTemplates();
		for (var i in list) {
			templateArray[i] = 1;
			//templateArray.[bots[botIndex].getTemplateName()] = 1;
		}
	}
	return templateArray;
}

//////////SETTERS

/**
 * Set done output.
 * @param {String} target The output target.
 * @return this
 */
WaveSpawn.prototype.setSpawnLocation = function(spawnLocation, active) {
	if (this.spawnLocationList[spawnLocation] == active) {
		return false;
	}
	this.spawnLocationList[spawnLocation] = active;
	//TODO: update list
	this.updateSpawns();
	return true;
}

//setSpawnList
WaveSpawn.prototype.setSpawnList = function() {
	var opts = this.htmlWhereList.options;
	//for(var i=0; i<opts.length; i++) {
	for(var i in opts) {
		this.setSpawnLocation(opts[i].value, opts[i].selected);
	}
	//this.update(UPDATE_FIELD_TAG_LIST);
};   

//updateSpawns
WaveSpawn.prototype.updateSpawns = function() {
	var opts = this.htmlWhereList.options;
	for(var i in opts) {
		opts[i].selected = this.spawnLocationList[opts[i].value];
	}
};

//////////GETTERS

/**
 * Return a spawn location
 * @return {Boolean} This wave spawn use this spawn location
 */
WaveSpawn.prototype.getSpawnLocation = function(spawnLocation) {
	return this.spawnLocationList[spawnLocation];
};

/**
 * Return list of spawn locations
 * @return {Object} Spawn locations
 */
WaveSpawn.prototype.getSpawnLocations = function() {
	return this.spawnLocationList;
};
