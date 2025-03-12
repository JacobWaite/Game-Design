class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.soundOn = false;
        this.soundButton = document.createElement("img");
        this.soundButton.src = "./Sprites/menuAssets/muteButton.png"; // initial muted image
        this.soundButton.style.position = "absolute";
        this.soundButton.style.bottom = "230px";
        this.soundButton.style.right = "450px";
        this.soundButton.style.cursor = "pointer";

        this.soundButton.addEventListener("click", () => {
            this.soundOn = !this.soundOn;
            if (this.soundOn) {
                ASSET_MANAGER.playBackgroundMusic("./Sprites/Music/backgroundMusic.mp3");
                this.soundButton.src = "./Sprites/menuAssets/button.png";
            } else {
                ASSET_MANAGER.stopBackgroundMusic("./Sprites/Music/backgroundMusic.mp3");
                this.soundButton.src = "./Sprites/menuAssets/muteButton.png";
            }
            for (let key in ASSET_MANAGER.audioCache) {
                if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
                    ASSET_MANAGER.audioCache[key].muted = !this.soundOn;
                }
            }
        });
        // Create the instructions button.
        this.instructionsButton = document.createElement("img");
        this.instructionsButton.src = "./Sprites/menuAssets/questionButton.png"; // your instructions icon path
        this.instructionsButton.style.position = "absolute";
        this.instructionsButton.style.bottom = "230px";
        this.instructionsButton.style.left = "16px"; // adjust corner as needed
        this.instructionsButton.style.cursor = "pointer";

        // Create the context window for instructions.
        this.instructionsContainer = document.createElement("div");
        this.instructionsContainer.style.position = "absolute";
        this.instructionsContainer.style.bottom = "300px"; // position above the button
        this.instructionsContainer.style.left = "16px";  // same horizontal position as button
        this.instructionsContainer.style.padding = "10px";
        this.instructionsContainer.style.backgroundColor = "rgba(92,171,7,1)";
        this.instructionsContainer.style.color = "black";
        this.instructionsContainer.style.border = "2px solid black";
        this.instructionsContainer.style.display = "none"; // hidden by default

        // Add the instructions content.
        this.instructionsContainer.innerHTML = `
        <strong>Player Controls:</strong>
        <ul style="margin: 0; padding-left: 20px;">
        <li>W: Up</li>
        <li>S: Down</li>
        <li>A: Left</li>
        <li>D: Right</li>
        <li>Left Mouse Button: Attack</li>
        </ul>
        `;

        // Toggle context window on button click.
        this.instructionsButton.addEventListener("click", () => {
            this.instructionsContainer.style.display =
            this.instructionsContainer.style.display === "none" ? "block" : "none";
            });

        // Append the button and the instructions container to the document.
        document.body.appendChild(this.instructionsButton);
        document.body.appendChild(this.instructionsContainer);
        document.body.appendChild(this.soundButton);
        // Camera / world positioning
        this.x = 0;
        this.y = 0;
        this.worldWidth = this.game.ctx.canvas.width * 4 - 160;
        this.worldHeight = this.game.ctx.canvas.height * 4 - 90;
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

       
        this.game.addEntity(new checkpoint(this.game, 1022, 210, ASSET_MANAGER.getAsset("./Sprites/checkpoint.png"), 22, 8, 10,42,2));
        this.game.addEntity(new checkpoint(this.game, 650, 1640, ASSET_MANAGER.getAsset("./Sprites/checkpoint.png"), 22, 8, 10,42,2));
        this.game.addEntity(new checkpoint(this.game, 2199, 1945, ASSET_MANAGER.getAsset("./Sprites/checkpoint.png"), 22, 8, 10,42,2));

        this.game.addEntity(new Paladin(
            this.game,
            1000,
            120,
            [ASSET_MANAGER.getAsset("./Sprites/Run.png"), ASSET_MANAGER.getAsset("./Sprites/Idle.png"), ASSET_MANAGER.getAsset("./Sprites/RunLeft.png"), ASSET_MANAGER.getAsset("./Sprites/Attacks.png"),ASSET_MANAGER.getAsset("./Sprites/Pray.png"),ASSET_MANAGER.getAsset("./Sprites/Death.png")],
            24, 42, 68, 22, 1.25, 100, 20, 150, 10
        ));
        // Set reference to the player for camera tracking
        this.player = this.game.entities.find(e => e instanceof Paladin);
        this.playergui = new playerGUI(this.player,this.game,ASSET_MANAGER.getAsset("./Sprites/Gui.png"));

         // Add a Goblin enemy
        this.game.addEntity(new Goblin(this.game,1200,800,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 8, 75, 5));
        this.game.addEntity(new Goblin(this.game,900,850,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));
        this.game.addEntity(new Goblin(this.game,500,850,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));

        this.game.addEntity(new Goblin(this.game,1800,800,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 8, 75, 5));
        this.game.addEntity(new Goblin(this.game,1700,850,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));
        this.game.addEntity(new Goblin(this.game,1600,850,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));

        this.game.addEntity(new Goblin(this.game,800,2200,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 8, 75, 5));
        this.game.addEntity(new Goblin(this.game,600,2350,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));
        this.game.addEntity(new Goblin(this.game,400,2100,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));

        this.game.addEntity(new Goblin(this.game,1600,2000,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 8, 75, 5));
        this.game.addEntity(new Goblin(this.game,1650,2050,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));
        this.game.addEntity(new Goblin(this.game,1550,2100,[ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), ASSET_MANAGER.getAsset("./Sprites/Goblin_SpritesheetLeft.png")],25, 45, 18, 25, 1, 80, 5, 50, 5));
        
       this.game.addEntity(new DarkKnight(
        this.game,
        3300,
        2200,
        [ASSET_MANAGER.getAsset("./Sprites/NightBorne.png"), ASSET_MANAGER.getAsset("./Sprites/NightBorneLeft.png")],
        22, 32, 48, 44, 1.5, 250, 20, 120, 5
        ));
        
        this.game.addEntity(new DarkKnight(
            this.game,
            4000,
            800,
            [ASSET_MANAGER.getAsset("./Sprites/NightBorne.png"), ASSET_MANAGER.getAsset("./Sprites/NightBorneLeft.png")],
            22, 32, 48, 44, 1.5, 250, 20, 120, 5
            ));
        

        this.game.addEntity(new DarkKnight(
            this.game,
            3500,
            2400,
            [ASSET_MANAGER.getAsset("./Sprites/NightBorne.png"), ASSET_MANAGER.getAsset("./Sprites/NightBorneLeft.png")],
            22, 32, 48, 44, 1.5, 250, 20, 120, 5
        ));

        this.game.addEntity(new DarkKnight(
            this.game,
            1200,
            2600,
            [ASSET_MANAGER.getAsset("./Sprites/NightBorne.png"), ASSET_MANAGER.getAsset("./Sprites/NightBorneLeft.png")],
            22, 32, 48, 44, 1.5, 250, 20, 120, 5
        ));

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
      
        // this.soundLabel = document.createElement("label");
        // this.soundLabel.htmlFor = "soundCheckbox";
        // this.soundLabel.textContent = " SOUND";

        // this.soundContainer = document.createElement("div");
        // this.soundContainer.style.position = "absolute";
        // this.soundContainer.style.bottom = "10px";
        // this.soundContainer.style.left = canvas.offsetLeft + "px";
        // this.soundContainer.style.zIndex = "1000";

        // this.soundContainer.appendChild(this.soundCheckbox);
        // this.soundContainer.appendChild(this.soundLabel);
        // document.body.appendChild(this.soundContainer);

        // Mute all sounds initially
        for (let key in ASSET_MANAGER.audioCache) {
            if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
                ASSET_MANAGER.audioCache[key].muted = true;
            }
        }

        // Toggle sound muting based on checkbox state
        // this.soundCheckbox.addEventListener("change", () => {
        //     const mute = !this.soundCheckbox.checked;
        //     if (this.soundCheckbox.checked) {
        //         ASSET_MANAGER.playBackgroundMusic("./Sprites/Music/backgroundMusic.mp3");
        //     }
        //     for (let key in ASSET_MANAGER.audioCache) {
        //         if (ASSET_MANAGER.audioCache.hasOwnProperty(key)) {
        //             ASSET_MANAGER.audioCache[key].muted = mute;
        //         }
        //     }
        // });
    }

    update() {
        if(!this.player.dead || !this.game.won) {
            this.playergui.update(this.game.keys.get("e"));
            let currentX = this.player.x - this.game.ctx.canvas.width / 2 ;  // Character width and height, camera moving 
            let currentY = this.player.y - this.game.ctx.canvas.height / 2;
            this.x = currentX;
            this.y = currentY;
        
            if (currentX <= 37) {
                this.x = 37;
            } 
            if (currentY <= 37) {
                this.y = 37;
            } 
            if (currentX >= this.worldWidth - this.game.ctx.canvas.width) {
                this.x = this.worldWidth - this.game.ctx.canvas.width;
            } 
            if (currentY >= this.worldHeight - this.game.ctx.canvas.height) {
                this.y = this.worldHeight - this.game.ctx.canvas.height;
            }
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
        this.playergui.draw(ctx);
        if(this.game.won) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/YouWin.png"),0,0);

        }else if(this.game.gameOver) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/YOUDIED.png"),0,0);
        }
        // Draw debug information if en abled.
        if (this.game.debug) {
            this.drawDebugInfo(ctx);
        }
    }

    drawDebugInfo(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(`FPS: ${Math.round(1 / this.game.clockTick)}`, 10, ctx.canvas.height - 20);
        ctx.fillText(`AttackComplete: ${this.player.attackComplete}`, 10, ctx.canvas.height - 10);
        ctx.fillText(`Entities: ${this.game.entities.length}`, 10, ctx.canvas.height - 40);
        if (this.player) {
            ctx.fillText(`Player Pos: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`, 10, ctx.canvas.height - 60);
        }
    }
}