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
        this.animationPlayer.addAnimation("attackright", new Animation(this.spriteSheet[3], 0, 0, 128, 64, 10, [0.09], 0, false, false, false)); //[0.1,0.1,0.1,0.1,0.05,0.05,0.05,0.1]
        this.animationPlayer.addAnimation("attackleft", new Animation(this.spriteSheet[3], 512, 128, 128, 64, 10, [0.1], 0, false, false, false)); //[0.1,0.1,0.1,0.1,0.05,0.05,0.05,0.1]
        this.experienceLevel = 0;
        this.availableStatPoints = 5;
        this.flash = false;
        this.xp = 0;
        this.runes = 0;
        this.dead = false;
        this.moving = false;
        this.attacking = false;
        this.idle = true;
        this.colliding = false;
        this.facing = 1; // 1 = right, -1 = left
        this.collisionDirection = "false";
        this.elapsedTime = 0;
    }
    /**
     * @inheritdoc
     */
    update() {
        if(this.game.keys.get("g")){
            this.flash = !this.flash;
        }
        if(this.game.keys.get("k")){
            this.dead = !this.dead;
            this.moving = false;
            this.attacking = false;
            this.idle = !this.dead;
        }
        let speedMultiplier = this.flash ? 3 : 1; 
        if(!this.dead) {
            this.moving = false;
            this.attacking = false;
            
            if(this.animationPlayer.currentlyPlaying && (this.animationPlayer.currentAnimation == "attackleft" || this.animationPlayer.currentAnimation == "attackright")) {
                this.attacking = true;
            }
            
            if(this.game.keys.get("w") && !this.attacking){
                this.y -= this.game.clockTick * this.getStatValue("speed") * speedMultiplier; 
                this.moving = true;
            }
            if(this.game.keys.get("a") && !this.attacking){
                this.x -= this.game.clockTick * this.getStatValue("speed") * speedMultiplier; 
                this.moving = true;
                this.facing = -1;
            }
            if(this.game.keys.get("s") && !this.attacking){
                this.y +=this.game.clockTick * this.getStatValue("speed") * speedMultiplier; 
                this.moving = true;
            }   
            if(this.game.keys.get("d") && !this.attacking){
                this.x += this.game.clockTick * this.getStatValue("speed") * speedMultiplier;
                this.moving = true;
                this.facing = 1;
            }
            if(this.game.keys.get("j")){
                this.attacking = !this.attacking;
                this.idle = !this.attacking;
                
            }
            if(this.game.mousePressed) {
               this.moving = false;
                this.attacking = true;
            }
            this.hitBox.updateHitBox();
            for(let i = 0; i < this.game.entities.length; i++) {
                let otherHitbox = this.game.entities[i].hitBox;
                this.colliding = this.hitBox.collide(otherHitbox);
                this.collisionDirection = this.hitBox.collisionDirection(otherHitbox);
                if(this.colliding && !(otherHitbox.parent instanceof Humanoid)) {
                    if(this.collisionDirection == "right") {
                        this.x = otherHitbox.left - (this.hitBox.width + this.hitBox.xOffset); 
                    } else if(this.collisionDirection == "left") {
                        this.x = otherHitbox.right - this.hitBox.xOffset;
                    } else if(this.collisionDirection == "top") {
                        this.y = otherHitbox.bottom - this.hitBox.yOffset;
                    } else if(this.collisionDirection == "bottom") {
                        this.y = otherHitbox.top - (this.hitBox.height + this.hitBox.yOffset);
                    }
                } else if(this.hitBox.collide(otherHitbox) && (otherHitbox.parent instanceof Goblin)) {
                    if(otherHitbox.parent.attacking) {
                        //need to change so that damage is only applied upon attack completion
                        this.incrementStatValue("health", -1 * (otherHitbox.parent.getStatValue("strength") * this.game.clockTick));

                    }
                    if(this.attacking) {
                        otherHitbox.parent.incrementStatValue("health", -1 * (this.getStatValue("strength") * this.game.clockTick));
                    }
                } 
            }
           
        } 
    };
    /*
    equalizeDiagonalMovement() {
        let value = Math.sqrt(Math.pow(1,2)+Math.pow(1,2));  // 
        return value;
    }*/
    /**
     * @inheritdoc 
     */
    draw(ctx) {
       
        //ctx.strokeStyle = "blue"; //used for drawing the sprite frame
        //ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, 112 *1.25, 102 * 1.25);
        if(this.attacking && this.facing == 1) {
            this.animationPlayer.getAnimation("attackright").drawMatrixFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, 8);

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