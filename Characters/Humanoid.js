/**
 * A class used to create humanoid game entities, characterized by entities that can move and be killed.
 * @implements {Humanoid} 
 */

class Humanoid extends Entity{
    /**
     * Instantiates a Humanoid Object.
     * @param {*} game @inheritdoc 
     * @param {*} x  @inheritdoc
     * @param {*} y  @inheritdoc
     * @param {*} spriteSheet  @inheritdoc
     * @param {*} width  @inheritdoc
     * @param {*} height  @inheritdoc
     * @param {*} xSpriteOffset  @inheritdoc
     * @param {*} ySpriteOffset  @inheritdoc
     * @param {*} scale  @inheritdoc
     * @param {number} health how many health points to give the Humanoid.
     * @param {number} strength how many strength points to give the Humanoid.
     * @param {number} speed how many speed points to give the Humanoid.
     * @param {number} intelligence how many intelligence points to give the Humanoid.
     */
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale, health, strength, speed, intelligence) {
        super(game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset, scale);
        // a map that stores the value of the stat as well as the number of stat points, stat points can be increased by the player and represent a percent increase of the original stat value
        // this allows the player to upgrade stats throughout the game and also allows devs to easily change enemy strength
        this.statPoints = new Map();
        this.statPoints.set("health", health);
        this.statPoints.set("strength", strength);
        this.statPoints.set("speed", speed);
        this.statPoints.set("intelligence", [intelligence,0]);
    }
    /**
     * sets the value of the given stat given that the value is greater than zero.
     * @param {string} statName the name of the stat to set.
     * @param {number} statValue the value to set the stat to, must be greater than zero.
     */
    incrementStatValue(statName, statValue) {
        let current = this.statPoints.get(statName);
        if(current > 0) {
            this.statPoints.set(statName, current + statValue);
        } else {
            console.log("Value out of range for " + statName);
        }
    }
    /**
     * increases the stat points by 1, meant to be called by the player to upgrade. 
     * @param {"string"} statName the stat to upgrade
     */
    addStatPoint(statName) {
       
    }
    /**
     * returns the value of a given stat. 
     * @param {string} statName the name of the stat to return
     * @returns returns the integer value of the given stat. 
     */
    getStatValue(statName) {
        
        return this.statPoints.get(statName);
    }
    /**
     * returns the stat points of given stat, meant to be used to display to a player their stat points. 
     * @param {string} statName the name of the stat to return.
     * @returns the number of stat points the given stat contains. 
     */
    getStatPoints(statName) {
        return this.statPoints.get(statName);
    }

}