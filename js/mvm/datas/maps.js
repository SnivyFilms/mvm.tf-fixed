var MAP_NO_MAP_SET = new Map("");
var MAP_DECOY = new Map("mvm_decoy");
var MAP_COALTOWN = new Map("mvm_coaltown");
var MAP_GHOSTOWN = new Map("mvm_ghostown");
var MAP_MANNWORKS = new Map("mvm_mannworks");
var MAP_BIGROCK = new Map("mvm_bigrock");
var MAP_ISOLATION = new Map("mvm_isolation_rc3");
var MAP_SKULLCOVE = new Map("mvm_skullcove");
var MAP_MANNHATTAN = new Map("mvm_mannhattan");
var MAP_ROTTENBURG = new Map("mvm_rottenburg");
var MAP_TRAINYARD = new Map("mvm_trainyard_rc9");
var MAP_TEIEN = new Map("mvm_teien_rc6");
var MAP_SWIRL = new Map("mvm_swirl_rc7");
var MAP_SWIRL_EVENT = new Map("mvm_swirl_event_rc8a");
var MAP_SEWER_INVASION = new Map("mvm_sewer_invasion_b7");
var MAP_SEWER_INVASION_EVENT = new Map("mvm_sewer_invasion_event_b7");
var MAP_POWERPLANT = new Map("mvm_powerplant_rc4");
var MAP_RANCHER = new Map("mvm_rancher_b17");
var MAP_FACADE = new Map("mvm_facade_b3");
var MAP_POSTAL = new Map("mvm_postal_rc1b");
var MAP_CYBERIA = new Map("mvm_cyberia_rc6a");
var MAP_SHARP = new Map("mvm_sharp_rc6");
var MAP_CROWN = new Map("mvm_crown_rc4b");

// Add Robot Spawns
MAP_NO_MAP_SET.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy")
MAP_DECOY.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy spawnbot_invasion spawnbot_right spawnbot_left spawnbot_single_flag");
MAP_COALTOWN.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy spawnbot_giant");
MAP_GHOSTOWN.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy spawnbot_giant");
MAP_MANNWORKS.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy spawnbot_lower spawnbot_right spawnbot_left");
MAP_BIGROCK.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy");
MAP_ISOLATION.addSpawns("spawnbot spawnbot_mission_sniper spawnbot_mission_spy spawnbot_house spawnbot_giant_house");
MAP_SKULLCOVE.addSpawns("spawnbot spawnbot_left spawnbot_right spawnbot_all spawnbot_side spawnbot_invasion spawnbot_mission_sentrybuster spawnbot_mission_sniper spawnbot_mission_spy spawnbot_mission_engy");
MAP_MANNHATTAN.addSpawns("spawnbot_main0 spawnbot_main0_squad spawnbot_main1 spawnbot_main1_slow spawnbot_main2 spawnbot_mission_sniper0 spawnbot_mission_sniper1 spawnbot_upper0 spawnbot_upper1 spawnbot_upper2");
MAP_ROTTENBURG.addSpawns("spawnbot flankers spawnbot_chief spawnbot_mission_sentry_buster spawnbot_mission_sniper spawnbot_mission_spy");
MAP_TRAINYARD.addSpawns("spawnbot gatebot spawnbot_left gatebot_left spawnbot_middle gatebot_middle spawnbot_boss gatebot_boss spawnbot_right gatebot_right spawnbot_mission_spy spawnbot_mission_sniper spawnbot_mission_sentrybuster");
MAP_TEIEN.addSpawns("spawnbot spawnbot_left spawnbot_lower spawnbot_mission_sniper spawnbot_mission_spy");
MAP_SWIRL.addSpawns("spawnbot_upper spawnbot_right spawnbot_left spawnbot_main spawnbot_chief spawnbot_sentrybuster spawnbot_flank spawnbot_dud_kill spawnbot_dud spawnbot_ambush_upper spawnbot_ambush_lower");
MAP_SWIRL_EVENT.addSpawns("spawnbot_upper spawnbot_right spawnbot_left spawnbot_main spawnbot_chief spawnbot_sentrybuster spawnbot_flank spawnbot_dud_kill spawnbot_dud spawnbot_ambush_upper spawnbot_ambush_lower");
MAP_SEWER_INVASION.addSpawns("spawnbot spawnbot_left spawnbot_right spawnbot_giant_lower spawnbot_mission_spy spawnbot_mission_sniper spawnbot_mission_sniper_upper spawnbot_mission_sniper_lower spawnbot_mission_engineer_upper spawnbot_mission_engineer_lower spawnbot_mission_engineer_lower_left");
MAP_SEWER_INVASION_EVENT.addSpawns("spawnbot spawnbot_left spawnbot_right spawnbot_giant_lower spawnbot_mission_spy spawnbot_mission_sniper spawnbot_mission_sniper_upper spawnbot_mission_sniper_lower spawnbot_mission_engineer_upper spawnbot_mission_engineer_lower spawnbot_mission_engineer_lower_left");
MAP_POWERPLANT.addSpawns("spawnbot spawnbot_right spawmbot_single_flag spawnbot_giant spawnbot_main0 spawnbot_main0_squad spawnbot_main1 spawnbot_main2 spawnbot_middle spawnbot_giant spawnbot_invasion spawnbot_main1_slow spawnbot_left spawnbot_upper0 spawnbot_upper1 spawnbot_upper2 flankers spawnbot_mission_spy spawnbot_mission_sentrybuster spawnbot_mission_sentry_buster spawnbot_mission_sniper spawnbot_mission_sniper0 spawnbot_mission_sniper1");
MAP_RANCHER.addSpawns("spawnbot_main spawnbot_left spawnbot_center spawnbot_right spawnbot_chief");
MAP_FACADE.addSpawns("spawnbot spawnbot_giant spawnbot_left spawnbot_right spawnbot_mission_sentrybuster spawnbot_mission_sniper spawnbot_mission_spy");
MAP_POSTAL.addSpawns("spawnbot_invasion spawnbot_left spawnbot_right spawnbot_carrier spawnbot_carrier_special spawnbot_mission_sentrybuster spawnbot_mission_sniper spawnbot_mission_spy");
MAP_CYBERIA.addSpawns("spawnbot spawnbot_secondary spawnbot_tertiary spawnbot_main spawnbot_invasion spawnbot_mission_spy spawnbot_mission_sniper spawnbot_mission_sniper_tertiary spawnbot_mission_sentrybuster");
MAP_SHARP.addSpawns("spawnbot spawnbot_secondary spawnbot_main spawnbot_mission_spy spawnbot_mission_sniper");
MAP_CROWN.addSpawns("spawnbot_main_0 spawnbot_left_0 spawnbot_flank_0 spawnbot_all_0 spawnbot_tank_0 spawnbot_main_1 spawnbot_flank_1 spawnbot_left_1 spawnbot_all_1 spawnbot_tank_1");

