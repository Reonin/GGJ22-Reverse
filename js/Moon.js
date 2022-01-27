/**
 * Creates Moon Object that will be clickable to change the player object
 */
class Moon {
  constructor(scene) {
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
      diameter: 4,
      segments: 32,
    });
    sphere.position.x = -20;
    sphere.position.y = 17;

    const sphereMaterial = new BABYLON.StandardMaterial('material', scene);
    // sphereMaterial.diffuseTexture = new BABYLON.Texture(
    //   textureURL.concat('textures/sphereMap.png'),
    //   scene
    // );
    sphereMaterial.emissiveColor = BABYLON.Color3.Yellow();
    sphere.material = sphereMaterial;

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
