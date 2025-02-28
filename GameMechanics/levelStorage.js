// Define LevelOne as its own object.
var LevelOne = {
    label: "Level 1",
    backgroundColor: "#049cd8",
    trees: [
        { x: 100,  y: 200 },
        { x: 500,  y: 210 },
        { x: 900,  y: 220 },
        { x: 1300, y: 230 },
        { x: 1700, y: 240 },
        { x: 2100, y: 250 },
        { x: 2500, y: 240 },
        { x: 2900, y: 230 },
        { x: 3300, y: 220 },
        { x: 3700, y: 210 }
    ],

    grass: {x: 2560, y: 1440}

};

// Define LevelTwo as its own object.
var LevelTwo = {
    label: "Level 2",
    backgroundColor: "#336699",
    trees: [
        { x: 50,  y: 300 },
        { x: 300, y: 350 },
        { x: 700, y: 320 },
        { x: 1100, y: 340 },
        { x: 1300, y: 300 }
    ],

    grass: {x: 2560, y: 1440}
};

// Create a LevelStorage object that holds both levels.
var LevelStorage = {
    levels: [LevelOne, LevelTwo],
    getLevels: function() {
        return this.levels;
    }
};