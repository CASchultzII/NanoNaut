// This script will load in all assets when instructed to do so.
// This script can also be used to store and load configuration values.

var ASSETS = function(game) {
    this.game = game;

    this.load_assets = function() {
        this.game.load.spritesheet("SHIP", "assets/player/ship.png", 74, 74, 10);
        this.game.load.spritesheet("DASH", "assets/player/bubbles.png", 99, 68, 4);
        
        this.game.load.image("BASIC_TRIPLE", "assets/enemies/GroupEnemy.png");
        this.game.load.spritesheet("BASIC_TRIPLE_A", "assets/enemies/GroupEnemyAnimated.png", 112, 94, 4);
        this.game.load.image("BASIC_SINGLE", "assets/enemies/BasicEnemy.png");
        this.game.load.spritesheet("BASIC_SINGLE_A", "assets/enemies/BasicEnemyAnimated.png", 64, 62, 4);
        
        this.game.load.image("BACKGROUND", "assets/background.png");
        this.game.load.image("BLUEPINKFONT", "assets/bluepinkfont.png");
        this.game.load.image("KNIGHT", "assets/KNIGHT3.png");

        this.game.load.image("BACKBAR", "assets/DashbarBack.png");
        this.game.load.image("FRONTBAR", "assets/DashbarFront.png");
        this.game.load.image("MIDDLEBAR", "assets/DashbarWhite.png");

        this.game.load.image("MENU", "assets/menu.png");
        this.game.load.image("CONTROLS", "assets/Controls.png");
        this.game.load.image("SCORE", "assets/score.png");
        this.game.load.image("DASHIMAGE", "assets/dash.png");
    }
}
