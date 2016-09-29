var MENU = function(game) {
    this.game = game;
    var menu;
    var background;
    this.alive = true;
    this.LoadMenu = function(isMobile) {
        menu = game.add.tileSprite(0, 0, 1280,720,'MENU');
        if (isMobile) {
            menu.inputEnabled = true;
            menu.events.onInputDown.add(this.changeBackground, this);
        }
    },

    this.changeBackground = function(){
        menu.destroy();
        this.alive = false;
    }

    this.drawBackground = function(){
        var background = game.add.tileSprite(0, 0, 1280,720,'BACKGROUND');
    }
}