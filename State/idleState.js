class idleState extends state {
    constructor(parent, entity) {
        super(parent, entity);
        this.parent = root;

    }
    do() {
        this.entity.playAnimation("idle");
        if(this.isComplete()) {
            this.exit();
        }
    }
    isComplete() {
        return this.parent.animationPlayer.currentlyPlaying;
    }
    exit() {
        
    };
}