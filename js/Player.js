

/**
 * Creates Player Object that has a mesh and newly defined abilities
 */
class Player {


    constructor(scene, ground, hud, importedMeshes, audioMan) {
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("player", { height: 2.5, width: 1 });
        box.visibility = 0.0;
        box.position.x = 0.5;
        box.position.y = 3;
        box.position.z = -2;



        const importedMeshWolf = importedMeshes[0].meshes[0];
        importedMeshWolf.scaling = new BABYLON.Vector3(30, 30, 30);

        importedMeshWolf.position = new BABYLON.Vector3(box.position.x, (box.position.y - .85), box.position.z);


        const importedMeshMan = importedMeshes[1].meshes[0];
        importedMeshMan.scaling = new BABYLON.Vector3(12, 12, 12);

        importedMeshMan.position = new BABYLON.Vector3(box.position.x, (box.position.y - .9), box.position.z);
        importedMeshMan.setEnabled(false);

        const importedMeshSkateboard = importedMeshes[2].meshes[0];
        importedMeshSkateboard.scaling = new BABYLON.Vector3(15, 15, 15);
        importedMeshSkateboard.position = new BABYLON.Vector3(box.position.x, (box.position.y - 1), box.position.z);

        importedMeshWolf.setParent(box);
        importedMeshMan.setParent(box);
        importedMeshSkateboard.setParent(box);
        box.showBoundingBox = true;
        scene.getBoundingBoxRenderer().frontColor.set(1, 0, 0);
        scene.getBoundingBoxRenderer().backColor.set(0, 1, 0);
        this.forwardKeyDown = false;
        this.moveBackwards = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.collidedWithGround = false;
        this.alive = true;
        this.onGround = true;
        this.playerAddedToObstacles = false;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        // boxMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/fur.jpg"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        // box.material = boxMaterial;
        this.transformationState = "humanTop";

        this.humanTopMesh = importedMeshMan;


        // const wolfMaterial = new BABYLON.StandardMaterial("material", scene);
        // wolfMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/leopard_fur.jpg"), scene);
        this.wolfTopMesh = importedMeshWolf;
        this.humanTopMesh.setEnabled(true);
        this.wolfTopMesh.setEnabled(false);

        // box.checkCollisions = true;
        this.speed = -.01;
        // Player movement
        this.command = {
            frameTime: 0,
            jumpKeyDown: false
        }

        this.mesh = box;
        this.mesh.isPickable = false;

        // console.log(`Mesh position ${this.mesh.position}`)

        this.downwardsRay = new BABYLON.Ray(this.mesh.position, new BABYLON.Vector3(0, -1, 0), 1)
        this.downwardsRayHelper = new BABYLON.RayHelper(this.downwardsRay);
        this.downwardsRayHelper.attachToMesh(this.mesh, new BABYLON.Vector3(0, -1, 0), new BABYLON.Vector3(0, -1, 0), 0.5);
        this.downwardsRayHelper.show(this.scene, new BABYLON.Color3(1, 0, 0));

        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);

        // console.log(`Added to obstacles${obstacles[0].object}`)
        // this.mesh.physicsImpostor.registerOnPhysicsCollide(ground.mesh.physicsImpostor, function(main, collided) {

        //     this.onGround = true;
        //     console.log(`On the ground ${this.onGround}`);
        // });

        this.mesh.physicsImpostor.executeNativeFunction(function (world, body) {
            body.fixedRotation = true;
            body.updateMassProperties();

        });

        this.scene.registerBeforeRender(() => {
            //add player to obstacle list so we can track it.
            if (this.playerAddedToObstacles === false) {
                obstacles.push(this.mesh.physicsImpostor);
                this.playerAddedToObstacles = true;
            }
            // console.log(`mesh is at ${this.mesh.position.y} ground is at ${ground.mesh.position.y}`)
            if (this.mesh.position.y + 10 < ground.mesh.position.y) {

                this.setAlive(false);
                this.mesh.dispose();
            }
            if (this.alive === false) {
                hud.gameOver = true;
                var element = document.getElementById("PAUSE");
                element.innerHTML = "Press R to restart";
            }
            // Player move
            this.command.frameTime = Date.now();
            this.move(audioMan);
            // this._updateCamera();

        })

        const particleEffectTransform = new BABYLON.ParticleSystem("particles", 50); //scene
        particleEffectTransform.particleTexture = new BABYLON.Texture(textureURL.concat("textures/sparkle2.jpg"));

        particleEffectTransform.emitter = this.mesh;

        this.particleSystem = particleEffectTransform;


        // this.mesh.physicsImpostor.onCollideEvent = this.die;

