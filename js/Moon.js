/**
 * Creates Moon Object that will be clickable to change the player object
 */
class Moon {
  constructor(scene, player) {
    const sphere = BABYLON.MeshBuilder.CreateSphere('moon', {
      diameter: 6,
    });
    sphere.position.x = -19;
    sphere.position.y = 12;
    sphere.position.z = 15
    // sphere.rotation.x  = Math.PI;
    const sphereMaterial = new BABYLON.StandardMaterial('material', scene);
    // sphereMaterial.diffuseTexture = new BABYLON.Texture(
    //   textureURL.concat('textures/sphereMap.png'),
    //   scene
    // );
    sphere.isPickable = true;
   

    sphereMaterial.emissiveColor = BABYLON.Color3.Yellow();
    sphere.material = sphereMaterial;
    sphere.setParent(player.mesh);

    var hl = new BABYLON.HighlightLayer("hl1", scene);
    hl.addMesh(sphere, BABYLON.Color3.White());

    sphere.physicsImposter = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0 }, scene);

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
