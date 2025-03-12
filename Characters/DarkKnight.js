class DarkKnight extends Humanoid{
	constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
		super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
		this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet[0], 0, 0, 80, 80, 9, [0.15], 0, false, false, true));
		this.animationPlayer.addAnimation("walkRight", new Animation(this.spriteSheet[0], 0, 80, 80, 80, 6, [0.15], 0, false, false, true));
		this.animationPlayer.addAnimation("attackRight", new Animation(this.spriteSheet[0], 0, 160, 80, 80, 12, [0.125], 0, false, false, false));
		this.animationPlayer.addAnimation("walkLeft", new Animation(this.spriteSheet[1], 1360, 80, 80, 80, 6, [0.15], 0, false, true, true));
		this.animationPlayer.addAnimation("attackLeft", new Animation(this.spriteSheet[1], 880, 160, 80, 80, 12, [0.125], 0, false, true, false));
		this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet[0], 0, 320, 80, 80, 23, [0.1], 0, false, false, false));
		this.animationPlayer.addAnimation("injury", new Animation(this.spriteSheet[0], 0, 240, 80, 80, 5, [0.15], 0, false, false, false));

        this.originalPosition = {x: this.hitBox.left, y: this.hitBox.top}; // Store the intial position of entity
		this.target = null;
		this.path = [];
		this.moving = false;
		this.attacking = false;
		this.dead = false;
		this.aStarCalled = false;
		this.facing = 1;
		this.aggroRange = 300;
		this.attackRange = 64;
		this.removeFromWorld = false;
        this.attacking = false;
        this.attackComplete = false;
