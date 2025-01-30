class Humanoid extends Entity{
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence) {
        super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset);
        this.statPoints = new Map();
        this.statPoints.set("health", [health, 0]);
        this.statPoints.set("strength", [strength, 0]);
        this.statPoints.set("speed", [speed,0]);
        this.statPoints.set("intelligence", [intelligence,0]);
    }

    setStatValue(statName, statValue) {
        let array = this.statPoints.get(statName);
        if(statValue <= 100 && statValue > 0) {
            array[0] = statValue;
        } else {
            console.log("Value out of range for " + statName);
        }
    }

    setStatPoints(statName) {
        let array = this.statPoints.get(statName);
        array[1] = array[1] + 1;
    }

    getStatValue(statName) {
        let array = this.statPoints.get(statName);
        return array[0];
    }

    getStatPoints(statName) {
        let array = this.statPoints.get(statName);
        return array[1];
    }
}