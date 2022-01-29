/**
 * Responsible for generating Heads Up display in game and updating itself
 */
class HUD {
  constructor(scene) {
    this.isGamePaused = false;
    // points indicator
    const HUDElement = document.getElementById('HUD');
    HUDElement.textContent += 'Points:';

    // points counter
    let count = 0;
    scene.onBeforeRenderObservable.add((thisScene, state) => {
      if (!thisScene.deltaTime) return;
      count += thisScene.deltaTime / 1000;
      HUDElement.textContent = 'Points:'.concat(String(Math.round(count)));
    });
  }

  pause = (scene, engine) => {
    if (!this.isGamePaused) {
      engine.stopRenderLoop();
      this.isGamePaused = true;
      // pause button
      const HUDElementPause = document.getElementById('PAUSE');
      HUDElementPause.textContent = 'Resume';
    } else {
      engine.runRenderLoop(function () {
        scene.render();
      });
      this.isGamePaused = false;
      // pause button
      const HUDElementPause = document.getElementById('PAUSE');
      HUDElementPause.textContent = 'Pause';
    }
  };
}
