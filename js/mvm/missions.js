function Missions()
{
	this.missionList = new Array();

////////
    if (typeof Missions.initialized == "undefined")
	{
	    //createElement
		Missions.prototype.createElement = CREATE_ELEMENT;
		
	    // addMission
		Missions.prototype.addMission = function(setCurrent) {
			var mission = new Mission();
		    if (mission != null)
		    {
		        this.missionList.push(mission);
				//this.htmlTabsHandler.insertBefore(mission.htmlMissionTab, this.htmlAddMissionButton);
				this.htmlTabsHandler.appendChild(mission.htmlMissionTab);

				addEvent(mission.htmlMissionTab, "click", function() {this.parentElement.ownerObject.setCurrentMission(this.ownerObject);}, false);

				this.htmlMissionHandler.appendChild(mission.htmlElement);
				mission.setNumber(this.missionList.length);
				if (setCurrent) {
					this.setCurrentMission(mission);
				}
				return mission;
			}
			return false;
		}
	    // setCurrentMission @mission: mission objsct
		Missions.prototype.setCurrentMission = function(mission) {
			this.currentMission = mission;
		    if (mission != null)
		    {
				for (var i in this.missionList) {
					this.missionList[i].htmlElement.style.display = "none";
					this.missionList[i].htmlMissionTab.id = "";
				}
				mission.htmlElement.style.display = "";
				mission.htmlMissionTab.id = "selectedTab";
			}
			return false;
		}

	    // create
		Missions.prototype.create = function() {
			this.htmlElement = this.createElement("div", null, "missions", null, "help_missions");
			this.htmlHeader = this.createElement("div", this.htmlElement, "missionsHeader");
			

			this.htmlHeader.innerHTML = MISSIONS;
			//missions
			this.htmlTabsHandler = this.createElement("div", this.htmlElement, "missionsTabHandler");

			this.htmlAddMissionButton = this.createElement("div", this.htmlTabsHandler, "missionTab missionAddTab", null, "help_missions_add");
			addEvent(this.htmlAddMissionButton, "click", function() {this.ownerObject.addMission(true);}, false);
			this.htmlAddMissionButton.appendChild(document.createTextNode("+"));

			this.htmlMissionHandler = this.createElement("div", this.htmlElement);

		}
		//remove mission
		Missions.prototype.removeMission= function(mission, force) {
		    /*if (this.missionList.length<2&&force!=true)
		        return false;*/
		    var index = this.missionList.indexOf(mission);
		    if (index!=-1)
		    {
		        this.missionList.splice(index, 1);
		        this.htmlMissionHandler.removeChild(mission.htmlElement);
				this.htmlTabsHandler.removeChild(mission.htmlMissionTab);

		        this.renumMissions();
				if (!force) this.setCurrentMission(this.missionList[0]);
		        return true;
		    }
		    return false;
		}
		//renumMissions
		Missions.prototype.renumMissions = function() {
		    var i = 1;
			for (var index in this.missionList) {
				this.missionList[index].setNumber(i);
				++i;
		    }
		};
		//removeAllMissions
		Missions.prototype.removeAllMissions = function() {
		    while (this.missionList.length)
		    {
		    	this.removeMission(this.missionList[0], true);
		    }
		};
		//randomize
		Missions.prototype.randomize = function(numMissions) {
		    if (isNumber(numMissions))
			{
				this.removeAllMissions();
				for (var i=0; i<numMissions; i++) {
				    this.addMission().randomize(i+1);
				    this.addMission().randomize(i+1);
				}
				this.setCurrentMission(this.missionList[0]);
		    }
		};
		//loadXml
		Missions.prototype.loadXml = function(node) {
			var lowernodename = node.nodeName.toLowerCase();
			if (lowernodename != "mission") return false;
			var mission = this.addMission(true);
			mission.loadXml(node);
		};
		
        Missions.initialized = true;
    }
////////
	


	this.create();
	
	//this.addW(true);
	
	return this;
}

Missions.prototype.activate= function() {
	if (this.currentMission) {
		this.currentMission.activate();
	}
}
   /*
//tabActivated
Missions.prototype.tabActivated = function(params) {
	var userdata = params.tabActivated.getUserData();
	if (userdata.type == "wave") {
		this.setCurrentWave(userdata.wave);
	}
	if (this.currentWave) {
		this.currentWave.activate();
	}
}
		 */
			//this.currentMission = mission;

				/*
//notifyBotTemplateAdded
Missions.prototype.notifyBotTemplateAdded = function(template) {
	for (var i in this.missionList) {
		var mission = this.missionList[i];
		mission.notifyBotTemplateAdded(template);
	}
};                                                                                                   */




//////////GETTERS

/**
 * Get all templates used y this population
 * @return {Array} Template name array
 */
Missions.prototype.getUsedTemplates = function() {
	var templateArray = [];//globalmissions.getUsedTemplates();
	var missions = this.missionList;
	for (var missionIndex in missions) {
		var list = missions[missionIndex].getUsedTemplates();
		for (var i in list) {
			templateArray[i] = 1;
		}
	}
	return templateArray;
}