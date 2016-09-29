// This script will load in all assets when instructed to do so.
// This script can also be used to store and load configuration values.

var ASSETS = function(game) {
    this.game = game;

    this.load_assets = function() {
        this.game.load.spritesheet("SHIP", "assets/player/ship.png", 74, 74, 8);
        this.game.load.spritesheet("DASH", "assets/player/bubbles.png", 99, 68, 3);
        
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
        this.game.load.spritesheet("HEALTHBAR", "assets/shipbarupdate.png", 150, 50, 5);
         
        this.game.load.image("BACKGROUND", "assets/background.png");
        this.game.load.image("BLUEPINKFONT", "assets/bluepinkfont.png");
        this.game.load.image("KNIGHT", "assets/KNIGHT3.png");
        this.game.load.image("SCOREFONT", "assets/scoreFont.png");
        this.game.load.image("GAMEOVERIMAGE", "assets/gameover.png");
 
        this.game.load.image("BACKBAR", "assets/DashbarBack.png");
        this.game.load.image("FRONTBAR", "assets/DashbarFront.png");
        this.game.load.image("MIDDLEBAR", "assets/DashbarWhite.png");

        this.game.load.image("MENU", "assets/menu1.png");
        this.game.load.image("CONTROLS", "assets/Controls.png");
        this.game.load.image("SCORE", "assets/score.png");
        this.game.load.image("DASHIMAGE", "assets/dash.png");
        
        // CONTROLS
        this.game.load.image("DOWN_R", "assets/ui/DownReleased.png");
        this.game.load.image("DOWN_P", "assets/ui/DownPressed.png");
        this.game.load.image("UP_R", "assets/ui/UpReleased.png");
        this.game.load.image("UP_P", "assets/ui/UpPressed.png");
        this.game.load.image("LEFT_R", "assets/ui/LeftReleased.png");
        this.game.load.image("LEFT_P", "assets/ui/LeftPressed.png");
        this.game.load.image("RIGHT_R", "assets/ui/RightReleased.png");
        this.game.load.image("RIGHT_P", "assets/ui/RightPressed.png");
        this.game.load.image("SPACE_R", "assets/ui/SpaceReleased.png");
        this.game.load.image("SPACE_P", "assets/ui/SpacePressed.png");
        
        // Audio
        this.game.load.audio("SPLAT", ["assets/sounds/splat.mp3"]);
        this.game.load.audio("EXPLOSION", ["assets/sounds/explosion.mp3"]);
        this.game.load.audio("TITLE_THEME", ["assets/sounds/title.ogg"]);
    }
}
