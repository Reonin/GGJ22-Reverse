

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: true });
let textureURL = '/GGJ22-Reverse/assets/';
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
   
    
    
    const skybox = new Skybox(scene);
    
    
    const ground = new Ground(scene);
    const player = new Player(scene, ground);
    const camera = new Camera(scene, player);

    const wall = new Wall(scene, player);
    const moon = new Moon(scene, player);
   
    
    const ObsFactory = new ObstacleFactory(scene,player, wall, -150, 0, true);
    const ObsFactory2 = new ObstacleFactory(scene,player, wall, -150, 5, false);
    const ObsFactory3 = new ObstacleFactory(scene,player, wall, -150, -3, false);
    const hud = new HUD(scene);
    ActionManager.establishInputs(scene, player, moon, hud, engine);

    
    
    // scene.onBeforeRenderObservable.add(() => {
    //     // for(var i = 0; i < obstacles.length; i++){
    //     //     // console.log(`${obstacles[i].object}`)
    //     // }
    // });
     //set physics models to objects made
   
    

    // ground.mesh.physicsImpostor.onCollideEvent = function(collisionObject) {
    //     console.log(`Collided with ${collisionObject.object}`)
    // }
  
    //player.mesh.setParent(ground.mesh)
    //ObsFactory.mesh.setParent(ground.mesh)
    //moon.mesh.setParent(ground.mesh)

    return scene;
};



const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
    
});

randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}