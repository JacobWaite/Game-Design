class BoundingBox{
    constructor(parent, width, height, xOffset,yOffset,scale){
        Object.assign(this, {parent, width, height, xOffset, yOffset, scale})
        this.left = this.parent.x + this.xOffset * this.scale;
        this.top = this.parent.y + this.yOffset * this.scale;
        this.right = this.left + this.width * this.scale;
        this.bottom = this.top + this.height * this.scale;

    }

    collide(other) {
        if(this.right > other.left && this.left < other.right && this.top < other.bottom && this.bottom > other.top) return true;
        return false;
    }

    updateHitBox() {
        this.left = this.parent.x - this.parent.game.camera.x + this.xOffset * this.scale;
        this.top = this.parent.y - this.parent.game.camera.y + this.yOffset * this.scale;
        this.right = this.left + this.width * this.scale;
        this.bottom = this.top + this.height * this.scale; 
    }

    drawHitBox(ctx) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.left, this.top, this.width*this.scale, this.height* this.scale);
    } 

    toString() {
        return "LeftBound: " + this.left + "TopBound: " + this.top + "RightBound: " + this.right + "BottomBound: " + this.bottom;
    }
}