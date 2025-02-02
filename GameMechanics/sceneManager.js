class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
       
        // Camera position
        this.x = 0;
        this.y = 0;

        // Game state
        this.currentLevel = 1;
        this.gameOver = false;
        this.paused = false;

        // Reference to player (paladin)
        this.player = null;

        this.worldWidth = this.game.ctx.canvas.width * 2;
        this.worldHeight = this.game.ctx.canvas.height * 2;

        // UI states
        this.showInventory = false;
        this.showStats = false;

        // Load the grass background image
        this.grassImage = ASSET_MANAGER.getAsset("./Sprites/Grass.png");
        if (!this.grassImage) {
            console.error("Grass image not found!");
        }
        
        // Load the tree image
        this.treeImage = ASSET_MANAGER.getAsset("./Sprites/Tree.png");
        if (!this.treeImage) {
            console.error("Tree image not found!");
        }

        // Predefined tree positions
        this.treePositions = [
            { x: 100, y: 200 },
            { x: 400, y: 250 },
            { x: 900, y: 220 }, //220
            { x: 1200, y: 240 }, //240
            { x: 1400, y: 220 },
            { x: 1600, y: 240 },
        ];

        // Load initial level
        this.loadLevel(1);
    }

    loadLevel(level) {
        // this.game.entities = [];
        // this.x = 0;

        // for (var i = 0; i < level.length; i++) {

        // }

        if (this.grassImage) {
            for (let x = 0; x < this.worldWidth; x += this.grassImage.width - 1) {
                for (let y = 0; y < this.worldHeight * 2; y += this.grassImage.height - 1) {
                    // ctx.drawImage(this.game.background, x - this.x, y - this.y);
                    this.game.addBackground(new Background(this.game, x, y, this.grassImage));
                }
            }
        } else {
            console.warn("Background image not available!");
        }

        if (this.treeImage) {
            for (let pos of this.treePositions) {
                this.game.addEntity(new Entity(this.game, pos.x, pos.y, this.treeImage, 64, 64, 0, 0)); // Adjust the size (64x64) as needed
            }
        } else {
            console.warn("Tree image not available!");
        }

        gameEngine.addEntity(new Paladin(gameEngine, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2, ASSET_MANAGER.getAsset("./Sprites/Paladin_Spritesheet.png"), 17, 40, 16, 24, 100, 20, 100, 10));

        // Reference the first paladin entity as the player
        this.player = this.game.entities.find(entity => entity instanceof Paladin);
        if (!this.player) {
            console.log("No player found in entities");
        }

	    gameEngine.addEntity(new Goblin(gameEngine, 400,650, ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), 17, 40, 16, 24, 100, 10, 20, 5));
	    gameEngine.addEntity(new Shopkeeper(gameEngine,325,650, ASSET_MANAGER.getAsset("./Sprites/Wizard_Spritesheet.png"), 17, 40, 16, 24, 100, 10, 20, 10));
	    gameEngine.addEntity(new Skeleton(gameEngine,325,650, ASSET_MANAGER.getAsset("./Sprites/Skeleton_Walk.png"), 3, 0, 48.0059, 75, 100, 10, 20, 10));

    }

    update() {
        // Scene manager update logic
        if (this.player) {
            // Center camera on player           
            let currentX = this.player.x - this.game.ctx.canvas.width / 2 + this.player.width * 2;  // Character width and height, camera moving 
            let currentY = this.player.y - this.game.ctx.canvas.height / 2 + this.player.height;
        
        if (currentX <= 0) {
            this.x = 0;
        }
        else {
            this.x = currentX;
        }

        if (currentY <= 0) {
            this.y = 0;
        }
        else {
            this.y = currentY;
        }

        if (currentX >= this.worldWidth) {
            this.x = 0;
        }
        else {
            this.x = currentX;
        }

        if (currentY >= this.worldHeight) {
            this.y = 0;
        }
        else {
            this.y = currentY;
        }
        }
    }

    draw(ctx) {
        ctx.restore();

        // Draw HUD background
        ctx.fillStyle = "rgba(49, 176, 123, 0.7)";
        ctx.fillRect(0, 0, ctx.canvas.width, 60);

        // Draw player stats if they exist
        if (this.player) {
            // Health bar
            this.drawHealthBar(ctx, 10, 10, 200, 20);

            // Stats
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText(`Level ${this.currentLevel}`, 10, 50);
            ctx.fillText(`Attack: ${this.player.attack}`, 100, 50);
            ctx.fillText(`Speed: ${this.player.speed}`, 250, 50);
            ctx.fillText(`Defense: ${this.player.defense}`, 400, 50);
        }

        // Draw debug info if enabled
        if (this.game.debug) {
            this.drawDebugInfo(ctx);
        }
    }

    drawHealthBar(ctx, x, y, width, height) {
        // Background
        ctx.fillStyle = "#444444";
        ctx.fillRect(x, y, width, height);

        // Health amount
        const healthPercent = this.player.health / this.player.maxHealth;
        const healthColor = this.getHealthColor(healthPercent);
        ctx.fillStyle = healthColor;
        ctx.fillRect(x, y, width * healthPercent, height);

        // Health text
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(`${this.player.health}/${this.player.maxHealth}`, x + width/2 - 20, y + 15);
    }

    getHealthColor(percent) {
        if (percent > 0.6) return "#00ff00";
        if (percent > 0.3) return "#ffff00";
        return "#ff0000";
    }

    drawDebugInfo(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(`FPS: ${Math.round(1/this.game.clockTick)}`, 10, ctx.canvas.height - 20);
        ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
        if (this.player) {
            ctx.fillText(`Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`, 10, ctx.canvas.height - 60);
        }
    }
}