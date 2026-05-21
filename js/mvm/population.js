
function Population(url)
{
	this.name = "";
	this.currency = "";
	this.respawnTime = "";
	this.randomizeTemplatesOnly = false;
	this.waves = new Array();
	this.url = url;
	this.canBotsAttackWhileInSpawnRoom = "";
	this.addSentryBusterWhenDamageDealtExceeds = "";
	this.addSentryBusterWhenKillCountExceeds = "";
	this.advanced = "";
	this.fixedRespawnWaveTime = false;
	this.zombieBots = false;
	this.currentTab = 'Waves';

	this.mapChangeListenerList = new Array();


	this.waitAction = false;
	this.abortAction = false;
	this.resetBomb = false;
////////
    if (typeof Population.initialized == "undefined")
	{
	    //createElement
		Population.prototype.createElement = CREATE_ELEMENT;
		Population.prototype.getCreateElement = GET_OR_CREATE_ELEMENT;
		
	    // setCurrency @currency: integer
		Population.prototype.setCurrency = function(currency) {
			this.inputCurrency.id = "";
		    if (this.currency != currency)
		    {
		        if (isNumber(currency))
		        {
		            if (currency>30000) currency=30000;
					this.currency = currency;
					this.inputCurrency.value =  currency;
				} else {
				    this.inputCurrency.id = "mvmNaNinput";
				}
			}
		}
	    // setRespawnTime @respawnTime: integer
		Population.prototype.setRespawnTime = function(respawnTime) {
			this.inputRespawnTime.id = "";
		    if (this.respawnTime != respawnTime)
		    {
		        if (isNumber(respawnTime)||respawnTime=="")
		        {
					this.respawnTime = respawnTime;
					this.inputRespawnTime.value =  respawnTime;
				} else {
				    this.inputRespawnTime.id = "mvmNaNinput";
				}
			}
		}
	    // setCanBotsAttackWhileInSpawnRoom @canBotsAttackWhileInSpawnRoom: bool
		Population.prototype.setCanBotsAttackWhileInSpawnRoom = function(canBotsAttackWhileInSpawnRoom) {
		    if (this.canBotsAttackWhileInSpawnRoom != canBotsAttackWhileInSpawnRoom)
		    {
				this.canBotsAttackWhileInSpawnRoom = canBotsAttackWhileInSpawnRoom;
				this.htmlCanBotsAttackWhileInSpawnRoom.checked =  canBotsAttackWhileInSpawnRoom;
			}
		}
	    // setFixedRespawnWaveTime @fixedRespawnWaveTime: bool
		Population.prototype.setFixedRespawnWaveTime = function(fixedRespawnWaveTime) {
		    if (this.fixedRespawnWaveTime != fixedRespawnWaveTime)
		    {
				this.fixedRespawnWaveTime = fixedRespawnWaveTime;
				this.htmlFixedRespawnWaveTime.checked =  fixedRespawnWaveTime;
			}
		}
	    // setZombieBots @zombieBots: bool
		Population.prototype.setZombieBots = function(zombieBots) {
		    if (this.zombieBots != zombieBots)
		    {
				this.zombieBots = zombieBots;
				this.htmlZombieBots.checked =  zombieBots;
			}
		}
	    // setAddSentryBusterWhenDamageDealtExceeds @addSentryBusterWhenDamageDealtExceeds: integer
		Population.prototype.setAddSentryBusterWhenDamageDealtExceeds = function(addSentryBusterWhenDamageDealtExceeds) {
			this.htmlAddSentryBusterWhenDamageDealtExceeds.id = "";
		    if (this.addSentryBusterWhenDamageDealtExceeds != addSentryBusterWhenDamageDealtExceeds)
		    {
		        if (isNumber(addSentryBusterWhenDamageDealtExceeds)||addSentryBusterWhenDamageDealtExceeds=="")
		        {
					this.addSentryBusterWhenDamageDealtExceeds = addSentryBusterWhenDamageDealtExceeds;
					this.htmlAddSentryBusterWhenDamageDealtExceeds.value =  addSentryBusterWhenDamageDealtExceeds;
				}
				else
				    this.htmlAddSentryBusterWhenDamageDealtExceeds.id = "mvmNaNinput";
			}
		}
	    // setAddSentryBusterWhenKillCountExceeds @addSentryBusterWhenKillCountExceeds: integer
		Population.prototype.setAddSentryBusterWhenKillCountExceeds = function(addSentryBusterWhenKillCountExceeds) {
			this.htmlAddSentryBusterWhenKillCountExceeds.id = "";
		    if (this.addSentryBusterWhenKillCountExceeds != addSentryBusterWhenKillCountExceeds)
		    {
		        if (isNumber(addSentryBusterWhenKillCountExceeds)||addSentryBusterWhenKillCountExceeds=="")
		        {
					this.addSentryBusterWhenKillCountExceeds = addSentryBusterWhenKillCountExceeds;
					this.htmlAddSentryBusterWhenKillCountExceeds.value =  addSentryBusterWhenKillCountExceeds;
				}
				else
				    this.htmlAddSentryBusterWhenKillCountExceeds.id = "mvmNaNinput";
			}
		}
	    // setAdvanced
		Population.prototype.setAdvanced = function(advanced) {
		    if (this.advanced != advanced)
		    {
				this.advanced = advanced;
				this.htmlAdvanced.checked =  advanced;
			}
		}
	    // setResetBomb
		Population.prototype.setResetBomb = function(resetBomb) {
		    if (this.resetBomb != resetBomb)
		    {
				this.resetBomb = resetBomb;
				this.htmlResetBomb.checked =  resetBomb;
			}
		}
	    // addWave
		Population.prototype.addWave = function(setCurrent) {
			var wave = new Wave();
		    if (wave != null)
		    {
		        this.waves.push(wave);
				this.tabBar.addTab(wave.waveTab);

				wave.waveTab.activate();
				this.wavehandler.appendChild(wave.div);
				wave.setNumber(this.waves.length);
				wave.div.style.display = "none";
				if (setCurrent) this.setCurrentWave(wave);
				return wave;
			}
			return false;
		}
	    // setCurrentWave @wave: wave objsct
		Population.prototype.setCurrentWave = function(wave) {
			this.currentWave = wave;
		    if (wave != null)
		    {
				for (var i in waves) {
					waves[i].div.style.display = "none";
				}
				wave.div.style.display = "";
			}
			return false;
		}
	    // addMap
		Population.prototype.addMap = function(mapName) {
			var option = this.createElement("option", this.htmlMapList, "populationMapList");
			option.innerHTML = mapName;
			option.value = mapName;
		}
	    // changeMapName
		Population.prototype.changeMapName = function() {
			var option = this.htmlMapList.options[this.htmlMapList.selectedIndex];
			if (option == undefined) return;

			this.setMapName(option.value);
		}
	    // setMapName
		Population.prototype.setMapName = function(mapName) {
			if (this.mapName == mapName) return;
			if (mapName == "mvm_coaltown_event" ) {
				this.setZombieBots(true);
			}
			if (mapName == "mvm_mannworks" || mapName == "mvm_coaltown_event" )
				this.htmlResetBombDiv.style.display = "";
			else
				this.htmlResetBombDiv.style.display = "none";
			this.mapName = mapName;

			for (var i =0; i< this.htmlMapList.options.length; i++) {
				var option = this.htmlMapList.options[i];
				if (option.value==mapName) {
					this.htmlMapList.selectedIndex = i;
					break;
				}
			}

			this.updateMapName();
		}

	    // create
		Population.prototype.create = function() {
			this.htmlElement = this.createElement("div", null, "TFPopulation", null, "");

			this.htmlTabsHandler2 = this.createElement("div", this.htmlElement, "populationTabHandler2", null, null, "populationTabs2");
			this.div = this.htmlElement;//this.createElement("div", this.htmlElement, "TFPopulation", null, "help_population");
			
		    //header
			var header = this.createElement("div", this.div, "populationheader");

			//attributes
			var attributes1 = this.createElement("div", this.div, "populationAttributes");
			var attributes2 = this.createElement("div", this.div, "populationAttributes");
			var attributes3 = this.createElement("div", this.div, "populationAttributes");
			var attributes4 = this.createElement("div", this.div, "populationAttributes");

			{//currency
				var currency = this.createElement("div", attributes1, null, null, "help_population_currency");
				var cashImg = this.createElement("div", currency, "cashImg");
				//cashImg.src = "img/mvm_cash.png";//img/backpack/weapons/w_models/w_minigun.png
				
				//currency.appendChild(document.createTextNode("Starting currency :"));
				this.inputCurrency = this.createElement("input", currency, "mvminput PopulationInput");
				addEvent(this.inputCurrency, "change", function() {this.ownerObject.setCurrency(this.value);}, false);
				currency.appendChild(document.createElement("br"));
			}

			{//respawn time
				var respawnTime = this.createElement("div", attributes1, null, null, "help_population_respawn_time");
				respawnTime.appendChild(document.createTextNode("Respawn time :"));
				this.inputRespawnTime = this.createElement("input", respawnTime, "mvminput PopulationInput");
				addEvent(this.inputRespawnTime, "change", function() {this.ownerObject.setRespawnTime(this.value);}, false);
			}

			{//FixedRespawnWaveTime
				var fixedrespawnwavetime = this.createElement("div", attributes1, null, null, "help_population_fixed_respawn_time");
				this.htmlFixedRespawnWaveTime = this.createElement("input", fixedrespawnwavetime, "mvminput populationCheckBox");
				this.htmlFixedRespawnWaveTime.type = "checkbox";
				fixedrespawnwavetime.appendChild(document.createTextNode(POPULATION_FIXED_RESPAWN_TIME));
				addEvent(this.htmlFixedRespawnWaveTime, "change", function() {this.ownerObject.setFixedRespawnWaveTime(this.checked);}, false);
			}

			{//zombiebots
				var zombiebots = this.createElement("div", attributes1, null, null, "help_population_zombie_bots");
				this.htmlZombieBots = this.createElement("input", zombiebots, "mvminput populationCheckBox");
				this.htmlZombieBots.type = "checkbox";
				zombiebots.appendChild(document.createTextNode(POPULATION_ZOMBIE_BOTS));
				addEvent(this.htmlZombieBots, "change", function() {this.ownerObject.setZombieBots(this.checked);}, false);
			}

			//AddSentryBusterWhenDamageDealtExceeds
			{
				var div = this.createElement("div", attributes2, null, null, "help_population_sb_damage");
				div.appendChild(document.createTextNode(POPULATION_ADD_SENTRY_BUSTER_DAMAGE));
				this.htmlAddSentryBusterWhenDamageDealtExceeds = this.createElement("input", div, "mvminput PopulationInput");
				addEvent(this.htmlAddSentryBusterWhenDamageDealtExceeds, "change", function() {this.ownerObject.setAddSentryBusterWhenDamageDealtExceeds(this.value);}, false);
			}

			//AddSentryBusterWhenKillCountExceeds
			{
				var div = this.createElement("div", attributes2, null, null, "help_population_sb_kills");
				div.appendChild(document.createTextNode(POPULATION_ADD_SENTRY_BUSTER_KILLS));
				this.htmlAddSentryBusterWhenKillCountExceeds = this.createElement("input", div, "mvminput PopulationInput");
				addEvent(this.htmlAddSentryBusterWhenKillCountExceeds, "change", function() {this.ownerObject.setAddSentryBusterWhenKillCountExceeds(this.value);}, false);
			}

			//CanBotsAttackWhileInSpawnRoom
			{
				var div = this.createElement("div", attributes2, null, null, "help_population_bot_attack");
				this.htmlCanBotsAttackWhileInSpawnRoom = this.createElement("input", div, "mvminput populationCheckBox");
				this.htmlCanBotsAttackWhileInSpawnRoom.type = "checkbox";
				div.appendChild(document.createTextNode(POPULATION_CAN_BOT_ATTACK_IN_SPAWN));
				addEvent(this.htmlCanBotsAttackWhileInSpawnRoom, "change", function() {this.ownerObject.setCanBotsAttackWhileInSpawnRoom(this.checked);}, false);
			}

			//Advanced
			{
				var div = this.createElement("div", attributes1, null, null, "help_population_advanced");
				this.htmlAdvanced = this.createElement("input", div, "mvminput populationCheckBox");
				this.htmlAdvanced.type = "checkbox";
				div.appendChild(document.createTextNode(POPULATION_ADVANCED));
				addEvent(this.htmlAdvanced, "change", function() {this.ownerObject.setAdvanced(this.checked);}, false);
			}

			//Map name
			{
				var div = this.createElement("div", attributes2, null, null, "help_population_map_name");
				div.appendChild(document.createTextNode(POPULATION_MAP_NAME));
				this.htmlMapList = this.createElement("select", div, "mvminput populationDropDown");
				addEvent(this.htmlMapList, "change", function() {this.ownerObject.changeMapName();}, false);
			}

			//Reset bomb
			{
				this.htmlResetBombDiv = this.createElement("div", div, "populationResetBomb", null, "help_population_reset_bomb");
				this.htmlResetBomb = this.createElement("input", this.htmlResetBombDiv, "mvminput populationCheckBox");
				this.htmlResetBombDiv.appendChild(document.createTextNode(POPULATION_RESET_BOMB));
				this.htmlResetBomb.type = "checkbox";
				addEvent(this.htmlResetBomb, "change", function() {this.ownerObject.setResetBomb(this.checked);}, false);
			}

			//dl button
			{
				var generate = this.createElement("div", attributes3, "populationGenerate populationButton", null, "help_population_generate");
				generate.appendChild(document.createTextNode(POPULATION_GENERATE));
				addEvent(generate, "click", function() {if (this.ownerObject.waitAction) return;SaveXML(this.ownerObject);}, false);
				attributes3.appendChild(document.createElement("br"));
			}

			//test
			{
				var test = this.createElement("div", attributes3, "populationTest populationButton", null, "help_population_test");
				test.appendChild(document.createTextNode(POPULATION_TEST));
				addEvent(test, "click", function() {if (this.ownerObject.waitAction) return;TestXML(this.ownerObject);}, false);
				attributes3.appendChild(document.createElement("br"));
			}

			//randomize button
			{
				var randomize = this.createElement("div", attributes3, "populationRandomize populationButton", null, "help_population_randomize");
				randomize.appendChild(document.createTextNode(POPULATION_RANDOMIZE));
				addEvent(randomize, "click", function() {if (this.ownerObject.waitAction) return;this.ownerObject.randomize(getRandom(4,8));}, false);
			}

			//clear button
			{
				var clear = this.createElement("div", attributes3, "populationClear populationButton", null, "help_population_clear_all");
				clear.appendChild(document.createTextNode(POPULATION_CLEAR));
				addEvent(clear, "click", function() {if (this.ownerObject.waitAction) return;this.ownerObject.clearPopup();}, false);
				attributes3.appendChild(document.createElement("br"));
			}

			//templates only checkbox
			{
				this.htmlRandomizeTemplatesOnly = this.createElement("input", attributes3, "populationCheckBox", null, "help_population_templates_only");
				this.htmlRandomizeTemplatesOnly.type = "checkbox";
				attributes3.appendChild(document.createTextNode(POPULATION_RANDOMIZE_TEMPLATE_ONLY));
				addEvent(this.htmlRandomizeTemplatesOnly, "change", function() {this.ownerObject.setRandomizeTemplatesOnly(this.checked);}, false);
			}

			//Load button
			{
				var loadButton = this.createElement("div", attributes4, "populationLoad populationButton", null, "help_population_load");
				loadButton.appendChild(document.createTextNode(POPULATION_LOAD));
				addEvent(loadButton, "click", function() {if (this.ownerObject.waitAction) return;LoadLastSaved();}, false);
				attributes4.appendChild(document.createElement("br"));
			}
			//Save button
			{
				var loadButton = this.createElement("div", attributes4, "populationSave populationButton", null, "help_population_save");
				loadButton.appendChild(document.createTextNode(POPULATION_SAVE));
				addEvent(loadButton, "click", function() {if (this.ownerObject.waitAction) return;SaveXML(this.ownerObject);}, false);//SaveXML
			}

			this.wavesHandler = this.createElement("div", this.div);

			var div = this.createElement("div", this.wavesHandler);
			this.htmlTabsHandler = this.createElement("div", div, "populationTabHandler", null, null, "populationTabs");

			this.tabBar = new TabBar("populationTabs", "waveTab");
			var that = this;
			if (this.tabBar.addNotification) this.tabBar.addNotification(TabBar.EVENT_TAB_MOVED,
				function(params) {
					that.WaveTabMoved(params)
				}
			);

			//add wave
			{
				this.addWaveButton = this.createElement("div", this.htmlTabsHandler, "waveTab waveAddTab", null, "help_population_add_wave");
				addEvent(this.addWaveButton, "click", function() {this.ownerObject.addFirstWave(true);}, false);
				this.addWaveButton.appendChild(document.createTextNode("+"));
			}

			//waves
			this.tab2Handler = this.createElement("div", this.div);
			this.wavehandler = this.createElement("div", this.wavesHandler);
			this.missionHandler = this.createElement("div", this.tab2Handler, null, null, null, "missionhandler");
			this.templateHandler = this.createElement("div", this.tab2Handler, null, null, null, "templatehandler");
			this.loadPopHandler = this.createElement("div", this.tab2Handler, null, null, null, "loadpophandler");

			this.tabBar2 = new TabBar("populationTabs2");
			this.createTab2()


			var that = this;
			if (this.tabBar2.addNotification) this.tabBar2.addNotification(TabBar.EVENT_TAB_ACTIVATED,
				function(params) {
					that.tabActivated2(params)
				}
			);

			if (this.tabBar.addNotification) this.tabBar.addNotification(TabBar.EVENT_TAB_ACTIVATED,
				function(params) {
					that.tabActivated(params)
				}
			);

		}

		//remove wave
		Population.prototype.createTab2= function(name) {
			var tab1 = new Tab(null, {classname:"populationTab"});
			tab1.setContainer(this.wavesHandler);
			tab1.setHTML('Waves');
			tab1.setUserData('Waves');
			this.tabBar2.addTab(tab1);

			var tab2 = new Tab(null, {classname:"populationTab"});
			tab2.setContainer(this.missionHandler);
			tab2.setHTML('Missions');
			tab2.setUserData('Missions');
			this.tabBar2.addTab(tab2);

			var tab3 = new Tab(null, {classname:"populationTab"});
			tab3.setContainer(this.templateHandler);
			tab3.setHTML('Templates');
			tab3.setUserData('Templates');
			this.tabBar2.addTab(tab3);       

			var tab4 = new Tab(null, {classname:"populationTab"});
			tab4.setContainer(this.loadPopHandler);
			tab4.setHTML('Load population');
			tab4.setUserData('LoadPopulation');
			this.tabBar2.addTab(tab4);
            
			tab1.activate();

		}

		//remove wave
		Population.prototype.removeWave= function(wave, force) {
		    if (this.waves.length<2&&force!=true)
		        return false;
		    var index = this.waves.indexOf(wave);
		    if (index!=-1)
		    {
		        this.waves.splice(index, 1);
		        this.wavehandler.removeChild(wave.div);

		        this.renumWaves();
				if (!force) this.setCurrentWave(this.waves[0]);
				wave.remove();
		        return true;
		    }
		    return false;
		}
		//renumWaves
		Population.prototype.renumWaves = function() {
		    var i = 1;
			for (var index in this.waves) {
				this.waves[index].setNumber(i);
				++i;
		    }
		};
		//removeAllWaves
		Population.prototype.removeAllWaves = function() {
		    while (this.waves.length)
		    {
		    	this.removeWave(this.waves[0], true);
		    }
		};
		//randomize
		Population.prototype.randomize = function(numwaves) {
			this.waitAction=true;
			globalBotViewer.allowRefresh(false);

			numwaves = RANDOMIZE_NB_WAVES;
		    if (isNumber(numwaves))
			{
				this.removeAllWaves();
				this.randomizeWave(numwaves, 0);
				this.setCurrentWave(this.waves[0]);

				globalmissions.randomize(numwaves);
		    }
			globalBotViewer.allowRefresh(true);
		};
		//randomizeWave
		Population.prototype.randomizeWave = function(numwaves, waveNumber) {
			this.addWave(waveNumber==0).randomize(getRandom(RANDOMIZE_NB_SQUADS_MIN,RANDOMIZE_NB_SQUADS_MAX)+waveNumber, waveNumber);
			--numwaves;
			if (numwaves>0) {
				var t =this;
				setTimeout(function() {t.randomizeWave(numwaves, waveNumber+1)}, 0);
			}
			else {
				this.waitAction=false;
			}
		};
		//addFirstWave
		Population.prototype.addFirstWave = function() {
			var ws = this.addWave(true).addWaveSpawn(true);
			ws.addChoice(true);
			ws.addBot();
		};
		//clearPopup
		Population.prototype.clearPopup = function() {
	        this.clear();
			this.addFirstWave();
		};
		//clear
		Population.prototype.clear = function() {
			this.removeAllWaves();
			globalmissions.removeAllMissions();
		};
		//notifyBotTemplateAdded
		Population.prototype.notifyBotTemplateAdded = function(template) {
			for (var i in this.waves) {
				this.waves[i].notifyBotTemplateAdded(template);
			}

			globalBotViewer.notifyBotTemplateAdded(template);
			//globalmissions.notifyBotTemplateAdded(template);
		};
		//updateMapName
		Population.prototype.updateMapName = function() {
			for (var i in this.waves) {
				this.waves[i].updateMapName(this.mapName);
			}
			for (var i in this.mapChangeListenerList) {
				this.mapChangeListenerList[i].updateMapName(this.mapName);
			}
		};
		//addMapListener
		Population.prototype.addMapListener = function(listener) {
			this.mapChangeListenerList.push(listener);
		};
		//removeMapListener
		Population.prototype.removeMapListener = function(listener) {
		    var index = this.mapChangeListenerList.indexOf(listener);
		    if (index!=-1)
		    {
		        this.mapChangeListenerList.splice(index, 1);
		    }
		};
		//removeBotTemplate
		Population.prototype.removeBotTemplate = function(template) {
			for (var i in this.waves) {
				//TODO
			}
		};
		//loadXml
		Population.prototype.loadXml = function(xmlDoc, userDatas) {
			if (!xmlDoc) return;

			var pop = xmlDoc.documentElement;
			if (pop.nodeName != "population") return false;

			this.resetOptions();
			for (var i=0; i<pop.attributes.length; i++)
			{
			    var attribute = pop.attributes[i];
			    var lowernodename = attribute.nodeName.toLowerCase();

			    switch (lowernodename){
/*			        case "waitwhendone":
						this.waitwhendone = attribute.nodeValue;
			            break;
			        case "checkpoint":
						this.checkpoint = attribute.nodeValue;
			            break;*/
			        case "mapname":
						this.setMapName(attribute.nodeValue);
			            break;
			        case "startingcurrency":
						this.setCurrency(attribute.nodeValue);
			            break;
			        case "respawnwavetime":
						this.setRespawnTime(attribute.nodeValue);
			            break;
			        case "canbotsattackwhileinspawnroom":
						this.setCanBotsAttackWhileInSpawnRoom(attribute.nodeValue.toLowerCase()=="yes"?true:false);
			            break;
			        case "fixedrespawnwavetime":
						this.setFixedRespawnWaveTime(attribute.nodeValue.toLowerCase()=="yes"?true:false);
			            break;
			        case "eventpopfile":
						this.setZombieBots(attribute.nodeValue.toLowerCase()=="halloween"?true:false);
			            break;
			        case "addsentrybusterwhendamagedealtexceeds":
						this.setAddSentryBusterWhenDamageDealtExceeds(attribute.nodeValue);
			            break;
			        case "addsentrybusterwhenkillcountexceeds":
						this.setAddSentryBusterWhenKillCountExceeds(attribute.nodeValue);
			            break;
			        case "advanced":
						this.setAdvanced(attribute.nodeValue=="1"?true:false);
			            break;

/*
setAdvanced
setResetBomb*/
//FixedRespawnWaveTime

/*RespawnWaveTime
CanBotsAttackWhileInSpawnRoom
Advanced*/
						
			    }
			}

			for (var i=0; i<pop.childNodes.length; i++)
			{
			    var node = pop.childNodes[i];
			    var lowernodename = node.nodeName.toLowerCase();
			    switch (lowernodename){
			        case "templates":
			            //load templates
			            templateList.loadXml(node, userDatas);
			            break;
			        case "mission":
						globalmissions.loadXml(node);
			            break;
			        case "wave":
						var wave = this.addWave(true);
						wave.loadXml(node);
			            break;
			    }
			}
		};
		//setRandomizeTemplatesOnly
		Population.prototype.setRandomizeTemplatesOnly = function(value) {
            this.randomizeTemplatesOnly = value;
            this.htmlRandomizeTemplatesOnly.checked = value;
            
		};
		//resetOptions
		Population.prototype.resetOptions = function() {
			this.setCurrency(STARTING_CURRENCY);
			this.setRespawnTime(RESPAWN_TIME);
			this.setRandomizeTemplatesOnly(true);

			this.setCanBotsAttackWhileInSpawnRoom(false);
			this.setAddSentryBusterWhenDamageDealtExceeds("");
			this.setAddSentryBusterWhenKillCountExceeds("");
			this.setAdvanced(false);

			this.setFixedRespawnWaveTime(false);
			this.setZombieBots(false);

		};
		
        Population.initialized = true;
    }
////////

	this.create();
	this.resetOptions();
	for (var i in MapList) {
		this.addMap(i);
	}
	this.setMapName("");
	return this;
}

