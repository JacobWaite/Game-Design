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
        this.levels = levelStorage.getLevels();
        this.level1 = this.levels[0];
        this.currentLevelIndex = 0;
        this.loadCurrentLevel();
    }

    /**
     * Loads the current level by clearing existing entities and adding trees.
     */
    loadCurrentLevel() {
        let x = 0;
        let y = 0;
        
        
        if (this.level1 != null) {
            
            for(let i = 0; i < this.level1.grass.data.length; i++) {
                if(i % this.level1.grass.width == 0) {
                    y += 31;
                    x = 0;
                }
                x += 31;
                for(let j = 0; j < this.level1.tilesets.length; j++) {
                    if(this.level1.grass.data[i] < (this.level1.tilesets[j].firstgid + this.level1.tilesets[j].setSize)){
                        let imagey = Math.floor((this.level1.grass.data[i] - this.level1.tilesets[j].firstgid) / this.level1.tilesets[j].columns);
                        let imagex =  (this.level1.grass.data[i] - this.level1.tilesets[j].firstgid) - (imagey * this.level1.tilesets[j].columns);
                        this.game.addBackground(new grass(this.game, x, y, ASSET_MANAGER.getAsset(this.level1.tilesets[j].image), imagex * 32, imagey * 32));
                        
                        //console.log(`Imagex: ${imagex} Imagey: ${imagey} textureID: ${this.level1.grass.data[i] } ImageX pixels: ${imagex * 32} Imagey pixels: ${imagey * 32} True: ${this.level1.grass.data[i] < (this.level1.tilesets[j].firstgid + this.level1.tilesets[j].setSize)}`);
                        break;
                   }
                }      
            }
            x = 0;
            y = 0;
            for(let i = 0; i < this.level1.entities.data.length; i++) {
                if(i % this.level1.entities.width == 0) {
                    y += 31;
                    x = 0;
                }
                x += 31;
                if(this.level1.entities.data[i] > 0) {
                    for(let j = 0; j < this.level1.tilesets.length; j++) {
                        if(this.level1.entities.data[i] < (this.level1.tilesets[j].firstgid + this.level1.tilesets[j].setSize)){
                            let imagey = Math.floor((this.level1.entities.data[i] - this.level1.tilesets[j].firstgid) / this.level1.tilesets[j].columns);
                            let imagex =  (this.level1.entities.data[i] - this.level1.tilesets[j].firstgid) - (imagey * this.level1.tilesets[j].columns);
                            this.game.addEntity(new stone(this.game, x, y, ASSET_MANAGER.getAsset(this.level1.tilesets[j].image), imagex * 32, imagey * 32, 32,8, 0, 0, 1));

                            //console.log(`Imagex: ${imagex} Imagey: ${imagey} textureID: ${this.level1.entities.data[i] } ImageX pixels: ${imagex * 32} Imagey pixels: ${imagey * 32} Image: ${this.level1.tilesets[j].image}`);
                            break;
                        }
                    }
                }
                
            }
            this.game.addEntity(new knight(
                this.game,
                this.game.ctx.canvas.width / 2,
                this.game.ctx.canvas.height / 2,
                [ASSET_MANAGER.getAsset("./Sprites/Run.png"), ASSET_MANAGER.getAsset("./Sprites/Idle.png"), ASSET_MANAGER.getAsset("./Sprites/RunLeft.png"), ASSET_MANAGER.getAsset("./Sprites/Attacks.png")],
                20, 35, 55, 25, 1, 100, 20, 150, 10
            ));
            for(let i = 0; i < this.level1.trees.length; i++) {
                this.game.addEntity(new tree(this.game, this.level1.trees[i].x, this.level1.trees[i].y, this.treeImage, 6, 12, 80, 120, 1));
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

