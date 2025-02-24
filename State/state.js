class state {
    constructor(stateMachine) {
        this.entity = entity;     
        this.parent = parent;
        this.child = NULL;
        this.tick = parent.game.clockTick;
        this.completed = false;
        this.name = NULL;

            
    }

    isComplete(){};

    do(){};

    exit(){};
}