//    constructor(parent, width, height, xOffset,yOffset,scale){

		this.combatBoxRight = new BoundingBox(this, 38, 62, 62, 15, this.scale);
        this.combatBoxLeft = new BoundingBox(this, 40, 62, 0, 10, this.scale);
	}
	setTarget(target) {
		this.target = target;
		this.path = null;
	}
	die() {
        if (!this.dead) {
            this.dead = true;
            //Generates a random number from 10 to 20
            const xpGained = Math.floor(Math.random() * 11) + 10;
            const runesGained = Math.floor(Math.random() * 11) + 10;
            
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
		const paladin = this.game.entities.find(e => e instanceof Paladin);
        this.target = {x: Math.floor(paladin.hitBox.left + paladin.width / 2), y: Math.floor(paladin.hitBox.top + paladin.height / 2)};

        this.attacking = false;
		//this.aggroRange -= this.aggroRange * paladin.getStatValue("stealth");

        if(!this.attacking) {
            this.attackComplete = false;
        }
        if(this.animationPlayer.currentlyPlaying && (this.animationPlayer.currentAnimationName == "attackLeft" || this.animationPlayer.currentAnimationName == "attackRight")) {
            this.attacking = true;
            if(this.animationPlayer.currentAnimation.currentFrame() == 11) {
                this.attackComplete = true;
            } 
        }
		const paladinCenter = {
			x: paladin.hitBox.left + paladin.hitBox.width / 2,
			y: paladin.hitBox.top + paladin.hitBox.height / 2,
		};

		//calculate the center of the dark knight
		const darkKnightCenter = {
			x: this.hitBox.left + this.hitBox.width / 2,
			y: this.hitBox.top + this.hitBox.height / 2,
		};

		//distance from dark knight to paladin
		const paladinDistance = getDistance(darkKnightCenter, paladinCenter);
		//distance vertically between dark knight and paladin
		const verticalDistance = Math.abs(darkKnightCenter.y - paladinCenter.y);

		if (paladinDistance > this.aggroRange) {
            this.target = this.originalPosition;
        }
		//convert the coordinates of the dark knight and the paladin to grid coordinates
		const darkKnightGridPos = this.game.grid.worldToGrid(darkKnightCenter.x, darkKnightCenter.y);
		const targetGridPos = this.game.grid.worldToGrid(this.target.x, this.target.y);
		//the max vertical distance before attacking
		const verticalThreshold = 30;

		//if the dark knight is close enough and is within vertical threshold attack
		if (paladinDistance <= this.attackRange && verticalDistance <= verticalThreshold) {
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
			this.path = aStar(darkKnightGridPos, targetGridPos, this.game.grid);
		}

		//if path exists follow the path
		if (this.path && this.path.length - 1 > 0) {
			//gets the next coordinate in the path and convert it into world coordinates
			const nextNode = this.path[0];
			const nextPos = this.game.grid.gridToWorld(nextNode.x, nextNode.y);

			//calculate the movement direction
			const dx = nextPos.x - this.hitBox.left;
            const dy = nextPos.y - this.hitBox.top;
			const distance = Math.sqrt(dx * dx + dy * dy);

			//prevents visual jitter (when the dark knight moves too close to the paladin it might shake)
			if (distance > 0.5) {
				this.x += (dx / distance) * (this.getStatValue("speed") * this.game.clockTick);
				this.y += (dy / distance) * (this.getStatValue("speed") * this.game.clockTick);

				// Determine direction
				this.facing = dx < 0 ? -1 : 1;
			} else {
				//removes the reached path from the list
				this.path.shift();
			}
		} else {
			this.moving = false;
		}

		this.combatBoxLeft.updateHitBox();
        this.combatBoxRight.updateHitBox();
        this.hitBox.updateHitBox();
        for(let i = 0; i < this.game.entities.length; i++) {
            let otherHitbox = this.game.entities[i].hitBox;
            this.colliding = this.hitBox.collide(otherHitbox);
            this.collisionDirection = this.hitBox.collisionDirection(otherHitbox);
            if(this.colliding && !(otherHitbox.parent instanceof Paladin)) {
                if(this.collisionDirection == "right") {
                    this.x = otherHitbox.left - (this.hitBox.width + this.hitBox.xOffset); 
                } else if(this.collisionDirection == "left") {
                    this.x = otherHitbox.right - this.hitBox.xOffset;
                } else if(this.collisionDirection == "top") {
                    this.y = otherHitbox.bottom - this.hitBox.yOffset;
                } else if(this.collisionDirection == "bottom") {
                    this.y = otherHitbox.top - (this.hitBox.height + this.hitBox.yOffset);
                }
            } 
        }
	}
	drawHealthBar(ctx, x, y, width, height) {
        ctx.fillStyle = "#444444";
        ctx.fillRect(x, y, width, height);
        const healthPercent = this.getStatValue("health") / 250;
        const healthColor = this.getHealthColor(healthPercent);
        ctx.fillStyle = healthColor;
        ctx.fillRect(x, y, width * healthPercent, height);
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(`${this.getStatValue("health")}`, x + width / 2 - 30, y + 8);
    }
    getHealthColor(percent) {
        if (percent > 0.6) return "#00ff00";
        if (percent > 0.3) return "#ffff00";
        return "#ff0000";
    }
	draw(ctx) {
	this.drawHealthBar(ctx, this.x - this.game.camera.x - 50, this.y + 10 - this.game.camera.y, 250, 10);

	if (this.dead) {
		this.animationPlayer.getAnimation("death").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
		if(this.animationPlayer.currentAnimation.currentFrame() == 22) {
            this.removeFromWorld = true;
		}
	} else if (this.attacking && this.facing == 1) {
		this.animationPlayer.getAnimation("attackRight").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
		ASSET_MANAGER.playSound("./Sprites/Music/darkKnightAttack.mp3");

	} else if (this.attacking && this.facing == -1) {
		this.animationPlayer.getAnimation("attackLeft").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
		ASSET_MANAGER.playSound("./Sprites/Music/darkKnightAttack.mp3");

	}else if (this.moving && this.facing == 1) {
		this.animationPlayer.getAnimation("walkRight").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
	} else if (this.moving && this.facing == -1) {
		this.animationPlayer.getAnimation("walkLeft").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
	}else {
		this.animationPlayer.getAnimation("idle").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
	}
	if (this.game.debug) {
        ctx.strokeStyle = "blue"; //used for drawing the sprite frame
        if(this.facing == 1) this.combatBoxRight.drawHitBox(ctx);
        if(this.facing == -1) this.combatBoxLeft.drawHitBox(ctx);
         this.hitBox.drawHitBox(ctx);
         ctx.fillStyle = "white";
         ctx.font = "12px Arial";
         let debugY = this.y - this.game.camera.y - 10;
         let lineHeight = 15;
        
         // Debug info about update
         ctx.fillText(`Update Called: Yes`, this.x - this.game.camera.x, debugY - (lineHeight * 6));
         ctx.fillText(`Animation Frame: ${this.animationPlayer.currentAnimation.currentFrame()}`, this.x - this.game.camera.x, debugY - (lineHeight * 10));
         ctx.fillText(`Attack Complete: ${this.attackComplete}`, this.x - this.game.camera.x, debugY - (lineHeight * 8));
         ctx.fillText(`Goblin Target Exists: ${this.target ? 'Yes' : 'No'}`, this.x - this.game.camera.x, debugY - (lineHeight * 4));
         ctx.fillText(`Goblin Path Length: ${this.path ? this.path.length : 0}`, this.x - this.game.camera.x, debugY - (lineHeight * 3));
        
         // Add new debug info
         ctx.fillText(`Dead: ${this.dead}`, this.x - this.game.camera.x, debugY - (lineHeight * 2));
        
         // If we have a target, show its position
         if (this.target) {
             const start = this.game.grid.worldToGrid(this.x, this.y);
             const goal = this.game.grid.worldToGrid(this.target.x, this.target.y);
             ctx.fillText(`Start Grid Pos: (${start.x}, ${start.y})`, this.x - this.game.camera.x, debugY - lineHeight);
             ctx.fillText(`Goal Grid Pos: (${goal.x}, ${goal.y})`, this.x - this.game.camera.x, debugY);
         }

         // If we have a path, visualize it
         if (this.path && this.path.length > 0) {
             ctx.strokeStyle = 'yellow';
             ctx.beginPath();
             const startPos = this.game.grid.gridToWorld(this.path[0].x, this.path[0].y);
             ctx.moveTo(startPos.x - this.game.camera.x, startPos.y - this.game.camera.y);
            
             for (let i = 1; i < this.path.length; i++) {
                 const pos = this.game.grid.gridToWorld(this.path[i].x, this.path[i].y);
                 ctx.lineTo(pos.x - this.game.camera.x, pos.y - this.game.camera.y);
             }
             ctx.stroke();
         }
     }
	}
}