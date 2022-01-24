class AudioAssetManager {
  constructor(scene) {
    let music1, music2, music3;
    const audioURL = 'assets/audio/';
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

    // const binaryTask2 = assetsManager.addBinaryFileTask(
    //   "Violons11 task",
    //   "sounds/violons11.wav"
    // );
    // binaryTask2.onSuccess = function (task) {
    //   music2 = new BABYLON.Sound("Violons11", task.data, scene, soundReady, {
    //     loop: true,
    //   });
    // };

    // const binaryTask3 = assetsManager.addBinaryFileTask(
    //   "Cello task",
    //   "sounds/cellolong.wav"
    // );
    // binaryTask3.onSuccess = function (task) {
    //   music3 = new BABYLON.Sound("Cello", task.data, scene, soundReady, {
    //     loop: true,
    //   });
    // };

    let soundsReady = 0;

    function soundReady() {
      soundsReady++;
      if (soundsReady === 1) {
        music1.play();
        // music2.play();
        // music3.play();
      }
    }

    assetsManager.load();
  }
}
