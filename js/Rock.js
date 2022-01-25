class Rock {

    ROCK_START_X = -10;
    ROCK_START_Y = 2;
    scene = null;
    obstacles = [];
    mesh = null;
    life = 0;

    constructor(scene, rock_start_x){
        this.scene = scene;
        // console.log(`Rock start x ${this.ROCK_START_X}`)
        const rock = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
        rock.position.x = rock_start_x;
        rock.position.y = this.ROCK_START_Y;
        const rockMaterial = new BABYLON.StandardMaterial("material", scene);
        rockMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat('/textures/rock.png'));
        
        rock.material = rockMaterial;
        rock.physicsImpostor = new BABYLON.PhysicsImpostor(rock, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.85, restitution: 0.9 }, scene);
        rock.checkCollisions = true;
        //Force Settings
        const forceDirection = new BABYLON.Vector3(10, 0, 0);
        const forceMagnitude = 50;
        const contactLocalRefPoint = BABYLON.Vector3.Zero();
        this.life = 0;
        

        rock.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), rock.getAbsolutePosition().add(contactLocalRefPoint));
        rock.getAbsolutePosition().add(contactLocalRefPoint);
        this.mesh = rock;

        return this;
    
    }
    
    moveRockGenerationX = () => {
        this.ROCK_START_X -= .01;
    }

}