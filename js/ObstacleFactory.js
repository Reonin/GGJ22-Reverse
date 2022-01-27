

class ObstacleFactory {

    FACTORY_START_X = 0;
    FACTORY_START_Y = 0;
    obstacles = [];
    scene = null;
    mesh = null;
    frameTime = 0;
    prevFrameTime = 0;
    spawnRockTimer = 0;
    spawnWoodsmanTimer =0;

    constructor (scene) {

        if (ObstacleFactory._instance) {
            return ObstacleFactory._instance
        }
        ObstacleFactory._instance = this;
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("box", {height: 5});
        this.FACTORY_START_X = -10;
        this.FACTORY_START_Y = 2;
        box.position.x = this.FACTORY_START_X;
        box.position.y = this.FACTORY_START_Y;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

        box.material = boxMaterial;
        box.checkCollisions = true;
        this.mesh = box;
        
        this.spawnRockTimer = 0;
        this.spawnWoodsmanTimer = 0;
        
        

        scene.onBeforeRenderObservable.add(() => {
            this.frameTime = Date.now();

            // ground move
            this.moveRockGenerationX();
            if(this.spawnRockTimer > 200){
                //generate rocks and reset timer
                this.spawnRocks(this.mesh.position.x)
                this.spawnRockTimer = 0;
            }
            this.spawnRockTimer++;
            this.moveWoodsmanGenerationX();
            if(this.spawnWoodsmanTimer > 400){
                //generate woodsmans and reset timer
                this.spawnWoodsmans(this.mesh.position.x)
                this.spawnWoodsmanTimer = 0;
            }
            this.spawnWoodsmanTimer++;


    
        })
        return this;
    }
    
    moveRockGenerationX = () => {
        this.mesh.position.x -= .01;
        //console.log(`Obs Factory x : ${this.mesh.position.x}`)
    }

    getCurrentX = () => {
        return this.mesh.position.x;
    }

    spawnRocks = (rock_start_x) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.frameTime;
            return;
        }

        const delta = this.frameTime - this.prevFrameTime;
        // ObsFactory.moveRockGenerationX();
        //console.log(`${this.frameTime} - ${this.prevFrameTime} = ${delta}`);


        var rock = new Rock(this.scene,rock_start_x);
        this.prevFrameTime = this.frameTime;
    }

    moveWoodsmanGenerationX = () => {
        this.mesh.position.x -= .01;
        //console.log(`Obs Factory x : ${this.mesh.position.x}`)
    }

    spawnWoodsmans = (woodsman_start_x) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.frameTime;
            return;
        }

        const delta = this.frameTime - this.prevFrameTime;
        // ObsFactory.moveRockGenerationX();
        //console.log(`${this.frameTime} - ${this.prevFrameTime} = ${delta}`);


        var woodsman = new Woodsman(this.scene,woodsman_start_x);
        this.prevFrameTime = this.frameTime;
    }
    
}