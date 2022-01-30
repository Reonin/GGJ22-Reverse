class Coin {



    constructor(scene, player, hud, coin_start_x, coin_start_z) {
        this.scene = scene;
        this.destructiveMeshes = [player.mesh.physicsImpostor];

        // console.log(`${this.wall.getWallImposters()}`)
        const coin = BABYLON.MeshBuilder.CreateSphere("coin", {diameterX: .8, diameterY: .1, diameterZ: .8}, scene);
        coin.position.x = coin_start_x;
        coin.position.y = 25;
        coin.position.z = coin_start_z;
        const coinMaterial = new BABYLON.StandardMaterial("material", scene);
        coin.material = coinMaterial;
        // console.log(`Coin spawned ${coin.position}`)
        coinMaterial.diffuseColor = BABYLON.Color3.FromHexString("#FFD700");;
        coin.physicsImpostor = new BABYLON.PhysicsImpostor(coin, BABYLON.PhysicsImpostor.BoxImpostor, { mass: .7, restitution: 0.5 }, scene);
        coin.checkCollisions = true;
        var destructiveMeshes = obstacles;
        coin.physicsImpostor.registerOnPhysicsCollide(obstacles, function (coin, collided) {
            destructiveMeshes = obstacles;
            // destructiveMeshes.push.apply(destructiveMeshes, rock.object.wall.getWallImposters());
            // console.log(`Update Meshes length ${destructiveMeshes.length}`)
            for (var i = 0; i < destructiveMeshes.length; i++) {
                
                if (collided.object.name === "player") {
                    // console.log(`Before ${hud.score}`)
                    hud.score += 10;
                    // console.log(`After ${hud.score}`)
                    // player.setAlive(false, coin.object.name);
                    coin.object.dispose();
                }
                else if (collided.object.name === "wall piece") {
                    // console.log(`IN else if ${destructiveMeshes[i].object.name}`)
                    coin.object.dispose();
                }
            }
            // console.log(`Meshes length ${destructiveMeshes.length}`)
            // for(var i = 0; i < this.destructiveMeshes.length; i++){
            //     console.log(this.destructiveMeshes[i]);
            // }
        });
        //Force Settings
        // const forceDirection = new BABYLON.Vector3(10, 0, 0);
        // const forceMagnitude = 400;
        // const contactLocalRefPoint = BABYLON.Vector3.Zero();
        coin.isPickable = false;
        // coin.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), coin.getAbsolutePosition().add(contactLocalRefPoint));
        // coin.getAbsolutePosition().add(contactLocalRefPoint);
        this.mesh = coin;

        // scene.onBeforeRenderObservable.add(() => {
        //     setTimeout(function(){
        //         //this.scene.removeMesh(this.mesh)
        //         this.mesh.dispose();
        //     });
        // });

        return this;


    }

    moveRockGenerationX = () => {
        this.ROCK_START_X -= .01;
    }



}