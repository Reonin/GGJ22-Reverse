class Ground{

    scene = null;
    width = 0;
    height = 0;

    constructor(scene) {
        this.scene = scene;
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50000, height:40} , this.scene); 
        //ground.position.x = -20;
        //ground.position.y = 2;
        const groundMaterial = new BABYLON.StandardMaterial("material", this.scene);
        groundMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);


        ground.material = groundMaterial;
        ground.checkCollisions = true;
        ground.isPickable = false;
        this.mesh = ground;
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