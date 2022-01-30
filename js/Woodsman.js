class Woodsman {

    woodsman_START_Y = 4.5;
    scene = null;
    obstacles = [];
    mesh = null;
    axeMesh = null;

    constructor(scene, player, wall, woodsman_start_x, woodsman_start_z, axeModel) {
        this.scene = scene;
        const woodsman = BABYLON.MeshBuilder.CreateBox("axe", {}, scene);
        woodsman.position.x = woodsman_start_x;
        woodsman.position.y = this.woodsman_START_Y;
        woodsman.position.z = woodsman_start_z;
        woodsman.visibility = 0.0;
        // const woodsmanMaterial = new BABYLON.StandardMaterial("material", scene);
        // woodsmanMaterial.diffuseColor = BABYLON.Color3.Green();
        // woodsman.material = woodsmanMaterial;
        woodsman.checkCollisions = false;
        // debugger;
        // this.importedAxeModel = axeModel.meshes[0];
      
        this.axeMesh =  axeModel.meshes[0].clone('cloneAxe');
        this.axeMesh.scaling = new BABYLON.Vector3(5, 5, 5);

        this.axeMesh.position = new BABYLON.Vector3(woodsman.position.x, (woodsman.position.y- 0.5), woodsman.position.z);
        this.axeMesh.isPickable = false;
        //importedAxeModel.setParent(woodsman);
        woodsman.showBoundingBox = true;
        this.axeMesh.showBoundingBox = true;
        this.axeMesh.setParent(woodsman);
 
      

        woodsman.isPickable = false;
        this.mesh = woodsman;
        //this.axeMesh = this.importedAxeModel;
        this.scene.registerBeforeRender(() => {
            this.move();
            // this._updateCamera();

        })
        this.destructiveMeshes = [player.mesh.physicsImpostor];
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: .05 }, scene);
        this.mesh.wall = wall;
        var destructiveMeshes = obstacles;
        this.mesh.physicsImpostor.registerOnPhysicsCollide(destructiveMeshes, function (woodsman, collided) {
            destructiveMeshes = obstacles;
            // destructiveMeshes.push.apply(destructiveMeshes, rock.object.wall.getWallImposters());
            // console.log(`Update Meshes length ${destructiveMeshes.length}`)
            for (var i = 0; i < destructiveMeshes.length; i++) {
                // console.log(`Collided with ${collided.object.name}`)
                if (collided.object.name === "player") {
                    // console.log(`${destructiveMeshes[i].object.name}`)
                  //  debugger;
                    player.mesh.dispose();
                    player.setAlive(false, woodsman.object.name);
                    woodsman.object.dispose();
                    //obstacles.splice(i, 1);
                }
                else if (collided.object.name === "wall piece") {
                    // console.log(`IN else if ${destructiveMeshes[i].object.name}`)
                    woodsman.object.dispose();
                }
            }
  
        });
        return this;

    }

    moveWoodsmanGenerationX = () => {
        this.WOODSMAN_START_X -= .01;
    }

    move = () => {
        this.mesh.position.x += .2;

        this.mesh.rotate(BABYLON.Axis.Z, -.07, BABYLON.Space.LOCAL);
    }

}