class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
<<<<<<< HEAD

        // Camera / world positioning
        this.x = 0;
        this.y = 0;
        this.worldWidth = this.game.ctx.canvas.width * 2;
        this.worldHeight = this.game.ctx.canvas.height * 2;
=======
        
        // Camera position
        this.x = 500;
        this.y = 500;

        // Game state
>>>>>>> cd678a1833c54b58d33ae0dc4d6242b59273b877
        this.currentLevel = 1;
        this.gameOver = false;
        this.paused = false;
        this.player = null;
<<<<<<< HEAD
=======

        this.worldWidth = this.game.ctx.canvas.width * 2;
        this.worldHeight = this.game.ctx.canvas.height * 2;

        // UI states
>>>>>>> cd678a1833c54b58d33ae0dc4d6242b59273b877
        this.showInventory = false;
        this.showStats = false;
        this.goblin = null;

        this.treePositions = [
            { x: 100, y: 200 }, { x: 400, y: 250 },
            { x: 900, y: 220 }, { x: 1200, y: 240 },
            { x: 1400, y: 220 }, { x: 1600, y: 240 }
        ];
        //Initialize grid
        const TILE_SIZE = 32;
        const gridWidth = Math.ceil(this.worldWidth / TILE_SIZE);
        const gridHeight = Math.ceil(this.worldHeight / TILE_SIZE);
        this.game.grid = new Grid(gridWidth, gridHeight, TILE_SIZE);

        //this.playergui = null;
        // Load background assets for Levels
        this.grassImage = ASSET_MANAGER.getAsset("./Sprites/Grass.png");
        if (!this.grassImage) {
            console.error("Grass image not found!");
        }

        // Load the tree image
        this.treeImage = ASSET_MANAGER.getAsset("./Sprites/Tree.png");
        this.treeImage2 = ASSET_MANAGER.getAsset("./Sprites/AnimatedAutum.png");


        // Instantiate the Levels class (which handles background drawing)
        //this.levels = new Levels(this.game, this.grassImage, this.treeImage);
        
        // Start screen properties
        this.startScreenActive = true;
        this.startBackground = ASSET_MANAGER.getAsset("./Sprites/Background.png");
        this.loadLevel(1);

        // Define start screen buttons
        this.buttons = {
            start: { x: 300, y: 300, width: 200, height: 50, text: "START GAME", defaultColor: "#FFFFFF", hoverColor: "#076500", currentColor: "#FFFFFF" },
            exit: { x: 300, y: 400, width: 200, height: 50, text: "EXIT GAME", defaultColor: "#FFFFFF", hoverColor: "#076500", currentColor: "#FFFFFF" }
        };

        const canvasWidth = this.game.ctx.canvas.width;
        this.buttons.start.x = (canvasWidth - this.buttons.start.width) / 2;
        this.buttons.exit.x = (canvasWidth - this.buttons.exit.width) / 2;

        // Mouse event handlers for the start screen
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
                        this.startScreenActive = false;
                        ASSET_MANAGER.stopBackgroundMusic("./Sprites/Music/backgroundMusic.mp3");
                    } else if (key === "exit") {
                        window.open('', '_self').close();
                    }
                }
            }
        };

        this.game.ctx.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.game.ctx.canvas.addEventListener("mousedown", this.handleMouseDown);
        //********** END: Start screen code

        const canvas = this.game.ctx.canvas;
        this.soundCheckbox = document.createElement("input");
        this.soundCheckbox.type = "checkbox";
        this.soundCheckbox.id = "soundCheckbox";
// Start unchecked so audio remains muted until the user interacts.
        this.soundCheckbox.checked = false;

        this.soundLabel = document.createElement("label");
        this.soundLabel.htmlFor = "soundCheckbox";
        this.soundLabel.textContent = " SOUND";

// Create a container div to position the checkbox
        this.soundContainer = document.createElement("div");
        this.soundContainer.style.position = "absolute";
        this.soundContainer.style.bottom = "10px";
