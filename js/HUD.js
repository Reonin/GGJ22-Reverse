/**
 * Responsible for generating Heads Up display in game and updating itself
 */
class HUD {
  gameInit = true;
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
    
  }

  pause = (scene, engine, player, moon) => {
    if (!this.isGamePaused) {
      ActionManager.pauseActions(scene);
      engine.stopRenderLoop();
      this.isGamePaused = true;
      // pause button
      const HUDElementPause = document.getElementById('PAUSE');
      const PauseMenuHtml = `<ul>
      <li>Resume: esc </li>
      <li>Restart: R </li>
      <li>Scores: p </li>
      <li>Controls: C </li>
        </ul> `;
      HUDElementPause.innerHTML = PauseMenuHtml;
    } else {
      const HUDElementPause = document.getElementById('PAUSE');
      const gameHTML = `<ul>
      <li>Pause: esc </li>
      </ul> `;
      HUDElementPause.innerHTML = gameHTML;
      ActionManager.addPhaseBack(scene, player, moon);
      engine.runRenderLoop(function () {
        scene.render();
      });
      this.isGamePaused = false;
    }
  };
}
