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
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'a'
                },
                function () {
                    player.setMoveBackwards(false);
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
         * Handles the moon shifting in and out of forms.  Clicking the Moon will give you the state change as well
         */
        moon.mesh.actionManager = new BABYLON.ActionManager(scene);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

        moon.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    player.changeForm();
                    alert(player.transformationState)
                    moon.phaseDark();
            }))
            .then(            
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                    player.changeForm();
                    alert(player.transformationState)
                    moon.phaselight();
        })
            )

    }
}




