const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./PaladinSpriteSheet.png");
ASSET_MANAGER.queueDownload("./PlaceHolderSheet.png");
ASSET_MANAGER.queueDownload("./GoblinPlaceHolderSheet.png");
ASSET_MANAGER.queueDownload("./OrcSpriteTransparent.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	gameEngine.addEntity(new Paladin(gameEngine,50,50, ASSET_MANAGER.getAsset("./PlaceHolderSheet.png"), 17, 40, 16, 24, 100, 20, 10, 10));
	gameEngine.addEntity(new Goblin(gameEngine, 150,150, ASSET_MANAGER.getAsset("./OrcSpriteTransparent.png"), 17, 40, 16, 24, 100, 10, 20, 5));
	

	    // Create and add scene manager AFTER adding other entities
		const sceneManager = new SceneManager(gameEngine);
		gameEngine.addEntity(sceneManager);

		gameEngine.start();
});
