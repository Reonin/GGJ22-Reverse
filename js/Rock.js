class Rock {

    ROCK_START_Y = 2;
    scene = null;
    obstacles = [];
    mesh = null;

    constructor(scene, player, rock_start_x, rock_start_y, rock_start_z){
        this.scene = scene;
        const rock = BABYLON.MeshBuilder.CreateSphere("rock", {}, scene);
        rock.position.x = rock_start_x;
        rock.position.y = rock_start_y;
        rock.position.z = rock_start_z
        const rockMaterial = new BABYLON.StandardMaterial("material", scene);
        rockMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat('/textures/rock.png'));
        
        rock.material = rockMaterial;
        rock.physicsImpostor = new BABYLON.PhysicsImpostor(rock, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
        rock.checkCollisions = true;

        rock.physicsImpostor.registerOnPhysicsCollide(player.mesh.physicsImpostor, function(main, collided) {
            player.mesh.dispose();
        });
        //Force Settings
        const forceDirection = new BABYLON.Vector3(10, 0, 0);
        const forceMagnitude = 700;
        const contactLocalRefPoint = BABYLON.Vector3.Zero();
        rock.isPickable = false;
        rock.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), rock.getAbsolutePosition().add(contactLocalRefPoint));
        rock.getAbsolutePosition().add(contactLocalRefPoint);
        this.mesh = rock;
        
        // scene.onBeforeRenderObservable.add(() => {
        //     setTimeout(function(){
        //         //this.scene.removeMesh(this.mesh)
        //         this.mesh.dispose();
        //     });
        // });
        
        return this;
        
    
    }
    
    moveRockGenerationX = () => {
        this.ROCK_START_X -= .01;
    }

    
   
}