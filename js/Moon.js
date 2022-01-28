/**
 * Creates Moon Object that will be clickable to change the player object
 */
class Moon {
  constructor(scene, player) {
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
      diameter: 20,
      segments: 32,
    });
    sphere.position.x = -19;
    sphere.position.y = 12;

    const sphereMaterial = new BABYLON.StandardMaterial('material', scene);
    // sphereMaterial.diffuseTexture = new BABYLON.Texture(
    //   textureURL.concat('textures/sphereMap.png'),
    //   scene
    // );
    sphereMaterial.emissiveColor = BABYLON.Color3.Yellow();
    sphere.material = sphereMaterial;
    sphere.setParent(player.mesh);

    var hl = new BABYLON.HighlightLayer("hl1", scene);
    hl.addMesh(sphere, BABYLON.Color3.Green());

    this.mesh = sphere;

   

    return this;
  }

  phaseDark = (scene) => {
    const redMoonMat = new BABYLON.StandardMaterial('material', scene);
    redMoonMat.emissiveColor = BABYLON.Color3.Red();
    this.mesh.material = redMoonMat;
  }

  phaselight = (scene) => {
    const lightMoonMat = new BABYLON.StandardMaterial('material', scene);
    lightMoonMat.emissiveColor = BABYLON.Color3.Yellow();
    this.mesh.material = lightMoonMat;
    
  }
}
