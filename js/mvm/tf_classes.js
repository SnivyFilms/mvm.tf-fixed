var classes = new Array("Scout", "Soldier", "Pyro", "Demoman", "HeavyWeapons", "Medic", "Sniper", "Spy", "Engineer", "Tank", "SentryBuster");
var classesreverse = {"Scout":0, "Soldier":1, "Pyro":2, "Demo":3, "Demoman":3, "HeavyWeapons":4,"Heavyweapons":4, "heavyweapons":4,  "Heavy":4,"Medic":5, "Sniper":6, "Spy":7, "Engineer":8, "Tank":9, "SentryBuster":10};
var classeshealth = new Array(125, 200, 175, 175, 300, 150, 125, 125, 125, 20000, 2500);

var ClassIcons = {			"scout":"TFClassIconScout",
							"scout_bat":"TFClassIconScoutBat",
							"scout_bonk":"TFClassIconScoutBonk",
							"scout_giant_fast":"TFClassIconScoutGiant_fast",
							"scout_stun":"TFClassIconScoutStun",
							"scout_fan":"TFClassIconScoutFan",
							"scout_jumping":"TFClassIconScoutJumping",
							"scout_shortstop":"TFClassIconScoutShortstop",
							"scout_stun_giant_armored":"TFClassIconScoutStunArmored",

							"soldier":"TFClassIconSoldier",
							"soldier_crit":"TFClassIconSoldierCrit",
							"soldier_spammer":"TFClassIconSoldierSpammer",
							"soldier_buff":"TFClassIconSoldierBuff",
							"soldier_conch":"TFClassIconSoldierConch",
							"soldier_backup":"TFClassIconSoldierBackup",
							"soldier_sergeant_crits":"TFClassIconSergeantCrits",
							"soldier_barrage":"TFClassIconSoldierBarrage",
							"soldier_blackbox":"TFClassIconSoldierBlackbox",
							"soldier_burstfire":"TFClassIconSoldierBurstfire",
							"soldier_libertylauncher":"TFClassIconSoldierLiberty",
							"soldier_major_crits":"TFClassIconSoldierMajorCrits",
              

							"pyro":"TFClassIconPyro",
							"pyro_flare":"TFClassIconPyroFlare",

							"demoman":"TFClassIconDemoman",
							"demoknight":"TFClassIconDemoKnight",
							"demo_bomber":"TFClassIconDemoBomber",
							"demo_burst":"TFClassIconDemoBurst",
							"demoknight_samurai":"TFClassIconDemoknightSamurai",

							"heavyweapons":"TFClassIconHeavyWeapons",
							"heavy_crit":"TFClassIconHeavyWeapons",
							"heavy_champ":"TFClassIconHeavyChamp",
							"heavy_deflector":"TFClassIconHeavyDeflector",
							"heavy_deflector_healonkill":"TFClassIconHeavyDeflectorHealOnKill",
							"heavy_deflector_push":"TFClassIconHeavyDeflectorPush",
							"heavy_mittens":"TFClassIconHeavyMittens",
							"heavy_steelfist":"TFClassIconHeavySteelfist",
							"heavy_gru":"TFClassIconHeavyGru",
							"heavy_heater":"TFClassIconHeavyHeater",
							"heavy_chief":"TFClassIconHeavyChief",
							"heavy_shotgun":"TFClassIconHeavyShotgun",

							"engineer":"TFClassIconEngineer",

							"medic":"TFClassIconMedic",
							"medic_uber":"TFClassIconMedicUber",

							"sniper":"TFClassIconSniper",
							"sniper_bow":"TFClassIconSniperBow",
							"sniper_jarate":"TFClassIconSniperJarate",
							"sniper_sydneysleeper":"TFClassIconSniperSydneysleeper",
							"sniper_bow_multi":"TFClassIconSniperBowMulti",

							"spy":"TFClassIconSpy",

							"tank":"TFClassIconTank",
							"sentry_buster":"TFClassIconSentryBuster",

							//"heavy_champ":"TFClassIconHeavyUrgent",
							"teleporter":"TFClassIconTeleporter",
						};


var ClassThumb = {	"scout":"TFClassThumbScout",
					"soldier":"TFClassThumbSoldier",
					"pyro":"TFClassThumbPyro",
					"demoman":"TFClassThumbDemoman",
					"heavyweapons":"TFClassThumbHeavyWeapons",
					"engineer":"TFClassThumbEngineer",
					"medic":"TFClassThumbMedic",
					"sniper":"TFClassThumbSniper",
					"spy":"TFClassThumbSpy",
				};

var ClassLarge = {	"scout":"TFClassLargeScout",
					"soldier":"TFClassLargeSoldier",
					"pyro":"TFClassLargePyro",
					"demoman":"TFClassLargeDemoman",
					"heavyweapons":"TFClassLargeHeavyWeapons",
					"engineer":"TFClassLargeEngineer",
					"medic":"TFClassLargeMedic",
					"sniper":"TFClassLargeSniper",
					"spy":"TFClassLargeSpy",
				};