class background {
    /** 
     *Instantiates a Background Object. 
     *@param {gameengine} game the gameengine object the background should be drawn to.
     *@param {number} x the x location of the background image.
     *@param {number} y the y location of the background image.
     *@param {HTMLImageElement} sprite the image to draw.
     */
        constructor(game, x, y, sprite) {
            Object.assign(this, { game, x, y, sprite});
    
            // spritemap.get(spriteID);
            // this.sprite = this.spritemap.getTexture(sprite);
        };
    
        update() {
    
        }
    
        draw(ctx) {
            if (this.sprite) {
                ctx.drawImage(this.sprite, this.x - this.game.camera.x, this.y - this.game.camera.y);
            }
        }
    }
    
    class tree extends Entity {
        constructor(game, x, y, spriteSheet, width, height, xSpriteOffset,ySpriteOffset, scale) {
            super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale);
    
        }
    
        update() {
            // If needed, handle collisions or other logic here
        }
    
        draw(ctx) {
            // If you want camera offset
            ctx.drawImage(this.spriteSheet, this.x - this.game.camera.x, this.y - this.game.camera.y);
        }
    }