// Align it with the canvas left edge (adjust as needed)
        this.soundContainer.style.left = canvas.offsetLeft + "px";
        this.soundContainer.style.zIndex = "1000";

        this.soundContainer.appendChild(this.soundCheckbox);
        this.soundContainer.appendChild(this.soundLabel);
        document.body.appendChild(this.soundContainer);

// Initially mute all sounds
        for (let key in ASSET_MANAGER.audioCache) {
            if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
                ASSET_MANAGER.audioCache[key].muted = true;
            }
        }

// Toggle sound muting based on checkbox state
        this.soundCheckbox.addEventListener("change", () => {
            const mute = !this.soundCheckbox.checked;
            if (this.soundCheckbox.checked){
                ASSET_MANAGER.playBackgroundMusic("./Sprites/Music/backgroundMusic.mp3");
            }
            for (let key in ASSET_MANAGER.audioCache) {
                if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
                    ASSET_MANAGER.audioCache[key].muted = mute;
                }
            }
        });

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
        if (this.grassImage) {
            console.log(this.x);
            console.log(this.y);
            console.log(this.grassImage.width -1);

            for (let x = this.x; x < this.worldWidth; x += this.grassImage.width - 1) {
                for (let y = this.y; y < this.worldHeight; y += this.grassImage.height - 1) {
                    // ctx.drawImage(this.game.background, x - this.x, y - this.y);
                    //console.log(`X: ${x} Y: ${y}`)
                    this.game.addBackground(new background(this.game, x, y, this.grassImage));
                }
            }
        } else {
            console.warn("Background image not available!");
        }

        if (this.treeImage2) {
            for (let pos of this.treePositions) {
                this.game.addEntity(new Entity(this.game, pos.x, pos.y, this.treeImage2, 40, 80, 40, 0, 1)); // Adjust the size (64x64) as needed
            }
        } else {
            console.warn("Tree image not available!");
        }
        this.game.addEntity(new Paladin(gameEngine, this.worldWidth / 2, this.worldHeight / 2, ASSET_MANAGER.getAsset("./Sprites/Paladin_Spritesheet.png"), 75, 50, 15, 30, 1.25, 100, 20, 150, 10));

        this.player = this.game.entities.find(entity => entity instanceof Paladin);
<<<<<<< HEAD
        //this.playergui = new playerGUI(this.player, this.game, ASSET_MANAGER.getAsset("./Sprites/Gui.png"));
        
        this.game.addEntity(new Goblin(
            this.game,
            200,
            650,
            ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"),
            25, 45, 30, 10, 1.25, 100, 10, 20, 5
        ));
        this.goblin = this.game.entities.find(entity => entity instanceof Goblin);
        
        /*
        this.game.addEntity(new Shopkeeper(
            this.game,
            325,
            650,
            ASSET_MANAGER.getAsset("./Sprites/Wizard_Spritesheet.png"),
            25, 65, 20, 15, 1.25, 100, 10, 20, 10
        ));
        this.game.addEntity(new Skeleton(
            this.game,
            300,
            300,
            ASSET_MANAGER.getAsset("./Sprites/Skeleton_Attack.png"),
            35, 75, 10, 20, 1.25, 100, 10, 20, 10
        ));
        */
        
=======
        if (!this.player) {
            console.log("No player found in entities");
        }
