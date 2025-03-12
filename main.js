const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./Sprites/Goblin_Spritesheet.png");
ASSET_MANAGER.queueDownload("./Sprites/NightBorne.png");
ASSET_MANAGER.queueDownload("./Sprites/Ogre_Spritesheet.png");
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
ASSET_MANAGER.queueDownload("/Sprites/menuAssets/muteButton.png");
ASSET_MANAGER.queueDownload("/Sprites/menuAssets/button.png");
ASSET_MANAGER.queueDownload("/Sprites/menuAssets/questionButton.png");



ASSET_MANAGER.queueSound("./Sprites/Music/backgroundMusic.mp3");
ASSET_MANAGER.queueSound("./Sprites/Music/attack.mp3");
ASSET_MANAGER.queueSound("./Sprites/Music/goblinBonk.mp3");
ASSET_MANAGER.queueSound("./Sprites/Music/darkKnightAttack.mp3");



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	const tileSize = 32;
	const gridWidth = Math.ceil(canvas.width * 2 / tileSize);
	const gridHeight = Math.ceil(canvas.height * 2 / tileSize);
	gameEngine.grid = new Grid(tileSize, gridWidth, gridHeight);
	new SceneManager(gameEngine);

	gameEngine.start();
});
