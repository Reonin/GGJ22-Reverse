


class ObstacleFactory {



    constructor(scene, player, wall, hud, start_x, start_z, moveRight, importedMesh) {

        // if (ObstacleFactory._instance) {
        //     return ObstacleFactory._instance
        // }
        // ObstacleFactory._instance = this;
        this.scene = scene;
        this.trees = [];
        const box = BABYLON.MeshBuilder.CreateBox("obstacle_factory", { height: 5 });
        this.FACTORY_START_X = start_x;
        this.FACTORY_START_Y = 2;
        box.position.x = this.FACTORY_START_X;
        box.position.y = this.FACTORY_START_Y;
        box.position.z = start_z;
        this.moveRight = moveRight;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(155, 1, 1);
        boxMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.1, 0.1);

        this.player = player;
        box.material = boxMaterial;
        // box.checkCollisions = true;
        box.isPickable = false;
        this.mesh = box;

        this.spawnRockTimer = 0;
        this.spawnWoodsmanTimer = 0;
        this.spawnCoinTimer = 0;
        this.spawnTreeTime = 0;
        this.spawnedTrees = false;

        const mat = new BABYLON.StandardMaterial("");
        //mat.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/forest.jpg"));
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
            tileWidth:1,   
        }
        const rightPlane = BABYLON.MeshBuilder.CreateTiledPlane("plane", wallOptions, scene);
        rightPlane.material = mat;
        rightPlane.position.z = 22;
        rightPlane.visibility = 0;

        const leftPlane = BABYLON.MeshBuilder.CreateTiledPlane("plane", wallOptions, scene);
        leftPlane.material = mat;
        leftPlane.position.z = -22;
        leftPlane.visibility = 0;

        const forestMaterial = new BABYLON.StandardMaterial("material", this.scene);
        // forestMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        forestMaterial.refractionTexture = new BABYLON.Texture(textureURL.concat("textures/trees.png"), scene);
        rightPlane.material = forestMaterial;
        rightPlane.physicsImpostor = new BABYLON.PhysicsImpostor(rightPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);
        rightPlane.checkCollisions = true;
        rightPlane.isPickable = true;
        this.meshRightPlane = rightPlane;
        // this.meshRightPlane.setParent(player.mesh);

        leftPlane.material = forestMaterial;
        leftPlane.physicsImpostor = new BABYLON.PhysicsImpostor(leftPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);
        leftPlane.checkCollisions = true;
        leftPlane.isPickable = true;
        this.meshleftPlane = leftPlane;
        // this.meshleftPlane.setParent(player.mesh);


        scene.onBeforeRenderObservable.add(() => {
            this.frameTime = Date.now();
            var randRock = randomIntFromInterval(400, 700);
            var randWoodsman = randomIntFromInterval(200, 400);
            var randCoin = randomIntFromInterval(200, 300);
            //this.mesh.position = direction;
            // this.mesh.lookAt(player.mesh.position);
            var length = 100;
            // ground move
            this.moveFactoryGenerationX();
            if (player.alive === true) {
                if (this.spawnRockTimer > randRock) {
                    //generate rocks and reset timer

                    this.spawnRocks(player, wall, this.mesh.position.x, this.mesh.position.z);
                    this.spawnRockTimer = 0;
                }
                this.spawnRockTimer++;
                //this.moveWoodsmanGenerationX();
                this.moveObstacleFactoryOnZAxis();
                if (this.spawnWoodsmanTimer > randWoodsman) {
                    //generate woodsmans and reset timer
                    this.spawnWoodsmans(player, wall, this.mesh.position.x, this.mesh.position.z)
                    this.spawnWoodsmanTimer = 0;
                }
                this.spawnWoodsmanTimer++;
                if (this.spawnCoinTimer > randCoin) {
                    //generate woodsmans and reset timer
                    var randX = randomIntFromInterval(30, 60);
                    var randZ = randomIntFromInterval(-20, 20);
                    this.spawnCoin(player, hud, player.mesh.position.x - randX, randZ)
                    this.spawnCoinTimer = 0;
                }
                this.spawnCoinTimer++;
                if(this.spawnedTrees === false){
                    this.spawnTrees(importedMesh, player);
                    this.spawnedTrees = true;
                }
                this.killTrees(importedMesh,player);
            }


        })
        console.log(`spawned obstacle factory ${this.mesh.position}`);
        return this;
    }

    moveFactoryGenerationX = () => {
        this.mesh.position.x = this.player.mesh.position.x - 140;
        this.meshRightPlane.position.x = this.player.mesh.position.x;
        this.meshleftPlane.position.x = this.player.mesh.position.x;
        //console.log(`Obs Factory x : ${this.mesh.position.x}`)
    }

    getCurrentX = () => {
        return this.mesh.position.x;
    }

    spawnRocks = (player, wall, rock_start_x, rock_start_z) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.frameTime;
            return;
        }

        const delta = this.frameTime - this.prevFrameTime;
        // ObsFactory.moveRockGenerationX();
        //console.log(`${this.frameTime} - ${this.prevFrameTime} = ${delta}`);


        var rock = new Rock(this.scene, player, wall, rock_start_x, 2, rock_start_z, importedMeshes[4]);
        setTimeout(function () {
            rock.mesh.dispose()
        }, 10000);
        // rock.disposeOfMesh(this.scene);
        this.prevFrameTime = this.frameTime;
    }

    moveWoodsmanGenerationX = () => {
        this.mesh.position.x -= .01;
        //console.log(`Obs Factory x : ${this.mesh.position.x}`)
    }

    moveObstacleFactoryOnZAxis = () => {
        //console.log(`Obstacle Factory Z: ${this.mesh.position.z}`)
        if (this.mesh.position.z <= 20 && this.moveRight === true) {
            this.mesh.position.z += .03;
            if (this.mesh.position.z > 20) {
                // console.log(`Obstacle Factory Z: ${this.mesh.position.z}`)
                this.moveRight = false;
            }
        }
        if (this.moveRight === false) {
            // console.log(`Obstacle Factory Z: ${this.mesh.position.z}`);
            this.mesh.position.z -= .02;
            if (this.mesh.position.z < -20) {
                this.moveRight = true;
            }

        }



    }

    spawnWoodsmans = (player, wall, woodsman_start_x, woodsman_start_z) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.frameTime;
            return;
        }

        const delta = this.frameTime - this.prevFrameTime;
        // ObsFactory.moveRockGenerationX();
        //console.log(`${this.frameTime} - ${this.prevFrameTime} = ${delta}`);


        var woodsman = new Woodsman(this.scene, player, wall, woodsman_start_x, woodsman_start_z, importedMeshes[3]);
        setTimeout(function () {
            woodsman.mesh.dispose()
        }, 30000);
        this.prevFrameTime = this.frameTime;
    }

    spawnCoin = (player, hud, coin_start_x, coin_start_z) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.frameTime;
            return;
        }

        const delta = this.frameTime - this.prevFrameTime;
        // ObsFactory.moveRockGenerationX();
        //console.log(`${this.frameTime} - ${this.prevFrameTime} = ${delta}`);


        var coin = new Coin(this.scene, player, hud, coin_start_x, coin_start_z);
        setTimeout(function () {
            coin.mesh.dispose()
        }, 30000);
        this.prevFrameTime = this.frameTime;
    }

    spawnTrees(importedMesh, player) {
        var numTrees = 20;
        for (var i = 0; i < numTrees; i++) {
            var treeMesh = importedMesh[6].meshes[0].clone('tree');
            treeMesh.position = new BABYLON.Vector3(player.mesh.position.x + (i * -4), 0, -22);
            treeMesh.scaling = new BABYLON.Vector3(10,10,10);
            treeMesh.isPickable = false;
            treeMesh.leftSide = true;
            this.trees.push(treeMesh);
            var treeMesh = importedMesh[6].meshes[0].clone('tree');
            treeMesh.position = new BABYLON.Vector3(player.mesh.position.x + (i * -4), 0, 22);
            treeMesh.scaling = new BABYLON.Vector3(10,10,10);
            treeMesh.isPickable = false;
            treeMesh.leftSide = false;
            this.trees.push(treeMesh);
            // console.log(`Tree spawned at ${treeMesh.position}`)
        }

        
    }

    killTrees(importedMesh, player){
        for(var i = 0; i < this.trees.length; i++){
            if(this.trees[i].position.x > player.mesh.position.x + 38){
                // console.log(`Tree is on left side: ${this.trees[i].leftSide}`);
                if(this.trees[i].leftSide === true){
                    this.trees[i].dispose()
                    this.trees.splice(i,1);
                    var treeMesh = importedMesh[6].meshes[0].clone('tree');
                    treeMesh.position = new BABYLON.Vector3(this.trees[this.trees.length - 1].position.x - 4, 0, -22);
                    treeMesh.scaling = new BABYLON.Vector3(10,10,10);
                    treeMesh.isPickable = false;
                    this.trees.push(treeMesh);
                }
                else if(this.trees[i].leftSide === false){
                    this.trees[i].dispose()
                    this.trees.splice(i,1);
                    var treeMesh = importedMesh[6].meshes[0].clone('tree');
                    treeMesh.position = new BABYLON.Vector3(this.trees[this.trees.length - 1].position.x - 4, 0, 22);
                    treeMesh.scaling = new BABYLON.Vector3(10,10,10);
                    treeMesh.isPickable = false;
                    this.trees.push(treeMesh);
                }
                
            }
        }
    }

}