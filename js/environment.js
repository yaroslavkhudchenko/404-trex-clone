import * as THREE from '../three.module.js';
import { scene } from './app.js';
import { FBXLoader } from '../FBXLoader.js';

const farFloors = [
    {
        size: (250, 0, 11),
        position:{
            x:0,
            y:2,
            z:50
        },
        color: 0x00ffff,
        objects: 'cactus.fbx',
        nbObjects: 5,
        positions: [
            { x: -1, y: 2, z: 41 },
            { x: -7, y: 2, z: 53 },
            { x: -16, y: 2, z: 55 },
            { x: -23, y: 2, z: 61 },
            { x: -33, y: 2, z: 58 },
            { x: -52, y: 2, z: 48 },
        ]
    },
    {
        size: (250, 0, 11),
        position:{
            x:0,
            y:0,
            z:25
        },
        color: 0xffffff,
        objects: 'cactus.fbx',
        nbObjects: 6,
        positions: [
            { x: -1, y: 0, z: 15 },
            { x: -6, y: 0, z: 25 },
            { x: -13, y: 0, z: 35 },
            { x: -22, y: 0, z: 30 },
            { x: -28, y: 0, z: 20 },
            { x: -46, y: 0, z: 21 },
        ]
    }
]

export const Environment = () => {

    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(250, 0, 22);
        let materialFloor = new THREE.MeshPhongMaterial({
            color: farFloors[i].color,
            specular: 0x000000,
            shininess: 100
        });
        let floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
        scene.add(floorMesh);
        floorMesh.position.set(
            farFloors[i].position.x,
            farFloors[i].position.y,
            farFloors[i].position.z
        );
        for(let j=0;j<farFloors[i].nbObjects; j++) {
            new FBXLoader().load('models/cactus.fbx', (object) => {


                object.traverse(function (child) {

                    if (child.isMesh) {
                        // child.material = material;
                        child.castShadow = true;
                        child.receiveShadow = false;

                    }

                });
                object.position.set(farFloors[i].positions[j].x, farFloors[i].positions[j].y, farFloors[i].positions[j].z);
                object.scale.set(.0051, .0051, .0051);
/*                 object.rotation.set(1.5, 0, 1.5);
 */                scene.add(object);

            });
        }
    }

    
    


}