>>>>>>> cd678a1833c54b58d33ae0dc4d6242b59273b877
    }

    update() {
        
        //********** END: Start screen update code
        //this.playergui.update(this.game.keys.get("e"));
        let currentX = this.player.x - (this.game.ctx.canvas.width / 2 - this.player.width / 2);  // Character width and height, camera moving 
        let currentY = this.player.y - (this.game.ctx.canvas.height / 2 -this.player.height / 2);
        this.x = currentX;
        this.y = currentY;
        
<<<<<<< HEAD
        if (currentX <= 0) {
            this.x = 0;
        } 
        if (currentY <= 0) {
            this.y = 0;
        } 
        if (currentX >= this.worldWidth) {
            this.x = this.worldWidth;
        } 
        if (currentY >= this.worldHeight) {
            this.y = this.worldHeight;
=======
        // Scene manager update logic
        if (this.player) {
            // Center camera on player
            this.x = this.player.x - this.game.ctx.canvas.width/2 + this.player.width*2;
            this.y = this.player.y - this.game.ctx.canvas.height/2 + this.player.height;
>>>>>>> cd678a1833c54b58d33ae0dc4d6242b59273b877
        }
        
        
    }
    

    draw(ctx) {
        if (this.startScreenActive) {
            // Draw start screen background
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            if (this.startBackground) {
                ctx.drawImage(this.startBackground, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            for (let key in this.buttons) {
                let btn = this.buttons[key];
                ctx.fillStyle = btn.currentColor;
                ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
                ctx.fillStyle = "black";
                ctx.font = "20px Arial";
                const textMetrics = ctx.measureText(btn.text);
                const textX = btn.x + (btn.width - textMetrics.width) / 2;
                const textY = btn.y + (btn.height + 20) / 2;
                ctx.fillText(btn.text, textX, textY);
            }
            return;
        }/*
        if(this.goblin.dead) {
            ctx.fillStyle = "black";
            ctx.font = "64px Arial";
            ctx.fillText("YOU WIN!!", 450, 375);
        }
<<<<<<< HEAD
            */
        // First, draw the background via Levels (grass and trees)
        //this.levels.draw(ctx, this.x, this.y);
=======
        //********** END: Start screen draw code
        
        // Reset transform for HUD elements (these should not move with camera)
        ctx.restore();

        // Draw the grass background
        if (this.grassImage) {
            for (let x = 0; x < ctx.canvas.width*2; x += this.grassImage.width-1) {
                for (let y = 0; y < ctx.canvas.height*2; y += this.grassImage.height-1) {
                    ctx.drawImage(this.grassImage, x - this.x, y - this.y);
                }
            }
        } else {
            console.warn("Background image not available!");
        }

        // Draw trees on the grass
        if (this.treeImage) {
            for (let pos of this.treePositions) {
                ctx.drawImage(this.treeImage, pos.x - this.x, pos.y - this.y, 64 * 8, 64 * 8);
            }
        } else {
            console.warn("Tree image not available!");
        }
>>>>>>> cd678a1833c54b58d33ae0dc4d6242b59273b877

        // Next, draw all game entities so that they appear on top of the background.
        // (Make sure your game engine's main loop doesn't already call this, or adjust the draw order accordingly.)
        /*this.game.entities.forEach(entity => {
            if (entity.draw) {
                entity.draw(ctx);
            }
        });
        */
        // Draw HUD (e.g., top bar with health and stats)
        ctx.fillStyle = "rgba(49, 176, 123, 0.7)";
        ctx.fillRect(0, 0, ctx.canvas.width, 60);

        if (this.player) {
            this.drawHealthBar(ctx, 10, 10, 200, 20);
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText(`Level ${this.player.experienceLevel}`, 10, 50);
            ctx.fillText(`Attack: ${this.player.getStatValue("strength")}`, 100, 50);
            ctx.fillText(`Speed: ${this.player.getStatValue("speed")}`, 250, 50);
            ctx.fillText(`Defense: ${this.player.getStatValue("intelligence")}`, 400, 50);
        }

        if (this.game.debug) {
            this.drawDebugInfo(ctx);
        }
    }
    drawHealthBar(ctx, x, y, width, height) {
        ctx.fillStyle = "#444444";
        ctx.fillRect(x, y, width, height);

        const healthPercent = this.player.getStatValue("health") / 100;
        const healthColor = this.getHealthColor(healthPercent);
        ctx.fillStyle = healthColor;
        ctx.fillRect(x, y, width * healthPercent, height);

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(`${this.player.getStatValue("health")} / 100`, x + width / 2 - 20, y + 15);
    }

    getHealthColor(percent) {
        if (percent > 0.6) return "#00ff00";
        if (percent > 0.3) return "#ffff00";
        return "#ff0000";
    }

    drawDebugInfo(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        let startY = ctx.canvas.height - 240;
        let lineHeight = 20;
        ctx.fillText(`FPS: ${Math.round(1/this.game.clockTick)}`, 10, ctx.canvas.height - 20);
        ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
        if (this.player) {
<<<<<<< HEAD
            ctx.fillText(`Player pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`, 10, ctx.canvas.height - 60);
            ctx.fillText(`Collision: ${this.player.colliding} Direction: ${this.player.collisionDirection}`, 12, ctx.canvas.height - 80);
            ctx.fillText(this.player.hitBox.toString(), 10, ctx.canvas.height - 100);
            ctx.fillText(this.player.attacking, 10, ctx.canvas.height - 120);
        }

        for(let i = 0; i < this.game.entities.length; i ++) {
            if(!(this.game.entities[i] instanceof Paladin)) {
                ctx.fillText(`X: ${this.game.entities[i].x}`,this.game.entities[i].x - this.x, this.game.entities[i].y-this.y - 20);
                ctx.fillText(`Y: ${this.game.entities[i].y}`, this.game.entities[i].x - this.x, this.game.entities[i].y - this.y);
                ctx.fillText(`Hitbox: ${this.game.entities[i].hitBox.toString()}`,this.game.entities[i].x - this.x - (this.game.entities[i].width * 2), this.game.entities[i].y-this.y + this.game.entities[i].height * 2);
            }
        }
        /*
        const goblin = this.game.entities.find(e => e instanceof Goblin);
        if (goblin) {
            ctx.fillText(`Goblin Pos: (${Math.round(goblin.x)}, ${Math.round(goblin.y)})`, 10, startY += lineHeight);
            ctx.fillText(`Goblin Moving: ${goblin.moving}`, 10, startY += lineHeight);
            ctx.fillText(`Goblin Target: ${this.player ? `(${Math.round(this.player.x)}, ${Math.round(this.player.y)})` : 'None'}`, 10, startY += lineHeight);
            ctx.fillText(`Goblin Path Length: ${goblin.path ? goblin.path.length : 0}`, 10, startY += lineHeight);
        
            if (goblin.path && goblin.path.length > 0) {
                ctx.fillText(`Goblin Next Target: (${goblin.path[0].x}, ${goblin.path[0].y})`, 10, startY += lineHeight);
            } else {
                ctx.fillText(`Goblin Next Target: None`, 10, startY += lineHeight);
            }

            ctx.fillText(`A* Path: ${goblin.path === undefined ? 'Undefined' : JSON.stringify(goblin.path)}`, 10, startY += lineHeight);
        
            const goblinGridPos = this.game.grid.worldToGrid(goblin.x, goblin.y);
            const paladinGridPos = this.game.grid.worldToGrid(this.player.x, this.player.y);
            ctx.fillText(`Goblin Grid Pos: (${goblinGridPos.x}, ${goblinGridPos.y})`, 10, startY += lineHeight);
            ctx.fillText(`Paladin Grid Pos: (${paladinGridPos.x}, ${paladinGridPos.y})`, 10, startY += lineHeight);
        
            // Check if Goblin and Paladin are on walkable tiles
            const goblinNode = this.game.grid.getNode(goblinGridPos.x, goblinGridPos.y);
            const paladinNode = this.game.grid.getNode(paladinGridPos.x, paladinGridPos.y);
            ctx.fillText(`Goblin Walkable: ${goblinNode ? goblinNode.walkable : 'N/A'}`, 10, startY += lineHeight);
            ctx.fillText(`Paladin Walkable: ${paladinNode ? paladinNode.walkable : 'N/A'}`, 10, startY += lineHeight);
        }
            */
    }   
}



=======
            ctx.fillText(`Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`, 10, ctx.canvas.height - 60);
        }
    }
}


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
//         this.playerImage = ASSET_MANAGER.getAsset("./Paladin_Spritesheet.png");
//         this.player = new Paladin(gameEngine,50,50, this.playerImage, 17, 40, 16, 24, 100, 20, 10, 10);
//         this.game.addEntity(this.player);
//         this.player = null;

