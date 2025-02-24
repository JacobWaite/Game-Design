class startscreen {
    constructor(sprite, game) {
        this.sprite = sprite;
        this.startScreenActive = true;

        this.startScreen = sprite
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

    }

    draw(ctx) {
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
    }

    update() {

    }
}