class AudioAssetManager {
  wolfTrack = null;
  humanTrack = null;
  skateboardRoll = null;
  soundsReady = 0;
  constructor(scene) {
    let music1, music2, music3, music4, music5, music6;
    let sfx1, sfx2, sfx3, sfx4;
    let audioURL = '/GGJ22-Reverse/assets/audio/';
    if (location.hostname === '192.168.20.112') {
      audioURL = '/assets/audio/';
    }
    const that = this;
    // Assets manager
    const assetsManager = new BABYLON.AssetsManager(scene);

    const binaryTask = assetsManager.addBinaryFileTask(
      "WWOL task",
      audioURL.concat("WWOL.mp3")
    );
    binaryTask.onSuccess = function (task) {
      music1 = new BABYLON.Sound("WWOL", task.data, scene, that.soundReady, {
        loop: true,
      });
    };
/**
 * 
 */
    const binaryTask2 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_FULL task",
      audioURL.concat("A_Cursed_Life_FULL.mp3")
    );
    binaryTask2.onSuccess = function (task) {
      music2 = new BABYLON.Sound("A_Cursed_Life_FULL", task.data, scene, that.soundReady, {
        loop: false,
      });
    };
/**
 * 
 */
    const binaryTask3 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_INTRO task",
      audioURL.concat("A_Cursed_Life_INTRO.mp3")
    );
    binaryTask3.onSuccess = function (task) {
      music3 = new BABYLON.Sound("A_Cursed_Life_INTRO", task.data, scene, that.soundReady, {
        loop: false,
      });
    };

/**
 * 
 */
    const binaryTask4 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_Loop task",
      audioURL.concat("A_Cursed_Life_Loop.mp3")
    );
    binaryTask4.onSuccess = function (task) {
      music4 = new BABYLON.Sound("A_Cursed_Life_Loop", task.data, scene, that.soundReady, {
        loop: true,
        autoplay: false,
      });
    };

    /**
 * 
 */
     const binaryTask8 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_Human_Full task",
      audioURL.concat("A_Cursed_Life_Human_Full.mp3")
    );
    binaryTask8.onSuccess = function (task) {
      music5= new BABYLON.Sound("A_Cursed_Life_Human_Full", task.data, scene, that.soundReady, {
        loop: true,
        autoplay: false,
        volume : 0.05,
      });
      that.humanTrack = music5;
    };

    /**
 * 
 */
     const binaryTask9 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_Wolf_Full task",
      audioURL.concat("A_Cursed_Life_Wolf_Full.mp3")
    );
    binaryTask9.onSuccess = function (task) {
      music6 = new BABYLON.Sound("A_Cursed_Life_Wolf_Full", task.data, scene, that.soundReady, {
        loop: true,
        autoplay: false,
        volume : 0.05, 
      });
      that.wolfTrack = music6;
    };

/**
 * Sound FX
 */

 const binaryTask5 = assetsManager.addBinaryFileTask(
  "Footsteps task",
  audioURL.concat("Footsteps.mp3")
);
binaryTask5.onSuccess = function (task) {
  sfx1 = new BABYLON.Sound("Footsteps", task.data, scene, that.soundReady, {
    loop: false,
  });
};

const binaryTask6 = assetsManager.addBinaryFileTask(
  "Wolf_Axe_Hits task",
  audioURL.concat("Wolf_Axe_Hits.mp3")
);
binaryTask6.onSuccess = function (task) {
  sfx2 = new BABYLON.Sound("Wolf_Axe_Hits", task.data, scene, that.soundReady, {
    loop: false,
  });
};

const binaryTask7 = assetsManager.addBinaryFileTask(
  "Wolf_Rock_Hits task",
  audioURL.concat("Wolf_Rock_Hits.mp3")
);
binaryTask7.onSuccess = function (task) {
  sfx3 = new BABYLON.Sound("Wolf_Rock_Hits", task.data, scene, that.soundReady, {
    loop: false,
  });
};

const binaryTask10 = assetsManager.addBinaryFileTask(
  "Skateboard_Roll task",
  audioURL.concat("Skateboard_Roll.ogg")
);
binaryTask10.onSuccess = function (task) {
  sfx4 = new BABYLON.Sound("Skateboard_Roll", task.data, scene, that.soundReady, {
    loop: true,
    volume: 2,
  });
  that.skateboardRoll = sfx4;
};
     

    
    assetsManager.load();
  }

  soundReady = () => {
    this.soundsReady++;
    if (this.soundsReady === 10) {
      this.wolfTrack.play();
      this.humanTrack.play();
      this.skateboardRoll.play();
     
     
    }
  }

  transformTrack = (state) => {
    if(state === 'wolfTop'){
      this.wolfTrack.setVolume(0, 0.3);
      this.humanTrack.setVolume(0.05, 0.3);
    }
    else{
      this.humanTrack.setVolume(0, 0.3);
      this.wolfTrack.setVolume(0.05, 0.3);
    }
  }

}
