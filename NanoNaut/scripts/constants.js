// CONTAINS ALL THE GAME CONSTANTS

var CONSTANTS = {
    
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
        "HIT_COOLDOWN": 1000
    }
}