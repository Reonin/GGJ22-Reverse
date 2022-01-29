class Skybox {
  constructor(scene) {
    const skybox = BABYLON.MeshBuilder.CreateBox(
      'skyBox',
      {size: 200.0},
      scene
    );
    const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      textureURL.concat('textures/skybox4'),
      scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;

    skybox.material = skyboxMaterial;

    skybox.infiniteDistance = true;
    skybox.isPickable = false;

    /**fog */
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.03;

    return skybox;
  }
}
