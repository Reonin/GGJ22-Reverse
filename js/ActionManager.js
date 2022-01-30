class ActionManager {

    constructor() {
    }

    static establishInputs(scene, player, moon, hud, engine, audioMan) {
        //console log out which key is pressed
    

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
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              {
                trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                parameter: (KeyboardEvent.code = 27),
              },
              function () {
                hud.pause(scene, engine, player, moon);
              }
            )
          );
        /** Press Z to transform between states */
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'y'
                },
                function () {
                    console.log('good luck')
                    hud.start(scene, engine)

                }
                )
            );

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'r'
                },
                function () {
                    console.log("RESTARTING")
                    hud.restart(scene, engine)
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
                // console.log("testsees")
                player.changeForm();
                moon.phase(scene);
                audioMan.transformTrack(player.transformationState);
                console.log(player.transformationState);
            }
            )
        );
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'r'
                },
                function () {
                    // console.log("testsees")
                   location.reload();
                }
                )
            );
    }

    static pauseActions = (scene) => {
        scene.actionManager.actions.splice(12, 1)
    }

    static disbaleStartButton = (scene) => {
        scene.actionManager.actions.splice(12, 1)
    }

    static addPhaseBack = (scene, player, moon) => {
        /** Press Z to transform between states */
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    parameter: 'z'
                },
                function () {
                    player.changeForm();
                    moon.phase(scene);
                    console.log(player.transformationState);
                }
            )
        );
    }
    
}





