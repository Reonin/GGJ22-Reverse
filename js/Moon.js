/**
 * Creates Moon Object that will be clickable to change the player object
 */
class Moon {
  constructor(scene, player) {
    this.isPhaseDark = false;
    const sphere = BABYLON.MeshBuilder.CreateSphere('moon', {
      diameter: 4,
    });

    sphere.position.x = -9;
    sphere.position.y = 8;
    sphere.position.z = 0;
    sphere.convertToUnIndexedMesh();
    const sphereMaterial = new BABYLON.StandardMaterial('material', scene);

    sphere.isPickable = true;

    sphereMaterial.emissiveColor = BABYLON.Color3.White();
    sphere.material = sphereMaterial;
    sphere.setParent(player.mesh);

    // var hl = new BABYLON.HighlightLayer("hl1", scene);
    // hl.addMesh(sphere, BABYLON.Color3.White());
    var gl = new BABYLON.GlowLayer('glow', scene);
    gl.intensity = 0.45;

    sphere.physicsImposter = new BABYLON.PhysicsImpostor(
      sphere,
      BABYLON.PhysicsImpostor.SphereImpostor,
      { mass: 0 },
      scene
    );

    this.mesh = sphere;

    return this;
  }

  phase = (scene) => {
    if (!this.isPhaseDark) {
      console.log('phase was ', this.isPhaseDark, 'now its light')
      const redMoonMat = new BABYLON.StandardMaterial('material', scene);
      redMoonMat.emissiveColor = BABYLON.Color3.Red();
      this.mesh.material = redMoonMat;
      this.isPhaseDark = true;
    } else {
      console.log('phase was ', this.isPhaseDark, 'now its dark')
      const lightMoonMat = new BABYLON.StandardMaterial('material', scene);
      lightMoonMat.emissiveColor = BABYLON.Color3.White();
      this.mesh.material = lightMoonMat;
      this.isPhaseDark = false;
    }
  };
}