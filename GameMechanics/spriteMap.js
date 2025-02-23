/**
 * A class meant to contain a texture atlas for all game background textures.
 * all textures will be maped to a string or numeric representation of the texture,
 * this allows the texture to be accesed by name or value instead of by image x, y coordinates.
 */
class SpriteMap {
    /**
     * Instantiates a SpriteMap Object. 
     * @param {HTMLImageElement} spriteSheet the image containing all background textures.
     */
    constuctor(spriteSheet) {
        this.spriteSheet = spriteSheet;
        this.spriteMap = new Map();
        this.spriteMap.set("Grass", {1: 2});
    }
    /**
     * maps a new texture to a given representation 
     * @param {string} name the name of the texture
     * @param {number} x the x coordinate of the top left corner of the texture position in the atlas image.
     * @param {number} y the y coordinate of the top left corner.
     * @param {number} spriteWidth the width of the texture in pixels from the top left corner.
     * @param {number} spriteHeight the height of the texture in pixels from the bottom left corner.
     */
    addTexture(name, x, y, spriteWidth, spriteHeight) {
        // this.spriteMap.set();

        this.spriteMap.set(name, { x, y, spriteWidth, spriteHeight });
    }
    /**
     * returns the texture to be drawn. 
     * @param {string} name the name of the texture.
     * @returns returns the texture in a drawable format. 
     */
    getTexture(name) {
        return this.spriteMap.get(name);
    }
}