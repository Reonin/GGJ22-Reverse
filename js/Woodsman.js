class Woodsman {

    woodsman_START_Y = 4.5;
    scene = null;
    obstacles = [];
    mesh = null;

    constructor(scene, player, wall, woodsman_start_x,woodsman_start_z){
        this.scene = scene;
        const woodsman = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
        woodsman.position.x = woodsman_start_x;
        woodsman.position.y = this.woodsman_START_Y;
        woodsman.position.z = woodsman_start_z;
        const woodsmanMaterial = new BABYLON.StandardMaterial("material", scene);
        woodsmanMaterial.diffuseColor = BABYLON.Color3.Green();
        woodsman.material = woodsmanMaterial;
        woodsman.checkCollisions = true;

        //axeSpin face UVs
        const axeSpinUV = [];
        axeSpinUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
        axeSpinUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
        axeSpinUV[2] = new BABYLON.Vector4(0, 0, 1, 1);
        
        //Animate the axeSpins
        const animaxeSpin = new BABYLON.Animation("axeSpinAnimation", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,scene);
        const axeSpinKeys = []; 

        //At the animation key 0, the value of rotation.y is 0
        axeSpinKeys.push({
            frame: 0,
            value: 0
        });

        //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
        axeSpinKeys.push({
            frame: 30,
            value: 2 * Math.PI
        });

        //set the keys
        animaxeSpin.setKeys(axeSpinKeys);

        //Link this animation to a axeSpin
        woodsman.animations = [];
        woodsman.animations.push(animaxeSpin);
        scene.beginAnimation(woodsman, 0, 30, true);

        woodsman.isPickable = false;
        this.mesh = woodsman;
        this.scene.registerBeforeRender(() => { 
            this.move();
            // this._updateCamera();
    
        })
        this.destructiveMeshes = [player.mesh.physicsImpostor];
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0 }, scene);
        this.mesh.wall = wall;
        var destructiveMeshes = obstacles;
        this.mesh.physicsImpostor.registerOnPhysicsCollide(destructiveMeshes, function(woodsman, collided) {
            destructiveMeshes = obstacles;
            // destructiveMeshes.push.apply(destructiveMeshes, rock.object.wall.getWallImposters());
            // console.log(`Update Meshes length ${destructiveMeshes.length}`)
            for(var i = 0; i < destructiveMeshes.length; i++){
                // console.log(`Collided with ${collided.object.name}`)
                if(collided.object.name === "player"){
                    // console.log(`${destructiveMeshes[i].object.name}`)
                    player.mesh.dispose();
                    player.setAlive(false);
                    woodsman.object.dispose();
                    obstacles.splice(i,1);
                }
                else if(collided.object.name === "wall piece"){
                    // console.log(`IN else if ${destructiveMeshes[i].object.name}`)
                    woodsman.object.dispose();
                }
            }
            // console.log(`Meshes length ${destructiveMeshes.length}`)
            // for(var i = 0; i < this.destructiveMeshes.length; i++){
            //     console.log(this.destructiveMeshes[i]);
            // }
        });
        return this;
    
    }
    
    moveWoodsmanGenerationX = () => {
        this.WOODSMAN_START_X -= .01;
    }

    move = () => {
        this.mesh.position.x += .1;
        this.mesh.rotate(BABYLON.Axis.Z,.07,BABYLON.Space.LOCAL);
        //console.log(this.mesh.position.x)
    }

}