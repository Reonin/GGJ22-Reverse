class AudioAssetManager {
  wolfTrack = null;
  humanTrack = null;
  skateboardRoll = null;
  axehitsfxArr = [];
  rockhitsfxArr = [];
  dooropensfxArr = [];
  howl = null;
  soundsReady = 0;
  constructor(scene) {
    let music1, music2, music3, music4, music5, music6;
    let sfx1, sfx2, sfx3, sfx4, sfx5, sfx6, sfx7, sfx8, sfx9, sfx10, sfx11, sfx12, sfx13;
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
      "A_Cursed_Life_H_LOOP_2 task",
      audioURL.concat("A_Cursed_Life_H_LOOP_2.ogg")
    );
    binaryTask8.onSuccess = function (task) {
      music5 = new BABYLON.Sound("A_Cursed_Life_H_LOOP_2", task.data, scene, that.soundReady, {
        loop: true,
        autoplay: false,
        volume: 0.1,
      });
      that.humanTrack = music5;
    };

    /**
 * 
 */
    const binaryTask9 = assetsManager.addBinaryFileTask(
      "A_Cursed_Life_W_LOOP_2 task",
      audioURL.concat("A_Cursed_Life_W_LOOP_2.ogg")
    );
    binaryTask9.onSuccess = function (task) {
      music6 = new BABYLON.Sound("A_Cursed_Life_W_LOOP_2", task.data, scene, that.soundReady, {
        loop: true,
        autoplay: false,
        volume: 0.1,
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
      "Wolf_Howl task",
      audioURL.concat("Wolf_Howl.ogg")
    );
    binaryTask7.onSuccess = function (task) {
      sfx3 = new BABYLON.Sound("Wolf_Howl", task.data, scene, that.soundReady, {
        loop: false,
        volume: 0.4,
      });
      that.howl = sfx3;
    };

    const binaryTask10 = assetsManager.addBinaryFileTask(
      "Skateboard_Roll task",
      audioURL.concat("Skateboard_Roll.ogg")
    );
    binaryTask10.onSuccess = function (task) {
      sfx4 = new BABYLON.Sound("Skateboard_Roll", task.data, scene, that.soundReady, {
        loop: true,
        volume: 1,
      });
      that.skateboardRoll = sfx4;
    };

/**
 * axes hitting array
 */
    const binaryTask11 = assetsManager.addBinaryFileTask(
      "Axe_Hit_01 task",
      audioURL.concat("Axe_Hit_01.ogg")
    );
    binaryTask11.onSuccess = function (task) {
      sfx5 = new BABYLON.Sound("Axe_Hit_01", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.axehitsfxArr.push(sfx5) ;
    };

    const binaryTask12 = assetsManager.addBinaryFileTask(
      "Axe_Hit_02 task",
      audioURL.concat("Axe_Hit_02.ogg")
    );
    binaryTask12.onSuccess = function (task) {
      sfx6 = new BABYLON.Sound("Axe_Hit_02", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.axehitsfxArr.push(sfx6) ;
    };

    const binaryTask13 = assetsManager.addBinaryFileTask(
      "Axe_Hit_03 task",
      audioURL.concat("Axe_Hit_03.ogg")
    );
    binaryTask13.onSuccess = function (task) {
      sfx7 = new BABYLON.Sound("Axe_Hit_03", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.axehitsfxArr.push(sfx7) ;
    };

    /**rock sfx */

    const binaryTask14 = assetsManager.addBinaryFileTask(
      "Rock_Hit_01 task",
      audioURL.concat("Rock_Hit_01.ogg")
    );
    binaryTask14.onSuccess = function (task) {
      sfx8 = new BABYLON.Sound("Rock_Hit_01", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.rockhitsfxArr.push(sfx8) ;
    };

    const binaryTask15 = assetsManager.addBinaryFileTask(
      "Rock_Hit_02 task",
      audioURL.concat("Rock_Hit_02.ogg")
    );
    binaryTask15.onSuccess = function (task) {
      sfx9 = new BABYLON.Sound("Rock_Hit_02", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.rockhitsfxArr.push(sfx9) ;
    };

    const binaryTask16 = assetsManager.addBinaryFileTask(
      "Rock_Hit_03 task",
      audioURL.concat("Rock_Hit_03.ogg")
    );
    binaryTask16.onSuccess = function (task) {
      sfx10 = new BABYLON.Sound("Rock_Hit_03", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.rockhitsfxArr.push(sfx10) ;
    };

     /**door open sfx */

     const binaryTask17 = assetsManager.addBinaryFileTask(
      "Door_Open_01 task",
      audioURL.concat("Door_Open_01.ogg")
    );
    binaryTask17.onSuccess = function (task) {
      sfx11 = new BABYLON.Sound("Door_Open_01", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.dooropensfxArr.push(sfx11) ;
    };

    const binaryTask18 = assetsManager.addBinaryFileTask(
      "Door_Open_02 task",
      audioURL.concat("Door_Open_02.ogg")
    );
    binaryTask18.onSuccess = function (task) {
      sfx12 = new BABYLON.Sound("Door_Open_02", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.dooropensfxArr.push(sfx12) ;
    };

    const binaryTask19 = assetsManager.addBinaryFileTask(
      "Door_Open_03 task",
      audioURL.concat("Door_Open_03.ogg")
    );
    binaryTask19.onSuccess = function (task) {
      sfx13 = new BABYLON.Sound("Door_Open_03", task.data, scene, that.soundReady, {
        loop: false,
        volume: 2,
      });
      that.dooropensfxArr.push(sfx13) ;
    };

    


    assetsManager.load();
  }

  soundReady = () => {
    this.soundsReady++;
    if (this.soundsReady === 19) {
      this.wolfTrack.play();
      this.humanTrack.play();
      this.skateboardRoll.play();


    }
  }

  transformTrack = (state) => {
    if (state === 'wolfTop') {
      this.wolfTrack.setVolume(0, 0.3);
      this.humanTrack.setVolume(0.1, 0.3);
    }
    else {
      this.humanTrack.setVolume(0, 0.3);
      this.wolfTrack.setVolume(0.1, 0.3);
    }
  }

}
