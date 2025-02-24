const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./Sprites/Goblin_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/Paladin_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/Wizard_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/Skeleton_Walk.png");
ASSET_MANAGER.queueDownload("./Sprites/Skeleton_Attack.png");
ASSET_MANAGER.queueDownload("./Sprites/Grass.png");
ASSET_MANAGER.queueDownload("./Sprites/Tree.png");
ASSET_MANAGER.queueDownload("./Sprites/Background.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	const tileSize = 32;
	const gridWidth = Math.ceil(canvas.width * 2 / tileSize);
	const gridHeight = Math.ceil(canvas.height * 2 / tileSize);
	gameEngine.grid = new Grid(tileSize, gridWidth, gridHeight);
	//adds obstacles to the grid
	const treePositions = [
		{ x: 100, y: 200 },
		{ x: 400, y: 250 },
		{ x: 900, y: 220 },
		{ x: 1200, y: 240 },
		{ x: 1400, y: 220 },
		{ x:1600, y: 240 },
	];
	for (const pos of treePositions) {
		const gridX = Math.floor(pos.x / tileSize);
		const gridY = Math.floor(pos.y / tileSize);
		gameEngine.grid.setWalkable(gridX, gridY, false);
	}
	const sceneManager = new SceneManager(gameEngine);
	gameEngine.sceneManager = sceneManager;
	
	gameEngine.start();
});
