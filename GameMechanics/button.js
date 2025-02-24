class button {
    constructor(game,x,y,width,height) {
        Object.assign(this, {game, x, y, width, height});
        this.mouseX = this.game.mouseCoordinates.x;
        this.mouseY = this.game.mouseCoordinates.y;
        this.disabled = true;
    }

    update(x,y) {
        this.x = x;
        this.y = y;
    }

    hovering() {
        console.log("hovering called");
        if(!this.disabled) {
            if (this.mouseX >= this.x && this.mouseX <= this.x + this.width &&
                this.mouseY >= this.y && this.mouseY <= this.y + this.height) {
                console.log(this.mouseX);
                return true;
            }
        }
        return false;
    }

    clicked() {
        if(!this.disabled && this.game.clicked) {
            return this.hovering();
        }
        return false;
    }

    draw(ctx) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
    }

    
}