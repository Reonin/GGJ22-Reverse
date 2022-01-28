class ActionManager {

    constructor() {
    }

    static establishInputs(scene, player, moon) {
        //console log out which key is pressed
        // 

        // sets inputs for player on the scene
        scene.actionManager = new BABYLON.ActionManager(scene);

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'd'
                },
                function () {
                    player.setForwardKeyDown(false);
                    // player.jump();
                }
            )

        );
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                    parameter: 'd'
                },
                function () {
                    player.setForwardKeyDown(true);
                }
            )
        );

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                    parameter: 'a'
                },
                function () {
                    player.setMoveBackwards(true);
                }
            )
        );

        
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                    parameter: ' '
                },
                function () {
                    player.setJumpKeyDown(true);
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
        );
        /**
         * Handles the moon shifting in and out of forms
         */
        moon.mesh.actionManager = new BABYLON.ActionManager(scene);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

        moon.mesh.actionManager.registerAction(
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPickTrigger, light, "diffuse", BABYLON.Color3.Black(), 1000)
        )
            .then(new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPickTrigger, light, "diffuse", BABYLON.Color3.White(), 1000)
            )

    }
}




