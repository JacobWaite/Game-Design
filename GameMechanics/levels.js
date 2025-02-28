class Levels {
    /**
     * @param {Object} game - Your game engine instance.
     * @param {HTMLImageElement} grassImage - The grass image asset.
     * @param {HTMLImageElement} treeImage - The tree image asset.
     * @param {LevelStorage} levelStorage - The LevelStorage instance holding level definitions.
     */
    constructor(game, grassImage, treeImage, levelStorage) {
        this.game = game;
        this.grassImage = grassImage;
        this.treeImage = treeImage;
        this.levels = levelStorage.getLevels();  // Get level data from LevelStorage.
        this.currentLevelIndex = 0;
        this.loadCurrentLevel();
    }

    /**
     * Loads the current level by clearing existing entities and adding trees.
     */
    loadCurrentLevel() {
        this.game.entities = [];

        const level = this.levels[this.currentLevelIndex];

        if (level.trees) {
            for (var i = 0; i < level.trees.length; i++) {
                let levelTree = level.trees[i];
                this.game.addEntity(new tree(this.game, levelTree.x, levelTree.y, this.treeImage, 50, 50, 0, 0, 1));

                // game, x, y, spriteSheet, width, height, xSpriteOffset,ySpriteOffset, scale
            }
        }

        if (this.grassImage) {
            for (let x = 0; x < level.grass.x; x += this.grassImage.width - 1) {
                for (let y = 0; y < level.grass.y; y += this.grassImage.height - 1) {
                    this.game.addBackground(new background(this.game, x, y, this.grassImage));
                }
            }
        }
            
    }

    /**
     * Advances to the next level and reloads it.
     */
    nextLevel() {
        this.currentLevelIndex = (this.currentLevelIndex + 1) % this.levels.length;
        this.loadCurrentLevel();
    }
}
