// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        this.background = [];

        // Information on the input
        this.click = false;
        this.mouse = null;
        this.wheel = null;
        this.mouseCoordinates= null;
        this.keys = new Map();
        this.mousePressed = false;
        this.debug = true;
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousedown", e => {
            if (this.debugging) {
                console.log("MOUSE_DOWN", getXandY(e));
            }
            this.mouse = getXandY(e);
            this.mousePressed = true;
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.mouseCoordinates = getXandY(e);
            if(this.click) {
                this.click = false;
            } else {
                this.click = true;
            }
        });

        this.ctx.canvas.addEventListener("mouseup", e => {
            if (this.debugging) {
                console.log("MOUSEUP", getXandY(e));
            }
            e.preventDefault(); // Prevent Scrolling
            this.mousePressed = false;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys.set(event.key, true));
        this.ctx.canvas.addEventListener("keyup", event => this.keys.set(event.key, false));
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    addBackground(background) {
        this.background.push(background);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


        for (let i = this.background.length - 1; i >= 0; i--) {
            this.background[i].draw(this.ctx);
        }

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx);
            if(this.debug) {
                this.entities[i].hitBox.drawHitBox(this.ctx);
            }
        }

         this.camera.draw(this.ctx);
    };

    update() {
        let entitiesCount = this.entities.length;
        this.debug = document.getElementById("debug").checked;
        this.camera.update();
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
                
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)