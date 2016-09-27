// This script file holds the classes necessarily to implement the VIRUS that
// the player shall defeat.

var VIRUS = function(game) {

    this.game = game;
    this.virusGroups = [];
    for (var i = 0; i < 10; i++) {
        this.virusGroups[i] = new VirusGroup(game, i + 1, 50);
    }
    this.splatFX = this.game.add.audio("SPLAT");

    this.update = function(player) {
        
        //// Screenwrap everyone.
        for (var i = 0; i < 10; i++) {
            this.virusGroups[i].group.forEachExists(UTILITIES.screen_wrap, this, this.game);
            // Perfom speed adjustments
            this.virusGroups[i].group.forEachExists(function(virus) {
                        this.game.physics.arcade.accelerationFromRotation(virus.body.rotation,
                            100, virus.body.acceleration);
                    }, this, this.game
                );
        }
        
        //// SPAWNING!
        if (Math.random() < .0025) {
            var position = UTILITIES.get_random_spawn(this.game);
            var angle = UTILITIES.get_random_angle();
            var speed = 75;
            
            var group = Math.floor(Math.random() * 10);
            this.virusGroups[group].spawn(position, angle, speed);
        }
        
        //// Check collisions
        for (var i = 0; i < 10; i++) {
            for (var j = i; j < 10; j++) {
                var targetGroup = j + i + 2;
                
                var handler = null;
                if (targetGroup <= 10) {
                    handler = function(virusA, virusB) {
                        if (!virusA.invulnerable() && !virusB.invulnerable())
                            this.merge(virusA, virusB, this.virusGroups[targetGroup - 1]);
                    }
                }
                
                this.game.physics.arcade.collide(this.virusGroups[i].group, this.virusGroups[j].group, handler, null, this);
            }

            //// Check for player collisions in same loop
            this.game.physics.arcade.overlap(player.player, this.virusGroups[i].group,
                    function(playerSprite, virus) {
                        if (player.invulnerable()) {
                            if (!virus.invulnerable()) {
                                this.virusGroups[i].kill(virus, this.virusGroups);
                                player.score += 10 * i;
                                this.splatFX.play();
                            }
                        } else {
                            player.kill();
                        }
                    }, null, this
                );
        }
        
    }
    
    // INTERNALS
    this.merge = function(virusA, virusB, targetGroup) {
        
        if (virusA.dying || virusB.dying)
            return; // do nothing
        
        if (virusA.invulnerable() || virusB.invulnerable())
            return; // do nothing
        
        var x = (virusA.position.x + virusB.position.x) / 2;
        var y = (virusA.position.y + virusB.position.y) / 2;
        var position = {x: x, y: y};
        var angle = (virusA.body.angle + virusB.body.angle) / 2;
        var speed = (virusA.body.speed + virusB.body.speed) / 2;
        
        virusA.kill();
        virusB.kill();
        
        targetGroup.spawn(position, angle, speed);
    }
}

// internal class

var VirusGroup = function(game, num, count) {

    this.game = game;
    this.num = num;
    this.group = this.game.add.group();
    this.group.name = "VIRUS_" + this.num;
    this.group.enableBody = true;
    this.group.physicsBodyType = Phaser.Physics.ARCADE;
    this.group.createMultiple(count, "VIRUS_" + this.num);
    this.group.callAll("animations.add", "animations", "MOVE", [0, 1, 2, 3, 4]);
    if (this.num == 1)
        this.group.callAll("animations.add", "animations", "KILL", [5, 6, 7, 8, 9]);
    this.group.setAll("anchor.x", 0.5);
    this.group.setAll("anchor.y", 0.5);
    this.group.setAll("dying", false);
    
    this.spawn = function(position, angle, speed) {
        var virus = this.group.getFirstExists(false);
        
        if (virus) {
            var angularV = UTILITIES.get_random_rotation();
            
            virus.reset(position.x, position.y);
            this.game.physics.arcade.velocityFromAngle(angle, speed, virus.body.velocity);
            virus.body.angularVelocity = angularV;
            
            var time = this.game.time.now;
            virus.invulnerable = function() {
                return this.game.time.now < time + 500;
            };
            
            virus.animations.play("MOVE", 4, true);
        }
    };
    
    this.degrade = function(virus, virusGroups) {
        
        // get number of groups
        var count = Math.floor(Math.random() * (this.num - 1)) + 2;
        
        // determine number of viri per cluster
        var newViri = []
        for (var i = 0; i < count; i++) newViri[i] = 0;
        for (var i = 0; i < this.num; i++) {
            newViri[i % count]++;
        }
        
        // Calculate new directional variables and spawn groups for each
        var angle = Math.random() * 360;
        var step = 360 / count;
        for (var i = 0; i < count; i++) {
            virusGroups[newViri[i] - 1].spawn(virus.body.position, angle, virus.body.speed * 1.5);
            angle += step;
        }
        
        virus.kill();
    };
    
    this.kill = function(virus, virusGroups) {
        if (this.num == 1) {
            virus.dying = true;
            var kill = virus.animations.play("KILL", 4, false);
            kill.onComplete.add(function() {
                virus.dying = false;
                virus.kill();
            });
        } else {
            this.degrade(virus, virusGroups);
        }
    };
}
