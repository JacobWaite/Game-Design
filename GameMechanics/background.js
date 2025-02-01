class Background { 
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

