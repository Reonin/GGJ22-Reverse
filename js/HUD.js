/**
 * Responsible for generating Heads Up display in game and updating itself
 */
class HUD {
  gameInit = true;
  HUDElementMenu = ''
  constructor(scene, engine) {
    this.isGamePaused = false;
    
    // points indicator
    const HUDElement = document.getElementById('HUD');
    HUDElement.textContent += 'Points:';
    // points counter
    let count = 0;
    scene.onBeforeRenderObservable.add((thisScene, state) => {
        if(this.gameInit){
            engine.stopRenderLoop();
        }
      if (!thisScene.deltaTime) return;
      count += thisScene.deltaTime / 1000;
      HUDElement.textContent = 'Points:'.concat(String(Math.round(count)));
    });
  }

  start = (scene, engine) => {
    ActionManager.disbaleStartButton(scene);
    this.gameInit = false; 
    engine.runRenderLoop(function () {
        scene.render();
      });
      this.HUDElementMenu = document.getElementById('START');
      this.HUDElementMenu.innerHTML = 'PAUSE: ESC'
      this.HUDElementMenu.id = 'PAUSE'

  }

  restart = (scene, engine) => {
    const newScene = scene;
    scene.dispose()
    engine.runRenderLoop(function () {
      newScene.render();
    });
  }

  pause = (scene, engine, player, moon) => {
    if (!this.isGamePaused) {
      ActionManager.pauseActions(scene);
      engine.stopRenderLoop();
      this.isGamePaused = true;
      // pause button
      this.HUDElementMenu = document.getElementById('PAUSE');
      const PauseMenuHtml = `<ul>
      <li>Resume: esc </li>
      <li>Left/Right: A/D </li>
      <li>Up/Down: W/S </li>
      <li>Jump: Space </li>
      <li>Transform: Z </li>
        </ul> `;
      this.HUDElementMenu.innerHTML = PauseMenuHtml;
      this.HUDElementMenu.id = 'MENU'
    } else {
      this.HUDElementMenu = document.getElementById('MENU');
      this.HUDElementMenu.id = 'PAUSE'
      const gameHTML = `<ul>
      <li>Pause: esc </li>
      </ul> `;
      this.HUDElementMenu.innerHTML = gameHTML;
      ActionManager.addPhaseBack(scene, player, moon);
      engine.runRenderLoop(function () {
        scene.render();
      });
      this.isGamePaused = false;
    }
  };
}
