var HelpList =
{
	"help_wave":new Array("Wave", "This is a wave."),
	"help_wave_tab":new Array("Wave tab", "Select a wave to edit it."),
	"help_wave_remove_button":new Array("Wave", "Remove the current wave."),
	//"help_wave_tabs":"Squads",
	"help_wave_add_squad":new Array("Wave", "Add squad to wave."),
	"help_wave_attributes":new Array("Wave", "Wave attributes"),

	"help_item_selector":new Array("Item selector", "Select an item."),
	//"help_selector_element":"help_selector_element",
	"help_template_option":new Array("Template", "Select a template."),

	"help_bot_attributes":new Array("Bot", "Bot attributes."),
	"help_bot_navtag":new Array("Bot navigation", "Navigation tag of the bot. This bot will follow this path if available. (depends of the map)"),
	//"help_bot_track":"Starting path of the tank. On mannworks, boss_path_1 means left, boss_path2_1 means right.",
//	"help_bot_large":"help_bot_large",
	"help_bot_small":new Array("Bot", "Click here to edit bots attributes."),
	//"help_bot_header":"help_bot_header",
	"help_class_button":new Array("Bot class", "Choose a class for the bot. If the bot is based on a template, the class can't be choosen."),
	"help_bot":new Array("Bot", "This is a Bot."),
	"help_bot_remove_button":new Array("Bot", "Remove this bot of the squad. If there is only one bot, it can't be removed. Remove the squad rather."),
	"help_bot_attributes":new Array("Bot attributes", "-RemoveOnDeath (kick this bot from the game when it dies)<br/>-Aggressive (make this bot \"aggressive\" - behavior dependant)<br/>-SuppressFire (don't allow this bot to fire its weapon)<br/>-DisableDodge (don't allow this bot to dodge left/right in combat)<br/>-BecomeSpectatorOnDeath (send this bot to the spectator team when it dies)<br/>-RetainBuildings (any buildings built by this bot should not blow up if this bot is removed)<br/>-SpawnWithFullCharge (any weapons that build up a charge over time will spawn fully charged)<br/>-AlwaysCrit (all shots will be critical hits)<br/>-HoldFireUntilFullReload (dont fire until our weapon is fully reloaded after a barrage - for rocket launchers, grenade launchers, shotguns, etc)"),
	"help_bot_templates":new Array("Template selector", "This is the template the bot is based on."),
	"help_bot_name":new Array("Bot", "Name of the bot."),
	"help_bot_health":new Array("Bot health", "Health > 1000 means a giant bot. The game will scale the bot accordingly, unless you specify a scale."),
	"help_bot_auto_jump_min":new Array("Auto jump min", "Minimal time between 2 jumps when bot has autojump."),
	"help_bot_auto_jump_max":new Array("Auto jump max", "Max time between 2 jumps when bot has autojump."),
	"help_bot_scale":new Array("Bot scale", "Scale of 1 is a normal size bot. <br/>Scale > 1 is a big bot. Scale < 1 is a small bot. Scale is clamped from 0.25 to 2.5."),
	"help_bot_vision":new Array("Bot max vision range", "Max vision range of the bot."),
	"help_bot_skill":new Array("Bot skill", "Skill of the bot."),
	"help_bot_weapon_restriction":new Array("Weapon restriction", "Restrict or not the bot to one weapon"),
	"help_bot_behaviour":new Array("Bot behaviour", "-push: run straight to the hatch<br/>-Idler : stands around idle until a player gets close or injures them.<br/>-Mobber : picks a random player and chases them down, regardless of where they run."),
	"help_bot_items":new Array("Custom loadout", "Bot custom loadout. Click an item to change it."),
	"help_bot_tank_speed":new Array("Wave", "Speed of the tank."),
	"help_bot_tank_skin":new Array("Tank skin", "Check this if you wants to have a B&W skinned tank."),
	"help_bot_tank_track":new Array("Tank path", "Starting path of the tank. On mannworks, boss_path_1 means left, boss_path2_1 means right."),
	"help_bot_character_attributes":new Array("Characters attributes", "Drop characters attributes here."),

	"help_attribute":new Array("Character attribute", "Drag it to a bot drop box."),
	"help_attribute_remove_button":new Array("Attribute", "Remove this attribute."),
	"help_attributes":new Array("Attribute list", "Use the text box to filter attributes"),

	"help_mission":new Array("Mission", "A mission is a support bot (spy, sniper, sentry buster) sent to accomplish certain objectives."),
	"help_mission_remove_button":new Array("Mission", "Remove selected mission."),
	"help_mission_begin":new Array("Begin at", "First wave # at which the mission becomes active."),
	"help_mission_end":new Array("End at", "Last wave # at which the mission is active."),
	"help_mission_initial_cooldown":new Array("Initial cooldown", "Initial time before spawning bots. (in s.)"),
	"help_mission_cooldown":new Array("Cooldown", "Minimum time between spawning mission. (in s.)"),
	"help_mission_bot_count":new Array("Mission bot count", "How many bots will be spawned."),
	"help_mission_class_button":new Array("Mission bot", "Choose a bot for the mission. You can choose spy, sniper, sentry buster or engineer"),
	"help_mission_spawn_location":new Array("Spawn location", "Choose a spawn location for this mission."),
	"help_mission_teleport_where":new Array("Teleport spawn location", "When the bot builds a teleporter, that teleporter will become a spawn point for bots with a spawn name matching this teleport name"),
	"help_mission_objective":new Array("Objective", "Objective of the mission"),
	"help_mission_tab":new Array("Missions", "Select a mission to edit it."),

	"help_missions":new Array("Missions", "List of missions."),
	"help_missions_add":new Array("Add mission", "Add a mission."),

	"help_population":new Array("Population", "A population is a set of waves."),
	"help_population_currency":new Array("Currency", "Amount of initial $ given to players. This amount is maxed to 30000 due to a game bug."),
	"help_population_respawn_time":new Array("Respawn time", "Set the players respawn time."),
	"help_population_fixed_respawn_time":new Array("Fixed respawn time", "Respawn time is fixed or scaled."),
	"help_population_zombie_bots":new Array("Zombie bots", "Check this to have zombie bots."),
	"help_population_sb_damage":new Array("Sentry buster", "A senrty buster will be sent if damage dealt by a sentry is > this amount. A sentry buster will be sent for each sentry beyond this amount of damage."),
	"help_population_sb_kills":new Array("Sentry buster", "A sentry buster will be sent if a sentry inflict more than this amount of kill. A sentry buster will be sent for each sentry beyond this amount of kills."),
	"help_population_bot_attack":new Array("Bot attack", "Check this to allow bot attack while invulnerable in their spawn rooms."),
	"help_population_advanced":new Array("Advanced", "Advanced mission. Used for achievements."),
	"help_population_map_name":new Array("Map name", "Map name. Choose a map to get map specific spawns, bot navigation and tank starting point."),
	"help_population_reset_bomb":new Array("Reset bomb", "Only on mannworks. The bomb will return at the bot spawn if lying on the ground for some time."),
	"help_population_generate":new Array("Generate", "Download the pop file for this population. This will also save the population."),
	"help_population_test":new Array("Test", "Generate the pop file for testing on our server. You must connect to our server after that to start the mission."),
	"help_population_randomize":new Array("Randomize", "Randomize the population. This will wipe off all."),
	"help_population_clear_all":new Array("CLear all", "Wipe off the population."),
	"help_population_templates_only":new Array("Templates only", "If checked, the randomization will pick bots from templates. If not, it will generate totally random bots."),
	"help_population_load":new Array("Load", "Load the last saved population. Note that population is server side saved. Cookies must be activated."),
	"help_population_save":new Array("Save", "Save the population. Note that population is server side saved. Cookies must be activated."),
	"help_population_add_wave":new Array("Add wave", "Add wave to population."),

	"help_squad":new Array("Squad", "A squad is a group of bots spawning at the same time. A squad can be constituted of x bots. A tank can also be send in a squad."),
	"help_squad_template_list":new Array("Add template bot", "Click a template to add it to squad."),
	"help_squad_tab":new Array("Squad", "Select a squad to edit it."),
	"help_squad_header":new Array("Squad", "Bots in the squad."),
	"help_squad_spawn":new Array("Spawn", "Choose a spawn location for the squad."),
	"help_squad_remove_button":new Array("Squad", "Remove this squad."),
	"help_squad_name":new Array("Squad name", "This name is used for the wait for all spawned in later waves. Multiple squads can have the same name."),
	"help_squad_wait_for_all_spawned":new Array("Squad", "Name of the squad we wait before starting."),
	"help_squad_wait_for_all_dead":new Array("Squad", "Name of the squad we wait before starting."),
	"help_squad_currency":new Array("Squad currency", "How many bucks this squad will drop."),
	"help_squad_total_count":new Array("Total count", "Number of groups of robots sent. If this is set to 2, and the squad have 5 bots, there will be a total of 10 bots."),
	"help_squad_max_active":new Array("Max active", "Number of groups active simulteaneously."),
	"help_squad_spawn_count":new Array("Spawn count", "Number of groups spawned simulteaneously."),
	"help_squad_wait_before":new Array("Wait before", "Time before starting (in s.)."),
	"help_squad_wait_between":new Array("Wait between", "Minimum delay between spawning this group (in s.)"),
	"help_squad_support":new Array("Support", "Support squad will keep runing after the total count is reached, until all non-support squad are finished."),
	"help_squad_random_choice":new Array("Random choice", "Check this to add random choice of bots to the squad. Be bure to put an even number of bots in each choice."),
	"help_squad_random_spawn":new Array("Random spawn", "If this is checked, each bot of the squad will randomly choose a spawn location (if available)."),
	"help_squad_add_choice":new Array("Add choice", "Add a random choice of bots for this squad."),
	"help_squad_add_bot":new Array("Add bot", "Add standard bot to this squad."),

	"help_random_choice_tab":new Array("Choice tab", "Select a choice to edit it."),

	"help_templates":new Array("Templates", "List of preset bots with custom loadouts, attributes, etc..."),
	"help_templates_name":new Array("Template name", "Name of the template."),
	"help_templates_add":new Array("Add Template", "Add a new template."),
	"help_templates_copy":new Array("Copy template", "Copy current template to a new one."),
	"help_templates_list":new Array("Templates list", "List of available templates."),
	"help_templates_remove":new Array("Remove template", "Remove the currently selected template."),
	"help_templates_save":new Array("Save templates", "Save custom templates."),

}

