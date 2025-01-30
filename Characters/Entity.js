class Entity {
    constructor(game, x, y, spriteSheet, width,height, xSpriteOffset,ySpriteOffset) {
        Object.assign(this, {game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset});
        this.animationPlayer = new AnimationPlayer(this);
        this.hitBox = new BoundingBox(this,this.width, this.height, xSpriteOffset, ySpriteOffset,2);
    };

    update() {}; 

    draw() {};
   
    collision(collidingEntity) {};


}