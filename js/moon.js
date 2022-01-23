/**
 * Creates Moon Object that will be clickable to change the player object
 */
 class Moon {
    constructor(scene){
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4, segments: 48});
        sphere.position.x = -25;
        sphere.position.y = 16;


        const sphereMaterial = new BABYLON.StandardMaterial("material", scene);
        sphereMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/moon.png"), scene);
        sphere.material = sphereMaterial;

        this.mesh = sphere;

        return this;
    }

    mesh = {};

    phaseChange = function() {
        // color settings to go here
        console.log("phase change happened spooky!")
    }
}