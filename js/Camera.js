class Camera{
    constructor(scene, player) {
        
        // // const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
        // const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -5), scene);
        // camera.attachControl(canvas, true);
        // // remove by instance
        // camera.inputs.attached.pointers.detachControl();

        // // The goal distance of camera from target
        // camera.radius = 30;

        // // The goal height of camera above local origin (centre) of target
        // camera.heightOffset = 10;

        // // The goal rotation of camera around local origin (centre) of target in x y plane
        // camera.rotationOffset = 0;

        // // Acceleration of camera in moving from current to goal position
        // camera.cameraAcceleration = 0.005;

        // // The speed at which acceleration is halted
        // camera.maxCameraSpeed = 10;

        // camera.lockedTarget = player.mesh;

        const alpha =  Math.PI/2;
        const beta = Math.PI/2.2;
        const radius = 18;
        const target = new BABYLON.Vector3(0, 0, 0);
    
        const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
        camera.attachControl(canvas, true);
        // remove by instance
        camera.inputs.attached.pointers.detachControl();
        return camera;
    }
}