class Animation {
    constructor(spritesheet, xStart, yStart, spriteWidth, spriteHeight, frameCount, frameDurations, spritePadding, variableFrameTime, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, spriteWidth, spriteHeight, frameCount, frameDurations, spritePadding, variableFrameTime, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = 0;
        this.finished = false;
        if(variableFrameTime) {
            for(let i =0; i < this.frameDurations.length; i++) {
                this.totalTime += this.frameDurations[i];
            }
        } else {
            this.totalTime = this.frameCount * this.frameDurations[0];
        }
    };

    drawFrame(tick, ctx, x, y, scale) {
        if(this.finished) {
            this.elapsedTime = 0;
            this.finished = false;
        }
        this.elapsedTime += tick;
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.spriteWidth + this.spritePadding), this.yStart, //source from sheet
            this.spriteWidth, this.spriteHeight,
            x, y,
            this.spriteWidth * scale, this.spriteHeight * scale);
        
        if(!this.loop && this.currentFrame() == this.frameCount) {
            this.finished = true;
            return;
        } 
    };

    drawMatrixFrame(tick, ctx, x, y, scale, matrixWidth) {
        if(this.finished) {
            this.elapsedTime = 0;
            this.finished = false;
        }
       
        this.elapsedTime += tick;
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } 
        }
        let frame = this.currentFrame();
        //console.log(frame);
        if (this.reverse) frame = this.frameCount - frame - 1;
        //console.log(this.xStart + frame * (this.spriteWidth + this.spritePadding));
        ctx.drawImage(this.spritesheet,
            this.xStart + (frame % matrixWidth) * (this.spriteWidth + this.spritePadding), this.yStart + ((Math.floor(frame / matrixWidth))) * this.spriteHeight, //source from sheet
            this.spriteWidth, this.spriteHeight,
            x, y,
            this.spriteWidth * scale, this.spriteHeight * scale);

        if(!this.loop && this.currentFrame() == this.frameCount - 1) {
            this.finished = true;
            return;
        } 
    };
    currentFrame() {
        let currentAnimationFrame = 0;
        if(this.variableFrameTime) {
            let frameTime = 0;
            for(let i = 0; frameTime <= this.elapsedTime; i++) {
                frameTime += this.frameDurations[i];
                currentAnimationFrame = i;
            }
        } else {
            currentAnimationFrame = Math.floor(this.elapsedTime / this.frameDurations[0]);
        }
        return currentAnimationFrame;
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };

    currentlyPlaying(){
        return this.currentFrame() < this.frameCount - 1;
    }
    
};