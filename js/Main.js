

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: true });
engine.loadingUIBackgroundColor = "red";
let textureURL = '/GGJ22-Reverse/assets/';
let importedMeshes = null;
let obstacles = [];
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
const scene = new BABYLON.Scene(engine);
// let importedMesh = null;
// let player = null;
// let moon = null;

/**
 * Weremodel1
 */

const promiseModel1 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "wereman.glb", scene);
const promiseModel2 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "wereman_human_skin_mom_tattoo.glb", scene);
const promiseModel3 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "retro_grunge_skateboard.glb", scene);


Promise.all([promiseModel1, promiseModel2, promiseModel3]).then((result) => {

  console.log('loaded in');
    
  importedMeshes = result;

  const sceneToRender = createScene(scene, importedMeshes);
  engine.runRenderLoop(function(){
   sceneToRender.render();
  
  });

});




const createScene = function(scene, importedMesh) {
    
    scene.clearColor = new BABYLON.Color3.Black;

    window.onresize = scaletosmallest(ratio);
    //Init physics engine
    const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    const audioMan = new AudioAssetManager(scene);
    const skybox = new Skybox(scene); 
    const ground = new Ground(scene);
    const hud = new HUD(scene, engine);
    const player = new Player(scene,ground, hud,importedMesh);
    
    const moon = new Moon(scene, player);
    const camera = new Camera(scene, player);

    const wall = new Wall(scene, player);
    
    const ObsFactory = new ObstacleFactory(scene,player, wall, -150, 0, true);
    const ObsFactory2 = new ObstacleFactory(scene,player, wall, -150, 5, false);
    // const ObsFactory3 = new ObstacleFactory(scene,player, wall, -150, -3, false);
    
    ActionManager.establishInputs(scene, player, moon, hud, engine, audioMan);
    var count = 0;  
    setInterval(function(){
        const ObsFactory3 = new ObstacleFactory(scene,player, wall, -150, -3, false);
    }, 10000);
    
    return scene;
  
};



randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
