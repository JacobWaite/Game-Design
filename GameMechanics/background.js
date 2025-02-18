/**
 * Creates an object to represent an image to be drawn in the game back ground.
 * The game background is defined as any image that cannot affect a player.
 */
class background {
    /**
     * Instantiates a Background Object. 
     * @param {gameengine} game the gameengine object the background should be drawn to.
     * @param {number} x the x location of the background image.
     * @param {number} y the y location of the background image.
     * @param {HTMLImageElement} sprite the image to draw.
     */ 
    constructor(game, x, y, sprite) {
        Object.assign(this, { game, x, y, sprite});

        // spritemap.get(spriteID);
        // this.sprite = this.spritemap.getTexture(sprite);
    };

    update() {

    };

    draw(ctx) {
        // ctx.drawImage(this.spritesheet, 86, 0, 80, 40, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 2.5);
        if (this.sprite) {
            ctx.drawImage(this.sprite, this.x - this.game.camera.x, this.y - this.game.camera.y);
            // ctx.drawImage(
                
            //     this.spritemap.spriteSheet, 
            //     this.sprite.x, this.sprite.y, 
            //     this.sprite.spriteWidth, this.sprite.spriteHeight, 
            //     this.x - this.game.camera.x, this.y, 
            //     this.sprite.spriteWidth, this.sprite.spriteHeight
            // );
        }
    };
};

