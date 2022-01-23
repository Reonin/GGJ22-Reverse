

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
        // Player movement
        this.command = {
            frameTime: 0,
            moveForwardKeyDown: false,
            moveBackwardKeyDown: false,
            moveLeftKeyDown: false,
            moveRightKeyDown: false,
            jumpKeyDown: false,
            cameraAlpha: 0,
            cameraBeta: 0
        }
        this.mesh = box;
        this.mesh.isPickable = false;
        this.rayHelper = new BABYLON.RayHelper(this.ray);
        this.rayHelper.attachToMesh(this.mesh, new BABYLON.Vector3(0, -0.995, 0), new BABYLON.Vector3(0, -1, 0), 0.1);
        this.rayHelper.show(this.scene, new BABYLON.Color3(1, 0, 0));

        this.scene.registerBeforeRender(() => {
            // Player move
            this.command.frameTime = Date.now();
            // this.command.cameraAlpha = camera.alpha;
            // this.command.cameraBeta = camera.beta;
            //this._updateGroundDetection();
            this.move(this.command);
            // this._updateCamera();
    
        })
    //     this.scene.onKeyboardObservable.add(kbInfo => {
    //         switch (kbInfo.type) {
    //                 case BABYLON.KeyboardEventTypes.KEYDOWN:
    //                 switch (kbInfo.event.key) {
    //                     case ' ':
    //                         console.log(`Key down in player`)
    //                         this.command.jumpKeyDown = true;
    //                     break;
    //             }
    //             case BABYLON.KeyboardEventTypes.KEYUP:
    //                 switch (kbInfo.event.key) {
    //                     case ' ':
    //                         this.command.jumpKeyDown = false;
    //                         break;
    //                 }
    //     break;
    // }});
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
        const delta = command.frameTime - this.prevFrameTime;

            // Raycast Method 1
            const pick = this.scene.pickWithRay(this.ray);
            if (pick){
            //  console.log(pick);
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
            // if (this.command.moveForwardKeyDown || this.command.moveBackwardKeyDown) this.velocity.x = this.direction.x * delta / 300;

            // velocity.y = command.startVelocityY;
            this.velocity.y -= delta / 3000;
            if (this.onObject){
                this.velocity.y = Math.max(0, this.velocity.y);
                //console.log(`Veloctiy on hit ${this.velocity}`)
            }
            
            console.log(`Command key down ${this.jumpKeyDown}`)
            if (this.jumpKeyDown && this.onObject) {        
                this.jump();
                
            }

            //const rotationAxis = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, viewAngleY);
            //const rotatedVelocity = BABYLON.Vector3.TransformCoordinates(velocity, rotationAxis);
            this.mesh.moveWithCollisions(this.velocity);    
            //console.log(`Y velocity ${this.velocity.y}`)
            this.prevFrameTime = this.command.frameTime;
    }
    // jump = function() {
    //     //if(this.mesh.x < 40){
    //     //Force Settings
    //                 //Jump detection
    //     //this._updateGroundDetection();
    //     if(this._isJumping == true && this._jumpCount > 0){
    //         var impulseDirection = new BABYLON.Vector3(0, 1, 0);
    //         var impulseMagnitude = 1;
    //         var contactLocalRefPoint = BABYLON.Vector3.Zero();
    //         console.log(`Mesh y is ${this.mesh.position.y}`)
    //         if(this.mesh.position.y < 10){
    //             var forceVector = new BABYLON.Vector3(0, this.mesh.position.y + this.JUMP_FORCE, 0)
    //             //.clone().subtract(this.mesh.position)
    //             console.log(`Applying force ${new BABYLON.Vector3(0, this.mesh.position.y + this.JUMP_FORCE, 0)} - ${this.mesh.position} = ${forceVector}`)
    //             this.mesh.physicsImpostor.applyImpulse(forceVector.scale(impulseMagnitude), this.mesh.getAbsolutePosition());                 
    //         }
    //     }
    //     //     this.mesh.physicsImpostor.applyForce(jumpForceDirection.scale(jumpForceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
    //     //     this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
    //     //  //}
    // }

    // _isGrounded = function(){
    //     if (this._floorRaycast(0, 0, .6).equals(BABYLON.Vector3.Zero())) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    // _updateGroundDetection = function(){
    //     if (!this._isGrounded()) {
    //         console.log(`Is not on the ground`)
    //         //if the body isnt grounded, check if it's on a slope and was either falling or walking onto it
    //         // if (this._checkSlope() && this._gravity.y <= 0) {
    //         //     //if you are considered on a slope, you're able to jump and gravity wont affect you
    //         //     this._gravity.y = 0;
    //         //     this._jumpCount = 1;
    //         //     this._grounded = true;
    //         // } else {
    //             //keep applying gravity
    //             this._gravity = this._gravity.addInPlace(BABYLON.Vector3.Up().scale(this._deltaTime * this.GRAVITY));
    //             this._grounded = false;
    //             //console.log(`In the air gravity.y is ${this._gravity.y}`)
    //         // }
    //     }
    //         if (this._gravity.y < -this.JUMP_FORCE) {
    //             this._gravity.y = -this.JUMP_FORCE;
    //         }
    //         //this.mesh.moveWithCollisions(this._moveDirection.addInPlace(this._gravity));
            
    //         if (this._isGrounded()) {
    //             //console.log(`Is on the ground`)
    //             this._gravity.y = 0;
    //             this._grounded = true;
    //             this._lastGroundPos.copyFrom(this.mesh.position);
    //             this._jumpCount = 1; //allow for jumping
    //         }
    //         //console.log(`Jumping button ${this._isJumping}\nJump count is ${this._jumpCount}`)
    //         if (this._isJumping && this._jumpCount > 0 ) {
    //             //console.log('Is jumping')
    //             this._gravity.y = this.JUMP_FORCE;
    //             this._jumpCount--;
    //             //console.log(`Current mesh y position ${this.mesh.position.y}\nGravity with current position is ${this.mesh.position.y + this._gravity.y}`);
    //             // BABYLON.Animation.CreateAndStartAnimation("anim", this.mesh, "position", 30, 60, this.mesh.position, new BABYLON.Vector3(this.mesh.position.x, this.mesh.position.y + this._gravity.y, 0), BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //             // this._isJumping = false;

    //         }
    //         var originalY = this.mesh.position.y
            
        
    // }

    // _floorRaycast(offsetx, offsetz, raycastlen) {
    //     let raycastFloorPos = new BABYLON.Vector3(this.mesh.position.x + offsetx, this.mesh.position.y + 0.5, this.mesh.position.z + offsetz);
    //     let ray = new BABYLON.Ray(raycastFloorPos, BABYLON.Vector3.Up().scale(-1), raycastlen);

    //     let predicate = function (mesh) {
    //         return mesh.isPickable && mesh.isEnabled();
    //     }
    //     let pick = this.scene.pickWithRay(ray, predicate);
    //     if (pick.hit) { 
    //         return pick.pickedPoint;
    //     } else { 
    //         return BABYLON.Vector3.Zero();
    //     }

    // }

}