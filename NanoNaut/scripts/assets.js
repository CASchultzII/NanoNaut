// This script will load in all assets when instructed to do so.
// This script can also be used to store and load configuration values.

var Assets = function(game) {
    this.game = game;

    this.load_assets = function() {
        this.game.load.image("SHIP", "assets/SpaceShip.png")
        this.game.load.image("BULLET", "assets/Bullet.png")
        this.game.load.image("ASTEROID_1", "assets/Asteroid_01.png")
        this.game.load.image("ASTEROID_2", "assets/Asteroid_02.png")
        this.game.load.image("ASTEROID_3", "assets/Asteroid_03.png")
        this.game.load.image("BACKGROUND", "assets/background.png")
    }
}