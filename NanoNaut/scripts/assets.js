// This script will load in all assets when instructed to do so.
// This script can also be used to store and load configuration values.

var ASSETS = function(game) {
    this.game = game;

    this.load_assets = function() {
        this.game.load.image("SHIP", "assets/SpaceShip.png");

        this.game.load.image("BASIC_TRIPLE", "assets/enemies/GroupEnemy.png");
        this.game.load.spritesheet("BASIC_TRIPLE_A", "assets/enemies/GroupEnemyAnimated.png", 112, 94, 4);
        this.game.load.image("BASIC_SINGLE", "assets/enemies/BasicEnemy.png");
        this.game.load.spritesheet("BASIC_SINGLE_A", "assets/enemies/BasicEnemyAnimated.png", 64, 62, 4);

        this.game.load.image("BACKGROUND", "assets/background.png");
        this.game.load.image("BLUEPINKFONT", "assets/bluepinkfont.png");
        this.game.load.image("BAR", "assets/Bar.png");
    }
}
