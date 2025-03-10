class playerGUI {
    constructor(player, game, sprite) {
        Object.assign(this, {player, game, sprite});
        this.x = this.game.ctx.canvas.width/2 ;
        this.y = this.game.ctx.canvas.height/2;
        this.statpoint = ASSET_MANAGER.getAsset("./Sprites/Statpoint.png");
        this.sprite.setAttribute('style','opacity:0.5');
        this.visible = false;
        this.buttons = [new button(this, "health", this.x - 143 , this.y - 108, 20, 20), new button(this, "speed", this.x - 143, this.y - 58, 20, 20),  
                        new button(this, "strength", this.x - 143, this.y - 5, 20, 20), new button(this, "stealth", this.x - 143, this.y + 37, 20, 20)];

    }

    draw(ctx) {
        if(this.visible) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.sprite, this.x - this.sprite.naturalWidth, this.y - this.sprite.naturalHeight/2, this.sprite.naturalWidth * 3, this.sprite.naturalHeight * 3);

            this.buttons.forEach(element =>{
                element.draw(ctx);
                let statAmount = this.player.getStatPoints(element.name);
                for(let i =1; i < statAmount; i ++) {
                    ctx.drawImage(this.statpoint, element.x + 42 +((i-1) * this.statpoint.naturalWidth), element.y -11.5, this.statpoint.naturalWidth * 3, this.statpoint.naturalHeight * 3);
                }
            });
        }
    }

    update(visible){
        this.buttons.forEach(element => {
            element.update();
        });
        this.visible = visible;
        if(this.visible) {
            this.visible = true;
        } else {
            this.visible = false;
        }

        
        
    }

    onclick(button) {
        if(this.player.availableStatPoints > 0) {
            console.log(button);
            this.player.addStatPoint(button);
            this.player.availableStatPoints -= 1;

        }
    }
}