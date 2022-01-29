/**
 * Responsible for generating Heads Up display in game and updating itself
 */
class HUD {
    constructor (scene){
        const HUDElement = document.getElementById("HUD");

        HUDElement.textContent += "Points:";

        // let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, scene);
        // let loadedGUI = advancedTexture.parseFromURLAsync("gui.json");
    }


}