/**
 * A class to represent a paladin playable character.
 * @implements {Humanoid}
 */
class Paladin extends Humanoid {
    /**
     * Instantiates a Paladin Object. 
     * @inheritdoc
     */        

    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence)  {
        super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale,health,strength,speed,intelligence); 
        this.animationPlayer.addAnimation("runright", new Animation(this.spriteSheet[0], 0, 0, 128, 64, 8, [0.1], 0, false, false, true));
        this.animationPlayer.addAnimation("runleft", new Animation(this.spriteSheet[2], 0, 0, 128, 64, 8, [0.1], 0, false, true, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet[1], 0, 0, 128, 64, 8, [0.15], 0, false, false, true));
        this.animationPlayer.addAnimation("attackright", new Animation(this.spriteSheet[3], 0, 0, 128, 64, 10, [0.1,0.1,0.1,0.075,0.1,0.1,0.075,0.075, 0.05, 0.075], 0, true, false, false)); //[0.1,0.1,0.1,0.1,0.05,0.05,0.05,0.1]
        this.animationPlayer.addAnimation("attackleft", new Animation(this.spriteSheet[3], 512, 128, 128, 64, 10, [0.1,0.1,0.1,0.075,0.1,0.1,0.075,0.075, 0.05, 0.075], 0, true, false, false)); //[0.1,0.1,0.1,0.1,0.05,0.05,0.05,0.1]
        this.animationPlayer.addAnimation("Kneel", new Animation(this.spriteSheet[4], 0, 0, 128, 64, 6, [0.15], 0, false, false, false)); //[0.1,0.1,0.1,0.1,0.05,0.05,0.05,0.1]
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet[5], 0, 0, 128, 64, 4, [0.175], 0, false, false, false));
        this.experienceLevel = 0;
        this.availableStatPoints = 10;
        this.xp = 0;
        this.runes = 0;
        this.dead = false;
        this.died = false;
        this.moving = false;
        this.attacking = false;
        this.removeFromWorld = false;
        this.attackComplete = false;
        this.idle = true;
        this.atCheckpoint = false;
        this.combatTimer = 0;
        this.colliding = false;
        this.facing = 1; // 1 = right, -1 = left
        this.collisionDirection = "false";
        this.elapsedTime = 0;
        this.totalHealth = 100; 
        this.combatBoxRight = new BoundingBox(this, 40, 45, 68, 20, this.scale);
        this.combatBoxLeft = new BoundingBox(this, 40, 45, 30, 20, this.scale);

    }
    experienceNeeded() {
        return this.experienceLevel * 8 + 32;
    }

    getRunes(){
        return this.runes;
    }
    getHealth() {
        return this.totalHealth;
    }
    /**
     * @inheritdoc
     */
    update() {
        if(this.getStatValue("health") <= 0) {
            this.dead = true;
            this.game.gameOver = true;
            return;
        }
            this.moving = false;
            this.attacking = false;
        
            this.atCheckpoint = false;
            if(this.combatTimer > 0) this.combatTimer -= this.game.clockTick;
            if(this.getStatValue("regen") > 0 && this.totalHealth > this.getStatValue("health")) this.incrementStatValue("health", this.getStatValue("regen") * this.game.clockTick);
            if(this.xp >= this.experienceNeeded()) {
                this.xp -= this.experienceNeeded();
                this.experienceLevel ++;
                this.availableStatPoints += 1;
            }
            if(!this.attacking) {
                this.attackComplete = false;
            }
            if(this.animationPlayer.currentlyPlaying && (this.animationPlayer.currentAnimationName == "attackleft" || this.animationPlayer.currentAnimationName == "attackright")) {
                this.attacking = true;
                if(this.animationPlayer.currentAnimation.isDone()) {
                    this.attackComplete = true;
                } 
            }
            if(this.game.keys.get("w") && !this.attacking){
                this.y -= this.game.clockTick * this.getStatValue("speed"); 
                this.moving = true;
            }
            if(this.game.keys.get("a") && !this.attacking){
                this.x -= this.game.clockTick * this.getStatValue("speed"); 
                this.moving = true;
                this.facing = -1;
            }
            if(this.game.keys.get("s") && !this.attacking){
                this.y +=this.game.clockTick * this.getStatValue("speed"); 
                this.moving = true;
            }   
            if(this.game.keys.get("d") && !this.attacking){
                this.x += this.game.clockTick * this.getStatValue("speed");
                this.moving = true;
                this.facing = 1;
            }
            if(this.game.mousePressed) {
                this.moving = false;
                this.attacking = true;
                ASSET_MANAGER.playSound("./Sprites/Music/attack.mp3");
            }
            this.hitBox.updateHitBox();
            this.combatBoxLeft.updateHitBox();
            this.combatBoxRight.updateHitBox();
            for(let i = 0; i < this.game.entities.length; i++) {
                let otherHitbox = this.game.entities[i].hitBox;
                this.colliding = this.hitBox.collide(otherHitbox);
                this.collisionDirection = this.hitBox.collisionDirection(otherHitbox);
                if(this.colliding && !(otherHitbox.parent instanceof Humanoid || otherHitbox.parent instanceof checkpoint)) {
                    if(this.collisionDirection == "right") {
                        this.x = otherHitbox.left - (this.hitBox.width + this.hitBox.xOffset); 
                    } else if(this.collisionDirection == "left") {
                        this.x = otherHitbox.right - this.hitBox.xOffset;
                    } else if(this.collisionDirection == "top") {
                        this.y = otherHitbox.bottom - this.hitBox.yOffset;
                    } else if(this.collisionDirection == "bottom") {
                        this.y = otherHitbox.top - (this.hitBox.height + this.hitBox.yOffset);
                    }
                } else if(((this.combatBoxRight.collide(otherHitbox) && this.facing == 1) ||  
                (this.combatBoxLeft.collide(otherHitbox) && this.facing == -1)) && 
                (otherHitbox.parent instanceof Goblin || otherHitbox.parent instanceof Skeleton ||otherHitbox.parent instanceof DarkKnight)) {
                    
                    if(this.attackComplete) {
                        otherHitbox.parent.incrementStatValue("health", -1 * (this.getStatValue("strength")));
                    }
                } 
                if(otherHitbox.parent instanceof Goblin || otherHitbox.parent instanceof Skeleton ||otherHitbox.parent instanceof DarkKnight) {
                    let collideLeft = otherHitbox.parent.combatBoxLeft.collide(this.hitBox);
                    let collideRight = otherHitbox.parent.combatBoxRight.collide(this.hitBox);
                    if((collideLeft && otherHitbox.parent.facing == -1) || (collideRight && otherHitbox.parent.facing == 1)) {
                        if(otherHitbox.parent.attackComplete) {
                            if(this.getStatValue("health") >= 0) this.incrementStatValue("health", -1 * otherHitbox.parent.getStatValue("strength"));
                            this.combatTimer = 15;
                        }
                    }
                    
                } 
                if(this.colliding && otherHitbox.parent instanceof checkpoint) {
                    this.atCheckpoint = true;
                    if(this.getStatValue("health") < this.totalHealth) {
                        if(this.combatTimer <= 0) {
                            this.combatTimer = 0;
                            this.incrementStatValue("health", 5 * this.game.clockTick);
                        } 

                    }
                }
            }
           
    } 
    
    
    /**
     * @inheritdoc 
     */
    draw(ctx) {
        if(this.game.debug) {
            ctx.strokeStyle = "blue"; 
            if(this.facing == 1) this.combatBoxRight.drawHitBox(ctx);
            if(this.facing == -1)this.combatBoxLeft.drawHitBox(ctx);
        }
        /*if(this.dead && !this.died) {
            this.animationPlayer.getAnimation("death").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, 2);
        } else */ 
         if (this.atCheckpoint && !this.moving){
            this.animationPlayer.getAnimation("Kneel").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 4);
            if(this.animationPlayer.currentAnimation.currentFrame() == 4) this.animationPlayer.currentAnimation.pause();
        } else if(this.attacking && this.facing == 1) {
            this.animationPlayer.getAnimation("attackright").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 8);
            console.log(this.animationPlayer.currentAnimation.currentFrame());

        } else if(this.attacking && this.facing == -1) {
            this.animationPlayer.getAnimation("attackleft").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 4);
        }else if(this.moving && this.facing == 1) {
            this.animationPlayer.getAnimation("runright").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 2);

        } else if (this.moving && this.facing == -1){
            this.animationPlayer.getAnimation("runleft").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 2);
        } else {
            this.animationPlayer.getAnimation("idle").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 2);
        }
    }

}