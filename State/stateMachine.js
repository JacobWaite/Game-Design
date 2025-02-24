class stateMachine {
    contructor() {
        this.stateList = [];
        this.currentState = 
        this.root
    }

    decideState() {
        if(moving) {
            this.currentState = moving;
        }
        if(attacking){
            this.currentState = attacking;
        }
        if(staggered) {
            this.currentState = staggered;
        }
        
    }
}