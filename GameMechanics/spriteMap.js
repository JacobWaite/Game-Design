class SpriteMap {
    constuctor(spriteSheet) {
        this.spriteSheet = spriteSheet;
        this.spriteMap = new Map();
        this.spriteMap.set("Grass", {1: 2});
    }

    addTexture(name, x, y, spriteWidth, spriteHeight) {
        // this.spriteMap.set();

        this.spriteMap.set(name, { x, y, spriteWidth, spriteHeight });
    }

    getTexture(name) {
        return this.spriteMap.get(name);
    }
}