//         // UI states
//         this.showInventory = false;
//         this.showStats = false;

        // // Load the grass background image
        // this.grassImage = ASSET_MANAGER.getAsset("./Grass.png");
        // if (!this.grassImage) {
        //     console.error("Grass image not found!");
        // }

//         // Load the tree image
//         this.treeImage = ASSET_MANAGER.getAsset("./Tree.png");
//         if (!this.treeImage) {
//             console.error("Tree image not found!");
//         }

//         // Predefined tree positions
//         this.treePositions = [
//             { x: 100, y: 200 },
//             { x: 300, y: 250 },
//             { x: 500, y: 220 }, //220
//             { x: 700, y: 240 }, //240
//             { x: 500, y: 220 },
//             { x: 700, y: 240 },
//         ];

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

//     // Convert world coordinates to screen coordinates
//     worldToScreen(x, y) {
//         return {
//             x: (x - this.x),
//             y: (y - this.y)
//         };
//     }

//     update() {
//         // Scene manager update logic
//         if (this.player) {
//             // Directly center the camera on the player without smoothing
//             this.player.x = this.game.ctx.canvas.width / 2 - 64;
//             this.player.y = this.game.ctx.canvas.height / 2 - 64;

//             // Center camera on player
//             this.x = this.player.x - this.game.ctx.canvas.width / 2;
//             this.y = this.player.y - this.game.ctx.canvas.height / 2;
//         }
//     }

