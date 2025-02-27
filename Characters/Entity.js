/**
 * Creates a new game entity, a game entity is defined as any object that can collide with the player and affect player behavior.
 */
class Entity {
    /**
     * Instantiates an Entity Object.
    * @param {gameengine} game the instance of the gameengine object to be use.
    * @param {number} x the entity x position.
    * @param {number} y the entity y position.
    * @param {HTMLImageElement} spriteSheet the image to be used to represent the entity and all of its animations.
    * @param {number} width the width of the entity itself in pixels, not the entity image, to be used to draw the entity hitbox.
    * @param {number} height the height of the entity to be used to draw the entity hitbox.
    * @param {number} SpriteOffset the distance in pixels between the start of the entity picture and the left edge of the image. 
    * @param {number} ySpriteOffset the distance in pixels between the start of the entity picture and the top edge of the image.
    * @param {number} scale the value to scale the image by when drawing the entity to the screen.
     */
    constructor(game, x, y, spriteSheet, width,height, xSpriteOffset,ySpriteOffset, scale) {
        Object.assign(this, {game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale});
        this.animationPlayer = new AnimationPlayer(this);
        this.hitBox = new BoundingBox(this,this.width, this.height, xSpriteOffset, ySpriteOffset,scale);
    };
    /**
     * Called every gameloop to update entity position and other information as needed.
     */
    update() {
        this.hitBox.updateHitBox();
    }; 
    /**
     * Called every gameloop to draw the current state of the entity.
     * @param {CanvasRenderingContext2D} ctx the context to draw to.
     */
    draw(ctx) {

        ctx.drawImage(this.spriteSheet, 0, 0, 64, 64, this.x - this.game.camera.x, this.y - this.game.camera.y, 64, 64);
    };
   
    collision(collidingEntity) {};

    toString() {
        return "Entity " + this.x + " " + this.y;
    }

}