// Add Robot Tags
MAP_DECOY.addTags("nav_prefer_flank_right nav_prefer_flank_left");
MAP_COALTOWN.addTags("nav_prefer_flank_right nav_prefer_flank_left special_main_right special_main_left");
MAP_GHOSTOWN.addTags("nav_prefer_flank_right nav_prefer_flank_left special_main_right special_main_left");
MAP_BIGROCK.addTags("nav_prefer_flank_right nav_prefer_flank_left special_main_right special_main_left");
MAP_ISOLATION.addTags("nav_prefer_flank_right");
MAP_SKULLCOVE.addTags("nav_avoid_left nav_avoid_right nav_prefer_flank_right nav_prefer_flank_left nav_prefer_flank_early_right nav_prefer_flank_early_left");
MAP_MANNHATTAN.addTags("nav_prefer_gate1_flank");
MAP_ROTTENBURG.addTags("Flankers");
MAP_TRAINYARD.addTags("bot_flank bot_right bot_left");
MAP_TEIEN.addTags("nav_prefer_flank_left nav_prefer_flank_right");
MAP_SWIRL.addTags("nav_prefer_gate1_flank");
MAP_SWIRL_EVENT.addTags("nav_prefer_gate1_flank");
MAP_POWERPLANT.addTags("common bomb_carrier nav_prefer_right nav_prefer_flank_right nav_prefer_left nav_prefer_flank_left nav_prefer_final_flank_right nav_prefer_final_alt nav_prefer_final_main");
MAP_FACADE.addTags("flankers bot_teletank");
MAP_POSTAL.addTags("anti_flank");
MAP_CROWN.addTags("nav_prefer_gate1_flank nav_prefer_flank_after_gate");

