var BASE_OFFICIAL_FILES = "./xml/";

function LoadPop()
{
	this.populationList = {};
	this.create();
	return this;
}
LoadPop.prototype.createElement = CREATE_ELEMENT;

  // create
LoadPop.prototype.create = function() {
	this.htmlElement = this.createElement("div", null, "loadPopulation", null, "help_load_population");
	this.htmlHeader = this.createElement("div", this.htmlElement, "loadPopulationHeader");
	this.htmlContent = this.createElement("div", this.htmlElement);
	
	//this.htmlHeader.innerHTML = "Load an official mission";//TODO
	this.htmlForm = this.createElement("form", this.htmlContent, null, null, null, "sendfile");
	this.htmlForm.target = "hiddenmyiframe";
	this.htmlForm.method = "post";
	this.htmlForm.enctype = "multipart/form-data";
	this.htmlForm.action = "javascript:void(0)";
	addEvent(this.htmlForm, "submit", function(event) {this.ownerObject.onSubmit(event);}, false);

	this.htmlFileInput = this.createElement("input", this.htmlForm);
	this.htmlFileInput.type = "file";
	this.htmlFileInput.name = "popfile";
	this.htmlFileInput.accept = ".pop,.txt,.xml";
	addEvent(this.htmlFileInput, "change", function(event) {this.ownerObject.onFileSelected(event);}, false);

	this.htmlSubmit = this.createElement("input", this.htmlForm);
	this.htmlSubmit.type = "submit";
	this.htmlSubmit.value = "Load pop file";

	this.htmlLoadOfficial = this.createElement("div", this.htmlContent, "loadPopulationOffi", null, "help_load_population_offi");
	this.htmlLoadOfficialHeader = this.createElement("div", this.htmlLoadOfficial, "loadPopulationOffiHeader");
	  
	this.htmlLoadOfficialHeader.innerHTML = "Load an official mission";//TODO
}

LoadPop.prototype.initMapList= function() {
	for (var mapIndex in MapList) {
		var map = MapList[mapIndex];
		var populations = map.getPopulations();
		var firstPop = true;
		if (map.hasPopulations) {
			this.addMap(map);
		}

		for (var populationIndex in populations) {
			var population = populations[populationIndex];
			this.addPopulation(map.getName(), population);
		}
	}
	this.showPopulations("");
}

LoadPop.prototype.addMap= function(map) {
	//populationList
	var mapDiv = this.createElement("div", this.htmlLoadOfficial, "loadOffiMap");
	var mapName = this.createElement("div", mapDiv, "loadOffiMapName");
	var mapMissions = this.createElement("div", mapDiv, "loadOffiMapMissions");
	mapName.innerHTML = map.getName();

	addEvent(mapName, "click", function(event) {this.ownerObject.showPopulations(map.getName());}, false);

	this.populationList[map.getName()] = mapMissions;
}

LoadPop.prototype.addPopulation= function(mapName, population) {
	var popDiv = this.createElement("div", this.populationList[mapName], "loadOffiPopulation");
	popDiv.innerHTML = population.name;
	addEvent(popDiv, "click", function(event) {this.ownerObject.loadPopulation(population.xml);}, false);
}

//loadPopulation
LoadPop.prototype.loadPopulation = function(popXml) {
	_LoadPopFile(BASE_OFFICIAL_FILES + popXml);
};

LoadPop.prototype.showPopulations= function(mapName) {
	for (var mapIndex in this.populationList) {
		if (mapIndex==mapName) {
			Show(this.populationList[mapIndex])
		} else {
			Hide(this.populationList[mapIndex])
		}
	}

}

LoadPop.prototype.onFileSelected = function(event) {
	var file = this.htmlFileInput.files ? this.htmlFileInput.files[0] : null;
	if (!file) {
		return false;
	}
	if (typeof LoadPopFile === "function") {
		LoadPopFile(file);
		return true;
	}
	return false;
};

LoadPop.prototype.onSubmit = function(event) {
	var file = this.htmlFileInput.files ? this.htmlFileInput.files[0] : null;
	if (file && typeof LoadPopFile === "function") {
		if (event && event.preventDefault) {
			event.preventDefault();
		}
		LoadPopFile(file);
		return false;
	}
	return true;
};
