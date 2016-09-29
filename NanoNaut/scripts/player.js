// This script contains the PLAYER LOGIC!!
var PLAYER = function(game) {
    
    // Constants:
    var MAX_VELOCITY_IDLE = CONSTANTS.PLAYER.MAX_VELOCITY_IDLE;
    var MAX_VELOCITY_DASH = CONSTANTS.PLAYER.MAX_VELOCITY_DASH;
    var INVULNERABLE_SPEED = CONSTANTS.PLAYER.INVULNERABLE_SPEED;
    var DECELERATION = CONSTANTS.PLAYER.DECELERATION;
    var DASH_DECEL = CONSTANTS.PLAYER.DASH_DECEL;
    var AFTER_DECEL = CONSTANTS.PLAYER.AFTER_DECEL;
    var OMEGA_IDLE = CONSTANTS.PLAYER.OMEGA_IDLE;
    var OMEGA_DASH = CONSTANTS.PLAYER.OMEGA_DASH;
    var MAX_DASH_TIME = CONSTANTS.PLAYER.MAX_DASH_TIME;
    var COOLDOWN_MULTIPLIER = CONSTANTS.PLAYER.COOLDOWN_MULTIPLIER;
    var MIN_DASH_POWER = CONSTANTS.PLAYER.MIN_DASH_POWER;
    var DRAG = CONSTANTS.PLAYER.DRAG;
    var HIT_COOLDOWN = CONSTANTS.PLAYER.HIT_COOLDOWN;
    var HITBOX = CONSTANTS.PLAYER.HITBOX;
    
    this.game = game;
    this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "SHIP");
    this.player.angle = -90;
    this.player.anchor.set(0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.drag.set(DRAG);
    this.player.body.maxVelocity.set(MAX_VELOCITY_IDLE);
    this.player.body.setCircle(HITBOX.radius, HITBOX.offsets[0], HITBOX.offsets[1]);
    
    // Dash Animation?!?
    this.dashAnim = this.game.add.sprite(0, 0, "DASH");
    this.dashAnim.anchor.set(.5 + 6/99, .5);
    this.dashAnim.animations.add("DASH", [0, 1, 2], 4);
    this.dashAnim.visible = false;
    
    // Player Animations!!
    this.player.animations.add("IDLE", [0, 1], 4);
    this.player.animations.add("DASH", [2, 3], 4);
    this.player.animations.add("KILL", [4, 5, 6, 7], 4);
    this.player.animations.play("IDLE", null, true);
    this.dashing = false;
    this.dying = false;
    this.player.addChild(this.dashAnim);
    
    // Player can dash!
    this.targetVelocity = MAX_VELOCITY_IDLE;
    this.dashTime = MAX_DASH_TIME;
    this.lastClock = 0;

    this.maxDashBar = this.game.add.sprite(1120, 5, "BACKBAR"); //the black bar
    this.maxDashBar.fixedToCamera = true;
    
    this.dashBar = this.game.add.sprite(1120, 5, "MIDDLEBAR");    //the segmented bar
    this.dashBar.fixedToCamera = true;

    this.middleDashBar = this.game.add.sprite(1120, 5, "FRONTBAR");   //the white bar
    this.middleDashBar.fixedToCamera = true;
    this.middleDashBar.tint = 0xFF3300;

    //health bar
    this.totalHealth = 0;   //increment this always
    this.lastHit = 0;
    this.hasPlayerCollided = false;
    this.healthbar = this.game.add.sprite(10,10,'HEALTHBAR');
    
    // Player has score!
    this.score = 0;
    
    this.scoreFont = this.game.add.retroFont("KNIGHT",  31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);

    this.scoreTextDisplay = this.game.add.image(750,43, this.scoreFont);
    this.scoreTextDisplay.anchor.set(0.5,1);

    this.scoreImage = this.game.add.image(620,30,"SCORE");
    this.scoreImage.anchor.set(0.5);

    this.scoreDisplayImage = this.game.add.image(300, 40, this.scoreText);  //this is the 'SCORE' text (black-white)image
    this.scoreDisplayImage.anchor.set(0.5);

    this.dashImage = this.game.add.image(980,15,"DASHIMAGE");   //this is the 'DASH' text (black-white) image

    // Player has controls!
    this.input = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    
    // Player death?!?
    this.deathFX = this.game.add.audio("EXPLOSION");

    this.update = function() {
        if (this.dying) {
            UTILITIES.screen_wrap(this.player, this.game);
            return;
        }
        
        if (!this.player.alive) {
            this.gameOverUpdatedImage = this.game.add.image(this.game.world.centerX - 110,   
            this.game.world.centerY,"GAMEOVERIMAGE");
            if (this.input.down.isDown) {
                this.game.state.restart();
                this.score = 0;
            }
            return;
        }

        var oldDashing = this.dashing;
        var shouldDash = this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        this.dash(shouldDash);
        this.move_player();
        
        if (shouldDash) { // should we dash
            if (!oldDashing) { // were we not dashing?
                this.dashAnim.animations.play("DASH", null, true);
                this.dashAnim.visible = true;
            }
        } else {
            if (oldDashing) {
                this.dashAnim.animations.stop(null, true);
                this.dashAnim.visible = false;
            }
        }

        UTILITIES.screen_wrap(this.player, this.game);

        this.scoreFont.text = ""+this.score;    //updating the score
        this.healthbar.frame = this.totalHealth; //update the health bar (change this.totalHealth)

        var scale = this.dashTime / MAX_DASH_TIME;
        this.dashBar.scale.setTo(scale > 0 ? scale : 0, 1);
        
        //this.dashBar.tint = Phaser.Color.interpolateColor(0x000000,0x00FF00, 100, this.dashBar.scale.x * 100, 0);
        if(this.dashBar.scale.x < 0.3 ){
            //red to black
            this.dashBar.tint = Phaser.Color.interpolateColor(0x000000,0xFF0000, 100, this.dashBar.scale.x * 100, 0);
            //this.dashBar.tint = 0x000000;       //go red
        }else if (this.dashBar.scale.x < 0.6 ){
            //yello to red
            this.dashBar.tint = Phaser.Color.interpolateColor(0xFF0000,0xFFFF00, 100, this.dashBar.scale.x * 100, 0);;       //go yellow
        }else{
             //this.dashBar.tint = 0x00FF00;      //go green
             //green to yellow
             this.dashBar.tint = Phaser.Color.interpolateColor(0xFFFF00,0x00ff00, 100, this.dashBar.scale.x * 100, 0);;
        }  

        if(this.game.time.now - this.lastHit > HIT_COOLDOWN){   //player tints when it loses a life
            this.player.tint = 0xFFFFFF; 
        }else{
            this.player.tint = 0xFF6666; 
        }
    };
    
    this.kill = function() {
        if (!this.dying) {
            this.deathFX.play();
            this.dying = true;
            this.player.body.acceleration.set(0);
            var kill = this.player.animations.play("KILL");
            kill.onComplete.add(function() {
                this.dying = false;
                this.player.kill();
            }, this);
        }
    }

    // INTERNALS
    this.move_player = function() {
        if (this.input.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation, this.targetVelocity, this.player.body.acceleration);
        } else if (this.dashing) { // divide by seconds required to get to target velocity
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation, this.targetVelocity / DASH_DECEL, this.player.body.acceleration);
        } else if (this.input.up.isDow && this.player.body.speed > MAX_VELOCITY_IDLE) { // We're not dashing, but we're going too fast
            this.game.physics.arcade.accelerationFromRotation(
                this.player.rotation, this.targetVelocity / AFTER_DECEL, this.player.body.acceleration);
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.input.left.isDown) {
            this.player.body.angularVelocity = this.invulnerable() ? -OMEGA_DASH : -OMEGA_IDLE;
        } else if (this.input.right.isDown) {
            this.player.body.angularVelocity = this.invulnerable() ? OMEGA_DASH : OMEGA_IDLE;
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

    this.HealthUpdate = function(){
        if(this.game.time.now - this.lastHit > HIT_COOLDOWN) {
            this.lastHit = this.game.time.now;
            if (this.totalHealth < 4) {
                this.totalHealth = this.totalHealth + 1;
            } else {
                this.healthbar.destroy();
                this.kill();
            }
        }
    }
}
