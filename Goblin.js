class Goblin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence) {
        super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed,intelligence);

       // this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 128, 64, 64, 0, 2, false, [0.75], false, true));
        // walk animation
       // this.walkAnim = [];

		//Facing right
		this.animationPlayer.addAnimation("walk right", new Animation(spriteSheet, 235, 265, 33, 20, 1, 6, false, [0.25], false, true));
		// Facing left
       // this.walkAnim[1] = new Animator(spritesheet, 235, 235, 33, 20, 6, 0.25, 1, true, true);
        // Facing up
       // this.walkAnim[2] = new Animator(spritesheet, 235, 207, 33, 20, 6, 0.25, 1, false, true);
        // Facing down
       // this.walkAnim[3] = new Animator(spritesheet, 235, 181, 33, 20, 6, 0.33, 1, false, true);

        // Run Attack animation
       // this.attackAnim = [];

        // Facing right
        //this.attackAnim[0] = new Animator(spritesheet, 229, 118, 33, 24, 5, 0.25, 0, false, true);
        // Facing left
       // this.attackAnim[1] = new Animator(spritesheet, 226, 90, 32.2, 24, 5, 0.25, 0, true, true);
        // Facing up
       // this.attackAnim[2] = new Animator(spritesheet, 234, 64, 29.8, 24, 5, 0.25, 0, false, true);
        // Facing down
       // this.attackAnim[3] = new Animator(spritesheet, 233, 40, 32.2, 24, 5, 0.25, 0, false, true);
    };

    update() {};

    draw(ctx) {
        this.animationPlayer.playAnimation("walk right", this.game.clockTick, ctx, this.x, this.y, 2);
        //this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x, this.y, 2);
    }

}