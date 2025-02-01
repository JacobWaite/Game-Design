const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Sprites/Goblin_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/Paladin_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/Wizard_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/Skeleton_Walk.png");
ASSET_MANAGER.queueDownload("./Sprites/Grass.png");
ASSET_MANAGER.queueDownload("./Sprites/Tree.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	// Create and add scene manager AFTER adding other entities
	new SceneManager(gameEngine);

	gameEngine.start();
});
