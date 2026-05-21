[
	{
		id: "T_TFGateBot_Scout_Melee",
		className: "Scout",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_Normal",
		className: "Scout",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SCATTERGUN",
					attributes: {
						"damage penalty": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_Hard",
		className: "Scout",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_FAN",
		className: "Scout",
		name: "Force-A-Nature Scout",
		classIcon: "scout_fan",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 2,
						"damage penalty": 0.65
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 1.7,
						"damage penalty": 0.65
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Scout_FAN_Crit",
		className: "Scout",
		name: "Force-A-Nature Scout",
		classIcon: "scout_fan",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 2,
						"damage penalty": 0.65
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Scout", "The Force-a-Nature"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Force-a-Nature",
					attributes: {
						"faster reload rate": 1.5,
						"scattergun knockback mult": 1.7,
						"damage penalty": 0.65
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Sniper_Huntsman_Spammer_Crit",
		className: "Sniper",
		name: "Bowman Rapid Fire",
		classIcon: "sniper_bow",
		health: 1200,
		characterAttributes: {
			"head scale": 0.7,
			"move speed bonus": 0.85
		},
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Sniper", "The Huntsman"],
				itemAttributes: [{
					itemName: "The Huntsman",
					attributes: {
						"fire rate bonus": 0.6
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Sniper", "The Huntsman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Sniper",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Huntsman",
					attributes: {
						"fire rate bonus": 0.6
					}
				}]
			}
		},
		properties: {
			scale: 1.5
		}
	},
	{
		id: "T_TFGateBot_Scout_Sandman_FastCharge",
		className: "Scout",
		name: "Hyper League Scout",
		classIcon: "scout_stun",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Scout", "The Sandman", "Batter's Helmet"],
				itemAttributes: [{
					itemName: "The Sandman",
					attributes: {
						"effect bar recharge rate increased": 0.25
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["The Sandman", "Batter's Helmet", "MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "The Sandman",
					attributes: {
						"effect bar recharge rate increased": 0.25
					}
				}, {
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Easy",
		className: "Soldier",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Normal",
		className: "Soldier",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Normal_DirectHit_Crit",
		className: "Soldier",
		name: "Direct Hit Soldier",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Direct Hit"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Direct Hit"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Hard",
		className: "Soldier",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_RocketPush",
		className: "Soldier",
		name: "Blast Soldier",
		classIcon: "soldier_libertylauncher",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Liberty Launcher"],
				itemAttributes: [{
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": ".6",
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": -2,
						"faster reload rate": 1.5,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 2
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Liberty Launcher"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": ".6",
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": -2,
						"faster reload rate": 1.5,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 2
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_RocketShotgun_Expert",
		className: "Soldier",
		name: "Black Box Soldier",
		classIcon: "soldier_blackbox",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Black Box"],
				itemAttributes: [{
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.45,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 0.9,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 2,
						"heal on hit for rapidfire": 60
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier", "The Black Box"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.33,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 0.9,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 2,
						"heal on hit for rapidfire": 60
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Extended_Battalion_Hard",
		className: "Soldier",
		name: "Extended Backup Soldier",
		classIcon: "soldier_backup",
		characterAttributes: {
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag", "SpawnWithFullCharge"],
				items: ["The Battalion's Backup", "MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				attributes: ["SpawnWithFullCharge"],
				items: ["The Battalion's Backup", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Extended_Concheror_Normal",
		className: "Soldier",
		name: "Extended Conch Soldier",
		classIcon: "soldier_conch",
		characterAttributes: {
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Soldier_Extended_Concheror_Normal_Crit",
		className: "Soldier",
		name: "Extended Conch Soldier",
		classIcon: "soldier_conch",
		characterAttributes: {
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit", "SpawnWithFullCharge"],
				items: ["The Concheror", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Normal",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Hard",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Expert",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_AlwaysFireWeapon",
		className: "Pyro",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag", "AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				attributes: ["AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Pyro_Flaregun",
		className: "Pyro",
		name: "Flare Pyro",
		classIcon: "pyro_flare",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Pyro", "The Flare Gun"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				items: ["MvM GateBot Light Pyro", "The Flare Gun"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demoman_Easy",
		className: "Demoman",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Demoman"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demoman_Normal",
		className: "Demoman",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Demoman"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demoman_Hard",
		className: "Demoman",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Demoman"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demo_Burst_Normal",
		className: "Demoman",
		name: "Burst Fire Demo",
		classIcon: "demo_burst",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Demo_Burst_Normal_Crit",
		className: "Demoman",
		name: "Burst Fire Demo",
		classIcon: "demo_burst",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 1.75,
						"fire rate bonus": 0.05,
						"clip size penalty": 0.5,
						"projectile spread angle penalty": 3
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Easy",
		className: "Heavy",
		changeAttributes: {
			Default: {
				skill: "Easy",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Easy",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Normal",
		className: "Heavy",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Hard",
		className: "Heavy",
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Normal_Crit",
		className: "Heavy",
		classIcon: "heavy_crit",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_Expert_Crit",
		className: "Heavy",
		classIcon: "heavy_crit",
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				attributes: ["AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavyweapons_Shotgun",
		className: "Heavyweapons",
		name: "Shotgun Heavy",
		classIcon: "heavy_shotgun",
		changeAttributes: {
			Default: {
				skill: "Normal",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot"],
				attributes: ["IgnoreFlag"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"faster reload rate": 0.1,
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 3,
						"damage penalty": 0.33
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Normal",
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"faster reload rate": 0.1,
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 3,
						"damage penalty": 0.33
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_IronFist",
		className: "Heavyweapons",
		name: "Steel Gauntlet",
		classIcon: "heavy_steelfist",
		health: 900,
		scale: 1.5,
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				tags: ["bot_giant"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_IronFist_Airblast",
		className: "Heavyweapons",
		name: "Steel Gauntlet Pusher",
		classIcon: "heavy_steelfist",
		health: 900,
		scale: 1.5,
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag"],
				items: ["The carl", "Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "Fists of Steel",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 1.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				items: ["The carl", "Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "Fists of Steel",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 1.5
					}
				}, {
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Heavy_IronFist_Crit",
		className: "Heavyweapons",
		name: "Steel Gauntlet",
		classIcon: "heavy_steelfist",
		health: 900,
		scale: 1.5,
		changeAttributes: {
			Default: {
				skill: "Hard",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Hard",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit"],
				items: ["Fists of Steel", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Chief_Soldier_SlowCritBarrage",
		className: "Soldier",
		name: "Major Crits",
		classIcon: "soldier_barrage",
		health: 32000,
		scale: 1.7,
		characterAttributes: {
			"health regen": 40,
			"move speed bonus": 0.5,
			"damage bonus": 1.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.2,
			"Projectile speed increased": 0.35
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "UseBossHealthBar", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_SlowCritBarrage",
		className: "Soldier",
		name: "Major Crits",
		classIcon: "soldier_barrage",
		health: 4000,
		characterAttributes: {
			"health regen": 40,
			"move speed bonus": 0.5,
			"damage bonus": 1.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"airblast vertical vulnerability multiplier": 0.1,
			"Projectile speed increased": 0.35
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_SlowBarrage",
		className: "Soldier",
		name: "Colonel Barrage",
		classIcon: "soldier_barrage",
		health: 4000,
		characterAttributes: {
			"health regen": 40,
			"move speed bonus": 0.5,
			"damage bonus": 1.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"airblast vertical vulnerability multiplier": 0.1,
			"Projectile speed increased": 0.4,
			"rage giving scale": 0.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.22,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"clip size upgrade atomic": 26.0,
						"faster reload rate": 0.22,
						"fire rate bonus": 0.2,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Deflector",
		className: "Heavyweapons",
		name: "Giant Deflector Heavy",
		classIcon: "heavy_deflector",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["The U-clank-a", "Deflector", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.5,
						"attack projectiles": 1
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["The U-clank-a", "Deflector", "MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.5,
						"attack projectiles": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Heater",
		className: "Heavyweapons",
		classIcon: "heavy_heater_giant",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Huo Long Heatmaker"],
				itemAttributes: [{
					itemName: "The Huo Long Heatmaker",
					attributes: {
						"damage bonus": 1.2
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Huo Long Heatmaker"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Huo Long Heatmaker",
					attributes: {
						"damage bonus": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Shotgun",
		className: "Heavyweapons",
		name: "Giant Shotgun Heavy",
		classIcon: "heavy_shotgun_giant",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.7,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"attack projectiles": 1,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_Shotgun_Crit",
		className: "Heavyweapons",
		name: "Giant Shotgun Heavy",
		classIcon: "heavy_shotgun_giant",
		health: 5000,
		characterAttributes: {
			"move speed bonus": 0.7,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.3,
			"attack projectiles": 1,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "AlwaysCrit"],
				items: ["MvM GateBot Light Heavy"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_SHOTGUN_HWG",
					attributes: {
						"fire rate bonus": 2.5,
						"bullets per shot bonus": 10,
						"damage penalty": 0.5,
						"faster reload rate": 0.1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Heavyweapons_HealOnKill",
		className: "Heavyweapons",
		name: "Giant Heal-on-Kill Heavy",
		classIcon: "heavy_deflector_healonkill",
		health: 5500,
		characterAttributes: {
			"move speed bonus": 0.4,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.4,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.9,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 5000
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 5000
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Chief_Heavyweapons_HealOnKill",
		className: "Heavyweapons",
		name: "Giant Heal-On-Kill Heavy",
		classIcon: "heavy_deflector_healonkill",
		health: 70000,
		scale: 1.8,
		characterAttributes: {
			"move speed bonus": 0.4,
			"damage force reduction": 0.3,
			"airblast vulnerability multiplier": 0.4,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.6,
			"override footstep sound set": 2
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 8000
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["UseBossHealthBar", "MiniBoss"],
				items: ["MvM GateBot Light Heavy", "The Tungsten Toque", "Deflector"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Heavy",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "Deflector",
					attributes: {
						"damage bonus": 1.2,
						"attack projectiles": 2,
						"heal on kill": 8000
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Extended_Concheror",
		className: "Soldier",
		name: "Giant Concheror Soldier",
		classIcon: "soldier_conch_giant",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Extended_Concheror_Crit",
		className: "Soldier",
		name: "Giant Concheror Soldier",
		classIcon: "soldier_conch_giant",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"increase buff duration": 9.0
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["HoldFireUntilFullReload", "MiniBoss", "SpawnWithFullCharge", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier", "The Concheror"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_RocketPush",
		className: "Soldier",
		name: "Giant Blast Soldier",
		classIcon: "soldier_libertylauncher_giant",
		health: 4000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"override footstep sound set": 3,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"airblast vertical vulnerability multiplier": 0.1,
			"rage giving scale": 0.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Liberty Launcher", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 0.75,
						"fire rate bonus": 0.25,
						"clip size upgrade atomic": 5,
						"faster reload rate": 0.2,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 4
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["Dr's Dapper Topper", "The Liberty Launcher", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Liberty Launcher",
					attributes: {
						"damage causes airblast": 1,
						"damage bonus": 0.75,
						"fire rate bonus": 0.25,
						"clip size upgrade atomic": 5,
						"faster reload rate": 0.2,
						"Blast radius decreased": 1.2,
						"projectile spread angle penalty": 4
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_BurstFire",
		className: "Soldier",
		name: "Giant Burst Fire Soldier",
		classIcon: "soldier_burstfire",
		health: 4200,
		characterAttributes: {
			"damage bonus": 2,
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.9
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"damage bonus": 2.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"damage bonus": 2,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_BurstFire_Crit",
		className: "Soldier",
		name: "Giant Burst Fire Soldier",
		classIcon: "soldier_burstfire",
		health: 4200,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.9
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"damage bonus": 2.0,
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload", "AlwaysCrit"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": 0.4,
						"fire rate bonus": 0.2,
						"clip size upgrade atomic": 5.0
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_RocketShotgun",
		className: "Soldier",
		name: "Giant Black Box Soldier",
		classIcon: "soldier_blackbox_giant",
		health: 4200,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.9
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Black Box", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.45,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 1.6,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 4,
						"heal on hit for rapidfire": 1000
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Black Box", "MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Black Box",
					attributes: {
						"damage bonus": 0.33,
						"fire rate bonus": 0.001,
						"clip size upgrade atomic": 0,
						"faster reload rate": 1.6,
						"blast radius increased": 1.25,
						"projectile spread angle penalty": 4,
						"heal on hit for rapidfire": 1000
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Demo_Burst",
		className: "Demoman",
		name: "Giant Burst Fire Demo",
		classIcon: "demo_burst_giant",
		health: 3300,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 4,
			"Projectile speed increased": 1.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Demo_Burst_Crit",
		className: "Demoman",
		name: "Giant Burst Fire Demo",
		classIcon: "demo_burst_giant",
		health: 3300,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 4,
			"Projectile speed increased": 1.1
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Demoman"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Demoman",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_GRENADELAUNCHER",
					attributes: {
						"faster reload rate": 0.65,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 7.0,
						"projectile spread angle penalty": 5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Scout_FAN",
		className: "Scout",
		name: "Force-a-Nature Super Scout",
		classIcon: "scout_fan_giant",
		health: 1200,
		characterAttributes: {
			"move speed bonus": 1.1,
			"damage force reduction": 0.7,
			"airblast vulnerability multiplier": 0.7,
			"override footstep sound set": 5
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Bolt Boy", "The Force-a-Nature", "MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "The Force-a-Nature",
					attributes: {
						"bullets per shot bonus": 2,
						"fire rate bonus": 0.5,
						"faster reload rate": 1.7,
						"scattergun knockback mult": 6,
						"damage penalty": 0.35,
						"weapon spread bonus": 0.4
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["The Bolt Boy", "The Force-a-Nature", "MvM GateBot Light Scout"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Scout",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "The Force-a-Nature",
					attributes: {
						"bullets per shot bonus": 2,
						"fire rate bonus": 0.5,
						"faster reload rate": 1.7,
						"scattergun knockback mult": 6,
						"damage penalty": 0.35,
						"weapon spread bonus": 0.4
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier",
		className: "Soldier",
		name: "Giant Soldier",
		classIcon: "soldier_giant",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "HoldFireUntilFullReload", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["HoldFireUntilFullReload", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Spammer",
		className: "Soldier",
		name: "Giant Rapid Fire Soldier",
		classIcon: "soldier_spammer",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.65
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Spammer_Crit",
		className: "Soldier",
		name: "Giant Rapid Fire Soldier",
		classIcon: "soldier_spammer",
		health: 3800,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3,
			"Projectile speed increased": 0.65
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "AlwaysCrit", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["AlwaysCrit", "MiniBoss"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"faster reload rate": -0.8,
						"fire rate bonus": 0.5
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Soldier_Spammer_Reload",
		className: "Soldier",
		name: "Giant Rapid Fire Soldier",
		classIcon: "soldier_burstfire",
		health: 4000,
		characterAttributes: {
			"damage force reduction": 0.4,
			"airblast vulnerability multiplier": 0.4,
			"override footstep sound set": 3
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["bot_gatebot", "nav_prefer_gate1_flank", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"move speed bonus": 0.5,
						"faster reload rate": 0.6,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 5.0,
						"Projectile speed increased": 0.65
					}
				}],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "HoldFireUntilFullReload"],
				items: ["MvM GateBot Light Soldier"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Soldier",
					attributes: {
						"item style override": 1
					}
				}, {
					itemName: "TF_WEAPON_ROCKETLAUNCHER",
					attributes: {
						"move speed bonus": 0.5,
						"faster reload rate": 0.6,
						"fire rate bonus": 0.1,
						"clip size upgrade atomic": 5.0,
						"Projectile speed increased": 0.65
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Pyro_AlwaysFire",
		className: "Pyro",
		name: "Giant Pyro",
		classIcon: "pyro_giant",
		health: 3000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.6,
			"airblast vulnerability multiplier": 0.6,
			"override footstep sound set": 6
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "AlwaysFireWeapon"],
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	},
	{
		id: "T_TFGateBot_Giant_Pyro_AlwaysFire_Crit",
		className: "Pyro",
		name: "Giant Pyro",
		classIcon: "pyro_giant",
		health: 3000,
		characterAttributes: {
			"move speed bonus": 0.5,
			"damage force reduction": 0.6,
			"airblast vulnerability multiplier": 0.6,
			"override footstep sound set": 6
		},
		changeAttributes: {
			Default: {
				skill: "Expert",
				tags: ["nav_prefer_gate1_flank", "bot_gatebot", "bot_giant"],
				attributes: ["IgnoreFlag", "MiniBoss", "AlwaysFireWeapon", "AlwaysCrit"],
				items: ["MvM GateBot Light Pyro"],
				behaviorModifiers: "push"
			},
			RevertGateBotsBehavior: {
				skill: "Expert",
				tags: ["bot_giant"],
				attributes: ["MiniBoss", "AlwaysFireWeapon", "AlwaysCrit"],
				items: ["MvM GateBot Light Pyro"],
				itemAttributes: [{
					itemName: "MvM GateBot Light Pyro",
					attributes: {
						"item style override": 1
					}
				}]
			}
		}
	}
]
