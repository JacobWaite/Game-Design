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
        this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 209, 112, 102, 7, [0.05,0.05,0.05,0.07,0.1,0.1,0.25], 0, true, false, false));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 0, 97.5, 118, 102, 8, [0.15], 6.7, false, false, true));
        this.animationPlayer.addAnimation("flash", new Animation(this.spriteSheet, 0, 97.5, 118, 102, 8, [0.05], 6.7, false, false, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 118, 102, 11, [0.25], 2, false, false, true));
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, -1, 315, 114, 102, 8, [0.25], 2, false, false, true));
        this.experienceLevel = 0;
        this.flash = false;
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
            
            if(this.animationPlayer.currentlyPlaying && this.animationPlayer.currentAnimation == "attack") {
                this.attacking = true;
            }
            
            if(this.game.keys.get("w")){
                this.y -= this.game.clockTick * this.getStatValue("speed") * speedMultiplier; 
                this.moving = true;
            }
            if(this.game.keys.get("a")){
                this.x -= this.game.clockTick * this.getStatValue("speed") * speedMultiplier; 
                this.moving = true;
                this.facing = -1;
            }
            if(this.game.keys.get("s")){
                this.y +=this.game.clockTick * this.getStatValue("speed") * speedMultiplier; 
                this.moving = true;
            }   
            if(this.game.keys.get("d")){
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
                    console.log(`OtherHitBox: ${otherHitbox} X: ${this.x} Y: ${this.y} hitboxwidth: ${this.hitBox.width} height: ${this.hitBox.height}`);
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
        ctx.save();
        if (this.facing == -1) {
            ctx.scale(-1, 1);
            ctx.translate(-(this.x - this.game.camera.x) * 2.12, 0);
        }
        //ctx.strokeStyle = "blue"; //used for drawing the sprite frame
        //ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, 112 *1.25, 102 * 1.25);
        if(this.dead) {
            this.animationPlayer.playAnimation("death", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25); // this.x - this.camera.x 
        } else if(this.attacking) {
            this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
        } else if(this.moving && !this.flash) {
            this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, 1.25);

        } else if(this.moving && this.flash){
            this.animationPlayer.playAnimation("flash", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, 1.25);
        } else {
            this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, 1.25);
        }
        ctx.restore();
    }
}