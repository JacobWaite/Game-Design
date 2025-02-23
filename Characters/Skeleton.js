class Skeleton extends Humanoid{

	constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
		super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
		this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 3, 0, 56, 98, 5, [0.15], 1, false, false, true));
		this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 3, 0, 48.0059, 75, 9, [0.15], 1, false, false, true));
	};

	update() {
		this.hitBox.updateHitBox();
	};

	draw(ctx) {

		this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		//this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
	}





}