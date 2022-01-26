

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
    downwardsRay = new BABYLON.Ray();
    forwardsRay = new BABYLON.Ray();
    forwardsRayHelper = null;
    downwardsRayHelper = null;
    onObject = false;
    direction = new BABYLON.Vector3();

    constructor(scene) {
        this.scene = scene;
        const box = BABYLON.MeshBuilder.CreateBox("box", {});
        box.position.x = 0.5;
        box.position.y = 5;
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

        console.log(`Mesh position ${this.mesh.position}`)
        this.downwardsRay = new BABYLON.Ray(this.mesh.position, new BABYLON.Vector3(0, -.1, 0), 1)
        this.downwardsRayHelper = new BABYLON.RayHelper(this.downwardsRay);
        this.downwardsRayHelper.attachToMesh(this.mesh, new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, -1, 0), 0.5);
        this.downwardsRayHelper.show(this.scene, new BABYLON.Color3(1, 0, 0));

        this.scene.registerBeforeRender(() => {
            // Player move
            this.command.frameTime = Date.now();
            this.move(this.command);
            // this._updateCamera();

        })

        return this;
    }

    mesh = {};
    setJumpKeyDown(jumpKeyDown) {
        this.jumpKeyDown = jumpKeyDown;
    }

    jump = () => {
        console.log('Jumping')
        // this.velocity.y = 0.15;
        //Force Settings
        var forceDirection = new BABYLON.Vector3(0, 10, 0);
        var forceMagnitude = 10;
        var contactLocalRefPoint = BABYLON.Vector3.Zero();

        this.mesh.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
        this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
        this.onObject = false;
    }
    move = (command) => {
        if (this.prevFrameTime === undefined) {
            this.prevFrameTime = this.command.frameTime;
            return;
        }
        const delta = this.command.frameTime - this.prevFrameTime;

        // Raycast Method 1
        const pick = this.scene.pickWithRay(this.downwardsRay);
        if (pick) {
            //console.log(`Type of : ${pick.pickedMesh}`);
            if (pick.pickedMesh !== null) {
                if (pick.pickedMesh.name === "ground") {
                    console.log(pick);
                    this.onObject = pick.hit;
                }



            }
        }


        if (this.jumpKeyDown && this.onObject) {
            this.jump();

        }


        // this.mesh.moveWithCollisions(this.velocity);    
        //console.log(`Y velocity ${this.velocity.y}`)
        this.prevFrameTime = this.command.frameTime;
    }

}