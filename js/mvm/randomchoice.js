function RandomChoice(waveSpawn)
{
	this.htmlElement = null;
//	this.htmlTab = null;
	this.htmlBotsHandler = null;
	this.bots = new Array();
	this.waveSpawn = waveSpawn;
	this.currentBot = null;

////////
    if (typeof RandomChoice.initialized == "undefined")
	{
	    //createElement
		RandomChoice.prototype.createElement = CREATE_ELEMENT;

	    //show
        RandomChoice.prototype.show = function() {
			Show(this.htmlElement);
			//this.htmlElement.style.display = "";
			//this.htmlTab.id = "selectedTab";
		}
	    //hide
        RandomChoice.prototype.hide = function() {
			Hide(this.htmlElement);
			//this.htmlElement.style.display = "none";
			//this.htmlTab.id = "";
		}
	    //create
        RandomChoice.prototype.create = function() {
			this.htmlElement = this.createElement("div", null, "choice");
//			this.htmlTab = this.createElement("div", null, "choiceTab", null, "help_random_choice_tab");


			this.choiceTab = new Tab(null, {draggable:true, classname:"choiceTab"});
			this.choiceTab.setContainer(this.div);
			this.choiceTab.setUserData({type:"choice", choice:this});
			this.choiceTab.setHTML("CHOICE"); //TODO)

			this.htmlBotsHandler = this.createElement("div", this.htmlElement, "");
			//this.htmlBotsAdd = this.createElement("div", this.htmlBotsHandler, "choiceAddBot");
			//this.htmlTab.innerHTML = "CHOICE"; //TODO
		}
		//removeBot
		RandomChoice.prototype.removeBot= function(bot, force) {
		    if (this.bots.length<2&&force!=true)
		        return false;
		    var index = this.bots.indexOf(bot);
		    //alert(this.bots.indexOf(bot));
		    if (index!=-1)
		    {
		        this.bots.splice(index, 1);
		        this.htmlBotsHandler.removeChild(bot.htmlElement);
				var sel = Math.max(0, index-1);
				//globalBotViewer.setBot(this.bots[sel]);
				this.waveSpawn.setCurrentBot(this.bots[sel]);

				this.waveSpawn.updateTab();
		        return true;
		    }
		    return false;
		}

        RandomChoice.initialized = true;
    }
////////
	this.create();
}


  // setCurrentBot @bot: Bot
RandomChoice.prototype.setCurrentBot = function(bot) {
    if (bot != null)
    {
		if (this.currentBot != bot) {
/*			if (this.currentBot) {
				this.currentBot.showUnselected();
			}
			bot.showSelected();*/
			this.currentBot = bot;
		}
		//globalBotViewer.setBot(bot, 'Waves');
	}
	//return false;
}

// getCurrentBot
RandomChoice.prototype.getCurrentBot = function() {
	return this.currentBot; //TODO: check null
}

/**
 * Get all templates used y this population
 * @return {Array} Template name array
 */
RandomChoice.prototype.getUsedTemplates = function() {
	var templateArray = {};
	var bots = this.bots;
	for (var botIndex in bots) {
		templateArray[bots[botIndex].getTemplateName()] = 1;
	}
	return templateArray;
}