

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
    _isJumping = false;
    jumpForceMagnitude = 50;
    moveForceMagnitude = 0;
    GRAVITY = -2.8;
    _deltaTime = 0;
    JUMP_FORCE = 10.80;
    //gravity, ground detection, jumping
    _gravity = new BABYLON.Vector3();
    _grounded = true;
    _lastGroundPos = BABYLON.Vector3.Zero(); // keep track of the last grounded position

    constructor(scene, input){
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("box", {});
        box.position.x = 0.5;
        box.position.y = 1;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/fur.jpg"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        box.material = boxMaterial;
        
        this.mesh = box;

        this._input = input;

        this.scene.registerBeforeRender(() => {
    
            // this._updateGroundDetection();
            // this._updateCamera();
    
        })
        return this;
    }

    mesh = {};
    setIsJumping = function(isJumping){
        console.log(`Jump set to ${isJumping}`)
        this._isJumping = isJumping;
    }
    jump = function() {
        //if(this.mesh.x < 40){
        //Force Settings
                    //Jump detection
        //this._updateGroundDetection();
        var impulseDirection = new BABYLON.Vector3(0, 1, 0);
        var impulseMagnitude = 5;
        var contactLocalRefPoint = BABYLON.Vector3.Zero();
        console.log(`Mesh y is ${this.mesh.position.y}`)
        if(this.mesh.position.y < 10){
            console.log(`Applying force ${impulseDirection.scale(impulseMagnitude)}`)
            this.mesh.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint)); 
        }
        //     this.mesh.physicsImpostor.applyForce(jumpForceDirection.scale(jumpForceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
        //     this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
        //  //}
    }

    _isGrounded = function(){
        if (this._floorRaycast(0, 0, 0).equals(BABYLON.Vector3.Zero())) {
            return false;
        } else {
            return true;
        }
    }

    _updateGroundDetection = function(){
        if (!this._isGrounded()) {
            console.log(`Is not on the ground`)
            //if the body isnt grounded, check if it's on a slope and was either falling or walking onto it
            // if (this._checkSlope() && this._gravity.y <= 0) {
            //     //if you are considered on a slope, you're able to jump and gravity wont affect you
            //     this._gravity.y = 0;
            //     this._jumpCount = 1;
            //     this._grounded = true;
            // } else {
                //keep applying gravity
                this._gravity = this._gravity.addInPlace(BABYLON.Vector3.Up().scale(this._deltaTime * this.GRAVITY));
                this._grounded = false;
                console.log(`In the air gravity.y is ${this._gravity.y}`)
                BABYLON.Animation.CreateAndStartAnimation("anim", this.mesh, "position", 30, 60, this.mesh.position, new BABYLON.Vector3(this.mesh.position.x, this.mesh.position.y + this._gravity.y, 0), BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            // }
        }
            // if (this._gravity.y < -this.JUMP_FORCE) {
            //     this._gravity.y = -this.JUMP_FORCE;
            // }
            //this.mesh.moveWithCollisions(this._moveDirection.addInPlace(this._gravity));
            
            if (this._isGrounded()) {
                console.log(`Is on the ground`)
                this._gravity.y = 0;
                this._grounded = true;
                this._lastGroundPos.copyFrom(this.mesh.position);
                this._jumpCount = 1; //allow for jumping
            }
            //console.log(`Jumping button ${this._isJumping}\nJump count is ${this._jumpCount}`)
            if (this._isJumping && this._jumpCount > 0 ) {
                console.log('Is jumping')
                this._gravity.y = this.JUMP_FORCE;
                this._jumpCount--;
                console.log(`Current mesh y position ${this.mesh.position.y}\nGravity with current position is ${this.mesh.position.y + this._gravity.y}`);
                BABYLON.Animation.CreateAndStartAnimation("anim", this.mesh, "position", 30, 60, this.mesh.position, new BABYLON.Vector3(this.mesh.position.x, this.mesh.position.y + this._gravity.y, 0), BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                this._isJumping = false;

            }
            var originalY = this.mesh.position.y
            
        
    }

    _floorRaycast(offsetx, offsetz, raycastlen) {
        let raycastFloorPos = new BABYLON.Vector3(this.mesh.position.x + offsetx, this.mesh.position.y + 0.5, this.mesh.position.z + offsetz);
        let ray = new BABYLON.Ray(raycastFloorPos, BABYLON.Vector3.Up().scale(-1), raycastlen);

        let predicate = function (mesh) {
            return mesh.isPickable && mesh.isEnabled();
        }
        let pick = this.scene.pickWithRay(ray, predicate);
        if (pick.hit) { 
            return pick.pickedPoint;
        } else { 
            return BABYLON.Vector3.Zero();
        }

    }

}