class Ground{

    scene = null;
    width = 0;
    height = 0;

    constructor(scene,player) {
        this.scene = scene;
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50000, height:40} , this.scene); 
        //ground.position.x = -20;
        //ground.position.y = 2;
        const groundMaterial = new BABYLON.StandardMaterial("material", this.scene);
        groundMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        this.onGround =

        ground.material = groundMaterial;
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        ground.checkCollisions = true;
        ground.isPickable = true;
        this.mesh = ground;
        this.mesh.physicsImpostor.registerOnPhysicsCollide(player.physicsImpostor, function(main, collided) {
            
                player.setOnGround(true);
                console.log(`On the ground ${this.onGround}`);
        });
        this.scene.registerBeforeRender(() => {
            
            this.move();
            // this._updateCamera();
    
        })
        
        return this;
    }
    
    move = () => {
        this.mesh.position.x += -.05;
        //console.log(this.mesh.position.x)
    }
}