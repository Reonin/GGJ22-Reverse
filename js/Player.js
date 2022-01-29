

/**
 * Creates Player Object that has a mesh and newly defined abilities
 */
class Player {

    scene = null;
    jumpForceDirection = new BABYLON.Vector3();
    moveForceDirection = new BABYLON.Vector3();
    _moveDirection = new BABYLON.Vector3();
    _input = null;
    _inputAmt = 0;
    box = null;
    jumpCount = 0;
    jumpKeyDown = false;
    forwardKeyDown = false;
    collidedWithGround = false;
    moveBackwards = false;
    jumpForceMagnitude = 50;
    moveForceMagnitude = 0;
    moveRight = false;
    velocity = new BABYLON.Vector3();
    speed = 0;
    GRAVITY = -2.8;
    _deltaTime = 0;
    JUMP_FORCE = 0.80;
    //gravity, ground detection, jumping
    _gravity = new BABYLON.Vector3();
    _grounded = true;
    _lastGroundPos = BABYLON.Vector3.Zero(); // keep track of the last grounded position
    command = {};
    prevFrameTime = 0;
    downwardsRay = new BABYLON.Ray();
    forwardsRay = new BABYLON.Ray();
    forwardsRayHelper = null;
    downwardsRayHelper = null;
    onObject = false;
    direction = new BABYLON.Vector3();
    transformationState = 'wolfTop';dddd
    onGround = true;

    constructor(scene) {
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("player", { height: 2.5, width: 1 });
        box.position.x = 0.5;
        box.position.y = 3;
        box.position.z = -2;
        this.forwardKeyDown = false;
        this.moveBackwards = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.collidedWithGround = false;
        this.alive = true;
        this.onGround = true;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/fur.jpg"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        box.material = boxMaterial;
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
        // this.mesh.physicsImpostor.registerOnPhysicsCollide(ground.mesh.physicsImpostor, function(main, collided) {
            
        //     this.onGround = true;
        //     console.log(`On the ground ${this.onGround}`);
        // });
        
        this.mesh.physicsImpostor.executeNativeFunction(function (world, body) {
            body.fixedRotation = true;
            body.updateMassProperties();

        });
        
        this.scene.registerBeforeRender(() => {
            // Player move
            this.command.frameTime = Date.now();
            this.move();
            // this._updateCamera();

        })

        // this.mesh.physicsImpostor.onCollideEvent = this.die;

        return this;
    }

    mesh = {};
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

    jump = () => {
        // console.log('Jumping')
        // this.velocity.y = 0.15;
        //Force Settings
        try {
            var forceDirection = new BABYLON.Vector3(0, 10, 0);
            var forceMagnitude = 20;
            var contactLocalRefPoint = BABYLON.Vector3.Zero();
            // console.log('Applying force')
            this.mesh.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
            this.mesh.getAbsolutePosition().add(contactLocalRefPoint);

            this.onObject = false;
        }
        catch (error) {
            console.error(error)
        }

    }


    move = () => {
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
        

        // console.log(`On Ground ${this.onGround}`)
        if (this.jumpKeyDown && this.onObject) {
            this.jump();

        }
        //console.log(`Forward Key down is ${this.forwardKeyDown}`)

            //  console.log('Moving forward')
        this.mesh.position.x -= .06;

        if (this.moveBackwards) {
              
            this.mesh.position.x += .06;
        }

        if (this.moveLeft) {
           
          this.mesh.position.z -= .06;
      }

      if (this.moveRight) {
      
      this.mesh.position.z += .06;
  }

        

        // this.mesh.moveWithCollisions(this.velocity);    
        //console.log(`Y velocity ${this.velocity.y}`)
        // this.prevFrameTime = this.command.frameTime;
    }

    changeForm = () => {
        if (this.transformationState === 'wolfTop') {
            this.transformationState = 'humanTop';
        }
        else if (this.transformationState === 'humanTop') {
            this.transformationState = 'wolfTop';
        }
    }

    die() {
        this.mesh.dispose();
    }

}