// Add Tank Paths
MAP_NO_MAP_SET.addTankPaths("boss_path_1");
MAP_DECOY.addTankPaths("boss_path_1");
MAP_COALTOWN.addTankPaths("boss_path_1");
MAP_GHOSTOWN.addTankPaths("boss_path_1");
MAP_MANNWORKS.addTankPaths("boss_path_1 boss_path2_1");
MAP_BIGROCK.addTankPaths("boss_path_1 boss_path_a1");
MAP_ISOLATION.addTankPaths("tank_path_a_1 tank_path_b_1");
MAP_SKULLCOVE.addTankPaths("tank_path_left tank_path_right");
MAP_ROTTENBURG.addTankPaths("tank_path_a_10 tank_path_b_10");
MAP_TRAINYARD.addTankPaths("tank_path_LL_1 tank_path_LU_1 tank_path_RL_1 tank_path_RU_1");
MAP_TEIEN.addTankPaths("boss_path_a1 boss_path_b1");
MAP_SWIRL.addTankPaths("path_tank_upper path_tank_lower path_tank_default path_tank_reverse");
MAP_SWIRL_EVENT.addTankPaths("path_tank_upper path_tank_lower path_tank_default path_tank_reverse");
MAP_SEWER_INVASION.addTankPaths("tank_path_a_1");
MAP_SEWER_INVASION_EVENT.addTankPaths("tank_path_a_1");
MAP_POWERPLANT.addTankPaths("boss_path_1");
MAP_RANCHER.addTankPaths("path_tank_left path_tank_right tank_start_harvester");
MAP_FACADE.addTankPaths("boss_path_1 boss_path_a_1");
MAP_POSTAL.addTankPaths("boss_path_1 boss2_path_1 boss_path_1b boss2_path_1");
MAP_CYBERIA.addTankPaths("tank_path_a_1 tank_path_b_1");
MAP_SHARP.addTankPaths("tank_path_a_1 tank_path_b_1");
MAP_CROWN.addTankPaths("tank_path_1");

// Add Start/Done Outputs
MAP_NO_MAP_SET.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_DECOY.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_COALTOWN.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_GHOSTOWN.setStartWaveOutput("wave_start_relay").setStartWaveOutput("wave_start_relay_666", true).setDoneOutput("wave_finished_relay");
MAP_MANNWORKS.setStartWaveOutput("bombpath_arrows_clear_relay").setStartWaveOutput("bombpath_arrows_clear_relay_ironman", true).setDoneOutput("bombpath_wavefinished");
MAP_BIGROCK.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_ISOLATION.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_SKULLCOVE.setStartWaveOutput("wave_start_relay").setStartWaveOutput("wave_start_relay_ironman", true).setDoneOutput("wave_finished_relay");
MAP_MANNHATTAN.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");//.setInitWaveOutput("holograms_centerpath_relay").setInitWaveOutput("holograms_3way_relay");
MAP_ROTTENBURG.setStartWaveOutput("wave_start_relay_classic").setDoneOutput("wave_finished_relay");
MAP_TRAINYARD.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_TEIEN.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_SWIRL.setStartWaveOutput("wave_start_relay", true).setStartWaveOutput("wave_start_relay_notimer", false);
MAP_SWIRL_EVENT.setStartWaveOutput("wave_start_relay", true).setStartWaveOutput("wave_start_relay_notimer", false);
MAP_SEWER_INVASION.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_SEWER_INVASION_EVENT.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_POWERPLANT.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finished_relay");
MAP_RANCHER.setStartWaveOutput("wave_start_relay").setStartWaveOutput("wave_start_relay_timer", true).setDoneOutput("wave_finish_relay");
MAP_FACADE.setStartWaveOutput("wave_start_relay").setDoneOutput("wave_finish_relay");
MAP_POSTAL.setStartWaveOutput("wave_start_relay").setStartWaveOutput("wave_start_endurance_relay", true).setDoneOutput("wave_finished_relay");
MAP_CYBERIA.setStartWaveOutput("wave_start_relay").setStartWaveOutput("wave_start_relay_2bomb").setStartWaveOutput("wave_start_relay_3bomb").setStartWaveOutput("wave_start_relay_1timedbomb", true).setStartWaveOutput("wave_start_relay_2timedbomb", true).setStartWaveOutput("wave_start_relay_3timedbomb", true).setStartWaveOutput("wave_start_relay_allbomb").setDoneOutput("wave_finished_relay");
MAP_SHARP.setStartWaveOutput("wave_start_relay").setStartWaveOutput("wave_start_relay_2bomb").setStartWaveOutput("wave_start_relay_3bomb").setStartWaveOutput("wave_start_relay_1timedbomb", true).setStartWaveOutput("wave_start_relay_2timedbomb", true).setStartWaveOutput("wave_start_relay_3timedbomb", true).setDoneOutput("wave_finished_relay");
MAP_CROWN.setStartWaveOutput("wave_start_relay_notimer").setStartWaveOutput("wave_start_relay", true).setDoneOutput("wave_finished_relay");

