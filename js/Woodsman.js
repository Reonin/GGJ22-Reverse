class Woodsman {

    woodsman_START_Y = .5;
    scene = null;
    obstacles = [];
    mesh = null;

    constructor(scene, woodsman_start_x){
        this.scene = scene;
        const woodsman = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
        woodsman.position.x = woodsman_start_x;
        woodsman.position.y = this.woodsman_START_Y;
        const woodsmanMaterial = new BABYLON.StandardMaterial("material", scene);
        woodsmanMaterial.diffuseColor = BABYLON.Color3.Green();
        woodsman.material = woodsmanMaterial;
        woodsman.checkCollisions = true;

        //Force Settings
        
        const forceDirection = new BABYLON.Vector3(10, 0, 0);
        const forceMagnitude = 5;
        const contactLocalRefPoint = BABYLON.Vector3.Zero();
        
        woodsman.physicsImpostor = new BABYLON.PhysicsImpostor(woodsman, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.85, restitution: 0.9 }, scene);
        woodsman.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), woodsman.getAbsolutePosition().add(contactLocalRefPoint));
        woodsman.getAbsolutePosition().add(contactLocalRefPoint);
        this.mesh = woodsman;

        this.mesh = woodsman;
        this.scene.registerBeforeRender(() => {
            
            this.move();
            // this._updateCamera();
    
        })

        return this;
    
    }
    
    moveWoodsmanGenerationX = () => {
        this.WOODSMAN_START_X -= .01;
    }

    move = () => {
        this.mesh.position.x += .1;
        //console.log(this.mesh.position.x)
    }

}