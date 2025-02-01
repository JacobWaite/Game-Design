class Paladin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence)  {
        super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset,health,strength,speed,intelligence);
        this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 209, 112, 102, 7, [0.05,0.05,0.05,0.07,0.1,0.1,0.25], 0, true, false, true));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 0, 97.5, 118, 102, 8, [0.15], 6.7, false, false, true));
        this.animationPlayer.addAnimation("flash", new Animation(this.spriteSheet, 0, 97.5, 118, 102, 8, [0.05], 6.7, false, false, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 118, 102, 11, [0.25], 2, false, false, true));
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, -1, 315, 114, 102, 8, [0.25], 2, false, false, true));

        this.flash = false;
        this.dead = false;
        this.moving = false;
        this.attacking = false;
        this.idle = true;
        this.facing = 1; // 1 = right, -1 = left
    }

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
        this.elapsedTime += this.game.clockTick;
        let speedMultiplier = this.flash ? 3 : 1; 
        if(!this.dead) {
            this.moving = false;
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
        }
        this.hitBox.updateHitBox();
    }
    equalizeDiagonalMovement() {
        let value = Math.sqrt(Math.pow(1,2)+Math.pow(1,2));  // 
        return value;
    }

    draw(ctx) {
        ctx.save();
        if (this.facing == -1) {
            ctx.scale(-1, 1);
            ctx.translate(-(this.x - this.game.camera.x) * 2.12, 0);
        }
        if(this.dead) {
            this.animationPlayer.playAnimation("death", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25); // this.x - this.camera.x 
        } else if(this.game.mousePressed || this.attacking) {
            this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
        } else if(this.moving && !this.flash){
            this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, 1.25);
        } else if(this.moving && this.flash){
            this.animationPlayer.playAnimation("flash", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, 1.25);
        } else {
            this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, 1.25);
        }
        
        ctx.restore();
    }
}