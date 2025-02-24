class Grid {
    constructor(width, height, tileSize) {
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.grid = this.createGrid();
        this.paladinPosition = null;
    }
    //creates a 2d array representing a grid
    createGrid() {
        const grid = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push({ x, y, walkable: true });
            }
            grid.push(row);
        }
        return grid;
    }
    //determines whether each tile is walkable
    setWalkable(x, y, walkable) {
        if (x >= 0 && x < this.width &&
            y >= 0 && y < this.height
        ) {
            this.grid[y][x].walkable = walkable;
        }
    }
    //gives paladin position on the grid
    updatePaladinPosition(paladin) {
        const x = Math.floor(paladin.x / this.tileSize);
        const y = Math.floor(paladin.y / this.tileSize);
        this.paladinPosition = { x, y };
    }
    getNode(x, y) {
        if (x >= 0 && x < this.width &&
            y >= 0 && y < this.height
        ) {
            return this.grid[y][x];
        }
        return null;
    }
    //convert the world coordinates in pixels to the tile based coordinates
    worldToGrid(x, y) {
        return {
            x: Math.floor(x / this.tileSize),
            y: Math.floor(y / this.tileSize),
        };
    }
    //convert grid coordinates to the world coordniates
    gridToWorld(x, y) {
        return {
            x: x * this.tileSize,
            y: y * this.tileSize,
        };
    }
}