function Help()
{
	this.htmlElement = null;
	this.active=false;
	
////////
    if (typeof Help.initialized == "undefined")
	{
		Help.helpPanel = CREATE_ELEMENT("div", document.body, "helpPanel");
		Help.helpPanel.style.visibility = 'hidden';
		Help.htmlHelpTitle = CREATE_ELEMENT("div", Help.helpPanel, "helpTitle");
		Help.htmlHelpText = CREATE_ELEMENT("div", Help.helpPanel, "helpText");


		//startDrag
		Help.prototype.startDrag = function(event) {
		    event.dataTransfer.effectAllowed = 'copy';
		    event.dataTransfer.setData('Text', "help|");
		}
		//setHelpId
		Help.prototype.setHelpIdOld = function(id) {

			if (HelpList[id]!=undefined) {
					Help.htmlHelpTitle.innerHTML = HelpList[id][0];
					Help.htmlHelpText.innerHTML = HelpList[id][1];
					Help.helpPanel.style.visibility = 'visible';
			}
			else {
				Help.htmlHelpText.innerHTML = "";
				Help.helpPanel.style.visibility = 'hidden';
			}
		}

		//create
		Help.prototype.create = function() {
		};
		//setActive
		Help.prototype.setActive = function() {
			this.active = true;
			this.show();
		};
		//setInactive
		Help.prototype.setInactive = function() {
			this.active = false;
			//this.setHelpId(null);
			this.hide();
		};
		//isActive
		Help.prototype.isActive = function() {
			return this.active;
		};
		//show
		Help.prototype.show = function() {
			Help.helpPanel.style.display = "";
		};
		//hide
		Help.prototype.hide = function() {
			Help.helpPanel.style.display = "none";
		};

        Help.initialized = true;
    }
////////
	//this.create();
	this.setInactive();

	return this;
}

/**
 * Set help
 * @param {String} target The output target.
 */
Help.prototype.setHelpId = function(help, helpAddText) {
	if (help) {
		if (help&&HelpList[help]) {
				Help.htmlHelpTitle.innerHTML = HelpList[help][0];
				Help.htmlHelpText.innerHTML = HelpList[help][1];
				//Show(Help.helpPanel);
				Help.helpPanel.style.visibility = 'visible';  
				
				if (helpAddText) {
					Help.htmlHelpText.innerHTML += helpAddText;
				}				
				return;
		}
	}
	Help.helpPanel.style.visibility = 'hidden';                
	//Hide(Help.helpPanel);
}