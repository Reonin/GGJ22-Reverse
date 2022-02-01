

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: false });
engine.loadingUIBackgroundColor = "red";
var loadingScreenDiv = window.document.getElementById("loadingScreen");

function customLoadingScreen() {
    console.log("customLoadingScreen creation")
}
customLoadingScreen.prototype.displayLoadingUI = function () {
    console.log("customLoadingScreen loading")
    loadingScreenDiv.innerHTML = "loading curses...";
};
customLoadingScreen.prototype.hideLoadingUI = function () {
    console.log("customLoadingScreen loaded")
    loadingScreenDiv.style.display = "none";
};
var loadingScreen = new customLoadingScreen();
engine.loadingScreen = loadingScreen;

engine.displayLoadingUI();
let textureURL = '/GGJ22-Reverse/assets/';
let importedMeshes = null;
let treeGeneratorStarted = false;
let obstacles = [];
let trees = [];
// let player = null;
if (location.hostname === "") {
    /** to avoid CORs loading erros
     * https://doc.babylonjs.com/toolsAndResources/assetLibraries/availableTextures */
    textureURL = 'https://www.babylonjs-playground.com/';
}
else if (location.hostname === '192.168.20.112') {
    textureURL = '/assets/';
}
// Generate the Canvas
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const ratio = CANVAS_WIDTH / CANVAS_HEIGHT;

function scaletosmallest(ratio) {
    if ((windowWidth() / ratio) <= windowWidth()) {

        const canvasEle = document.querySelector("#gamecontainer");
        canvasEle.style.width = '100%';
        canvasEle.style.height = 'auto';
    } else {
        canvasEle.style.height = '100%';
        canvasEle.style.width = 'auto';
    }
}

function windowWidth() {
    var docElemProp = window.document.documentElement.clientWidth,
        body = window.document.body;
    return window.document.compatMode === "CSS1Compat" && docElemProp || body && body.clientWidth || docElemProp;
}
const scene = new BABYLON.Scene(engine, {useGeometryUniqueIdsMap: true, useClonedMeshMap: true, useMaterialMeshMap : true});
const audioMan = new AudioAssetManager(scene);

const optimizerOptions = new BABYLON.SceneOptimizerOptions(60);
optimizerOptions.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

const optimizer = new BABYLON.SceneOptimizer(scene, optimizerOptions);
/**
 * Weremodel
 */

const promiseModel1 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "wereman.glb", scene);
const promiseModel2 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "wereman_human_skin_mom_tattoo.glb", scene);
const promiseModel3 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "retro_grunge_skateboard.glb", scene);
const promiseModel4 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "axe.glb", scene);
const promiseModel5 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "rock.glb", scene);
const promiseModel6 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "forest_house_with_door.glb", scene);
const promiseModel7 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "tree.glb", scene);
const promiseModel8 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "wood_wall.glb", scene);
const promiseModel9 = BABYLON.SceneLoader.ImportMeshAsync(null, textureURL + "/models/", "breakable_wicker_wall.glb", scene); 

Promise.all([promiseModel1, promiseModel2, promiseModel3, promiseModel4, promiseModel5, promiseModel6, promiseModel7, promiseModel8, promiseModel9]).then((result) => {

    console.log('loaded in');

    importedMeshes = result;

    const sceneToRender = createScene(scene, importedMeshes);
    engine.runRenderLoop(function () {
        sceneToRender.render();

    });

});



const createScene = function (scene, importedMesh) {

    scene.clearColor = new BABYLON.Color3.Black;

    window.onresize = scaletosmallest(ratio);
    //Init physics engine
    const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    var player = null;
    const skybox = new Skybox(scene);
    const ground = new Ground(scene);
    const hud = new HUD(scene, engine);
    player = new Player(scene, ground, hud, importedMesh, audioMan);
    spawnedTrees = false;
    const moon = new Moon(scene, player);
    const camera = new Camera(scene, player);

   const wall = new Wall(scene, player, importedMesh);
   
    const ObsFactory = new ObstacleFactory(scene, player, wall, hud, -150, 0, true, importedMesh);
    const ObsFactory2 = new ObstacleFactory(scene, player, wall, hud, -150, 5, false, importedMesh);
    // const ObsFactory3 = new ObstacleFactory(scene,player, wall, -150, -3, false);

    ActionManager.establishInputs(scene, player, moon, hud, engine, audioMan);
    var count = 0;
    setInterval(function () {
        const ObsFactory3 = new ObstacleFactory(scene, player, wall, hud, -150, -3, false, importedMesh);
    }, 30000);
    scene.onBeforeRenderObservable.add(() => {
        if(spawnedTrees === false && player.alive === true){
            spawnTrees(importedMesh, player);
            spawnedTrees = true;
        }
        if(player.alive === true){
            spawnAndKillTrees(importedMesh,player);
        }
    });
    return scene;

};

spawnTrees = (importedMesh, player) => {
    var numTrees = 20;
    for (var i = 0; i < numTrees; i++) {
        var treeMesh = importedMesh[6].meshes[0].clone('tree');
        treeMesh.position = new BABYLON.Vector3(player.mesh.position.x + (i * -4), 0, -22);
        treeMesh.scaling = new BABYLON.Vector3(10,10,10);
        treeMesh.isPickable = false;
        treeMesh.leftSide = true;
        trees.push(treeMesh);
        var treeMesh = importedMesh[6].meshes[0].clone('tree');
        treeMesh.position = new BABYLON.Vector3(player.mesh.position.x + (i * -4), 0, 22);
        treeMesh.scaling = new BABYLON.Vector3(10,10,10);
        treeMesh.isPickable = false;
        treeMesh.leftSide = false;
        trees.push(treeMesh);
        // console.log(`Tree spawned at ${treeMesh.position}`)
    }

    
}

spawnAndKillTrees = (importedMesh, player) => {
    for(var i = 0; i < trees.length; i++){
        if(trees[i].position.x > player.mesh.position.x + 38){
            // console.log(`Tree is on left side: ${trees[i].leftSide}`);
            if(trees[i].leftSide === true){
                console.log(`Removing and creating new tree`)
                trees[i].dispose()
                trees.splice(i,1);
                if(trees.length <= 40){
                    var treeMesh = importedMesh[6].meshes[0].clone('tree');
                    treeMesh.position = new BABYLON.Vector3(trees[trees.length - 1].position.x - 4, 0, -22);
                    treeMesh.scaling = new BABYLON.Vector3(10,10,10);
                    treeMesh.isPickable = false;
                    treeMesh.leftSide = true;
                    trees.push(treeMesh);
            }
            }
            else if(trees[i].leftSide === false){
                trees[i].dispose()
                trees.splice(i,1);
                if(trees.length <= 40){
                    var treeMesh = importedMesh[6].meshes[0].clone('tree');
                    treeMesh.position = new BABYLON.Vector3(trees[trees.length - 1].position.x - 4, 0, 22);
                    treeMesh.scaling = new BABYLON.Vector3(10,10,10);
                    treeMesh.isPickable = false;
                    treeMesh.leftSide = false;
                    trees.push(treeMesh);
                }
            }
            
        }
    }
}


randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
