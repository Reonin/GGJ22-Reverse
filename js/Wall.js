


class Wall {

    FACTORY_START_X = 0;
    FACTORY_START_Y = 0;
    walls = [];
    scene = null;
    mesh = null;
    // player = null;
    frameTime = 0;
    prevFrameTime = 0;
    // spawnRockTimer = 0;
    spawnWoodsmanTimer =0;
    

    constructor (scene, player) {
       
        // if (ObstacleFactory._instance) {
        //     return ObstacleFactory._instance
        // }
        // ObstacleFactory._instance = this;
        this.scene = scene;
        this.player = player;
        this.spawnWallTimer = 0;
        this.gameStart = true;
        this.start_x = -60;
        this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(-1, 0, 0), 1)
        this.rayHelper1 = new BABYLON.RayHelper(this.ray1);
        
        scene.onBeforeRenderObservable.add(() => {
            if(this.gameStart === true){
                this.createWall(scene, player);
                this.gameStart = false;
            }
            else{
                const getRandSpawnTimer = this.randomIntFromInterval(1600,1900);
                if(this.spawnWallTimer > getRandSpawnTimer){
                    this.createWall(scene, player);
                    this.spawnWallTimer = 0;
                }
                
            }
            this.moveWall();
            this.destroyWall();
            this.updateStartX();
            this.checkCollisions(scene);
            this.spawnWallTimer++;
        });
        
        return this;
    }

    createWall(scene,player){
        const numWall = this.randomIntFromInterval(1,4);
        //const numWall = 1;
        // console.log(`Num wall : ${numWall}`)
        if(numWall === 1){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = this.start_x;
            wall1.position.y = 7.5;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;

            this.walls.push(wall1);
            var mesh = this.player.mesh;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });


            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 7.5;
            wall2.position.z = 15;
            const wall2Material = new BABYLON.StandardMaterial("materd daial", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });

            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 7.5;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall3);
        }
        else if(numWall === 2){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = this.start_x;
           wall1.position.y = 7.5;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall1);

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 7.5;
            wall2.position.z = 10;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 7.5;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall3);
        }
        else if(numWall === 3){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = this.start_x;
           wall1.position.y = 7.5;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall1);

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = this.start_x;
           wall2.position.y = 7.5;
            wall2.position.z = 10;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 7.5;
            wall3.position.z = -10;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall3);
        }

        else if(numWall === 4){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall1.position.x = this.start_x;
            wall1.position.y = 7.5;
            wall1.position.z = 5;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall1);
           

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 7.5;
            wall2.position.z = -5;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 15, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 7.5;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
            });
            this.walls.push(wall3);
        }
    }

    moveWall(){
        for(var i = 0; i < this.walls.length; i++){
            this.walls[i].position.x += .1;
        }
    }

    destroyWall(){
        for(var i = 0; i < this.walls.length; i++){
            // console.log(this.walls.length)
            if(this.walls[i].position.x > this.player.mesh.position.x + 50){
                this.walls[i].dispose();
                this.walls.splice(i,1);
            }
        }
    }

    randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    getWalls(){
        return this.walls;
    }

    updateStartX(){
        this.start_x = this.player.mesh.position.x - 60;
        // console.log(`start x : ${this.start_x}`);
    }

    checkCollisions(scene){
        for(var i = 0; i < this.walls.length; i++){
            
            
            const pick = scene.pickWithRay(this.ray1);
            if (pick) {
                console.log(`Collided with ${pick.pickedMesh}`)
            }
        }
    }

}