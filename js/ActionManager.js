class ActionManager {
    constructor (){
    }

    static establishInputs(scene, player){
    //console log out which key is pressed
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
            console.log("KEY DOWN: ", kbInfo.event.key);
            break;
            // case BABYLON.KeyboardEventTypes.KEYUP:
            // console.log("KEY UP: ", kbInfo.event.code);
            // break;
        }
     });

    // sets inputs for player on the scene
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: ' '
            },
            function () { 
                player.jump();
            }
        )
    );
    }
}