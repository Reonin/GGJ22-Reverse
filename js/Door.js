class Door {

    doorMesh = null;
    constructor(scene, player, start_x, start_y, start_z, depth, doorModel) {
        this.scene = scene;
        const door = BABYLON.MeshBuilder.CreateBox("door", { width: 4.9, height: 7, depth: depth }, scene);
        door.position.x = start_x;
        door.position.y = start_y;
        door.position.z = start_z;
        // const doorMaterial = new BABYLON.StandardMaterial("material", scene);
        // var options = {
        //     faceUV: new BABYLON.Vector4()
        // }
        // doorMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/house1.gif"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        // doorMaterial.diffuseTexture.vAngle = 180;
        // door.material = doorMaterial;
        door.visibility = 0.2;

        
        this.doorMesh = doorModel.meshes[0].clone('clonedDoor');
        // this.doorMesh.rotate.x = Math.PI/2;
        this.doorMesh.scaling = new BABYLON.Vector3(10,15,10);
        this.doorMesh.position = new BABYLON.Vector3(door.position.x, (door.position.y- 3.5), door.position.z);
        this.doorMesh.isPickable = false;
        this.doorMesh.setParent(door);
        // door.showBoundingBox = true;
        // door.material.diffuseTexture.isCube(false);
        door.physicsImpostor = new BABYLON.PhysicsImpostor(door, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
        door.checkCollisions = true;
        this.mesh = door;
        // this.mesh.rotate(BABYLON.Axis.x,180,BABYLON.Space.LOCAL);
        door.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function (door, collided) {
            if (player.transformationState === "humanTop" && collided.object.name === "player") {
                console.log(`Door collided with ${collided.object} whose state is ${player.transformationState} which is a ${door.object}`)
                player.setAlive(true, door.object.name);
                door.object.dispose();
            }
            else if (player.transformationState === "wolfTop" && collided.object.name === "player") {
                player.mesh.dispose();
                player.setAlive(false, 'rock');
            }
        });

        this.scene.registerBeforeRender(() => {

            //this.move();
            // this._updateCamera();

        })

        return this;
    }

    move = () => {
        this.mesh.position.x += .1;
        //console.log(this.mesh.position.x)
    }
}