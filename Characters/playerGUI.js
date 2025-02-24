class playerGUI {
    constructor(player, game, sprite) {
        Object.assign(this, {player, game, sprite});
        this.x = this.player.x;
        this.y = this.player.y;
        this.visible = false;
        this.speedButton = new button(game, this.x - 119, this.y + 12, 20, 20);
    }

    draw(ctx) {
        if(this.visible) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.sprite, (this.x - this.game.camera.x) - ((this.sprite.naturalWidth * 2) / 2), (this.y - this.game.camera.y) - (this.sprite.naturalHeight * 1.25), this.sprite.naturalWidth * 3, this.sprite.naturalHeight * 3);
            ctx.fillStyle = '#44261e';
            ctx.fillRect((this.x - this.sprite.naturalWidth / 1.7) + (this.sprite.naturalWidth / 16), this.y - this.sprite.naturalHeight / 3.6, this.sprite.naturalWidth / 20, this.sprite.naturalHeight / 42);
            this.speedButton.draw(ctx);
        }


    }

    update(visible){
        this.speedButton.update(this.x - 119, this.y + 12);
        this.visible = visible;
        if(this.visible) {
            this.visible = true;
            this.speedButton.disabled = false;
            this.x = this.player.x;
            this.y = this.player.y;
        } else {
            this.visible = false;
        }

        if(this.speedButton.clicked()) {
            this.player.addStatPoint("speed");
            console.log("increase");
        }
    }


}