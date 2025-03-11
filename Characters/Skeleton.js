class Skeleton extends Humanoid{
	constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
		super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
		
		this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 190, 165, 100, 6, [0.1], 25, false, false, true));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 1, 85, 165, 100, 8, [0.25], 29.5, false, false, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 165, 100, 4, [0.25], 25, false, false, true));
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, 0, 525, 165, 100, 7, [0.25], 1, false, false, true));
		
		this.originalPosition = { x, y }; // Store the intial position of entity
		this.target = null;
		this.path = [];
		this.moving = false;
		this.attacking = false;
		this.dead = false;
		this.aStarCalled = false;
		this.speed = 400;
		this.facing = 1;
		this.aggroRange = 2;
		this.deAggroRange = 2;
		this.attackRange = 2;

		this.hitBox = new BoundingBox(this, width, height, xSpriteOffset, ySpriteOffset, 1.25);
	}
	setTarget(target) {
		this.target = target;
		this.path = null;
	}
	die() {
        if (!this.dead) {
            this.dead = true;
            //Generates a random number from 3 to 6
            const xpGained = Math.floor(Math.random() * 4) + 3;
            const runesGained = Math.floor(Math.random() * 4) + 3;
            
            //Gives the XP and runes to the paladin
            const paladin = this.game.entities.find(e => e instanceof Paladin);
            if (paladin) {
                paladin.xp += xpGained;
                paladin.runes += runesGained;
            }
        }
    }
	update() {
		if(this.getStatValue("health") <= 0) {
			this.die();
		}
		if (this.dead) return;
		if (!this.target) this.target = this.game.entities.find(e => e instanceof Paladin);

		//calculate the paladin position and its center
		const paladin = this.target;
		const paladinCenter = {
			x: paladin.hitBox.left + paladin.hitBox.width / 2,
			y: paladin.hitBox.top + paladin.hitBox.height / 2,
		};

		//calculate the center of the ogre
		const ogreCenter = {
			x: this.hitBox.left + this.hitBox.width / 2,
			y: this.hitBox.top + this.hitBox.height / 2,
		};

		//distance from ogre to paladin
		const paladinDistance = getDistance(ogreCenter, paladinCenter);
		//distance vertically between ogre and paladin
		const verticalDistance = Math.abs(ogreCenter.y - paladinCenter.y);
		//convert the coordinates of the ogre knight and the paladin to grid coordinates
		const ogreGridPos = this.game.grid.worldToGrid(ogreCenter.x, ogreCenter.y);
		const paladinGridPos = this.game.grid.worldToGrid(paladinCenter.x, paladinCenter.y);
		//the max vertical distance before attacking
		const verticalThreshold = 30;

		//lose aggro once paladin is too far away
		if (paladinDistance > this.deaggroRange) {
			this.target = { x: this.originalPosition.x, y: this.originalPosition.y };
		//if the ogre is close enough and is within vertical threshold attack
		} else if (paladinDistance <= this.attackRange && verticalDistance <= verticalThreshold) {
			this.attacking = true;
			this.moving = false;
			return;
		} else {
			//move toward paladin once too far away
			this.attacking = false;
			this.moving = true;
		}

		//recalculate path if the path doesnt exist anymore (paladin moved)
		if (!this.path || this.path.length === 0 || getDistance(this.target, this.path[this.path.length - 1]) > 32) {
			this.path = aStar(ogreGridPos, paladinGridPos, this.game.grid);
		}

		//if path exists follow the path
		if (this.path && this.path.length > 0) {
			//gets the next coordinate in the path and convert it into world coordinates
			const nextNode = this.path[0];
			const nextPos = this.game.grid.gridToWorld(nextNode.x, nextNode.y);

			//calculate the movement direction
			const dx = nextPos.x - this.x;
			const dy = nextPos.y - this.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			//prevents visual jitter (when the ogre moves too close to the paladin it might shake)
			if (distance > 0.5) {
				this.x += (dx / distance) * this.getStatValue("speed") * this.game.clockTick;
				this.y += (dy / distance) * this.getStatValue("speed") * this.game.clockTick;

				// Determine direction
				this.facing = dx < 0 ? -1 : 1;
			} else {
				//removes the reached path from the list
				this.path.shift();
			}
		}

		this.hitBox.updateHitBox();
	}
	draw(ctx) {
	ctx.save();
		if (this.facing == -1) {
			ctx.scale(-1, 1);
			ctx.translate(-(this.x - this.game.camera.x) * 2.12, 0);
		}
		if (this.dead) {
			this.animationPlayer.getAnimation("death").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		} else if (this.attacking) {
			this.animationPlayer.getAnimation("attack").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		} else if (this.moving) {
			this.animationPlayer.getAnimation("walk").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		} else {
			this.animationPlayer.getAnimation("idle").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
		}
	ctx.restore();
	}
}
	
