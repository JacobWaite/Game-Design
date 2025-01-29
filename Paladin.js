class Paladin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence)  {
        super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset,health,strength,speed,intelligence);
        this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 209, 112, 102, 7, [0.15], 0, false, false, true));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 0, 97.5, 118, 102, 8, [0.15], 6.7, false, false, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 118, 102, 11, [0.25], 2, false, false, true));
        this.animationPlayer.addAnimation("death", new Animation(this.spriteSheet, -1, 315, 114, 102, 8, [0.25], 2, false, false, true));

        this.dead = false;
        this.moving = false;
        this.attacking = false;
        this.idle = true;
        this.movementVector = 0;
        this.facing = 1; // 1 = right, -1 = left
    }


    update() {
        if(this.game.keys.get("k")){
            this.dead = !this.dead;
            this.moving = false;
            this.attacking = false;
            this.idle = !this.dead;
        }

        if(!this.dead) {
            this.moving = false;
            if(this.game.keys.get("w")){
                let newX = 0;
                this.y -= 
                this.moving = true;
            }
            if(this.game.keys.get("a")){
                this.x -= this.equalizeDiagonalMovement();
                this.moving = true;
                this.facing = -1;
            }
            if(this.game.keys.get("s")){
                this.y += this.equalizeDiagonalMovement();
                this.moving = true;
            }   
            if(this.game.keys.get("d")){
                this.x += this.equalizeDiagonalMovement();
                this.moving = true;
                this.facing = 1;
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
            ctx.translate(-this.x * 2 - this.width * 1.25, 0);
        }
        if(this.dead) {
            this.animationPlayer.playAnimation("death", this.game.clockTick, ctx, this.x, this.y, 1.25); // this.x - this.camera.x 
        } else if(this.game.mousePressed) {
            this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x, this.y, 1.25);
        } else if(this.moving){
            this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x, this.y, 1.25);
        } else {
            this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x, this.y, 1.25);
        }
        ctx.restore();
    }
}
