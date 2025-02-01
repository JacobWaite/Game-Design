class Entity {
    constructor(game, x, y, spriteSheet, width,height, xSpriteOffset,ySpriteOffset) {
        Object.assign(this, {game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset});
        this.animationPlayer = new AnimationPlayer(this);
        this.hitBox = new BoundingBox(this,this.width, this.height, xSpriteOffset, ySpriteOffset,2);
    };

    update() {

    }; 

    draw(ctx) {
        ctx.drawImage(this.spriteSheet, this.x - this.game.camera.x, this.y - this.game.camera.y);
    };
   
    collision(collidingEntity) {};

}