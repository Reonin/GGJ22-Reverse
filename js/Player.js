

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
    jumpForceMagnitude = 50;
    moveForceMagnitude = 0; 
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
    ray = new BABYLON.Ray();
    rayHelper = null;
    onObject = false;
    direction = new BABYLON.Vector3();
        
    constructor(scene){
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("box", {});
        box.position.x = 0.5;
        box.position.y = 1;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/fur.jpg"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        box.material = boxMaterial;
        box.checkCollisions = true;
        this.speed = -.01;
        // Player movement
        this.command = {
            frameTime: 0,
            jumpKeyDown: false
        }
        this.mesh = box;
        this.mesh.isPickable = false;
        this.rayHelper = new BABYLON.RayHelper(this.ray);
        this.rayHelper.attachToMesh(this.mesh, new BABYLON.Vector3(0, -0.995, 0), new BABYLON.Vector3(0, -1, 0), 0.1);
        this.rayHelper.show(this.scene, new BABYLON.Color3(1, 0, 0));

        this.scene.registerBeforeRender(() => {
            // Player move
            this.command.frameTime = Date.now();
            this.move(this.command);
            // this._updateCamera();
    
        })

        return this;
    }

    mesh = {};
    setJumpKeyDown(jumpKeyDown){
        this.jumpKeyDown = jumpKeyDown;
    }

    jump = () => {
        console.log('Jumping')
        this.velocity.y = 0.15;
        this.onObject = false;
    }
    move = (command) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.command.frameTime;
            return;
        }
        const delta = this.command.frameTime - this.prevFrameTime;

            // Raycast Method 1
            const pick = this.scene.pickWithRay(this.ray);
            if (pick){
             console.log(pick);
             this.onObject = pick.hit;
            }
            // Raycast Method 2
            // for (const obstacle of obstacles) {
            //     if (ray.intersectsBox(obstacle.getBoundingInfo().boundingBox)) {
            //         onObject = true;
            //     }
            // }

            this.direction.normalize();

            this.velocity.x = 0;
            this.velocity.z = 0;
            // if (this.command.moveRightKeyDown || this.command.moveLeftKeyDown) this.velocity.z = this.direction.z * delta / 300;
            // if (this.command.moveForwardKeyDown || this.command.moveBackwardKeyDown) 
            // this.velocity.x = this.speed;

            // velocity.y = command.startVelocityY;
            this.velocity.y -= delta / 3000;
            if (this.onObject){
                this.velocity.y = Math.max(0, this.velocity.y);
                //console.log(`Veloctiy on hit ${this.velocity}`)
            }
            
            if (this.jumpKeyDown && this.onObject) {        
                this.jump();
                
            }


            this.mesh.moveWithCollisions(this.velocity);    
            //console.log(`Y velocity ${this.velocity.y}`)
            this.prevFrameTime = this.command.frameTime;
    }
    

}