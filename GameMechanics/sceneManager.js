class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        // Camera position
        this.x = 0;
        this.y = 0;

        this.worldWidth = this.game.ctx.canvas.width * 2;
        this.worldHeight = this.game.ctx.canvas.height * 2;

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
            { x: 900, y: 220 },
            { x: 1200, y: 240 },
            { x: 1400, y: 220 },
            { x: 1600, y: 240 },
        ];

        // Load initial level
        this.loadLevel(1);

        //********** START: Start screen code
        // Flag to indicate if start screen is active
        this.startScreenActive = true;

        // Load start screen background image
        this.startBackground = ASSET_MANAGER.getAsset("./Sprites/Background.png");
        if (!this.startBackground) {
            console.error("Start screen background image not found!");
        }

        // Define buttons for start screen
        // Adjust x, y, width, height as needed for your layout
        this.buttons = {
            start: { x: 300, y: 300, width: 200, height: 50, text: "START GAME", defaultColor: "#FFFFFF", hoverColor: "#076500", currentColor: "#FFFFFF" },
            exit: { x: 300, y: 400, width: 200, height: 50, text: "EXIT GAME", defaultColor: "#FFFFFF", hoverColor: "#076500", currentColor: "#FFFFFF" }
        };
        const canvasWidth = this.game.ctx.canvas.width;
        this.buttons.start.x = (canvasWidth - this.buttons.start.width) / 2;
        this.buttons.exit.x = (canvasWidth - this.buttons.exit.width) / 2;

        // Mouse move event to change button color on hover
        this.handleMouseMove = (e) => {
            if (!this.startScreenActive) return;
            const rect = this.game.ctx.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            for (let key in this.buttons) {
                let btn = this.buttons[key];
                if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                    mouseY >= btn.y && mouseY <= btn.y + btn.height) {
                    btn.currentColor = btn.hoverColor;
                } else {
                    btn.currentColor = btn.defaultColor;
                }
            }
        };

        // Mouse down event to handle button clicks
        this.handleMouseDown = (e) => {
            if (!this.startScreenActive) return;
            const rect = this.game.ctx.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            for (let key in this.buttons) {
                let btn = this.buttons[key];
                if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                    mouseY >= btn.y && mouseY <= btn.y + btn.height) {
                    if (key === "start") {
                        // Start the game
                        this.startScreenActive = false;
                    } else if (key === "exit") {
                        // Exit the game; note that window.close() may not work in all browsers.
                        window.open('', '_self').close();
                    }
                }
            }
        };

        // Add event listeners for start screen interaction
        this.game.ctx.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.game.ctx.canvas.addEventListener("mousedown", this.handleMouseDown);
        //********** END: Start screen code
    }

    loadLevel(level) {
        // Reference the first paladin entity as the player
        if (this.grassImage) {
            for (let x = 0; x < this.worldWidth * 2; x += this.grassImage.width - 1) {
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
                this.game.addEntity(new Entity(this.game, pos.x, pos.y, this.treeImage, 40, 80, 20, 0, 2)); // Adjust the size (64x64) as needed
            }
        } else {
            console.warn("Tree image not available!");
        }
        this.game.addEntity(new Paladin(gameEngine, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2, ASSET_MANAGER.getAsset("./Sprites/Paladin_Spritesheet.png"), 25, 50, 15, 30, 1.25, 100, 20, 150, 10));

        this.player = this.game.entities.find(entity => entity instanceof Paladin);
        if (!this.player) {
            console.log("No player found in entities");
        }

        this.game.addEntity(new Goblin(gameEngine, 200,650, ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), 25, 45, 30, 10, 1.25, 100, 10, 20, 5,));
	    this.game.addEntity(new Shopkeeper(gameEngine,325,650, ASSET_MANAGER.getAsset("./Sprites/Wizard_Spritesheet.png"), 25, 65, 20, 15, 1.25, 100, 10, 20, 10));
	    this.game.addEntity(new Skeleton(gameEngine,300,300, ASSET_MANAGER.getAsset("./Sprites/Skeleton_Attack.png"), 35, 75, 10, 20, 1.25, 100, 10, 20, 10));
    }

    update() {
        //********** START: Start screen update code
        if (this.startScreenActive) {
            // Do not update game scene while on start screen
            return;
        }
        //********** END: Start screen update code

        // Scene manager update logic
        if (this.player) {
            // Center camera on player           
            let currentX = this.player.x - this.game.ctx.canvas.width / 2 + this.player.width * 2;  // Character width and height, camera moving 
            let currentY = this.player.y - this.game.ctx.canvas.height / 2 + this.player.height;
            this.x = currentX;
            this.y = currentY;
            /*
            if (currentX <= 0) {
                this.x = 0;
            } else {
            this.x = currentX;
            }
            if (currentY <= 0) {
                this.y = 0;
            } else {
                this.y = currentY;
            }
            if (currentX >= this.worldWidth) {
                this.x = 0;
            } else {
                this.x = currentX;
            }
            if (currentY >= this.worldHeight) {
                this.y = 0;
            }
            else {
                this.y = currentY;
            }
            */
        }
    }

    draw(ctx) {
        //********** START: Start screen draw code
        if (this.startScreenActive) {
            // Draw start screen background
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            if (this.startBackground) {
                ctx.drawImage(this.startBackground, 0, 0, ctx.canvas.width, ctx.canvas.height);
            } else {

            }
            // Draw buttons
            for (let key in this.buttons) {
                let btn = this.buttons[key];
                ctx.fillStyle = btn.currentColor;
                ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
                // Draw button text centered
                ctx.fillStyle = "black";
                ctx.font = "20px Arial";
                const textMetrics = ctx.measureText(btn.text);
                const textX = btn.x + (btn.width - textMetrics.width) / 2;
                const textY = btn.y + (btn.height + 20) / 2;
                ctx.fillText(btn.text, textX, textY);
            }
            return;
        }
        //********** END: Start screen draw code

        // Reset transform for HUD elements (these should not move with camera)
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
            ctx.fillText(`Level ${this.player.experienceLevel}`, 10, 50);
            ctx.fillText(`Attack: ${this.player.getStatValue("strength")}`, 100, 50);
            ctx.fillText(`Speed: ${this.player.getStatValue("speed")}`, 250, 50);
            ctx.fillText(`Defense: ${this.player.getStatValue("intelligence")}`, 400, 50);
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
        const healthPercent = this.player.getStatValue("health") / 100;
        const healthColor = this.getHealthColor(healthPercent);
        ctx.fillStyle = healthColor;
        ctx.fillRect(x, y, width * healthPercent, height);

        // Health text
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(`${this.player.getStatValue("health")} / ${100}`, x + width/2 - 20, y + 15);
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