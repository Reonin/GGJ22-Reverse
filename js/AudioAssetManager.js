class AudioAssetManager {
  constructor(scene) {
    let music1, music2, music3;
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
      });
    };

    let soundsReady = 0;

    function soundReady() {
      soundsReady++;
      if (soundsReady === 4) {
        // music1.play();
        // music2.play();
        // music3.play();
        music4.play();
      }
    }

    assetsManager.load();
  }
}
