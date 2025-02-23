class Shopkeeper extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence) {
        super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed,intelligence);
        //this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 98, 88, 7, [0.25], 4, false, false, true));
        this.animationPlayer.addAnimation("itemPurchased", new Animation(this.spriteSheet, 0, 428, 98, 90, 7, [0.15], 4, false, false, true));
    };

    update() {
        this.hitBox.updateHitBox();
    };

    draw(ctx) {
        //this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x, this.y, 1.25);
        this.animationPlayer.playAnimation("itemPurchased", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.15);
    }

}