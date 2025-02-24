class Levels {
    /**
     * Manages level definitions and background elements.
     * @param {Object} game - Your game engine instance.
     * @param {HTMLImageElement} grassImage - The grass image asset.
     * @param {HTMLImageElement} treeImage - The tree image asset.
     */
    constructor(game, grassImage, treeImage) {
        this.game = game;
        this.grassImage = grassImage;
        this.treeImage = treeImage;
        
        // Define your levels. Each level can have its own background color and tree positions.
        this.levels = [
            {
                label: "Level 1",
                backgroundColor: "#049cd8",
                treePositions: [
                    { x: 100,  y: 200 },
                    { x: 500,  y: 210 },
                    { x: 900,  y: 220 },
                    { x: 1300, y: 230 },
                    { x: 1700, y: 240 },
                    { x: 2100, y: 250 },
                    { x: 2500, y: 240 },
                    { x: 2900, y: 230 },
                    { x: 3300, y: 220 },
                    { x: 3700, y: 210 }
                ]
            },
            {
                label: "Level 2",
                backgroundColor: "#336699",
                treePositions: [
                    { x: 50, y: 300 },
                    { x: 300, y: 350 },
                    { x: 700, y: 320 },
                    { x: 1100, y: 340 },
                    { x: 1300, y: 300 }
                ]
            }
            // Add more levels as needed.
        ];
        
        this.currentLevelIndex = 0;
        this.currentLevelData = null;
        this.loadCurrentLevel();
    }

    /**
     * Loads the current level data and applies level-specific settings.
     */
    loadCurrentLevel() {
        this.currentLevelData = this.levels[this.currentLevelIndex];
        // Set the canvas background color.
        const canvas = document.getElementById("gameWorld");
        canvas.style.backgroundColor = this.currentLevelData.backgroundColor;
    }

    /**
     * Advances to the next level and reloads the level data.
     */
    nextLevel() {
        this.currentLevelIndex = (this.currentLevelIndex + 1) % this.levels.length;
        this.loadCurrentLevel();
    }

    /**
     * Draws the level’s background (tiled grass and tree positions).
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} cameraX - The current camera x offset.
     * @param {number} cameraY - The current camera y offset.
     */
    draw(ctx, cameraX, cameraY) {
        // Draw an infinite, tiled grass background.
        ctx.save();
        // Use modulo translation so the grass tiling “moves” with the camera.
        ctx.translate(-cameraX % this.grassImage.width, -cameraY % this.grassImage.height);
        const tilesX = Math.ceil(ctx.canvas.width / this.grassImage.width) + 2;
        const tilesY = Math.ceil(ctx.canvas.height / this.grassImage.height) + 2;
        for (let i = -1; i < tilesX; i++) {
            for (let j = -1; j < tilesY; j++) {
                ctx.drawImage(this.grassImage, i * this.grassImage.width, j * this.grassImage.height);
            }
        }
        ctx.restore();

        // Draw trees using the positions defined for the current level.
        if (this.currentLevelData && this.currentLevelData.treePositions) {
            this.currentLevelData.treePositions.forEach(pos => {
                ctx.drawImage(this.treeImage, pos.x - cameraX, pos.y - cameraY);
            });
        }
    }
}