//     draw(ctx) {
//         // Save the current context state
//         ctx.save();
        
//         // Draw the grass background with camera offset
//         if (this.grassImage) {
//             const tileSize = this.grassImage.width;
//             const startX = this.x;
//             const startY = this.y;
            
//             for (let x = startX; x < startX + ctx.canvas.width + tileSize; x += tileSize) {
//                 for (let y = startY; y < startY + ctx.canvas.height + tileSize; y += tileSize) {
//                     const screen = this.worldToScreen(x, y);
//                     ctx.drawImage(this.grassImage, screen.x, screen.y);
//                 }
//             }
//         }

//         // Draw trees with camera offset
//         if (this.treeImage) {
//             for (let pos of this.treePositions) {
//                 const screen = this.worldToScreen(pos.x, pos.y);
//                 ctx.drawImage(this.treeImage, screen.x, screen.y, 64 * 2, 64 * 2);
//             }
//         }

//         this.player.draw(ctx);
//         // Reset transform for HUD elements (these should not move with camera)
//         ctx.restore();
//         // Draw the grass background
//         if (this.grassImage) {
//             for (let x = 0; x < ctx.canvas.width; x += this.grassImage.width) {
//                 for (let y = 0; y < ctx.canvas.height; y += this.grassImage.height) {
//                     ctx.drawImage(this.grassImage, x, y);
//                 }
//             }
//         } else {
//             console.warn("Background image not available!");
//         }

//         // Draw trees on the grass
//         if (this.treeImage) {
//             for (let pos of this.treePositions) {
//                 ctx.drawImage(this.treeImage, pos.x, pos.y, 64, 64); // Adjust the size (64x64) as needed
//             }
//         } else {
//             console.warn("Tree image not available!");
//         }

//         // Draw HUD background
//         ctx.fillStyle = "rgba(167, 4, 4, 0.95)";
//         ctx.fillRect(0, 0, ctx.canvas.width, 70);

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
//         ctx.fillText(`${this.player.health}/${this.player.maxHealth}`, x + width / 2 - 20, y + 15);
//     }
    
//     getHealthColor(percent) {
//         if (percent > 0.6) return "#00ff00";
//         if (percent > 0.3) return "#ffff00";
//         return "#ff0000";
//     }

//     drawDebugInfo(ctx) {
//         ctx.fillStyle = "white";
//         ctx.font = "12px Arial";
//         ctx.fillText(`FPS: ${Math.round(1 / this.game.clockTick)}`, 10, ctx.canvas.height - 20);
//         ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
//         if (this.player) {
//             ctx.fillText(
//                 `Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`,
//                 10,
//                 ctx.canvas.height - 60
//             );
//         }
//     }
// }
>>>>>>> cd678a1833c54b58d33ae0dc4d6242b59273b877

