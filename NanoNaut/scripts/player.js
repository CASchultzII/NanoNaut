// This script contains the PLAYER LOGIC!!

var PLAYER = function(game) {
    this.game = game;
    this.player = this.game.add.sprite(300, 300, "SHIP");
    this.player.anchor.set(0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.drag.set(100);
    this.player.body.maxVelocity.set(200);
    
    // Player can dash!
    this.speedVal = 200;
    this.invulnerable = false;
    this.dashTime = 1500;
    this.lastClock = 0;

    // Player has a dash HUD!
    this.maxDashBar = this.game.add.sprite(950, 10, "BAR");
    //this.maxDashBar.anchor.setTo(0, 1);
    this.maxDashBar.fixedToCamera = true;
    this.maxDashBar.tint = 0xFFD800;
    
    this.dashBar = this.game.add.sprite(950, 10, "BAR");
    //this.dashBar.anchor.setTo(0, 1);
    this.dashBar.fixedToCamera = true;
    this.dashBar.tint = 0xFF3300;

    // Player has score!
    this.score = 0;
    this.scoreText = this.game.add.text(100, 30, "", {
            font: "20px serif",
            fill: "#ff0044",
            align: "center"
        });
    this.scoreText.anchor.setTo(0.5, 0.5);

    // GAMEOVER
    this.gameOverText = this.game.add.retroFont("BLUEPINKFONT", 32, 32,
            Phaser.RetroFont.TEXT_SET2, 10);
    this.gameOverText.text = "";
    this.gameOverImage = this.game.add.image(this.game.world.centerX,
            this.game.world.centerY, this.gameOverText);
    this.gameOverImage.anchor.set(0.5);
    this.game.time.events.loop(Phaser.Timer.SECOND * 2, function() {
            this.gameOverImage.tint = Math.random() * 0xFFFFFF;
        }, this);

    // Player has controls!
    this.input = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    this.update = function() {
        if (!this.player.alive) {
            this.gameOverText.text = "GAMEOVER";

            if (this.input.down.isDown) {
                this.game.state.restart();
                this.score = 0;
            }
        }

        this.move_player();
        this.dash(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR));

        UTILITIES.screen_wrap(this.player, this.game);

        this.scoreText.text = "Score: " + this.score;

        var scale = this.dashTime / 1500;
        this.dashBar.scale.setTo(scale > 0 ? scale : 0, 1);
    };

    // INTERNALS
    this.move_player = function() {
        if (this.input.up.isDown || this.invulnerable) { // if invulnerable, player is dashing
            this.game.physics.arcade.accelerationFromRotation(
                    this.player.rotation, this.speedVal, this.player.body.acceleration);
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
    
    this.dash = function(bool) {
        if (this.invulnerable) {
            this.dashTime -= this.game.time.now - this.lastClock;
        } else {
            if (this.dashTime < 1500) {
                this.dashTime += this.game.time.now - this.lastClock;
                if (this.dashTime > 1500) this.dashTime = 1500;
            } else if (this.dashTime > 1500) {
                this.dashTime = 1500;
            }
        }
        
        bool = bool && this.dashTime > 0;
        
        this.player.body.maxVelocity.set(bool ? 700 : 200);
        this.speedVal = bool ? 700 : 200;
        this.invulnerable = bool;
        
        this.lastClock = this.game.time.now;
    };
}
