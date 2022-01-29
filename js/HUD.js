/**
 * Responsible for generating Heads Up display in game and updating itself
 */
class HUD {
  constructor(scene) {
    const HUDElement = document.getElementById('HUD');

    // pause indicator
    this.isGamePaused = false;

    // count points
    HUDElement.textContent += 'Points:';
    let count = 0;
    scene.onBeforeRenderObservable.add((scene) => {
      if (!scene.deltaTime){
        return
      } 
      if (this.isGamePaused){
          console.log('simple test')
      }
      if(scene.deltaTime)
      count += scene.deltaTime / 1000;
      HUDElement.textContent = 'Points:'.concat(String(Math.round(count)));
    });
  }

  static pause = (scene, engine) => {
    if (!this.isGamePaused) {
      engine.stopRenderLoop();
      this.isGamePaused = true;
    } else {
      engine.runRenderLoop(function () {
        scene.render();
      });
      this.isGamePaused = false;
    }
  };
  pause = (scene, engine) => {
    if (!this.isGamePaused) {
      engine.stopRenderLoop();
      this.isGamePaused = true;
    } else {
      engine.runRenderLoop(function () {
        scene.render();
      });
      this.isGamePaused = false;
    }
  };
}
