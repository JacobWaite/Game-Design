class opening {
    constructor () {
        this.dialogue = ["This world has fallen dark and cold, abandoned long ago", "left in ruin, its people have fallen into anarchy, destruction ravenges the land",
            "Out of the darkness one must rise to reclaim this world...", "Many great and strong have taken up this task, and all have been come to ruin", "Does one again dare to rise up..."];
        this.continueDialogue = false;
        this.currentDialogue = 0;
    };

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        console.log(ctx.canvas.width);
        if(!this.continueDialogue) {
            ctx.fillStyle = "white";
            ctx.font = "64px Brush Script MT";
            ctx.fillText(this.dialogue[this.currentDialogue], 100,200);
        }

    }

    update() {
        this.continueDialogue = continueDialogue;
        
        if(this.continueDialogue) {
            if(!this.currentDialogue + 1 > this.dialogue.length) this.currentDialogue ++;
        }
    }
}