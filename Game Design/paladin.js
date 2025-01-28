class Paladin {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });

        this.game.paladin = this;

        //spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./Paladin_Spritesheet.png");
        // paladin state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = attacking, 3 = damage
        this.dead = false;

        this.velocity = 0;

        this.updateBB();
        //paladin animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) { //4 states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //two directions
                this.animations[i].push([]);

            }

        }
        //idle animation for state = 0
        //facing right
        this.animations[0][0] = new Animator(this.spritesheet, )
    };

    update() {
        // update velocity
        // update position

    };

    draw(ctx) {
		//Walk animations
		//this.walkAnim[0].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y, 2);
		//this.walkAnim[1].drawFrame(this.game.clockTick, this.game.ctx, this.x + 100, this.y, 2);
		//this.walkAnim[2].drawFrame(this.game.clockTick, this.game.ctx, this.x + 200, this.y, 2);
		//this.walkAnim[3].drawFrame(this.game.clockTick, this.game.ctx, this.x + 300, this.y, 2);

		// Attack animations
		//this.attackAnim[0].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y + 150, 2);
		//this.attackAnim[1].drawFrame(this.game.clockTick, this.game.ctx, this.x + 100, this.y + 150, 2);
		//this.attackAnim[2].drawFrame(this.game.clockTick, this.game.ctx, this.x + 200, this.y + 150, 2);
		//this.attackAnim[3].drawFrame(this.game.clockTick, this.game.ctx, this.x + 300, this.y + 150, 2);

	};
};