class stone extends Entity{
    constructor(game, x, y, spriteSheet, imageX, imageY, width,height, xSpriteOffset,ySpriteOffset, scale) {
        super(game, x, y, spriteSheet, width,height, xSpriteOffset,ySpriteOffset, scale);
        this.imageX = imageX;
        this.imageY = imageY;
        console.log(this.game.entities.length);
    }

    draw(ctx) {
        ctx.drawImage(this.spriteSheet, this.imageX, this.imageY, 32, 32,this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 32);

    };

}