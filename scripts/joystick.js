// Contains virtual joystick code:

var JOYSTICK = function(game, player) {
    
    var input = {
        "left": {
            "isDown": false
        },
        "right": {
            "isDown": false
        },
        "down": {
            "isDown": false
        },
        "up": {
            "isDown": false
        }
    }
    
    var spaceIsDown = false;
    
    this.right = game.add.sprite(1280 - 10, 720 - 10, "RIGHT_R");
    this.right.anchor.set(1);
    this.right.inputEnabled = true;
    this.right.events.onInputDown.add(function() {input.right.isDown = true;}, this)
    this.right.events.onInputUp.add(function() {input.right.isDown = false;}, this)
    
    this.down = game.add.sprite(1280 - 148, 720 - 10, "DOWN_R");
    this.down.anchor.set(1);
    this.down.inputEnabled = true;
    this.down.events.onInputDown.add(function() {input.down.isDown = true;}, this)
    this.down.events.onInputUp.add(function() {input.down.isDown = false;}, this)
    
    this.left = game.add.sprite(1280 - 286, 720 - 10, "LEFT_R");
    this.left.anchor.set(1);
    this.left.inputEnabled = true;
    this.left.events.onInputDown.add(function() {input.left.isDown = true;}, this)
    this.left.events.onInputUp.add(function() {input.left.isDown = false;}, this)
    
    this.up = game.add.sprite(1280 - 148, 720 - 148, "UP_R");
    this.up.anchor.set(1);
    this.up.inputEnabled = true;
    this.up.events.onInputDown.add(function() {input.up.isDown = true;}, this)
    this.up.events.onInputUp.add(function() {input.up.isDown = false;}, this)
    
    this.space = game.add.sprite(10, 720 - 10, "SPACE_R");
    this.space.anchor.set(0, 1);
    this.space.inputEnabled = true;
    this.space.events.onInputDown.add(function() {spaceIsDown = true;}, this)
    this.space.events.onInputUp.add(function() {spaceIsDown = false;}, this)
    
    player.spacePressed = function() {
        return spaceIsDown;
    }
    
    player.input = function(str) {
        switch(str) {
            case "UP":
                return input.up.isDown;
            case "DOWN":
                return input.down.isDown;
            case "LEFT":
                return input.left.isDown;
            case "RIGHT":
                return input.right.isDown;
        }
    }
}