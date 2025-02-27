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
<<<<<<< HEAD
ASSET_MANAGER.queueDownload("./Sprites/Gui.png");
ASSET_MANAGER.queueDownload("./Sprites/AnimatedAutum.png");

=======
ASSET_MANAGER.queueSound("./Sprites/Music/backgroundMusic.mp3");
>>>>>>> a0cc336c4264285106bfe93b85b2bc6b1c798e71

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
