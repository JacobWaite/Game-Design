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
ASSET_MANAGER.queueDownload("./Sprites/Gui.png");
ASSET_MANAGER.queueDownload("./Sprites/Statpoint.png");
ASSET_MANAGER.queueDownload("./Sprites/AnimatedAutum.png");
ASSET_MANAGER.queueDownload("./Sprites/Run.png");
ASSET_MANAGER.queueDownload("./Sprites/RunLeft.png");
ASSET_MANAGER.queueDownload("./Sprites/Attacks.png");
ASSET_MANAGER.queueDownload("./Sprites/Idle.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Plant.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Props.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Shadow_Plant.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Shadow.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Struct.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Tileset_Grass.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Tileset_Stone_Ground.png");
ASSET_MANAGER.queueDownload("./Sprites/TX_Tileset_Wall.png");

ASSET_MANAGER.queueSound("./Sprites/Music/backgroundMusic.mp3");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	new SceneManager(gameEngine);

	gameEngine.start();
});
