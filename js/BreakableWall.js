class BreakableWall {

    breakableWallMesh = null;
    constructor(scene, player, start_x, start_y, start_z, depth, breakableWallMesh) {
        this.scene = scene;
        const breakableWall = BABYLON.MeshBuilder.CreateBox("breakableWall", { width: 5, height: 7, depth: depth }, scene);
        breakableWall.position.x = start_x;
        breakableWall.position.y = start_y;
        breakableWall.position.z = start_z;

        // const breakableWallMaterial = new BABYLON.StandardMaterial("material", scene);
        // breakableWallMaterial.diffuseColor = BABYLON.Color3.FromHexString("#00FF00");
        // breakableWall.material = breakableWallMaterial;
        breakableWall.visibility = 0.0;

        
        this.breakableWallMesh = breakableWallMesh.meshes[0].clone('clonedBreakableWall');
        //  this.breakableWallMesh.rotate.x = Math.PI/2;
        this.breakableWallMesh.scaling = new BABYLON.Vector3(50,25,15);
        this.breakableWallMesh.position = new BABYLON.Vector3(breakableWall.position.x, (breakableWall.position.y- 3.5), breakableWall.position.z);
        this.breakableWallMesh.isPickable = false;
        this.breakableWallMesh.setParent(breakableWall);

        breakableWall.physicsImpostor = new BABYLON.PhysicsImpostor(breakableWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
        breakableWall.checkCollisions = true;
        this.mesh = breakableWall;
        breakableWall.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function (breakableWall, collided) {
            if (player.transformationState === "wolfTop" && collided.object.name === "player") {
                console.log(`breakableWall collided with ${collided.object} whose state is ${player.transformationState} which is a ${breakableWall.object}`)

                breakableWall.object.dispose();
            }
            else if (player.transformationState === "humanTop" && collided.object.name === "player") {
                player.mesh.dispose();
                player.setAlive(false);
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