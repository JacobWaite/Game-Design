class AnimationPlayer {
    constructor(parent) {
        this.parent = parent;
        this.animations = new Map();
        this.currentAnimation = null;
        this.currentlyPlaying = false;
    };

    playAnimation(animationName, gameTick, ctx, x, y, scale) {
        
        this.animations.get(animationName).drawFrame(gameTick, ctx, x, y, scale);
        this.currentAnimation = animationName;
        this.currentlyPlaying = !this.animations.get(animationName).isDone();
    };

    addAnimation(name, animation) {
        if(animation instanceof Animation) {
            this.animations.set(name, animation);
        };
    };



}