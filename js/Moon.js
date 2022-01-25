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
    sphereMaterial.diffuseTexture = new BABYLON.Texture(
      textureURL.concat('textures/sphereMap.png'),
      scene
    );
    sphere.material = sphereMaterial;

    this.mesh = sphere;
 

    return this;
  }
}
