


class Wall {

    FACTORY_START_X = 0;
    FACTORY_START_Y = 0;
    walls = [];
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
        const numWall = this.randomIntFromInterval(1,4);
        console.log(`Num wall : ${numWall}`)
        if(numWall === 1){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = -10;
            wall1.position.y = 2;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            // box.checkCollisions = true;
            this.mesh = wall1;

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = -10;
            wall2.position.y = 2;
            wall2.position.z = 15;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            // box.checkCollisions = true;
            this.mesh = wall2;

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = -10;
            wall3.position.y = 2;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            // box.checkCollisions = true;
            this.mesh = wall3;
        }
        if(numWall === 2){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = -10;
            wall1.position.y = 2;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            // box.checkCollisions = true;
            this.mesh = wall1;

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = -10;
            wall2.position.y = 2;
            wall2.position.z = 10;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            // box.checkCollisions = true;
            this.mesh = wall2;

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = -10;
            wall3.position.y = 2;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            // box.checkCollisions = true;
            this.mesh = wall3;
        }
        if(numWall === 3){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = -10;
            wall1.position.y = 2;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            // box.checkCollisions = true;
            this.mesh = wall1;

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = -10;
            wall2.position.y = 2;
            wall2.position.z = 10;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            // box.checkCollisions = true;
            this.mesh = wall2;

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = -10;
            wall3.position.y = 2;
            wall3.position.z = -10;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            // box.checkCollisions = true;
            this.mesh = wall3;
        }
    }

    randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
}