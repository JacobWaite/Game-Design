class Goblin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence) {
        super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed,intelligence);
        //this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, -12, 250, 105, 84, 6, [0.15], 0, false, false, true));
        //this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 0, 78, 104, 78, 8, [0.15], 6, false, false, true));
        //this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 118, 0, 104, 80, 7, [0.5], 1, false, false, true));
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, 0, 442, 104, 80, 7, [0.25], 1, false, false, true));
    };

    update() {};

    draw(ctx) {
        //this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x, this.y, 1.25);
        //this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x, this.y, 1.25);
        //this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x, this.y, 1.25);
        this.animationPlayer.playAnimation("death", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
     }

}