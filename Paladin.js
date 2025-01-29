class Paladin extends Humanoid {
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence)  {
        super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset,health,strength,speed,intelligence);
        this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 200, 112, 125, 7, [0.15], 0, false, false, true));
        this.animationPlayer.addAnimation("walk", new Animation(this.spriteSheet, 0, 104, 118, 95.5, 8, [0.15], 6.7, false, true, true));
        this.animationPlayer.addAnimation("idle", new Animation(this.spriteSheet, 0, 0, 118, 102, 11, [0.25], 2, false, false, true));

        this.moving = false;
        this.attacking = false;
        this.idle = true;
        this.movementVector = 0;
    }


    update() {
        this.moving = false;
        if(this.game.keys.get("w")){
            let newX = 0;
            this.y -= 
            this.moving = true;
        }
        if(this.game.keys.get("a")){
            this.x -= this.equalizeDiagonalMovement();
            this.moving = true;
        }
        if(this.game.keys.get("s")){
            this.y += this.equalizeDiagonalMovement();
            this.moving = true;
        }
        if(this.game.keys.get("d")){
            this.x += this.equalizeDiagonalMovement();
            this.moving = true;
        }
        this.hitBox.updateHitBox();
    }
    equalizeDiagonalMovement() {
        let value = Math.sqrt(Math.pow(1,2)+Math.pow(1,2));
        return value;
    }

    draw(ctx) {
        if(this.game.mousePressed) {
            this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, this.x, this.y, 1.25);
        } else if(this.moving){
            this.animationPlayer.playAnimation("walk", this.game.clockTick, ctx, this.x, this.y, 1.25);
        } else {
            this.animationPlayer.playAnimation("idle", this.game.clockTick, ctx, this.x, this.y, 1.25);
        }
    }
}