class playerGUI {
    constructor(player, game, sprite) {
        Object.assign(this, {player, game, sprite});
        this.x = this.game.ctx.canvas.width/2 ;
        this.y = this.game.ctx.canvas.height/2;
        this.statpoint = ASSET_MANAGER.getAsset("./Sprites/Statpoint.png");
        this.HUD = ASSET_MANAGER.getAsset("./Sprites/HUD.png");

        this.sprite.setAttribute('style','opacity:0.5');
        this.visible = false;
        this.buttons = [new button(this, "health", this.x - 182 , this.y - 51, 20, 20), new button(this, "regen", this.x - 182, this.y + 9, 20, 20),  
                        new button(this, "strength", this.x - 182, this.y + 72, 20, 20), new button(this, "stealth", this.x - 182, this.y + 123, 20, 20)];

    }

    drawHealthBar(ctx, x, y, width, height) {
        ctx.fillStyle = "#9fbbba";
        const healthPercent = this.player.getStatValue("health") / this.player.totalHealth;
        ctx.fillRect(x, y, width * healthPercent, height);
    }

    drawXpBar(ctx, x, y, width, height) {
        ctx.fillStyle = "white";
        const xpPercent = this.player.xp / this.player.experienceNeeded();
        ctx.fillRect(x, y, width * xpPercent, height);
    }

    draw(ctx) {
        ctx.drawImage(this.HUD, 50,this.game.ctx.canvas.height - this.HUD.naturalHeight, this.HUD.naturalWidth * 3, this.HUD.naturalHeight * 3);
        this.drawHealthBar(ctx, 194, this.game.ctx.canvas.height - this.HUD.naturalHeight + 54, 176, 15);
        this.drawXpBar(ctx, 191, this.game.ctx.canvas.height - this.HUD.naturalHeight + 39, 176, 6);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`${this.player.xp} / ${this.player.experienceNeeded()}   Runes: ${this.player.getRunes()}`, 191, this.game.ctx.canvas.height - this.HUD.naturalHeight + 35);
        ctx.font = "20px Arial";
        ctx.fillText(`Level ${this.player.experienceLevel}`, 70, this.game.ctx.canvas.height - 16);

        if(this.visible) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.sprite, this.x - this.sprite.naturalWidth, this.y - this.sprite.naturalHeight/2, this.sprite.naturalWidth * 3, this.sprite.naturalHeight * 3);
            this.buttons.forEach(element =>{
                element.draw(ctx);
                let statAmount = this.player.getStatPoints(element.name);
                for(let i =1; i < statAmount; i ++) {
                    ctx.drawImage(this.statpoint, element.x + 47 +((i-1) * this.statpoint.naturalWidth), element.y -14, this.statpoint.naturalWidth * 3, this.statpoint.naturalHeight * 3);
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
            if(this.player.getStatPoints(button) < 11 && button == "health") {
                let currentHealth = this.player.getStatValue(button);
                this.player.addStatPoint(button);
                this.player.incrementStatValue(button, Math.ceil (0.08 * currentHealth));
                this.player.totalHealth = this.player.getStatValue("health");

            } else if(button == "regen" && this.player.getStatPoints(button) < 11) {
                this.player.addStatPoint(button);
                this.player.incrementStatValue(button, 0.15);


            } else if(button == "strength" && this.player.getStatPoints(button) < 11) {
                let currentStrength = this.player.getStatValue(button);
                this.player.addStatPoint(button);
                this.player.incrementStatValue(button, Math.ceil(0.06 * currentStrength));

            } else if(button == "stealth" && this.player.getStatPoints("intelligence") < 11) {
                this.player.addStatPoint(button);
                this.player.incrementStatValue(button, 0.015);
            } 
        



            this.player.availableStatPoints -= 1;

        }
    }
}