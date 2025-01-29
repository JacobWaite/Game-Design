// class SceneManager {
//     constructor(game) {
//         this.game = game;
//         this.game.camera = this;
        
//         // Camera position
//         this.x = 0;
//         this.y = 0;

//         // Game state
//         this.currentLevel = 1;
//         this.gameOver = false;
//         this.paused = false;

//         // Reference to player (paladin)
//         this.player = null;
        
//         // UI states
//         this.showInventory = false;
//         this.showStats = false;

//         // Load initial level
//         this.loadLevel(1);
//     }

//     loadLevel(level) {
//         // Reference the first paladin entity as the player
//         this.player = this.game.entities.find(entity => entity instanceof Paladin);
//         if (!this.player) {
//             console.log("No player found in entities");
//         }
//     }

//     update() {
//         // Scene manager update logic
//         if (this.player) {
//             // Center camera on player
//             this.x = this.player.x - this.game.ctx.canvas.width/2;
//             this.y = this.player.y - this.game.ctx.canvas.height/2;
//         }
//     }

//     draw(ctx) {
//         // Draw HUD background
//         ctx.fillStyle = "rgba(49, 176, 123, 0.7)";
//         ctx.fillRect(0, 0, ctx.canvas.width, 60);

//         // Draw player stats if they exist
//         if (this.player) {
//             // Health bar
//             this.drawHealthBar(ctx, 10, 10, 200, 20);

//             // Stats
//             ctx.fillStyle = "white";
//             ctx.font = "16px Arial";
//             ctx.fillText(`Level ${this.currentLevel}`, 10, 50);
//             ctx.fillText(`Attack: ${this.player.attack}`, 100, 50);
//             ctx.fillText(`Speed: ${this.player.speed}`, 250, 50);
//             ctx.fillText(`Defense: ${this.player.defense}`, 400, 50);
//         }

//         // Draw debug info if enabled
//         if (this.game.debug) {
//             this.drawDebugInfo(ctx);
//         }
//     }

//     drawHealthBar(ctx, x, y, width, height) {
//         // Background
//         ctx.fillStyle = "#444444";
//         ctx.fillRect(x, y, width, height);

//         // Health amount
//         const healthPercent = this.player.health / this.player.maxHealth;
//         const healthColor = this.getHealthColor(healthPercent);
//         ctx.fillStyle = healthColor;
//         ctx.fillRect(x, y, width * healthPercent, height);

//         // Health text
//         ctx.fillStyle = "white";
//         ctx.font = "12px Arial";
//         ctx.fillText(`${this.player.health}/${this.player.maxHealth}`, x + width/2 - 20, y + 15);
//     }

//     getHealthColor(percent) {
//         if (percent > 0.6) return "#00ff00";
//         if (percent > 0.3) return "#ffff00";
//         return "#ff0000";
//     }

//     drawDebugInfo(ctx) {
//         ctx.fillStyle = "white";
//         ctx.font = "12px Arial";
//         ctx.fillText(`FPS: ${Math.round(1/this.game.clockTick)}`, 10, ctx.canvas.height - 20);
//         ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
//         if (this.player) {
//             ctx.fillText(`Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`, 10, ctx.canvas.height - 60);
//         }
//     }
// }

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

        // UI states
        this.showInventory = false;
        this.showStats = false;

        // Load the grass background image
        this.grassImage = ASSET_MANAGER.getAsset("./Grass.png");
        if (!this.grassImage) {
            console.error("Grass image not found!");
        }

        // Load the tree image
        this.treeImage = ASSET_MANAGER.getAsset("./Tree.png");
        if (!this.treeImage) {
            console.error("Tree image not found!");
        }

        // Predefined tree positions
        this.treePositions = [
            { x: 100, y: 200 },
            { x: 300, y: 250 },
            { x: 500, y: 220 },
            { x: 700, y: 240 },
        ];

        // Load initial level
        this.loadLevel(1);
    }

    loadLevel(level) {
        // Reference the first paladin entity as the player
        this.player = this.game.entities.find(entity => entity instanceof Paladin);
        if (!this.player) {
            console.log("No player found in entities");
        }
    }

    update() {
        // Scene manager update logic
        if (this.player) {
            // Center camera on player
            this.x = this.player.x - this.game.ctx.canvas.width / 2;
            this.y = this.player.y - this.game.ctx.canvas.height / 2;
        }
    }

    draw(ctx) {
        // Draw the grass background
        if (this.grassImage) {
            for (let x = 0; x < ctx.canvas.width; x += this.grassImage.width) {
                for (let y = 0; y < ctx.canvas.height; y += this.grassImage.height) {
                    ctx.drawImage(this.grassImage, x, y);
                }
            }
        } else {
            console.warn("Background image not available!");
        }

        // Draw trees on the grass
        if (this.treeImage) {
            for (let pos of this.treePositions) {
                ctx.drawImage(this.treeImage, pos.x, pos.y, 64, 64); // Adjust the size (64x64) as needed
            }
        } else {
            console.warn("Tree image not available!");
        }

        // Draw HUD background
        ctx.fillStyle = "rgba(167, 4, 4, 0.95)";
        ctx.fillRect(0, 0, ctx.canvas.width, 70);

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
        ctx.fillText(`${this.player.health}/${this.player.maxHealth}`, x + width / 2 - 20, y + 15);
    }

    getHealthColor(percent) {
        if (percent > 0.6) return "#00ff00";
        if (percent > 0.3) return "#ffff00";
        return "#ff0000";
    }

    drawDebugInfo(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(`FPS: ${Math.round(1 / this.game.clockTick)}`, 10, ctx.canvas.height - 20);
        ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
        if (this.player) {
            ctx.fillText(
                `Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`,
                10,
                ctx.canvas.height - 60
            );
        }
    }
}