Population.prototype.WaveTabMoved = function(params) {
	if (params.moveBefore) {
		var 	tab = this.waves.splice(params.tabToMove, 1);
		this.waves.splice(params.moveBefore, 0, tab[0]);
		this.renumWaves();
	}
	logDebugMessage("WaveTabMoved");
}

//tabActivated
Population.prototype.tabActivated = function(params) {
	var userdata = params.tabActivated.getUserData();
	if (userdata.type == "wave") {
		this.setCurrentWave(userdata.wave);
	}
	if (this.currentWave) {
		this.currentWave.activate();
	}
}

//tabActivated
Population.prototype.tabActivated2 = function(params) {
	if (params.tabActivated/*&&!this.disableNotification*/) {
		//console.log(params.tabActivated.getUserData());
		var userdata = params.tabActivated.getUserData();
		this.currentTab = userdata;
		switch (userdata) {
			case 'Waves':
				if (this.currentWave) {
					this.currentWave.activate();
				}
				break;
			case 'Missions':
				globalmissions.activate();
				break;
			case 'Templates':
				templateList.activate();
				break;
		}
	}
}

//////////GETTERS

/**
 * Get all templates used y this population
 * @return {Array} Template name array
 */
Population.prototype.getUsedTemplates = function() {
	var templateArray = {};//globalmissions.getUsedTemplates();
	var waves = this.waves;
	
	
	var list = globalmissions.getUsedTemplates();
	for (var i in list) {
		templateArray[i] = 1;
	}
	
	for (var waveIndex in waves) {
		//templateArray = templateArray.concat(waves[waveIndex].getUsedTemplates());
		var list = waves[waveIndex].getUsedTemplates();
		for (var i in list) {
			templateArray[i] = 1;
		}
	}
	return templateArray;
}