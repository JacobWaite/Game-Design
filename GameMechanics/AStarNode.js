//Used this website as reference: https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2
class AStarNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}
function aStar(start, goal, grid) {
    // Debug: Log start and goal positions
    //console.log(`A* Start: (${start.x}, ${start.y}), Goal: (${goal.x}, ${goal.y})`);

    // Validate start and goal nodes
    const startNode = grid.getNode(start.x, start.y);
    const goalNode = grid.getNode(goal.x, goal.y);

    if (!startNode || !goalNode || !startNode.walkable || !goalNode.walkable) {
        console.warn("A*: Start or goal node is not walkable.");
        return []; // No path if start or goal is invalid
    }

    const openList = [];
    const closedList = [];
    const startNodeAStar = new AStarNode(start.x, start.y);
    openList.push(startNodeAStar);

    while (openList.length > 0) {
        // Find node with the lowest f-score
        let currentNode = openList[0];
        let currentIndex = 0;
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        // Move current node from open to closed list
        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        // Check if goal is reached
        if (currentNode.x === goal.x && currentNode.y === goal.y) {
            const path = [];
            let current = currentNode;
            while (current != null) {
                path.push({ x: current.x, y: current.y });
                current = current.parent;
            }
            return path;
        }

        // Generate children
        const children = [];
        const directions = [
            { x: 0, y: -1 }, // North
            { x: 1, y: 0 },  // East
            { x: 0, y: 1 },  // South
            { x: -1, y: 0 }  // West
        ];

        for (const dir of directions) {
            const nodePos = { x: currentNode.x + dir.x, y: currentNode.y + dir.y };

            // Check if node is within grid bounds
            if (nodePos.x < 0 || nodePos.x >= grid.width || nodePos.y < 0 || nodePos.y >= grid.height) {
                continue;
            }

            // Check if node is walkable
            const gridNode = grid.getNode(nodePos.x, nodePos.y);
            if (!gridNode || !gridNode.walkable) {
                continue;
            }

            const newNode = new AStarNode(nodePos.x, nodePos.y);
            newNode.parent = currentNode;
            children.push(newNode);
        }

        // Process children
        for (const child of children) {
            // Skip if child is in the closed list
            if (closedList.some(node => node.equals(child))) {
                continue;
            }

            // Calculate g, h, and f values
            child.g = currentNode.g + 1;
            child.h = Math.abs(child.x - goal.x) + Math.abs(child.y - goal.y); // Manhattan distance
            child.f = child.g + child.h;

            // Skip if child is already in the open list with a lower g-score
            const openNode = openList.find(node => node.equals(child));
            if (openNode && child.g >= openNode.g) {
                continue;
            }

            openList.push(child);
        }
    }
    console.warn("A*: No path found.");
    return []; // No path found
}