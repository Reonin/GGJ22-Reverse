

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let textureURL = '/GGJ22-Reverse/assets/';
if (location.hostname === ""){
    /** to avoid CORs loading erros
     * https://doc.babylonjs.com/toolsAndResources/assetLibraries/availableTextures */
    textureURL = 'https://www.babylonjs-playground.com/';
}
// Generate the Canvas
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const ratio = CANVAS_WIDTH / CANVAS_HEIGHT;

function scaletosmallest(ratio) {
    if ( (windowWidth() / ratio) <= windowWidth() ) {
        
        const canvasEle = document.querySelector("#gamecontainer");
        canvasEle.style.width = '99%';
        canvasEle.style.height = 'auto';
    } else {
        canvasEle.style.height = '99%';
        canvasEle.style.width = 'auto';
    }
  }

function windowWidth() {
    var docElemProp = window.document.documentElement.clientWidth,
        body = window.document.body;
    return window.document.compatMode === "CSS1Compat" && docElemProp || body && body.clientWidth || docElemProp;
}



const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black;

    window.onresize = scaletosmallest(ratio);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    const player = new Player(scene);
    const camera = new Camera(scene, player);
    const moon = new Moon(scene)
        

    const audioMan = new AudioAssetManager(scene);
   
    ActionManager.establishInputs(scene, player);
    const skybox = new Skybox(scene);
    
    const ObsFactory = new ObstacleFactory(scene);
    const hud = new HUD();

    const ground = new Ground(scene);
    
     //Init physics engine
    const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
     //set physics models to objects made
    player.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(player.mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 , restitution: 0.9 }, scene);
    ground.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(ground.mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    ground.checkCollisions = true;

    

    player.mesh.setParent(ground.mesh)
    //ObsFactory.mesh.setParent(ground.mesh)
    moon.mesh.setParent(ground.mesh)

    return scene;
};



const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
    
});