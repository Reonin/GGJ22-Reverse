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
                    parameter: 'w'
                },
                function () {
                    player.setMoveForwards(false);
                    // player.jump();
                }
            )

        );
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                    parameter: 'w'
                },
                function () {
                    player.setMoveForwards(true);
                }
            )
        );

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                    parameter: 's'
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
                    parameter: 's'
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
                    parameter: 'd'
                },
                function () {
                    player.setMoveRight(true);
                }
            )
        );

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'd'
                },
                function () {
                    player.setMoveRight(false);
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
                    player.setMoveLeft(true);
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
                    player.setMoveLeft(false);
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
                    player.changeForm(scene);
                    console.log(player.transformationState);
                }
            )
        );

        
        scene.onPointerDown = () => {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            // We try to pick an object
            console.log(pickResult.hit);

                player.changeForm();
                if(player.transformationState === 'wolfTop'){
                    moon.phaseDark();
                }
                else{
                    moon.phaselight();
                }
        };
    
        
    }
}




