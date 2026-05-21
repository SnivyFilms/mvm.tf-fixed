var MapList = new Array();

/**
 * @constructor
 * @param {String} name Name of the map
 * @param {String} displayName Dispay name of the map
 * @return this
 */
function Map(name, displayName)
{
	this.name = name;
	this.displayName = displayName;
	this.spawns = new Array();
	this.tags = new Array();
	this.tankPaths = new Array();
	this.populations = [];
	this.startWaveOutput = "";
	this.startWaveOutputBombReset = "";
	this.doneOutput = "";
	this.firstSpawnOutput = "";
	this.hasPopulations = false;

	this.addTags("bot_giant bot_sentrybuster bot_squad_member bot_gatebot");
	return this;
};

//SETTERS

/**
 * Set done output.
 * @param {String} target The output target.
 * @return this
 */
Map.prototype.setDoneOutput = function(target) {
	this.doneOutput = target;
	return this;
};

/**
 * Set start wave output.
 * @param {String} target The output target.
 * @param {Boolean} bombreset Set if the target output resets the bomb.
 * @return this
 */
Map.prototype.setStartWaveOutput = function(target, bombreset)
{
	if (bombreset) {
		this.startWaveOutputBombReset = target;
	} else {
		this.startWaveOutput = target;
	}
	return this;
};

/**
 * Adds multiples tags.
 * @param {String} tags A space-separated list of tags
 */
Map.prototype.addTags = function(tags) {
	var tagsArray = tags.split(" ");
	for (var i in tagsArray) {
		this.addTag(tagsArray[i]);
	}
};

/**
 * Adds a tag to the map.
 * @param {String} tag The tag to add
 */
Map.prototype.addTag = function(tag) {
	this.tags.push(tag);
};

/**
 * Add a population file to the map.
 * @param {String} name Display name of the population
 * @param {String} xmlfile Xml source of the population
 */
Map.prototype.addPopulation = function(name, xmlfile) {
 	this.hasPopulations = true;
	this.populations.push({name:name, xml:xmlfile});
};

/**
 * Add multiple spawn locations
 * @param {String} spawns A space-separated list of spawn locations
 */
Map.prototype.addSpawns = function(spawns) {
	var spawnsArray = spawns.split(" ");
	for (var i in spawnsArray) {
		this.addSpawn(spawnsArray[i]);
	}
};

/**
 * Add a spawn location.
 * @param {String} spawn Spawn location
 */
Map.prototype.addSpawn = function(spawn) {
	this.spawns.push(spawn);
};

/**
 * Add multiple tank paths
 * @param {String} path A space-separated list of tank paths
 */
Map.prototype.addTankPaths = function(paths) {
	var pathArray = paths.split(" ");
	for (var i in pathArray) {
		this.addTankPath(pathArray[i]);
	}
};

/**
 * Add a tank path
 * @param {String} path Tank path
 */
Map.prototype.addTankPath = function(path) {
	this.tankPaths.push(path);
};


//////////GETTERS

/**
 * Return an array of map tag
 * @return {Array} The map's tag array.
 */
Map.prototype.getTags = function() {
	return this.tags;
};

/**
 * Return an array of population
 * @return {Array} The population array.
 */
Map.prototype.getPopulations = function() {
	return this.populations;
};

/**
 * Return the map name
 * @return {Array} The map name.
 */
Map.prototype.getName = function() {
	return this.name;
};

/**
 * Return start wave output.
 * @param {Boolean} bombreset Get the target output which resets the bomb.
 * @return this
 */
Map.prototype.getStartWaveOutput = function(bombreset)
{
	if (bombreset) {
		if (this.startWaveOutputBombReset=="") {
			return this.startWaveOutput;
		} else {
			return this.startWaveOutputBombReset;
		}
	} else {
		return this.startWaveOutput;
	}
};

/**
 * Return done output
 * @return {String} The map done output.
 */
Map.prototype.getDoneOutput = function() {
	return this.doneOutput;
};

/**
 * Return whether or not map has population
 * @return {Boolean} True if map has population.
 */
Map.prototype.hasPopulations = function() {
	return this.hasPopulations;
};
