class Goblin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
        super(game,x,y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed,intelligence);
        
        this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, -12, 250, 105, 84, 6, [0.1], 0, false, false, true));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 0, 78, 104, 78, 8, [0.15], 6, false, false, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 118, 0, 104, 80, 7, [0.5], 1, false, false, true));
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, 0, 442, 104, 80, 7, [0.25], 1, false, false, true));

        //Make a state where the goblin finishes attacking so that the paladin takes damage after the goblin finishes attacking and not every game clock tick.
        //Add xp and rune drops
        //Add a attack bounding box for the attack animations

        this.originalPosition = { x, y }; // Store the intial position of entity
        this.target = null;
        this.path = [];
        this.moving = false;
        this.attacking = false;
        this.dead = false;
        this.aStarCalled = false;
        this.speed = 300;
        this.facing = 1;
        this.aggroRange = 10;
        this.deAggroRange = 10;
        this.attackRange = 80;
        // this.attackCooldown = 0;
        // this.attackFinished = false;

        this.hitBox = new BoundingBox(this, width, height, xSpriteOffset, ySpriteOffset, 1.25);
    }
    setTarget(target) {
        this.target = target;
        this.path = null;
    }
    // attack(paladin) {
    //     if (!this.attacking) {
    //         this.attacking = true;
    //         this.attackFinished = false;
    //         this.animationPlayer.playAnimation("attack");
    //     }
    // }
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

        //calculate the center of the goblin
        const goblinCenter = {
            x: this.hitBox.left + this.hitBox.width / 2,
            y: this.hitBox.top + this.hitBox.height / 2,
        };

        //distance from goblin to paladin
        const paladinDistance = getDistance(goblinCenter, paladinCenter);
        //distance vertically between goblin and paladin
        const verticalDistance = Math.abs(goblinCenter.y - paladinCenter.y);
        //convert the coordinates of the goblin and the paladin to grid coordinates
        const goblinGridPos = this.game.grid.worldToGrid(goblinCenter.x, goblinCenter.y);
        const paladinGridPos = this.game.grid.worldToGrid(paladinCenter.x, paladinCenter.y);
        //the max vertical distance before attacking
        const verticalThreshold = 30;

        //lose aggro once paladin is too far away
        if (paladinDistance > this.deaggroRange) {
            this.target = { x: this.originalPosition.x, y: this.originalPosition.y };
        //if the goblin is close enough and is within vertical threshold attack
        } else if (paladinDistance <= this.attackRange && verticalDistance <= verticalThreshold) {
            this.attacking = true;
            this.moving = false;
            //Attack cooldown logic
            // if (this.attackCooldown <= 0) {
            //     this.attack(paladin);
            //     this.attackCooldown = 1.5;
            // }
            return;
        } else {
            //move toward paladin once too far away
            this.attacking = false;
            this.moving = true;
        }

        //recalculate path if the path doesnt exist anymore (paladin moved)
        if (!this.path || this.path.length === 0 || getDistance(this.target, this.path[this.path.length - 1]) > 32) {
            this.path = aStar(goblinGridPos, paladinGridPos, this.game.grid);
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

            //prevents visual jitter (when the goblin moves too close to the paladin it might shake)
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
        
        // if (this.attackCooldown > 0) {
        //     this.attackCooldown -= this.game.clockTick;
        // }

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
        // const attackAnim = this.animationPlayer.animations["attack"];
        this.animationPlayer.getAnimation("attack").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);

        //Attack lands at the end of the animation
        // if (attackAnim.currentFrame === attackAnim.totalFrames - 1 && !this.attackFinished) {
        //     const paladin = this.game.entities.find(e => e instanceof Paladin);
        //     if (paladin) {
        //         paladin.takeDamage(this.getStatValue("strength")); // Apply damage
        //     }
        //     this.attackFinished = true;
        // }

        // if (attackAnim.isDone()) {
        //     this.attacking = false;
        //     this.attackFinished = false;
        //     this.attackCooldown = 1.5; // Resets the cooldown
        // }
    } else if (this.moving) {
        this.animationPlayer.getAnimation("walk").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
    } else {
        this.animationPlayer.getAnimation("idle").drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
    }
    ctx.restore();

//     if (this.game.debug) {
//         this.hitBox.drawHitBox(ctx);
//         ctx.fillStyle = "white";
//         ctx.font = "12px Arial";
//         let debugY = this.y - this.game.camera.y - 10;
//         let lineHeight = 15;
        
//         // Debug info about update
//         ctx.fillText(`Update Called: Yes`, this.x - this.game.camera.x, debugY - (lineHeight * 6));
//         ctx.fillText(`Goblin Target Exists: ${this.target ? 'Yes' : 'No'}`, this.x - this.game.camera.x, debugY - (lineHeight * 4));
//         ctx.fillText(`Goblin Path Length: ${this.path ? this.path.length : 0}`, this.x - this.game.camera.x, debugY - (lineHeight * 3));
        
//         // Add new debug info
//         ctx.fillText(`Dead: ${this.dead}`, this.x - this.game.camera.x, debugY - (lineHeight * 2));
        
//         // If we have a target, show its position
//         if (this.target) {
//             const start = this.game.grid.worldToGrid(this.x, this.y);
//             const goal = this.game.grid.worldToGrid(this.target.x, this.target.y);
//             ctx.fillText(`Start Grid Pos: (${start.x}, ${start.y})`, this.x - this.game.camera.x, debugY - lineHeight);
//             ctx.fillText(`Goal Grid Pos: (${goal.x}, ${goal.y})`, this.x - this.game.camera.x, debugY);
//         }

//         // If we have a path, visualize it
//         if (this.path && this.path.length > 0) {
//             ctx.strokeStyle = 'yellow';
//             ctx.beginPath();
//             const startPos = this.game.grid.gridToWorld(this.path[0].x, this.path[0].y);
//             ctx.moveTo(startPos.x - this.game.camera.x, startPos.y - this.game.camera.y);
            
//             for (let i = 1; i < this.path.length; i++) {
//                 const pos = this.game.grid.gridToWorld(this.path[i].x, this.path[i].y);
//                 ctx.lineTo(pos.x - this.game.camera.x, pos.y - this.game.camera.y);
//             }
//             ctx.stroke();
//         }
//     }
    }
}