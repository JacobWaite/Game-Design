class button {
    constructor(parent,name,x,y,width,height) {
        Object.assign(this, {parent, name, x, y, width, height});
        this.mouseX = this.parent.game.mouseCoordinates.x;
        this.mouseY = this.parent.game.mouseCoordinates.y;
    }

    update() {
        this.mouseX = this.parent.game.mouseCoordinates.x;
        this.mouseY = this.parent.game.mouseCoordinates.y;
        
    }

    hovering() { 
        //if(this.disabled) {
        //console.log(`${this.mouseX} ${this.mouseY} this.x: ${this.x} this.y: ${this.y}`);
        if (this.mouseX >= this.x && this.mouseX <= this.x + this.width &&
            this.mouseY >= this.y && this.mouseY <= this.y + this.height) {
            //console.log(this.mouseX);
            return true;
        }
     //   }
        return false;
    }

    clicked() {
        if(this.hovering()) {
            //console.log(`button clicked: ${this.hovering()}`);
            this.parent.onclick(this.name);
        }
        
    }

    draw(ctx) {
        ctx.strokeStyle = "green";
        //console.log(this.name);
        if(this.hovering()) {
            ctx.strokeStyle = "red";
        }
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    
}