/**
 * Creates Player Object that has a mesh and newly defined abilities
 */
 class Player {

    jumpForceDirection = new BABYLON.Vector3();
    moveForceDirection = new BABYLON.Vector3();
    jumpCount = 0;
    jumpForceMagnitude = 50;
    moveForceMagnitude = 0;
    GRAVITY = -2.8;
    //gravity, ground detection, jumping
    _gravity = new Vector3();
    _grounded = true;
    _lastGroundPos = Vector3.Zero(); // keep track of the last grounded position

    constructor(scene){
        const box = BABYLON.MeshBuilder.CreateBox("box", {});
        box.position.x = 0.5;
        box.position.y = 1;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/fur.jpg"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        box.material = boxMaterial;

        this.mesh = box;

        return this;
    }

    mesh = {};

    jump = function() {
        //if(this.mesh.x < 40){
        //Force Settings

            var jumpForceDirection = new BABYLON.Vector3(0, 10, 0);
            var jumpForceMagnitude = 50;
            var contactLocalRefPoint = BABYLON.Vector3.Zero();

            this.mesh.physicsImpostor.applyForce(jumpForceDirection.scale(jumpForceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
            this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
         //}
    }

    _isGrounded = function(){
        if (this._floorRaycast(0, 0, .6).equals(Vector3.Zero())) {
            return false;
        } else {
            return true;
        }
    }

    updateGroundDetection = function(){
        if (!this._isGrounded()) {
            //if the body isnt grounded, check if it's on a slope and was either falling or walking onto it
            // if (this._checkSlope() && this._gravity.y <= 0) {
            //     //if you are considered on a slope, you're able to jump and gravity wont affect you
            //     this._gravity.y = 0;
            //     this._jumpCount = 1;
            //     this._grounded = true;
            // } else {
                //keep applying gravity
                this._gravity = this._gravity.addInPlace(Vector3.Up().scale(this._deltaTime * this.GRAVITY));
                this._grounded = false;
            // }
        }
    }

    _floorRaycast(offsetx, offsetz, raycastlen) {
        let raycastFloorPos = new Vector3(this.mesh.position.x + offsetx, this.mesh.position.y + 0.5, this.mesh.position.z + offsetz);
        let ray = new Ray(raycastFloorPos, Vector3.Up().scale(-1), raycastlen);

        let predicate = function (mesh) {
            return mesh.isPickable && mesh.isEnabled();
        }
        let pick = this.scene.pickWithRay(ray, predicate);
        if (pick.hit) { 
            return pick.pickedPoint;
        } else { 
            return Vector3.Zero();
        }

    }
}