var MENU = function(game) {
    this.game = game;
    var menu;
    var background;
    this.LoadMenu = function() {
        menu = game.add.tileSprite(0, 0, 1280,720,'MENU');
    },

    this.changeBackground = function(){
        menu.destroy();
    }

    this.drawBackground = function(){
        var background = game.add.tileSprite(0, 0, 1280,720,'BACKGROUND');
    }
}