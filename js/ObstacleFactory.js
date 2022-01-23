class ObstacleFactory {
    constructor (scene) {

        const box = BABYLON.MeshBuilder.CreateBox("box", {height: 5});
        box.position.x = -20;
        box.position.y = 2;
        const boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

        box.material = boxMaterial;

    }

    static generateRock (scene){

        const rock = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
        rock.position.x = -20;
        rock.position.y = 2;
        const rockMaterial = new BABYLON.StandardMaterial("material", scene);
        rockMaterial.diffuseTexture = new BABYLON.Texture(textureURL.concat('/textures/rock.png'));

        rock.material = rockMaterial;
        rock.physicsImpostor = new BABYLON.PhysicsImpostor(rock, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.85, restitution: 0.9 }, scene);

        //Force Settings
        const forceDirection = new BABYLON.Vector3(10, 0, 0);
        const forceMagnitude = 50;
        const contactLocalRefPoint = BABYLON.Vector3.Zero();

        rock.physicsImpostor.applyForce(forceDirection.scale(forceMagnitude), rock.getAbsolutePosition().add(contactLocalRefPoint));
        rock.getAbsolutePosition().add(contactLocalRefPoint);

    }
}