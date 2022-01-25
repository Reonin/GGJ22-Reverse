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

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    this.mesh.actionManager = new BABYLON.ActionManager(scene);
    this.mesh.actionManager
    
    // FADE OUT MOON
      .registerAction(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          light,
          'diffuse',
          BABYLON.Color3.Black(),
          1000
        )
      )

    // UNFADE MOON
      .then(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          light,
          'diffuse',
          BABYLON.Color3.White(),
          1000
        )
      );

    return this;
  }
}
