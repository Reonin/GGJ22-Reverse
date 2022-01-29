/**
 * Responsible for generating Heads Up display in game and updating itself
 */
class HUD {
    constructor (scene){
        const HUDElement = document.getElementById("HUD");

        HUDElement.textContent += "Points:";
        let count = 0;
        scene.onBeforeRenderObservable.add((thisScene, state) => {
            if (!thisScene.deltaTime) return;
            count += (thisScene.deltaTime / 1000);
           
            
            HUDElement.textContent = "Points:".concat( String(Math.round(count)));
        });
        // let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, scene);
        // let loadedGUI = advancedTexture.parseFromURLAsync("gui.json");
    }


}