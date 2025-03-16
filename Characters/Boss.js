class Boss extends Humanoid{
	constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
		super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
		
		this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet[2], 0, 0, 115, 110, 8, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("walkRight", new Animation(this.spriteSheet[2], 0, 80, 80, 80, 6, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("attackRight", new Animation(this.spriteSheet[3], 0, 160, 80, 80, 12, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("walkLeft", new Animation(this.spriteSheet[0], 1360, 80, 80, 80, 6, [0.15], 0, false, true, true));
// 		this.animationPlayer.addAnimation("attackLeft", new Animation(this.spriteSheet[1], 880, 160, 80, 80, 12, [0.15], 0, false, true, true));
// 		this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet[0], 0, 320, 80, 80, 23, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("injury", new Animation(this.spriteSheet[0], 0, 240, 80, 80, 5, [0.15], 0, false, false, true));
	};

	update() {
		this.hitBox.updateHitBox();
	};

	draw(ctx) {

		//this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		//this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		this.animationPlayer.getAnimation("idle", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		//this.animationPlayer.playAnimation("death", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		
	}

}
// class Boss extends Humanoid{
// 	constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
// 		super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
// 		this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet[0], 0, 0, 140, 100, 8, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("walkRight", new Animation(this.spriteSheet[2], 0, 80, 80, 80, 6, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("attackRight", new Animation(this.spriteSheet[3], 0, 160, 80, 80, 12, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("walkLeft", new Animation(this.spriteSheet[0], 1360, 80, 80, 80, 6, [0.15], 0, false, true, true));
// 		this.animationPlayer.addAnimation("attackLeft", new Animation(this.spriteSheet[1], 880, 160, 80, 80, 12, [0.15], 0, false, true, true));
// 		this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet[0], 0, 320, 80, 80, 23, [0.15], 0, false, false, true));
// 		this.animationPlayer.addAnimation("injury", new Animation(this.spriteSheet[0], 0, 240, 80, 80, 5, [0.15], 0, false, false, true));

// 		this.originalPosition = { x, y }; // Store the intial position of entity
// 		this.target = null;
// 		this.path = [];
// 		this.moving = false;
// 		this.attacking = false;
// 		this.dead = false;
// 		this.aStarCalled = false;
// 		this.facing = 1;
// 		this.aggroRange = 10;
// 		this.deaggroRange = 10;
// 		this.attackRange = 100;

// 		this.hitBox = new BoundingBox(this, width, height, xSpriteOffset, ySpriteOffset, 1.25);
// 	}
// 	setTarget(target) {
// 		this.target = target;
// 		this.path = null;
// 	}
// 	die() {
//         if (!this.dead) {
//             this.dead = true;
//             //Generates a random number from 10 to 20
//             const xpGained = Math.floor(Math.random() * 11) + 10;
//             const runesGained = Math.floor(Math.random() * 11) + 10;
            
//             //Gives the XP and runes to the paladin
//             const paladin = this.game.entities.find(e => e instanceof Paladin);
//             if (paladin) {
//                 paladin.xp += xpGained;
//                 paladin.runes += runesGained;
//             }
//         }
//     }
// 	update() {
// 		if(this.getStatValue("health") <= 0) {
// 			this.die();
// 		}
// 		if (this.dead) return;
// 		const paladin = this.game.entities.find(e => e instanceof Paladin);
//         this.target = {x: paladin.x, y:paladin.y};

// 		//calculate the paladin position and its center
// 		const paladinCenter = {
// 			x: paladin.hitBox.left + paladin.hitBox.width / 2,
// 			y: paladin.hitBox.top + paladin.hitBox.height / 2,
// 		};

// 		//calculate the center of the boss
// 		const bossCenter = {
// 			x: this.hitBox.left + this.hitBox.width / 2,
// 			y: this.hitBox.top + this.hitBox.height / 2,
// 		};

// 		//distance from boss to paladin
// 		const paladinDistance = getDistance(bossCenter, paladinCenter);
// 		//distance vertically between boss and paladin
// 		const verticalDistance = Math.abs(bossCenter.y - paladinCenter.y);
// 		if (paladinDistance > this.aggroRange) {
//             this.target = this.originalPosition;
//         }
		
// 		//convert the coordinates of the boss and the paladin to grid coordinates
// 		const bossGridPos = this.game.grid.worldToGrid(bossCenter.x, bossCenter.y);
// 		const targetGridPos = this.game.grid.worldToGrid(this.target.x, this.target.y);
// 		//the max vertical distance before attacking
// 		const verticalThreshold = 30;

// 		//lose aggro once paladin is too far away
// 		// if (paladinDistance > this.deaggroRange) {
// 		// 	this.target = { x: this.originalPosition.x, y: this.originalPosition.y };
// 		//if the boss is close enough and is within vertical threshold attack
// 		if (paladinDistance <= this.attackRange && verticalDistance <= verticalThreshold) {
// 			this.attacking = true;
// 			this.moving = false;
// 			return;
// 		} else {
// 			//move toward paladin once too far away
// 			this.attacking = false;
// 			this.moving = true;
// 		}

// 		//recalculate path if the path doesnt exist anymore (paladin moved)
// 		if (!this.path || this.path.length === 0 || getDistance(this.target, this.path[this.path.length - 1]) > 32) {
// 			this.path = aStar(bossGridPos, targetGridPos, this.game.grid);
// 		}

// 		//if path exists follow the path
// 		if (this.path && this.path.length > 0) {
// 			//gets the next coordinate in the path and convert it into world coordinates
// 			const nextNode = this.path[0];
// 			const nextPos = this.game.grid.gridToWorld(nextNode.x, nextNode.y);

// 			//calculate the movement direction
// 			const dx = nextPos.x - this.x;
// 			const dy = nextPos.y - this.y;
// 			const distance = Math.sqrt(dx * dx + dy * dy);

// 			//prevents visual jitter (when the boss moves too close to the paladin it might shake)
// 			if (distance > 0.5) {
// 				this.x += (dx / distance) * (this.getStatValue("speed") * this.game.clockTick);
// 				this.y += (dy / distance) * (this.getStatValue("speed") * this.game.clockTick);

// 				// Determine direction
// 				this.facing = dx < 0 ? -1 : 1;
// 			} else {
// 				//removes the reached path from the list
// 				this.path.shift();
// 			}
// 		}

// 		this.hitBox.updateHitBox();
// 	}
// 	draw(ctx) {
// 	// ctx.save();
// 	// 	if (this.facing == -1) {
// 	// 		ctx.scale(-1, 1);
// 	// 		ctx.translate(-(this.x - this.game.camera.x) * 2.12, 0);
// 	// 	}
// 	if (this.dead) {
// 		this.animationPlayer.getAnimation("death").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
// 	} else if (this.attacking && this.facing == 1) {
// 		this.animationPlayer.getAnimation("attackRight").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
// 	} else if (this.attacking && this.facing == -1) {
// 		this.animationPlayer.getAnimation("attackLeft").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
// 	} else if (this.moving && this.facing == 1) {
// 		this.animationPlayer.getAnimation("walkRight").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
// 	} else if (this.moving && this.facing == -1) {
// 		this.animationPlayer.getAnimation("walkLeft").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
// 	} else {
// 		this.animationPlayer.getAnimation("idle").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
// 	}
// 	ctx.restore();
// 	}
// }