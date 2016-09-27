// This script will load in all assets when instructed to do so.
// This script can also be used to store and load configuration values.

var ASSETS = function(game) {
    this.game = game;

    this.load_assets = function() {
        this.game.load.spritesheet("SHIP", "assets/player/ship.png", 74, 74, 10);
        this.game.load.spritesheet("DASH", "assets/player/bubbles.png", 99, 68, 4);
        
        this.game.load.spritesheet("VIRUS_1",  "assets/enemies/virus-1.png", 64, 62, 10);
        this.game.load.spritesheet("VIRUS_2",  "assets/enemies/virus-2.png", 107, 55, 5);
        this.game.load.spritesheet("VIRUS_3",  "assets/enemies/virus-3.png", 112, 94, 5);
        this.game.load.spritesheet("VIRUS_4",  "assets/enemies/virus-4.png", 103, 106, 5);
        this.game.load.spritesheet("VIRUS_5",  "assets/enemies/virus-5.png", 131, 114, 5);
        this.game.load.spritesheet("VIRUS_6",  "assets/enemies/virus-6.png", 134, 118, 5);
        this.game.load.spritesheet("VIRUS_7",  "assets/enemies/virus-7.png", 134, 146, 5);
        this.game.load.spritesheet("VIRUS_8",  "assets/enemies/virus-8.png", 159, 137, 5);
        this.game.load.spritesheet("VIRUS_9",  "assets/enemies/virus-9.png", 150, 172, 5);
        this.game.load.spritesheet("VIRUS_10", "assets/enemies/virus-10.png", 173, 170, 5);
        
        this.game.load.image("BACKGROUND", "assets/background.png");
        this.game.load.image("BLUEPINKFONT", "assets/bluepinkfont.png");
        this.game.load.image("BAR", "assets/Bar.png");
        this.game.load.image("MENU", "assets/menu.png");
    }
}
