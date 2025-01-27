class Goblin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence) {
        super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed,intelligence);

        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 128, 64, 64, 0, 2, false, [0.75], false, true));
    };

    update() {};

    draw(ctx) {
        this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x, this.y, 2);
    }

}