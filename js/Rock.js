class Rock {



    constructor(scene, player, wall, rock_start_x, rock_start_y, rock_start_z) {
        this.scene = scene;
        this.destructiveMeshes = [player.mesh.physicsImpostor];

        // console.log(`${this.wall.getWallImposters()}`)
        const rock = BABYLON.MeshBuilder.CreateSphere("rock", {}, scene);
        rock.position.x = rock_start_x;
        rock.position.y = rock_start_y;
        rock.position.z = rock_start_z
        const rockMaterial = new BABYLON.StandardMaterial("material", scene);
        rockMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat('/textures/rock.png'));

        rock.material = rockMaterial;
        rock.physicsImpostor = new BABYLON.PhysicsImpostor(rock, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
        rock.checkCollisions = true;
        rock.wall = wall;
        var destructiveMeshes = obstacles;
        rock.physicsImpostor.registerOnPhysicsCollide(obstacles, function (rock, collided) {
            destructiveMeshes = obstacles;
            // destructiveMeshes.push.apply(destructiveMeshes, rock.object.wall.getWallImposters());
            // console.log(`Update Meshes length ${destructiveMeshes.length}`)
            for (var i = 0; i < destructiveMeshes.length; i++) {
                // console.log(`Collided with ${destructiveMeshes[i].object.name}`)
                if (collided.object.name === "player") {
                    // console.log(`${destructiveMeshes[i].object.name}`)
                    player.mesh.dispose();
                    player.setAlive(false);
                    rock.object.dispose();
                    obstacles.splice(i, 1);
                }
                else if (collided.object.name === "wall piece") {
                    // console.log(`IN else if ${destructiveMeshes[i].object.name}`)
                    rock.object.dispose();
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
        rock.isPickable = false;
        rock.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), rock.getAbsolutePosition().add(contactLocalRefPoint));
        rock.getAbsolutePosition().add(contactLocalRefPoint);
        this.mesh = rock;

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