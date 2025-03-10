class grass extends background{
    constructor(game, x, y, sprite, imageX, imageY) {
        super(game,x,y,sprite);
        this.imageX = imageX;
        this.imageY = imageY;
    }

    draw(ctx) {
        if (this.sprite) {
            ctx.drawImage(this.sprite, this.imageX, this.imageY, 32, 32,this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 32);
        }
    }
}