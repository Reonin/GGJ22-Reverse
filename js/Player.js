/**
 * Creates Player Object that has a mesh and newly defined abilities
 */
 class Player {
    constructor(scene){
        const box = BABYLON.MeshBuilder.CreateBox("box", {});
        box.position.x = 0.5;
        box.position.y = 1;

        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat("textures/fur.jpg"), scene);
        // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        box.material = boxMaterial;

        this.mesh = box;

        return this;
    }

    mesh = {};

    jump = function() {
        //Force Settings
        var forceDirection = new BABYLON.Vector3(0, 10, 0);
        var forceMagnitude = 50;
        var contactLocalRefPoint = BABYLON.Vector3.Zero();

        this.mesh.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), this.mesh.getAbsolutePosition().add(contactLocalRefPoint));
        this.mesh.getAbsolutePosition().add(contactLocalRefPoint);
    }
}