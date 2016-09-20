// This script contains the PLAYER LOGIC!!

var PLAYER = function(game) {
    this.game = game;
    this.player = this.game.add.sprite(300, 300, "SHIP");
    this.player.anchor.set(0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.drag.set(100);
    this.player.body.maxVelocity.set(200);

    // Players have bullets!!
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(40, "BULLET");
    this.bullets.setAll("anchor.x", 0.5);
    this.bullets.setAll("anchor.y", 0.5);
    this.bulletTime = 0;

    // Player has controls!
    this.input = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    this.update = function() {
        this.move_player();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fire_bullet();
        }

        UTILITIES.screen_wrap(this.player, this.game);
        this.bullets.forEachExists(UTILITIES.screen_wrap, this, this.game);
    };

    // INTERNALS
    this.move_player = function() {
        if (this.input.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(
                    this.player.rotation, 200, this.player.body.acceleration);
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.input.left.isDown) {
            this.player.body.angularVelocity = -300;
        } else if (this.input.right.isDown) {
            this.player.body.angularVelocity = 300;
        } else {
            this.player.body.angularVelocity = 0;
        }
    };

    this.fire_bullet = function() {
        if (this.game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(this.player.body.x + 8, this.player.body.y + 8);
                bullet.lifespan = 2000;
                bullet.rotation = this.player.rotation;
                this.game.physics.arcade.velocityFromRotation(
                        this.player.rotation, 400, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 50;
            }
        }
    };
}
