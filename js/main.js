const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let textureURL = '/assets/';
if (location.hostname === ""){
    /** to avoid CORs loading erros
     * https://doc.babylonjs.com/toolsAndResources/assetLibraries/availableTextures */
    textureURL = 'https://www.babylonjs-playground.com/';
}
    



const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black;



    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const player = new Player(scene);
    const camera = new Camera(scene,player);


   
    ActionManager.establishInputs(scene, player);
    const skybox = new Skybox(scene);

    const ObsFactory = new ObstacleFactory(scene);


    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height:10} , scene); 

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


