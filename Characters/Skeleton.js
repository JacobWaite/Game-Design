class Skeleton extends Humanoid{
	constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
		super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
		
		//this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 180, 165, 100, 6, [0.1], 25, false, false, true));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 1, 85, 165, 100, 8, [0.25], 29.5, false, false, true));
        //this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 165, 100, 4, [0.25], 25, false, false, true));
        //this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, 0, 442, 104, 80, 7, [0.25], 1, false, false, true));
	};

	update() {
		this.hitBox.updateHitBox();
	};

	draw(ctx) {

		//this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		//this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		//this.animationPlayer.playAnimation("death", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		
	}





}