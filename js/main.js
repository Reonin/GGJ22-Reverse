const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let textureURL = '/assets/';
if (location.hostname === "localhost" || location.hostname === ""){
    /** to avoid CORs loading erros
     * https://doc.babylonjs.com/toolsAndResources/assetLibraries/availableTextures */
    textureURL = 'https://www.babylonjs-playground.com/';
}
    
/**
 * Creates Player Object that has a mesh and newly defined abilities
 */
class Player {
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
        this.mesh.position.y += 3;
    }
}


const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black;

    const alpha =  Math.PI/4;
    const beta = Math.PI/3;
    const radius = 8;
    const target = new BABYLON.Vector3(0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);
    // remove by instance
    camera.inputs.attached.pointers.detachControl();

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const player = new Player(scene);

    // sets inputs for player on the scene
    scene.actionManager = new BABYLON.ActionManager(scene);

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                    parameter: 'r'
                },
                function () { 
                    console.log('r button was pressed'); 
                    player.jump();
                }
            )
        );

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height:50} , scene); 

    //console log out which key is pressed
    // scene.onKeyboardObservable.add((kbInfo) => {
    //     switch (kbInfo.type) {
    //         case BABYLON.KeyboardEventTypes.KEYDOWN:
    //         console.log("KEY DOWN: ", kbInfo.event.key);
    //         break;
    //         case BABYLON.KeyboardEventTypes.KEYUP:
    //         console.log("KEY UP: ", kbInfo.event.code);
    //         break;
    //     }
    //  });

     //Init physics engine
    const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
     //set physics models to objects made
    player.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(player.mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    return scene;
};

const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});


