// CONTAINS ALL THE GAME CONSTANTS

var CONSTANTS = {
    "debug": false,
    
    "PLAYER": {
        // Player Velocities
        "MAX_VELOCITY_IDLE": 300,
        "MAX_VELOCITY_DASH": 800,
        "INVULNERABLE_SPEED": 450,
        
        // Player Acceleration
        "DECELERATION": -450,
        "DASH_DECEL": .1,
        "AFTER_DECEL": .25,
        
        // Angular Velocities
        "OMEGA_IDLE": 300,
        "OMEGA_DASH": 100,
        
        // Dash Variables
        "MAX_DASH_TIME": 750,
        "COOLDOWN_MULTIPLIER": .15,
        "MIN_DASH_POWER": .3,
        "DASH_DEDUCT": 100,
        
        // Other Physics Variables
        "DRAG": 200,
        
        // Collision Variables
        "HIT_COOLDOWN": 1000,
        "HITBOX": {
            "offsets": [(17) | 0, ( 17) | 0],
            "radius": 20
        }
    },
    
    "VIRUS": {
        // SPAWNING
        "SPAWN_RATE": .005,
        "SPEED": 70,
        "INVULNERABLE_TIME": 500,
        
        // Continuous momentum
        "TARGET_SPEED": 110,
        
        // Scoring
        "BASE_SCORE": 10,
        
        // HITBOXES
        "HITBOXES": [
            {
                "isCircle": false,
                "offsets": [(64 - 40) / 2, (62 - 40) / 2],
                "dim": [40, 40]
            },
            {
                "isCircle": false,
                "offsets": [(107 - 50) / 2, (55 - 50) / 2],
                "dim": [50, 50]
            },
            {
                "isCircle": false,
                "offsets": [(112 - 80) / 2, (94 - 80) / 2],
                "dim": [80, 80]
            },
            {
                "isCircle": false,
                "offsets": [(103 - 95) / 2, (106 - 95) / 2],
                "dim": [95, 95]
            },
            {
                "isCircle": false,
                "offsets": [(131 - 110) / 2, (114 - 110) / 2],
                "dim": [110, 110]
            },
            {
                "isCircle": false,
                "offsets": [(134 - 100) / 2, (118 - 100) / 2],
                "dim": [100, 100]
            },
            {
                "isCircle": false,
                "offsets": [(134 - 130) / 2, (146 - 130) / 2],
                "dim": [130, 130]
            },
            {
                "isCircle": false,
                "offsets": [(159 - 120) / 2, (137 - 120) / 2],
                "dim": [120, 120]
            },
            {
                "isCircle": false,
                "offsets": [(150 - 145) / 2, (172 - 145) / 2],
                "dim": [145, 145]
            },
            {
                "isCircle": false,
                "offsets": [(173 - 160) / 2, (170 - 160) / 2],
                "dim": [160, 160]
            },
        ]
    }
}