//This shows on the website. Sorted by alphabetical order.
//Official Maps
MapList[""] = MAP_NO_MAP_SET;
MapList["//Official Maps"] = MAP_NO_MAP_SET;
MapList["mvm_bigrock"] = MAP_BIGROCK;
MapList["mvm_coaltown"] = MAP_COALTOWN;
MapList["mvm_decoy"] = MAP_DECOY;
MapList["mvm_ghostown"] = MAP_GHOSTOWN;
MapList["mvm_mannhattan"] = MAP_MANNHATTAN;
MapList["mvm_mannworks"] = MAP_MANNWORKS;
MapList["mvm_rottenburg"] = MAP_ROTTENBURG;
//Community Maps
MapList["//Community Maps"] = MAP_NO_MAP_SET;
MapList["mvm_crown_rc4b"] = MAP_CROWN;
MapList["mvm_cyberia_rc6a"] = MAP_CYBERIA;
MapList["mvm_facade_b3"] = MAP_FACADE;
MapList["mvm_isolation_rc3"] = MAP_ISOLATION;
MapList["mvm_postal_rc1b"] = MAP_POSTAL;
MapList["mvm_powerplant_rc4"] = MAP_POWERPLANT;
MapList["mvm_sewer_invasion_b7"] = MAP_SEWER_INVASION;
MapList["mvm_sewer_invasion_event_b7"] = MAP_SEWER_INVASION_EVENT;
MapList["mvm_sharp_rc6"] = MAP_SHARP;
MapList["mvm_skullcove"] = MAP_SKULLCOVE;
MapList["mvm_swirl_rc7"] = MAP_SWIRL;
MapList["mvm_swirl_event_rc8a"] = MAP_SWIRL_EVENT;
MapList["mvm_teien_rc6"] = MAP_TEIEN;
MapList["mvm_trainyard_rc9"] = MAP_TRAINYARD;

MAP_DECOY.addPopulation("Doe's Drill", "mvm_decoy.xml");
MAP_DECOY.addPopulation("Disk Deletion", "mvm_decoy_advanced.xml");
MAP_DECOY.addPopulation("Data Demolition", "mvm_decoy_advanced2.xml");
MAP_DECOY.addPopulation("Disintegration", "mvm_decoy_advanced3.xml");
MAP_DECOY.addPopulation("Doe's Doom", "mvm_decoy_intermediate.xml");
MAP_DECOY.addPopulation("Day of Wreckening", "mvm_decoy_intermediate2.xml");
MAP_DECOY.addPopulation("Desperation", "mvm_decoy_expert1.xml");

MAP_COALTOWN.addPopulation("Crash Course", "mvm_coaltown.xml");
MAP_COALTOWN.addPopulation("Ctrl+Alt+Destruction", "mvm_coaltown_advanced.xml");
MAP_COALTOWN.addPopulation("CPU Slaughter", "mvm_coaltown_advanced2.xml");
MAP_COALTOWN.addPopulation("Cave-in", "mvm_coaltown_intermediate.xml");
MAP_COALTOWN.addPopulation("Quarry", "mvm_coaltown_intermediate2.xml");
MAP_COALTOWN.addPopulation("Cataclysm", "mvm_coaltown_expert1.xml");
MAP_GHOSTOWN.addPopulation("Caliginous Caper", "mvm_ghost_town.xml");

MAP_MANNWORKS.addPopulation("Mann-euvers", "mvm_mannworks.xml");
MAP_MANNWORKS.addPopulation("Machine Massacre", "mvm_mannworks_advanced.xml");
MAP_MANNWORKS.addPopulation("Mech Mutilation", "mvm_mannworks_ironman.xml");
MAP_MANNWORKS.addPopulation("Mean Machines", "mvm_mannworks_intermediate.xml");
MAP_MANNWORKS.addPopulation("Mann Hunt", "mvm_mannworks_intermediate2.xml");
MAP_MANNWORKS.addPopulation("Mannslaughter", "mvm_mannworks_expert1.xml");

MAP_BIGROCK.addPopulation("Benign infiltration", "mvm_bigrock.xml");
MAP_BIGROCK.addPopulation("Broken parts", "mvm_bigrock_advanced1.xml");
MAP_BIGROCK.addPopulation("Bone shaker", "mvm_bigrock_advanced2.xml");

MAP_ROTTENBURG.addPopulation("Village Vanguard", "mvm_rottenburg.xml");
MAP_ROTTENBURG.addPopulation("Hamlet Hostility", "mvm_rottenburg_advanced1.xml");
MAP_ROTTENBURG.addPopulation("Bavarian Botbash", "mvm_rottenburg_advanced2.xml");

MAP_MANNHATTAN.addPopulation("Big Apple Barricade", "mvm_mannhattan.xml");
MAP_MANNHATTAN.addPopulation("Empire Escalation", "mvm_mannhattan_advanced1.xml");
MAP_MANNHATTAN.addPopulation("Metro Malice", "mvm_mannhattan_advanced2.xml");