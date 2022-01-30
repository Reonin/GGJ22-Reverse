class AudioAssetManager {
  constructor(scene) {
    let music1, music2, music3, music4, music5, music6;
    let sfx1, sfx2, sfx3;
    let audioURL = '/GGJ22-Reverse/assets/audio/';
    if (location.hostname === '192.168.20.112') {
      audioURL = '/assets/audio/';
    }

    // Assets manager
    const assetsManager = new BABYLON.AssetsManager(scene);

    const binaryTask = assetsManager.addBinaryFileTask(
      "WWOL task",
      audioURL.concat("WWOL.mp3")
    );
    binaryTask.onSuccess = function (task) {
      music1 = new BABYLON.Sound("WWOL", task.data, scene, soundReady, {
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
      music2 = new BABYLON.Sound("A_Cursed_Life_FULL", task.data, scene, soundReady, {
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
      music3 = new BABYLON.Sound("A_Cursed_Life_INTRO", task.data, scene, soundReady, {
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
      music4 = new BABYLON.Sound("A_Cursed_Life_Loop", task.data, scene, soundReady, {
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
      music5= new BABYLON.Sound("A_Cursed_Life_Human_Full", task.data, scene, soundReady, {
        loop: true,
        autoplay: false,
      });
    };

    /**
 * 
 */
     const binaryTask9 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_Wolf_Full task",
      audioURL.concat("A_Cursed_Life_Wolf_Full.mp3")
    );
    binaryTask9.onSuccess = function (task) {
      music6 = new BABYLON.Sound("A_Cursed_Life_Wolf_Full", task.data, scene, soundReady, {
        loop: true,
        autoplay: false,
      });
    };

/**
 * Sound FX
 */

 const binaryTask5 = assetsManager.addBinaryFileTask(
  "Footsteps task",
  audioURL.concat("Footsteps.mp3")
);
binaryTask5.onSuccess = function (task) {
  sfx1 = new BABYLON.Sound("Footsteps", task.data, scene, soundReady, {
    loop: false,
  });
};

const binaryTask6 = assetsManager.addBinaryFileTask(
  "Wolf_Axe_Hits task",
  audioURL.concat("Wolf_Axe_Hits.mp3")
);
binaryTask6.onSuccess = function (task) {
  sfx2 = new BABYLON.Sound("Wolf_Axe_Hits", task.data, scene, soundReady, {
    loop: false,
  });
};

const binaryTask7 = assetsManager.addBinaryFileTask(
  "Wolf_Rock_Hits task",
  audioURL.concat("Wolf_Rock_Hits.mp3")
);
binaryTask7.onSuccess = function (task) {
  sfx3 = new BABYLON.Sound("Wolf_Rock_Hits", task.data, scene, soundReady, {
    loop: false,
  });
};
    let soundsReady = 0;

    function soundReady() {
      soundsReady++;
      if (soundsReady === 9) {
        // music1.play();
        // music2.play();
        // music3.play();
        // music4.play();
        music5.play();
        music6.play();
      }
    }

    assetsManager.load();
  }
}
