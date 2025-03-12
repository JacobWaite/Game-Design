class BoundingBox{
    constructor(parent, width, height, xOffset,yOffset,scale){
        Object.assign(this, {parent,xOffset, yOffset, scale})
        this.width = width * scale;
        this.height = height * scale;
        this.left = this.parent.x + this.xOffset;
        this.top = this.parent.y + this.yOffset;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;

    }

    collide(otherHitbox) {
        if(this.right > otherHitbox.left && this.left < otherHitbox.right && this.top < otherHitbox.bottom && this.bottom > otherHitbox.top) return true;
        return false;
    }

    updateHitBox() {
        this.left = this.parent.x + this.xOffset;
        this.top = this.parent.y + this.yOffset;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height; 
    }

    collisionDirection(otherHitbox) {
        let direction = "false";
        if(this.left >= otherHitbox.right -5  && this.left <= otherHitbox.right + 5) {
            direction = "left";
        } else if(this.right >= otherHitbox.left - 5 && this.right <= otherHitbox.left + 5) {
            direction = "right";
        } else if (this.top >= otherHitbox.bottom - 5 && this.top <= otherHitbox.bottom + 5) {
            direction = "top";
        } else if (this.bottom >= otherHitbox.top-5 && this.bottom <= otherHitbox.top + 5) {
            direction = "bottom";
        }
        return direction;
    }

    drawHitBox(ctx) {
        //ctx.strokeStyle = "red";
        ctx.strokeRect(this.left - this.parent.game.camera.x, this.top - this.parent.game.camera.y, this.width, this.height);
    } 

    toString() {
        return `LeftBound: ${this.left} TopBound: ${this.top} RightBound: ${this.right} BottomBound ${this.bottom}`;
    }
}