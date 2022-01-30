


class Wall {


    constructor (scene, player) {
       
        // if (ObstacleFactory._instance) {
        //     return ObstacleFactory._instance
        // }
        // ObstacleFactory._instance = this;
        this.scene = scene;
        this.player = player;
        this.spawnWallTimer = 0;
        this.walls = [];
        // obstacles = [];
        this.gameStart = true;
        this.start_x = -100;
        // this.ray1 = new BABYLON.Ray(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(-1, 0, 0), 1)
        // this.rayHelper1 = new BABYLON.RayHelper(this.ray1);
        
        scene.onBeforeRenderObservable.add(() => {
            if(this.gameStart === true){
                this.createWall(scene, player);
                this.gameStart = false;
            }
            else{
                const getRandSpawnTimer = randomIntFromInterval(1600,1900);
                if(this.spawnWallTimer > getRandSpawnTimer){
                    this.createWall(scene, player);
                    this.spawnWallTimer = 0;
                }
                
            }
            this.moveWall();
            this.destroyWall();
            this.updateStartX();
            this.spawnWallTimer++;
        });
        
        return this;
    }

    createWall(scene,player){
        const numWall = randomIntFromInterval(1,4);
        // const numWall = 4;
        // console.log(`Num wall : ${numWall}`)
        if(numWall === 1){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall1.position.x = this.start_x;
            wall1.position.y = 3.5;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            var mesh = this.player.mesh;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall1.physicsImpostor);
            this.walls.push(wall1);
            


            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 3.5;
            wall2.position.z = 15;
            const wall2Material = new BABYLON.StandardMaterial("materd daial", scene);
            wall2Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall2.physicsImpostor);
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 3.5;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall3.physicsImpostor);
            this.walls.push(wall3);
            const numDoorOrBreakableWall = randomIntFromInterval(1,100);
            console.log(numDoorOrBreakableWall)
            if(numDoorOrBreakableWall < 25){
                const door = new Door(scene, player, this.start_x, 3.5, -7.5, 4.8);
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, 7.5, 4.8);
                this.walls.push(door.mesh);
                this.walls.push(breakableWall.mesh);
                obstacles.push(door.physicsImpostor);
                obstacles.push(breakableWall.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 25 && numDoorOrBreakableWall < 50){
                const door = new Door(scene, player, this.start_x, 3.5, 7.5, 4.8);
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, -7.5, 4.8);
                this.walls.push(door.mesh);
                this.walls.push(breakableWall.mesh);
                obstacles.push(door.physicsImpostor);
                obstacles.push(breakableWall.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 50 && numDoorOrBreakableWall < 75){
                const door1 = new Door(scene, player, this.start_x, 3.5, 7.5, 4.8);
                const door2 = new Door(scene, player, this.start_x, 3.5, -7.5, 4.8);
                this.walls.push(door1.mesh);
                this.walls.push(door2.mesh);
                obstacles.push(door1.physicsImpostor);
                obstacles.push(door2.physicsImpostor);
            }else if(numDoorOrBreakableWall > 75 && numDoorOrBreakableWall < 100){
                const breakableWall1 = new BreakableWall(scene, player, this.start_x, 3.5, 7.5, 4.8);
                const breakableWall2 = new BreakableWall(scene, player, this.start_x, 3.5, -7.5, 4.8);
                this.walls.push(breakableWall1.mesh);
                this.walls.push(breakableWall2.mesh);
                obstacles.push(breakableWall1.physicsImpostor);
                obstacles.push(breakableWall2.physicsImpostor);
            }
            
        }
        else if(numWall === 2){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall1.position.x = this.start_x;
            wall1.position.y = 3.5;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall1.physicsImpostor);
            this.walls.push(wall1);

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 3.5;
            wall2.position.z = 10;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall2.physicsImpostor);
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 3.5;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall3.physicsImpostor);
            this.walls.push(wall3);

            // const door = new Door(scene, player, this.start_x, 3.5, 17, 4.8);
            // const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, -7.5, 4.8);
            // this.walls.push(door.mesh);
            // this.walls.push(breakableWall.mesh);
            // obstacles.push(door.physicsImpostor);
            // obstacles.push(breakableWall.physicsImpostor);
            const numDoorOrBreakableWall = randomIntFromInterval(1,100);
            if(numDoorOrBreakableWall < 25){
                const door = new Door(scene, player, this.start_x, 3.5, 17, 4.8);
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, -7.5, 4.8);
                this.walls.push(door.mesh);
                this.walls.push(breakableWall.mesh);
                obstacles.push(door.physicsImpostor);
                obstacles.push(breakableWall.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 25 && numDoorOrBreakableWall < 50){
                const door = new Door(scene, player, this.start_x, 3.5, -7.5, 4.8);
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, 17, 4.8);
                this.walls.push(door.mesh);
                this.walls.push(breakableWall.mesh);
                obstacles.push(door.physicsImpostor);
                obstacles.push(breakableWall.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 50 && numDoorOrBreakableWall < 75){
                const door1 = new Door(scene, player, this.start_x, 3.5, 17, 4.8);
                const door2 = new Door(scene, player, this.start_x, 3.5, -7.5, 4.8);
                this.walls.push(door1.mesh);
                this.walls.push(door2.mesh);
                obstacles.push(door1.physicsImpostor);
                obstacles.push(door2.physicsImpostor);
            }else if(numDoorOrBreakableWall > 75 && numDoorOrBreakableWall < 100){
                const breakableWall1 = new BreakableWall(scene, player, this.start_x, 3.5, 17, 4.8);
                const breakableWall2 = new BreakableWall(scene, player, this.start_x, 3.5, -7.5, 4.8);
                this.walls.push(breakableWall1.mesh);
                this.walls.push(breakableWall2.mesh);
                obstacles.push(breakableWall1.physicsImpostor);
                obstacles.push(breakableWall2.physicsImpostor);
            }
        }
        else if(numWall === 3){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall1.position.x = this.start_x;
            wall1.position.y = 3.5;
            wall1.position.z = 0;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall1.physicsImpostor);
            this.walls.push(wall1);

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 3.5;
            wall2.position.z = 10;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall2.physicsImpostor);
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 3.5;
            wall3.position.z = -10;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall3.physicsImpostor);
            this.walls.push(wall3);

            
            const numDoorOrBreakableWall = randomIntFromInterval(1,100);
            if(numDoorOrBreakableWall < 25){
                const door = new Door(scene, player, this.start_x, 3.5, -17.3, 4.8);
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, 17.3, 4.8);
                this.walls.push(door.mesh);
                this.walls.push(breakableWall.mesh);
                obstacles.push(door.physicsImpostor);
                obstacles.push(breakableWall.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 25 && numDoorOrBreakableWall < 50){
                const door = new Door(scene, player, this.start_x, 3.5, 17.3, 4.8);
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, -17.3, 4.8);
                this.walls.push(door.mesh);
                this.walls.push(breakableWall.mesh);
                obstacles.push(door.physicsImpostor);
                obstacles.push(breakableWall.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 50 && numDoorOrBreakableWall < 75){
                const door1 = new Door(scene, player, this.start_x, 3.5, -17.3, 4.8);
                const door2 = new Door(scene, player, this.start_x, 3.5, 17.3, 4.8);
                this.walls.push(door1.mesh);
                this.walls.push(door2.mesh);
                obstacles.push(door1.physicsImpostor);
                obstacles.push(door2.physicsImpostor);
            }else if(numDoorOrBreakableWall > 75 && numDoorOrBreakableWall < 100){
                const breakableWall1 = new BreakableWall(scene, player, this.start_x, 3.5, 17, 4.8);
                const breakableWall2 = new BreakableWall(scene, player, this.start_x, 3.5, -17, 4.8);
                this.walls.push(breakableWall1.mesh);
                this.walls.push(breakableWall2.mesh);
                obstacles.push(breakableWall1.physicsImpostor);
                obstacles.push(breakableWall2.physicsImpostor);
            }
        }

        else if(numWall === 4){
            const wall1 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 16});
            wall1.position.x = this.start_x;
            wall1.position.y = 3.5;
            wall1.position.z = 8;
            const wall1Material = new BABYLON.StandardMaterial("material", scene);
            wall1Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall1.material = wall1Material;
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall1.checkCollisions = true;
            wall1.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall1.physicsImpostor);
            this.walls.push(wall1);
           

            const wall2 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall2.position.x = this.start_x;
            wall2.position.y = 3.5;
            wall2.position.z = -5;
            const wall2Material = new BABYLON.StandardMaterial("material", scene);
            wall2Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall2.material = wall2Material;
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall2.checkCollisions = true;
            wall2.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall2.physicsImpostor);
            this.walls.push(wall2);

            const wall3 = BABYLON.MeshBuilder.CreateBox("wall piece", {width: 5, height: 7, depth: 10});
            wall3.position.x = this.start_x;
            wall3.position.y = 3.5;
            wall3.position.z = -15;
            const wall3Material = new BABYLON.StandardMaterial("material", scene);
            wall3Material.diffuseColor =BABYLON.Color3.FromHexString("#FF0000");
            wall3.material = wall3Material;
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100 }, scene);
            wall3.checkCollisions = true;
            wall3.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
                player.mesh.dispose();
                player.setAlive(false);
            });
            obstacles.push(wall3.physicsImpostor);
            this.walls.push(wall3);

            // const door = new Door(scene, player, this.start_x, 3.5, 18.5, 3.5);
            // // const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, 17, 4.8);
            // this.walls.push(door.mesh);
            // // this.walls.push(breakableWall.mesh);
            // obstacles.push(door.physicsImpostor);
            // obstacles.push(breakableWall.physicsImpostor);
            const numDoorOrBreakableWall = randomIntFromInterval(1,100);
            if(numDoorOrBreakableWall < 50){
                const door = new Door(scene, player, this.start_x, 3.5, 18.5, 4.8);
                this.walls.push(door.mesh);
                obstacles.push(door.physicsImpostor);
            }
            else if(numDoorOrBreakableWall > 50 && numDoorOrBreakableWall <= 100){
                const breakableWall = new BreakableWall(scene, player, this.start_x, 3.5, 18.5, 3.8);
                this.walls.push(breakableWall.mesh);
                obstacles.push(breakableWall.physicsImpostor);

            }
            

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
                var index = obstacles.indexOf(this.walls[i].physicsImpostor);
                // console.log(index);
                obstacles.splice(index,1);
                this.walls[i].dispose();
                this.walls.splice(i,1);
            }
            
        }

    }

    
    
    getWalls(){
        return this.walls;
    }

    getWallImposters(){
        return obstacles;
    }

    updateStartX(){
        this.start_x = this.player.mesh.position.x - 60;
        // console.log(`start x : ${this.start_x}`);
    }

    

}