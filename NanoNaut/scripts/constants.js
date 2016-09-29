// CONTAINS ALL THE GAME CONSTANTS

var CONSTANTS = {
    "debug": true,
    
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
        "MAX_DASH_TIME": 500,
        "COOLDOWN_MULTIPLIER": .2,
        "MIN_DASH_POWER": .3,
        
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
        "SPAWN_RATE": .01,
        "SPEED": 75,
        "INVULNERABLE_TIME": 500,
        
        // Continuous momentum
        "TARGET_SPEED": 100,
        
        // Scoring
        "BASE_SCORE": 10,
        
        // HITBOXES
        "HITBOXES": [
            {
                "isCircle": true,
                "offsets": [(64 / 2 - 25) | 0, ( 62 / 2 - 25) | 0],
                "radius": 25
            },
            {
                "isCircle": true,
                "offsets": [(107 / 2 - 27) | 0, ( 55 / 2 - 27) | 0],
                "radius": 27
            },
            {
                "isCircle": true,
                "offsets": [((112 / 2 - 35) | 0) | 0, ( ( 94 / 2 - 35) | 0) | 0],
                "radius": 35
            },
            {
                "isCircle": true,
                "offsets": [((103 / 2 - 50) | 0) | 0, ( ( 106 / 2 - 50) | 0) | 0],
                "radius": 50
            },
            {
                "isCircle": true,
                "offsets": [((131 /2 - 50) | 0) | 0, ( ( 114 / 2 - 50) | 0) | 0],
                "radius": 50
            },
            {
                "isCircle": true,
                "offsets": [((134 / 2 - 55) | 0) | 0, ( ( 118 / 2 - 55) | 0) | 0],
                "radius": 55
            },
            {
                "isCircle": true,
                "offsets": [(134 / 2 - 60) | 0, ( 146 / 2 - 60) | 0],
                "radius": 60
            },
            {
                "isCircle": true,
                "offsets": [(159 / 2 - 60) | 0, ( 137 / 2 - 60) | 0],
                "radius": 60
            },
            {
                "isCircle": true,
                "offsets": [(150 / 2 - 70) | 0, ( 172 / 2 - 70) | 0],
                "radius": 70
            },
            {
                "isCircle": true,
                "offsets": [(173 / 2 - 80) | 0, ( 170 / 2 - 80) | 0],
                "radius": 80
            }
        ]
    }
}