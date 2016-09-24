// This script contains the PLAYER LOGIC!!
var PLAYER = function(game) {
    
    // Constants:
    var MAX_VELOCITY_IDLE = 300;
    var MAX_VELOCITY_DASH = 800;
    var DECELERATION = -450; // pixels / s^2
    var INVULNERABLE_SPEED = 450;
    var MAX_DASH_TIME = 500;
    var COOLDOWN_MULTIPLIER = .2;
    var MIN_DASH_POWER = .3;
    
    this.game = game;
    
    this.player = this.game.add.sprite(300, 300, "SHIP");
    this.player.anchor.set(0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.drag.set(200);
    this.player.body.maxVelocity.set(MAX_VELOCITY_IDLE);
    
    // Player Animations!!
    this.player.animations.add("IDLE", [0, 1, 2], 4);
    this.player.animations.add("DASH", [3, 4, 5], 4);
    this.player.animations.play("IDLE", null, true);
    this.dashing = false;
    
    // Player can dash!
    this.targetVelocity = MAX_VELOCITY_IDLE;
    this.dashTime = MAX_DASH_TIME;
    this.lastClock = 0;

    // Player has a dash HUD!
    this.maxDashBar = this.game.add.sprite(950, 10, "BAR");
    this.maxDashBar.fixedToCamera = true;
    this.maxDashBar.tint = 0xFFD800;
    
    this.dashBar = this.game.add.sprite(950, 10, "BAR");
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

        this.dash(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR));
        this.move_player();

        UTILITIES.screen_wrap(this.player, this.game);

        this.scoreText.text = "Score: " + this.score;

        var scale = this.dashTime / MAX_DASH_TIME;
        this.dashBar.scale.setTo(scale > 0 ? scale : 0, 1);
    };

    // INTERNALS
    this.move_player = function() {
        if (this.input.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation, this.targetVelocity, this.player.body.acceleration);
        } else if (this.dashing) { // divide by seconds required to get to target velocity
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation, this.targetVelocity / .1, this.player.body.acceleration);
        } else if (this.player.body.speed > MAX_VELOCITY_IDLE) { // We're not dashing, but we're going too fast
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation, this.targetVelocity / .25, this.player.body.acceleration);
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.input.left.isDown) {
            this.player.body.angularVelocity = this.invulnerable() ? -100 : -300;
        } else if (this.input.right.isDown) {
            this.player.body.angularVelocity = this.invulnerable() ? 100 : 300;
        } else {
            this.player.body.angularVelocity = 0;
        }
    };
    
    this.dash = function(bool) {
        // To dash or not to dash....
        if (bool) { // we want to dash
            if (this.dashing) { // we're already dashing
                this.dashTime -= this.game.time.now - this.lastClock;
                if (this.dashTime < 0) this.dashTime = 0;
            } else if (this.dashTime / MAX_DASH_TIME > MIN_DASH_POWER) { // we're not dashing
                this.dashing = true;
                this.player.body.speed = INVULNERABLE_SPEED;
            }
        } else { // we shouldn't be dashing
            if (this.dashing) { // we are dashing
                this.dashing = false;
            } else { //we're not dashing
                if (this.dashTime < MAX_DASH_TIME) {
                    this.dashTime += (this.game.time.now - this.lastClock) * COOLDOWN_MULTIPLIER;
                    if (this.dashTime > MAX_DASH_TIME) this.dashTime = MAX_DASH_TIME;
                } else if (this.dashTime > MAX_DASH_TIME) {
                    this.dashTime = MAX_DASH_TIME;
                }
            }
        }
        
        // Adjust player targetVelocity incrementally
        if (this.dashing && this.dashTime > 0) this.targetVelocity = MAX_VELOCITY_DASH;
        else if (this.targetVelocity > MAX_VELOCITY_IDLE) {
            this.targetVelocity += DECELERATION * ((this.game.time.now - this.lastClock) / 1000);
            if (this.targetVelocity < MAX_VELOCITY_IDLE) this.targetVelocity = MAX_VELOCITY_IDLE;
        }
        this.player.body.maxVelocity.set(this.targetVelocity);
        
        // Set correct animation based on speed!
        var current = this.player.animations.currentAnim.name;
        if (this.invulnerable()) { // Invulnerable?
            if (current == "IDLE") { // Idle animation playing?
                this.player.animations.play("DASH", null, true);
            }
        } else if (current == "DASH") { // Not invulnerable and dash animation playing
            this.player.animations.play("IDLE", null, true);
        }
        
        this.lastClock = this.game.time.now;
    };
    
    this.invulnerable = function() {
        return this.player.body.speed >= INVULNERABLE_SPEED;
    }
}
