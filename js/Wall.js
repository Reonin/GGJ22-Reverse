


class Wall {

    FACTORY_START_X = 0;
    FACTORY_START_Y = 0;
    obstacles = [];
    scene = null;
    mesh = null;
    player = null;
    frameTime = 0;
    prevFrameTime = 0;
    spawnRockTimer = 0;
    spawnWoodsmanTimer =0;
    

    constructor (scene) {
       
        // if (ObstacleFactory._instance) {
        //     return ObstacleFactory._instance
        // }
        // ObstacleFactory._instance = this;
        this.scene = scene;

        this.createWall(scene);

        return this;
    }

    createWall(scene){
        const box = BABYLON.MeshBuilder.CreateBox("wall piece", {height: 50});
        box.position.x = 10;
        box.position.y = 2;
        box.position.z = 0;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
        box.material = boxMaterial;
        // box.checkCollisions = true;
        this.mesh = box;
    }

    
}