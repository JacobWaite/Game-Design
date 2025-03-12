class AnimationPlayer {
    constructor(parent) {
        this.parent = parent;
        this.animations = new Map();
        this.currentAnimation = null;
        this.currentlyPlaying = false;
    };

    getAnimation(animationName) {
        this.currentAnimation = this.animations.get(animationName);
        this.currentAnimationName = animationName;
        this.currentlyPlaying = !this.animations.get(animationName).finished; 
        return this.currentAnimation;
    };

    addAnimation(name, animation) {
        if(animation instanceof Animation) {
            this.animations.set(name, animation);
        };
    };



}