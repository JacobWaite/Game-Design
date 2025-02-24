class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];



        this.audioCache = {};
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const img = new Image();

            const path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", () => {
                console.log("Loaded " + img.src);
                this.successCount++;
                if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.log("Error loading " + img.src);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    };
    // AUDIO METHODS
    // Preload an audio asset and store it in the audioCache.
    queueSound(path) {
        console.log("Queueing sound " + path);
        const audio = new Audio(path);
        audio.load();
        this.audioCache[path] = audio;
    }

    getSound(path) {
        return this.audioCache[path];
    }

    // Play a sound from the beginning.
    playSound(path) {
        const sound = this.getSound(path);
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        } else {
            console.error("Sound not found: " + path);
        }
    }

    // Pause the sound.
    pauseSound(path) {
        const sound = this.getSound(path);
        if (sound) {
            sound.pause();
        }
    }

    // Reset the sound to the beginning.
    resetSound(path) {
        const sound = this.getSound(path);
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    // Play background music with auto-repeat.
     playBackgroundMusic(path) {
        const sound = this.getSound(path);
        if (sound) {
            sound.loop = true;
            sound.currentTime = 0;
            sound.play();
        } else {
            console.error("Background music not found: " + path);

        }
    }

    // Stop background music and disable auto-repeat.
    stopBackgroundMusic(path) {
        const sound = this.getSound(path);
        if (sound) {
            sound.pause();
            sound.loop = false;
            sound.currentTime = 0;
        }
    }
    getAsset(path) {
        return this.cache[path];
    };


}

