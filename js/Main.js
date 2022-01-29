

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: true });
engine.loadingUIBackgroundColor = "red";
let textureURL = '/GGJ22-Reverse/assets/';
if (location.hostname === ""){
    /** to avoid CORs loading erros
     * https://doc.babylonjs.com/toolsAndResources/assetLibraries/availableTextures */
    textureURL = 'https://www.babylonjs-playground.com/';
}
else if(location.hostname === '192.168.20.112') {
    textureURL = '/assets/';
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
    //Init physics engine
    const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector,physicsPlugin);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    const audioMan = new AudioAssetManager(scene);
   
    BABYLON.SceneLoader.Append("/GGJ22-Reverse/assets/models/", "wereman.glb", scene, function (newMeshes) {


    
    });
    
    
    const skybox = new Skybox(scene);
    const player = new Player(scene);
    const ground = new Ground(scene,player);
    
    const camera = new Camera(scene, player);

    const wall = new Wall(scene, player);
    const moon = new Moon(scene, player);
    ActionManager.establishInputs(scene, player, moon);
    
    
    const ObsFactory = new ObstacleFactory(scene,player, -10, 0, true,);
    const ObsFactory2 = new ObstacleFactory(scene,player, -10, 5, false);
    const ObsFactory3 = new ObstacleFactory(scene,player, -10, -3, false);
    const hud = new HUD(scene);

    

    

    return scene;
};



const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
    
});