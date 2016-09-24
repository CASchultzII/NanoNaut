// This script contains managerial code for all the "enemies" in this game.

var ENEMIES = function(game) {

    this.game = game;
    
    // Enemies! :D
    this.BASIC = new Enemy_Basic(game);

    //// UPDATE!  Call in Lifecycle!
    this.update = function(player) {

        //// Screenwrap our enemies.
        this.BASIC.TRIPLES.forEachExists(UTILITIES.screen_wrap, this, this.game);
        this.BASIC.SINGLES.forEachExists(UTILITIES.screen_wrap, this, this.game);
        
        //// Handle generation of individual Enemy groups.
        if (Math.random() < .005) { // Spawn Basic Triple
            this.BASIC.spawnTriple();
        }

        //// Handle collision with player
        // Collide with Basic_Triple enemies.
        this.game.physics.arcade.overlap(player.player, this.BASIC.TRIPLES,
                function(playerSprite, triple) {
                    if (player.invulnerable()) {
                        if (!triple.invulnerable()) {
                            this.BASIC.degradeTriple(triple);
                            triple.kill();
                            player.score += 30;
                        }
                    }else {
                        playerSprite.kill();
                    }
                }, null, this
            );

        // Collide with Basic_Single enemies.
        this.game.physics.arcade.overlap(player.player, this.BASIC.SINGLES,
                function(playerSprite, single) {
                    if (player.invulnerable()) {
                        if (!single.invulnerable()) {
                            single.kill();
                            player.score += 15;
                        }
                    } else {
                        playerSprite.kill();
                    }
                }, null, this
            );

        //// Handle inter-enemy collisions
        this.game.physics.arcade.collide(this.BASIC.SINGLES);
        this.game.physics.arcade.collide(this.BASIC.TRIPLES);
        this.game.physics.arcade.collide(this.BASIC.SINGLES, this.BASIC.TRIPLES);
    };
}
