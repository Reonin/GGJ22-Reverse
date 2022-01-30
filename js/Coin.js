class Coin {



    constructor(scene, player, hud, coin_start_x, coin_start_y, coin_start_z) {
        this.scene = scene;
        this.destructiveMeshes = [player.mesh.physicsImpostor];

        // console.log(`${this.wall.getWallImposters()}`)
        const coin = BABYLON.MeshBuilder.CreateSphere("coin", {diameterX: 1, diameterY: 1, diameterZ: 0.1}, scene);
        coin.position.x = coin_start_x;
        coin.position.y = 25;
        coin.position.z = coin_start_z;
        const coin = new BABYLON.StandardMaterial("material", scene);
        rockMaterial.diffuseTexture = new BABYLON.StandardMaterial("material", scene);

        coin.material = rockMaterial.diffuseColor = BABYLON.Color3.FromHexString("#FFD700");;
        coin.physicsImpostor = new BABYLON.PhysicsImpostor(coin, BABYLON.PhysicsImpostor.BoxImpostor, { mass: .4, restitution: 0.9 }, scene);
        coin.checkCollisions = true;
        var destructiveMeshes = obstacles;
        coin.physicsImpostor.registerOnPhysicsCollide(obstacles, function (coin, collided) {
            destructiveMeshes = obstacles;
            // destructiveMeshes.push.apply(destructiveMeshes, rock.object.wall.getWallImposters());
            // console.log(`Update Meshes length ${destructiveMeshes.length}`)
            for (var i = 0; i < destructiveMeshes.length; i++) {
                // console.log(`Collided with ${destructiveMeshes[i].object.name}`)
                if (collided.object.name === "player") {
                    // console.log(`${destructiveMeshes[i].object.name}`)
                    hud.score += 10;
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
        const forceDirection = new BABYLON.Vector3(10, 0, 0);
        const forceMagnitude = 400;
        const contactLocalRefPoint = BABYLON.Vector3.Zero();
        coin.isPickable = false;
        coin.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), coin.getAbsolutePosition().add(contactLocalRefPoint));
        coin.getAbsolutePosition().add(contactLocalRefPoint);
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