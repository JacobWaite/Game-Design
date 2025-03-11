class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        // Camera / world positioning
        this.x = 0;
        this.y = 0;
        this.worldWidth = this.game.ctx.canvas.width * 4;
        this.worldHeight = this.game.ctx.canvas.height * 4;
        this.currentLevel = 1;
        this.gameOver = false;
        this.paused = false;
        this.player = null;
        this.showInventory = false;
        this.showStats = false;
        this.goblin = null;

        //Initialize grid
        const TILE_SIZE = 32;
        const gridWidth = Math.ceil(this.worldWidth / TILE_SIZE);
        const gridHeight = Math.ceil(this.worldHeight / TILE_SIZE);
        this.game.grid = new Grid(gridWidth, gridHeight, TILE_SIZE);


        this.treeImage = ASSET_MANAGER.getAsset("./Sprites/TX_Plant.png");

        // Instantiate the Levels class (which loads the level’s tree entities)
        this.levels = new Levels(this.game,this.treeImage, LevelStorage);

        // Now add your game entities:
        // Add the player character (Paladin)
        this.game.addEntity(new Paladin(
            this.game,
            this.game.ctx.canvas.width / 2,
            this.game.ctx.canvas.height / 2,
            [ASSET_MANAGER.getAsset("./Sprites/Run.png"), ASSET_MANAGER.getAsset("./Sprites/Idle.png"), ASSET_MANAGER.getAsset("./Sprites/RunLeft.png"), ASSET_MANAGER.getAsset("./Sprites/Attacks.png")],
            20, 35, 55, 25, 1, 100, 20, 150, 10
        ));
        // Set reference to the player for camera tracking
        this.player = this.game.entities.find(e => e instanceof Paladin);
        this.playergui = new playerGUI(this.player,this.game,ASSET_MANAGER.getAsset("./Sprites/Gui.png"));

         // Add a Goblin enemy
         this.game.addEntity(new Goblin(
            this.game,
            200,
            650,
            ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"),
            25, 45, 30, 10, 1.25, 100, 10, 20, 5
        ));

       this.game.addEntity(new DarkKnight(
        this.game,
        200,
        650,
        ASSET_MANAGER.getAsset("./Sprites/NightBorne.png"),
        25, 45, 30, 10, 1.25, 100, 10, 20, 5
        ));

       this.game.addEntity(new Skeleton(
           this.game,
           300,
           300,
           ASSET_MANAGER.getAsset("./Sprites/Ogre_Spritesheet.png"),
           35, 75, 10, 20, 1.25, 100, 10, 20, 10
        ));
        // // Add a Shopkeeper enemy/character
        // this.game.addEntity(new Shopkeeper(
        //     this.game,
        //     325,
        //     650,
        //     ASSET_MANAGER.getAsset("./Sprites/Wizard_Spritesheet.png"),
        //     25, 65, 20, 15, 1.25, 100, 10, 20, 10
        // ));

        // // Add a Skeleton enemy
        // this.game.addEntity(new Skeleton(
        //     this.game,
        //     300,
        //     300,
        //     ASSET_MANAGER.getAsset("./Sprites/Skeleton_Attack.png"),
        //     35, 75, 10, 20, 1.25, 100, 10, 20, 10
        // ));

        // Start screen properties
        this.startScreenActive = true;
        this.startBackground = ASSET_MANAGER.getAsset("./Sprites/Background.png");

        // Define start screen buttons
        this.buttons = {
            start: { x: 300, y: 300, width: 200, height: 50, text: "START GAME", defaultColor: "#FFFFFF", hoverColor: "#076500", currentColor: "#FFFFFF" },
            exit: { x: 300, y: 400, width: 200, height: 50, text: "EXIT GAME", defaultColor: "#FFFFFF", hoverColor: "#076500", currentColor: "#FFFFFF" }
        };
        const canvasWidth = this.game.ctx.canvas.width;
        this.buttons.start.x = (canvasWidth - this.buttons.start.width) / 2;
        this.buttons.exit.x = (canvasWidth - this.buttons.exit.width) / 2;

        // Mouse event handlers for start screen interaction
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

        // Create & position the sound checkbox (optional)
        const canvas = this.game.ctx.canvas;
        this.soundCheckbox = document.createElement("input");
        this.soundCheckbox.type = "checkbox";
        this.soundCheckbox.id = "soundCheckbox";
        this.soundCheckbox.checked = false; // start unchecked

        this.soundLabel = document.createElement("label");
        this.soundLabel.htmlFor = "soundCheckbox";
        this.soundLabel.textContent = " SOUND";

        this.soundContainer = document.createElement("div");
        this.soundContainer.style.position = "absolute";
        this.soundContainer.style.bottom = "10px";
        this.soundContainer.style.left = canvas.offsetLeft + "px";
        this.soundContainer.style.zIndex = "1000";

        this.soundContainer.appendChild(this.soundCheckbox);
        this.soundContainer.appendChild(this.soundLabel);
        document.body.appendChild(this.soundContainer);

        // Mute all sounds initially
        for (let key in ASSET_MANAGER.audioCache) {
            if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
                ASSET_MANAGER.audioCache[key].muted = true;
            }
        }

        // Toggle sound muting based on checkbox state
        this.soundCheckbox.addEventListener("change", () => {
            const mute = !this.soundCheckbox.checked;
            if (this.soundCheckbox.checked) {
                ASSET_MANAGER.playBackgroundMusic("./Sprites/Music/backgroundMusic.mp3");
            }
            for (let key in ASSET_MANAGER.audioCache) {
                if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
                    ASSET_MANAGER.audioCache[key].muted = mute;
                }
            }
        });
    }

    // update() {
    //     // Do not update the scene if we're on the start screen.
    //     if (this.startScreenActive) return;

    //     // Update camera position based on the player's location.
    //     if (!this.player) return;

    //     let currentX = this.player.x - this.game.ctx.canvas.width / 2 + this.player.width * 2;
    //     let currentY = this.player.y - this.game.ctx.canvas.height / 2 + this.player.height;
    //     this.x = currentX;
    //     this.y = currentY;

    //     // Simple boundary constraints.
    //     if (this.x < 0) this.x = 0;
    //     if (this.y < 0) this.y = 0;
    //     if (this.x > this.worldWidth) this.x = this.worldWidth;
    //     if (this.y > this.worldHeight) this.y = this.worldHeight;
    // }

    update() {
        
        //********** END: Start screen update code
        this.playergui.update(this.game.keys.get("e"));
        let currentX = this.player.x - this.game.ctx.canvas.width / 2 ;  // Character width and height, camera moving 
        let currentY = this.player.y - this.game.ctx.canvas.height / 2;
        this.x = currentX;
        this.y = currentY;
        
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
        }
        
        
    }

    draw(ctx) {
        // Draw start screen if active.
        if (this.startScreenActive) {
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
        }


        // Draw a HUD (for example, top bar with player stats)
        ctx.fillStyle = "rgba(49, 176, 123, 0.7)";
        ctx.fillRect(0, 0, ctx.canvas.width, 60);
        if (this.player) {
            this.drawHealthBar(ctx, 10, 10, 200, 20);
            this.playergui.draw(ctx);
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText(`Level ${this.player.experienceLevel}`, 10, 50);
            ctx.fillText(`Attack: ${this.player.getStatValue("strength")}`, 100, 50);
            ctx.fillText(`Speed: ${this.player.getStatValue("speed")}`, 250, 50);
            ctx.fillText(`Defense: ${this.player.getStatValue("stealth")}`, 400, 50);
        }

        // Draw debug information if enabled.
        if (this.game.debug) {
            this.drawDebugInfo(ctx);
        }
    }

    drawHealthBar(ctx, x, y, width, height) {
        ctx.fillStyle = "#444444";
        ctx.fillRect(x, y, width, height);
        if (!this.player) return;
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
        ctx.fillText(`FPS: ${Math.round(1 / this.game.clockTick)}`, 10, ctx.canvas.height - 20);
        ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
        if (this.player) {
            ctx.fillText(`Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`, 10, ctx.canvas.height - 60);
        }
    }
}