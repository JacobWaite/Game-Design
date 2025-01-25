class Orc {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });

        // mario's state variables
        this.facing = 0; // 0 = right, 1 = left, 2 = up, 3 = down
        this.state = 0; // 0 = walking, 1 = attacking, 2 = damage, 3 = death

        this.velocity = 0;

        this.loadAnimations(spritesheet);
    };

    loadAnimations(spritesheet) {

        // walk animation
        this.walkAnim = [];

		//Facing right
		this.walkAnim[0] = new Animator(spritesheet, 235, 265, 33, 20, 6, 0.25, 1, false, true);
		// Facing left
        this.walkAnim[1] = new Animator(spritesheet, 235, 235, 33, 20, 6, 0.25, 1, true, true);
        // Facing up
        this.walkAnim[2] = new Animator(spritesheet, 235, 207, 33, 20, 6, 0.25, 1, false, true);
        // Facing down
        this.walkAnim[3] = new Animator(spritesheet, 235, 181, 33, 20, 6, 0.33, 1, false, true);

        // Run Attack animation
        this.attackAnim = [];

        // Facing right
        this.attackAnim[0] = new Animator(spritesheet, 229, 118, 33, 24, 5, 0.25, 0, false, true);
        // Facing left
        this.attackAnim[1] = new Animator(spritesheet, 226, 90, 32.2, 24, 5, 0.25, 0, true, true);
        // Facing up
        this.attackAnim[2] = new Animator(spritesheet, 234, 64, 29.8, 24, 5, 0.25, 0, false, true);
        // Facing down
        this.attackAnim[3] = new Animator(spritesheet, 233, 40, 32.2, 24, 5, 0.25, 0, false, true);

    };

    update() {
        // update velocity
        // update position

    };

    draw(ctx) {
		//Walk animations
		this.walkAnim[0].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y, 2);
		this.walkAnim[1].drawFrame(this.game.clockTick, this.game.ctx, this.x + 100, this.y, 2);
		this.walkAnim[2].drawFrame(this.game.clockTick, this.game.ctx, this.x + 200, this.y, 2);
		this.walkAnim[3].drawFrame(this.game.clockTick, this.game.ctx, this.x + 300, this.y, 2);

		// Attack animations
		this.attackAnim[0].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y + 150, 2);
		this.attackAnim[1].drawFrame(this.game.clockTick, this.game.ctx, this.x + 100, this.y + 150, 2);
		this.attackAnim[2].drawFrame(this.game.clockTick, this.game.ctx, this.x + 200, this.y + 150, 2);
		this.attackAnim[3].drawFrame(this.game.clockTick, this.game.ctx, this.x + 300, this.y + 150, 2);

	};
};