        return this;
    }

    mesh = {};
    transformationState = 'wolfTop';
    humanTopMesh = null;
    wolfTopMesh = null;
    particleSystem = null;
    setJumpKeyDown(jumpKeyDown) {
        //console.log(jumpKeyDown)
        this.jumpKeyDown = jumpKeyDown;
    }

    setOnGround(onGround) {
        //console.log(jumpKeyDown)
        this.onGround = onGround;
    }

    setMoveForwards(forwardKeyDown) {
        // console.log(`forwardKeyDown set to ${forwardKeyDown}`);
        this.forwardKeyDown = forwardKeyDown;
    }

    setMoveBackwards = (moveBackwards) => {
        //console.log(jumpKeyDown)
        this.moveBackwards = moveBackwards;
    }

    setMoveLeft = (moveLeft) => {
        //console.log(jumpKeyDown)
        this.moveLeft = moveLeft;
    }
    setMoveRight = (moveRight) => {
        //console.log(jumpKeyDown)
        this.moveRight = moveRight;
    }

    setCollidedWithGround(collidedWithGround) {
        // console.log(`forwardKeyDown set to ${forwardKeyDown}`);
        this.collidedWithGround = collidedWithGround;
    }

    setAlive(alive, whoHitMe) {

        switch (whoHitMe) {
            case 'axe':
                audioMan.axehitsfxArr[Math.floor(Math.random() * audioMan.axehitsfxArr.length)].play();
              break;
            case 'rock':
                audioMan.rockhitsfxArr[Math.floor(Math.random() * audioMan.rockhitsfxArr.length)].play();
              break;
            case 'door' :
                audioMan.dooropensfxArr[Math.floor(Math.random() * audioMan.dooropensfxArr.length)].play();
             break
            default:
          }
     


        this.alive = alive;
    }

    jump = () => {
        // console.log('Jumping')
        // this.velocity.y = 0.15;
        //Force Settings
        try {
            if (this.transformationState === "humanTop") {
                var forceDirection = new BABYLON.Vector3(0, 10, 0);
                var forceMagnitude = 10;
                var contactLocalRefPoint = BABYLON.Vector3.Zero();
                // console.log('Applying force')
                this.mesh.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
                this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
            }
            else if (this.transformationState === "wolfTop") {
                var forceDirection = new BABYLON.Vector3(0, 10, 0);
                var forceMagnitude = 5;
                var contactLocalRefPoint = BABYLON.Vector3.Zero();
                // console.log('Applying force')
                this.mesh.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
                this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
            }


            this.onObject = false;
        }
        catch (error) {
            console.error(error)
        }

    }


    move = (audioMan) => {
        // if (this.prevFrameTime === undefined) {
        //     this.prevFrameTime = this.command.frameTime;
        //     return;
        // }
        // const delta = this.command.frameTime - this.prevFrameTime;

        // Raycast Method 1
        const pick = this.scene.pickWithRay(this.downwardsRay);
        if (pick) {
            // console.log(`Type of : ${JSON.stringify(pick)}`);
            if (pick.pickedMesh !== null) {
                // console.log(pick);
                if (pick.pickedMesh.name === "ground") {
                    // 
                    this.onObject = pick.hit;
                }

            }
        }

        if (this.onObject && audioMan.skateboardRoll.isPlaying === false) {
            audioMan.skateboardRoll.play();
        } else if (this.onObject === false && audioMan.skateboardRoll.isPlaying) {
            audioMan.skateboardRoll.stop();
        }
        // console.log(`On Ground ${this.onGround}`)
        if (this.jumpKeyDown && this.onObject && this.alive === true) {
            this.jump();

        }
        //console.log(`Forward Key down is ${this.forwardKeyDown}`)

        //  console.log('Moving forward')
        this.mesh.position.x -= .06;

        if (this.moveBackwards) {

            this.mesh.position.x += .06;
        }

        if (this.moveLeft) {
            if (this.transformationState === 'humanTop') {
                this.mesh.position.z -= .16;
            }
            else {
                this.mesh.position.z -= .06;
            }
        }

        if (this.moveRight) {

            if (this.transformationState === 'humanTop') {
                this.mesh.position.z += .16;
            }
            else {
                this.mesh.position.z += .06;
            }
        }



        // this.mesh.moveWithCollisions(this.velocity);    
        //console.log(`Y velocity ${this.velocity.y}`)
        // this.prevFrameTime = this.command.frameTime;
    }


    getHumanTop() {
        this.particleSystem.start();
        this.humanTopMesh.setEnabled(true);
        this.wolfTopMesh.setEnabled(false);

        setTimeout(() => {
            this.particleSystem.stop();
        }, 2000);

    }

    getWolfTop() {
        this.particleSystem.start();
        this.humanTopMesh.setEnabled(false);
        this.wolfTopMesh.setEnabled(true);
        setTimeout(() => {
            this.particleSystem.stop();
        }, 2000);
    }

    changeForm = (scene) => {
        if (this.transformationState === 'wolfTop') {
            this.transformationState = 'humanTop';
            this.getHumanTop();
        }
        else if (this.transformationState === 'humanTop') {
            this.transformationState = 'wolfTop';
            this.getWolfTop();
        }
    }

    die() {
        this.mesh.dispose();
    }

}