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

	



	// gameEngine.addEntity(new Paladin(gameEngine, 50,50, ASSET_MANAGER.getAsset("./PlaceHolderSheet.png"), 17, 40, 16, 24, 100, 20, 10, 10));
	// gameEngine.addEntity(new Goblin(gameEngine, 150,150, ASSET_MANAGER.getAsset("./GoblinPlaceHolderSheet.png"), 17, 40, 16, 24, 100, 10, 20, 5));

	gameEngine.addEntity(new Paladin(gameEngine,50,50, ASSET_MANAGER.getAsset("./Sprites/Paladin_Spritesheet.png"), 17, 40, 16, 24, 100, 20, 100, 10));
	gameEngine.addEntity(new Goblin(gameEngine, 400,650, ASSET_MANAGER.getAsset("./Sprites/Goblin_Spritesheet.png"), 17, 40, 16, 24, 100, 10, 20, 5));
	gameEngine.addEntity(new Shopkeeper(gameEngine,325,650, ASSET_MANAGER.getAsset("./Sprites/Wizard_Spritesheet.png"), 17, 40, 16, 24, 100, 10, 20, 10));

	gameEngine.addEntity(new Skeleton(gameEngine,325,650, ASSET_MANAGER.getAsset("./Sprites/Skeleton_Walk.png"), 3, 0, 48.0059, 75, 100, 10, 20, 10));
	gameEngine.addEntity(new Skeleton(gameEngine,0,0, ASSET_MANAGER.getAsset("./Sprites/Skeleton_Attack.png"), 57, 98, 16, 24, 100, 10, 20, 10));

	// Create and add scene manager AFTER adding other entities
	const sceneManager = new SceneManager(gameEngine);
	gameEngine.addEntity(sceneManager);

	

	gameEngine.start();
});
