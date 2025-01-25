const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./OrcSpriteTransparent.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	gameEngine.addEntity(new Orc(gameEngine, 50, 50, ASSET_MANAGER.getAsset("./OrcSpriteTransparent.png")));

	gameEngine.start();
});
