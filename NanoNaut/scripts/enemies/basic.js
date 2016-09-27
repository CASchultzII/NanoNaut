// This script contains code needed to manage Basic enemies.
// Basic enemies are those which mirror the basic Asteroid "enemy"

// Basic Enemy Group
var Enemy_Basic = function(game) {
    this.game = game;
    
    // Create Triples Group
    this.TRIPLES = this.game.add.group();
    this.TRIPLES.name = "Basic Triples";
    this.TRIPLES.enableBody = true;
    this.TRIPLES.physicsBodyType = Phaser.Physics.ARCADE;
    this.TRIPLES.createMultiple(15, "BASIC_TRIPLE_A");
    this.TRIPLES.callAll("animations.add", "animations", "move");
    this.TRIPLES.callAll("animations.play", "animations", "move", 4, true);
    this.TRIPLES.setAll("anchor.x", 0.5);
    this.TRIPLES.setAll("anchor.y", 0.5);

    // Create Singles Group
    this.SINGLES = this.game.add.group();
    this.SINGLES.name = "Basic Singles";
    this.SINGLES.enableBody = true;
    this.SINGLES.physicsBodyType = Phaser.Physics.ARCADE;
    this.SINGLES.createMultiple(45, "BASIC_SINGLE_A");
    this.SINGLES.callAll("animations.add", "animations", "move");
    this.SINGLES.callAll("animations.play", "animations", "move", 4, true);
    this.SINGLES.setAll("anchor.x", 0.5);
    this.SINGLES.setAll("anchor.y", 0.5);

    ////// Helpers

    this.degradeTriple = function(triple) {
        var position = triple.position;
        var angle1 = triple.angle + 60;
        var angle2 = triple.angle + 180;
        var angle3 = triple.angle + 300;
        var speed = triple.body.speed * 1.5;

        // Create three new Singles
        this.spawnSingle(position, angle1, speed);
        this.spawnSingle(position, angle2, speed);
        this.spawnSingle(position, angle3, speed);
    };

    this.spawnTriple = function() {
        var position = UTILITIES.get_random_spawn(this.game);
        var angle = UTILITIES.get_random_angle();
        var speed = 75;
        var angularV = UTILITIES.get_random_rotation();

        var triple = this.TRIPLES.getFirstExists(false);
        if (triple) {
            triple.reset(position.x, position.y);
            this.game.physics.arcade.velocityFromAngle(angle, speed,
                    triple.body.velocity);
            triple.body.angularVelocity = angularV;

            var time = this.game.time.now;
            triple.invulnerable = function() {
                return this.game.time.now < time + 500;
            };
        }
    };

    this.spawnSingle = function(position, angle, speed) {
        var single = this.SINGLES.getFirstExists(false);

        if (single) {
            var angularV = UTILITIES.get_random_rotation();

            UTILITIES.LOG(position,angle,speed);

            single.reset(position.x, position.y);
            this.game.physics.arcade.velocityFromAngle(angle, speed,
                    single.body.velocity);
            single.body.angularVelocity = angularV;

            var time = this.game.time.now;
            single.invulnerable = function() {
                return this.game.time.now < time + 500;
            };
        }
    };
}
