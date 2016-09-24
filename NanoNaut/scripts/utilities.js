// This script contains utility functions to be used by the entire game.

var UTILITIES = {
    screen_wrap: function(sprite, game) {
        if (sprite.x < 0) {
            sprite.x = game.width;
        } else if (sprite.x > game.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = game.height;
        } else if (sprite.y > game.height) {
            sprite.y = 0;
        }
    },

    get_random_spawn: function(game) {
        var position;

        if (Math.random() <= .5) { // Spawn horizontally?
            var x;
            if (Math.random() <=.5) { // Spawn to left?
                x = -100;
            } else { // Spawn to right.
                x = game.width + 100;
            }

            var y = Math.random() * game.height;
            position = {x: x, y: y};
        } else { // Spawn verticaly.
            var y;
            if (Math.random() <= .5) { // Spawn to top?
                y = -100;
            } else { // Spawn to bottom.
                y = game.height + 100;
            }

            var x = Math.random() * game.width;
            position = {x: x, y: y};
        }
        return position;
    },

    get_random_angle: function() {
        return Math.random() * 360;
    },
    
    get_random_rotation: function() {
        return Math.random() * 100 - 50;
    },

    LOG: function (position,angle,speed){
        console.log("Spawning Basic Single: ");
            console.log("     Position: " + JSON.stringify(position));
            console.log("     Angle:    " + angle);
            console.log("     Speed:    " + speed);
            console.log(""); // newline
    }
};
