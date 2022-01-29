class Door{

    constructor(scene,player, start_x, start_y, start_z, depth) {
        this.scene = scene;
        const door = BABYLON.MeshBuilder.CreateBox("door", {width: 4.9, height: 7, depth: depth} , scene); 
        door.position.x = start_x;
        door.position.y = start_y;
        door.position.z = start_z;
        const doorMaterial = new BABYLON.StandardMaterial("materd daial", scene);
        doorMaterial.diffuseColor =new BABYLON.Color3(0.1, 0.1, 1.1);
        door.material = doorMaterial;
        door.physicsImpostor = new BABYLON.PhysicsImpostor(door, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
        door.checkCollisions = true;
        this.mesh = door;
        door.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(door, collided) {
             if(player.transformationState === "humanTop" && collided.object.name === "player"){
                console.log(`Door collided with ${collided.object} whose state is ${player.transformationState} which is a ${door.object}`)
                
                door.object.dispose();
            }
            else if(player.transformationState === "wolfTop" && collided.object.name === "player"){
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