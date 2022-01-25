class ActionManager {

    constructor() {
    }

    static establishInputs(scene, player) {
        //console log out which key is pressed
        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case ' ':
                            console.log("KEY DOWN: ", kbInfo.event.key);
                            player.setJumpKeyDown(true);
                            break;
                    }
                case BABYLON.KeyboardEventTypes.KEYUP:
                    switch (kbInfo.event.key) {
                        case ' ':
                            console.log("KEY DOWN: ", kbInfo.event.key);
                            player.setJumpKeyDown(false);
                            break;
                    }

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
                    player.setJumpKeyDown(true);
                    // player.jump();
                }
            )
        );

        scene.actionManager.registerAction( 
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: ' '
                },
                function () { 
                    player.setJumpKeyDown(false);
                    // player.jump();
                }
            )

        );
        /** Press Z to transform between states */
        scene.actionManager.registerAction( 
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'z'
                },
                function () { 
                    player.changeForm();
                    console.log(player.transformationState);
                }
            )
        )

    }
}




