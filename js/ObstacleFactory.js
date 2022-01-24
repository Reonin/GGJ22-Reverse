

class ObstacleFactory {

    ROCK_START_X = 0;
    ROCK_START_Y = 0; 
    FACTORY_START_X = 0;
    FACTORY_START_Y = 0;
    obstacles = [];
    scene = null;
    mesh = null;

    constructor (scene) {
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("box", {height: 5});
        this.ROCK_START_X = -10;
        this.ROCK_START_Y = 2; 
        this.FACTORY_START_X = -10;
        this.FACTORY_START_Y = 2;
        box.position.x = this.FACTORY_START_X;
        box.position.y = this.FACTORY_START_Y;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

        box.material = boxMaterial;
        box.checkCollisions = true;
        this.mesh = box;
        this.spawnRocks(scene);
        this.scene.registerBeforeRender(() => {
            // ground move
            this.moveRockGenerationX();
            // console.log(`Mesh x ${this.mesh.position.x}`)
            // this._updateCamera();
    
        })
        return this;
        
    
    }
    
    moveRockGenerationX = () => {
        this.mesh.position.x -= .01;
    }


    spawnRocks = (scene) => {

        setInterval(function(){
            var rock = new Rock(scene);
            // rock.mesh.setParent(this.mesh);
            console.log(`rock ${rock.mesh.position}`)
        }, 2000);
    }

    
}