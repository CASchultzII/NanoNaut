// This script contains code needed to update the Asteroid's logic

// the managerial class
var ASTEROIDS = function(game) {
    this.game = game;
    this.groups = {}; // Holds generated groups.

    this.create_group = function(name, num, asset, scale = 1,
            degradeGroup = null) {
        this.groups[name] = new AsteroidGroup(this, this.game, name, num, asset,
                scale, degradeGroup);
    };

    this.update = function(player, generateAsteroid, group = null,
            speed = 50) {
        if (generateAsteroid && group != null) {
            this.generate(group, speed);
        }

        for (var key in this.groups) {
            var group = this.groups[key];
            this.game.physics.arcade.overlap(player.bullets, group.group,
                    function(bullet, asteroid) {
                        group.degrade(bullet, asteroid); player.score += 10;
                    }, null, group);
            group.group.forEachExists(UTILITIES.screen_wrap, this, this.game);

            // check if player got hit:
            this.game.physics.arcade.overlap(player.player, group.group,
                    function() {player.player.kill();},
                    function() {return !player.invulnerable;}
                );
        }
    };

    // INTERNALS
    this.generate = function(groupName, speed) { // THIS IS A GROUP NAME!!!!
        var group = this.groups[groupName]; // get our group

        if (group != null) { // SAFETY!!!
            var position;
            if (Math.random() <= .5) { // Spawn to left or right?
                var x;
                if (Math.random() <= .5) { // Spawn to the left.
                    x = -100;
                } else { // Spawn to the right.
                    x = this.game.width + 100;
                }

                var y = Math.random() * this.game.height;
                position = {x: x, y: y};
            } else { // Spawn to top or bottom.
                var y;
                if (Math.random() <= .5) { // Spawn to top or bottom?
                    y = -100;
                } else { // Spawn to bottom.
                    y = this.game.height + 100;
                }

                var x = Math.random() * this.game.width;
                position = {x: x, y: y};
            }

            // Maybe angle needs to be moved inside the loops above.
            var angle = Math.random() * 360;

            // pass a group name even though we have an actual group
            this.spawn(groupName, position, angle, speed);
        }
    };
    this.spawn = function(groupName, position, angle, speed) {
        var group = this.groups[groupName];

        if (group) {
            var asteroid = group.group.getFirstExists(false);

            if (asteroid) {
                console.log("Spawning Asteroid: ");
                console.log("     Group:    " + group.group.name);
                console.log("     Position: " + JSON.stringify(position));
                console.log("     Angle:    " + angle);
                console.log("     Speed:    " + speed);
                console.log(""); // newline

                asteroid.reset(position.x, position.y);
                this.game.physics.arcade.velocityFromAngle(angle, speed,
                        asteroid.body.velocity);
            }
        }
    }; 
}

// Helper classes, not to be instantiated by 'main'
var AsteroidGroup = function (asteroids, game, name, num, asset, scale = 1,
        degradeGroup = null) {
    this.ASTEROIDS = asteroids;
    this.group = game.add.group();
    this.group.name = name;

    this.group.enableBody = true;
    this.group.physicsBodyType = Phaser.Physics.ARCADE;
    this.group.createMultiple(num, asset);

    this.group.setAll("scale.x", scale);
    this.group.setAll("scale.y", scale);
    this.group.setAll("anchor.x", 0.5);
    this.group.setAll("anchor.y", 0.5);

    this.degrade = function(bullet, asteroid) {
        if (degradeGroup != null) { // SAFETY!!
            this.split(asteroid);
        }

        // Kill our group elements.
        bullet.kill();
        asteroid.kill();
    };

    this.split = function(asteroid) {
        if (degradeGroup != null) { // SAFETY!
            var angle1 = asteroid.angle + 60;
            var angle2 = asteroid.angle + 180;
            var angle3 = asteroid.angle + 300;
            var position = asteroid.position;
            var speed = asteroid.body.speed * 1.5;

            // Use the ASTEROIDS method to spawn
            this.ASTEROIDS.spawn(degradeGroup, position, angle1, speed);
            this.ASTEROIDS.spawn(degradeGroup, position, angle2, speed);
            this.ASTEROIDS.spawn(degradeGroup, position, angle3, speed);
        }
    };
}
