class state {
    constructor(parent) {
            this.parent = parent;
            this.tick = parent.game.clockTick;
            this.completed = false;
            
    }

    isComplete(){};

    do(){};

    exit(){};
}