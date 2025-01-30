class AnimationPlayer {
    constructor(parent) {
        this.parent = parent;
        this.animations = new Map();
    };

    playAnimation(animationName, gameTick, ctx, x, y, scale) {
        
        this.animations.get(animationName).drawFrame(gameTick, ctx, x, y, scale);
        
    };

    addAnimation(name, animation) {
        if(animation instanceof Animation) {
            this.animations.set(name, animation);
        };
    };



}