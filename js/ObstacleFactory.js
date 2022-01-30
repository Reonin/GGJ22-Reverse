


class ObstacleFactory {

    

    constructor (scene, player, wall, start_x, start_z, moveRight) {
       
        // if (ObstacleFactory._instance) {
        //     return ObstacleFactory._instance
        // }
        // ObstacleFactory._instance = this;
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("obstacle_factory", {height: 5});
        this.FACTORY_START_X = start_x;
        this.FACTORY_START_Y = 2;
        box.position.x = this.FACTORY_START_X;
        box.position.y = this.FACTORY_START_Y;
        box.position.z = start_z;
        this.moveRight = moveRight;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(155, 1, 1);
        boxMaterial.diffuseColor =new BABYLON.Color3(1.0, 0.1, 0.1);

        this.player = player;
        box.material = boxMaterial;
        // box.checkCollisions = true;
        box.isPickable = false;
        this.mesh = box;
       
        this.spawnRockTimer = 0;
        this.spawnWoodsmanTimer = 0;
        
        

        scene.onBeforeRenderObservable.add(() => {
            this.frameTime = Date.now();
            var randRock = randomIntFromInterval(400, 700);
            var randWoodsman = randomIntFromInterval(200, 400);
            //this.mesh.position = direction;
            // this.mesh.lookAt(player.mesh.position);
            var length = 100;
            // ground move
            this.moveFactoryGenerationX();
            if(this.spawnRockTimer > randRock){
                //generate rocks and reset timer
                
                this.spawnRocks(player, wall, this.mesh.position.x, this.mesh.position.z);
                this.spawnRockTimer = 0;
            }
            this.spawnRockTimer++;
            //this.moveWoodsmanGenerationX();
            this.moveObstacleFactoryOnZAxis();
            if(this.spawnWoodsmanTimer > randWoodsman){
                //generate woodsmans and reset timer
                this.spawnWoodsmans(player, wall, this.mesh.position.x, this.mesh.position.z)
                this.spawnWoodsmanTimer = 0;
            }
            this.spawnWoodsmanTimer++;


    
        })
        console.log(`spawned obstacle factory ${this.mesh.position}`);
        return this;
    }
    
    moveFactoryGenerationX = () => {
        this.mesh.position.x = this.player.mesh.position.x - 140;
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

        
        var rock = new Rock(this.scene, player, wall, rock_start_x, 2, rock_start_z);
        setTimeout(function(){
            rock.mesh.dispose()
        },10000);
        // rock.disposeOfMesh(this.scene);
        this.prevFrameTime = this.frameTime;
    }

    moveWoodsmanGenerationX = () => {
        this.mesh.position.x -= .01;
        //console.log(`Obs Factory x : ${this.mesh.position.x}`)
    }

    moveObstacleFactoryOnZAxis = () => {
        //console.log(`Obstacle Factory Z: ${this.mesh.position.z}`)
        if(this.mesh.position.z <= 20 && this.moveRight === true){
            this.mesh.position.z += .03;
            if(this.mesh.position.z > 20){
                // console.log(`Obstacle Factory Z: ${this.mesh.position.z}`)
                this.moveRight = false;
            }
        }
        if(this.moveRight === false){
            // console.log(`Obstacle Factory Z: ${this.mesh.position.z}`);
            this.mesh.position.z -= .02;
            if(this.mesh.position.z < -20){
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


        var woodsman = new Woodsman(this.scene, player, wall, woodsman_start_x, woodsman_start_z);
        setTimeout(function(){
            woodsman.mesh.dispose()
        },30000);
        this.prevFrameTime = this.frameTime;
    }
    
}