class Ground {

    scene = null;
    width = 0;
    height = 0;

    constructor(scene) {
        this.scene = scene;
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50000, height: 60 }, this.scene);
        //ground.position.x = -20;
        //ground.position.y = 2;
        const groundMaterial = new BABYLON.StandardMaterial("material", this.scene);
        // groundMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        groundMaterial.refractionTexture = new BABYLON.Texture(textureURL.concat("textures/ground.jpg"), scene);
        ground.material = groundMaterial;
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        ground.checkCollisions = true;
        ground.isPickable = true;
        this.mesh = ground;

        const mat = new BABYLON.StandardMaterial("");
        mat.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/grass.jpg"));
        mat.visibility = 0.1;
        const pat = BABYLON.Mesh.NO_FLIP;
        const options = {
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            pattern: pat,
            width: 1000,
            height: 9,
            tileSize: 1,
            tileWidth:1
        }
    
        const wallOptions = {
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            pattern: pat,
            width: 1000,
            height: 18,
            tileSize: 1,
            tileWidth:1
        }
        const rightPlane = BABYLON.MeshBuilder.CreateTiledPlane("plane", wallOptions, scene);
        rightPlane.material = mat;
        rightPlane.position.z = 20;

        const leftPlane = BABYLON.MeshBuilder.CreateTiledPlane("plane", wallOptions, scene);
        leftPlane.material = mat;
        leftPlane.position.z = -20;

        const forestMaterial = new BABYLON.StandardMaterial("material", this.scene);
        // forestMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        forestMaterial.refractionTexture = new BABYLON.Texture(textureURL.concat("/assets/textures/fur.jpg"), scene);
        rightPlane.material = forestMaterial;
        rightPlane.physicsImpostor = new BABYLON.PhysicsImpostor(rightPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);
        rightPlane.checkCollisions = true;
        rightPlane.isPickable = true;
        this.meshRightPlane = rightPlane;

        leftPlane.material = forestMaterial;
        leftPlane.physicsImpostor = new BABYLON.PhysicsImpostor(leftPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);
        leftPlane.checkCollisions = true;
        leftPlane.isPickable = true;
        this.meshleftPlane = leftPlane;


        

        this.scene.registerBeforeRender(() => {
            
            // this.move();
            // this._updateCamera();

        })

        return this;
    }

    move = () => {
        this.mesh.position.x += -.05;
        //console.log(this.mesh.position.x)
    }
    
}