import * as THREE from './libs/three.module.js';
import { scene, floorMesh } from './app.js';
import { FBXLoader } from './libs/FBXLoader.js';
export let cactuses1 = [];
export let cactuses2 = [];
export let cactusesIntervalToMove = null;



let cactusObject = null;


const farFloors = [
    {
/*         size: (250, 0, 11),
 */     position:{
            x:0,
            y:2,
            z:50
        },
        color: 0x00ffff,
        objects: 'cactus.fbx',
/*         nbObjects: 8,
 */        positions: [
            { x: -100, y: 2, z: 41 },
            { x: -100, y: 2, z: 53 },
            { x: -100, y: 2, z: 41 },
            { x: -100, y: 2, z: 55 },
            { x: -100, y: 2, z: 58 },
            { x: -100, y: 2, z: 48 },
            { x: -100, y: 2, z: 41 },
            { x: -100, y: 2, z: 62 },
        ]
    },
    {
/*         size: (250, 0, 11),
 */     position:{
            x:0,
            y:0,
            z:25
        },
        color: 0xffffff,
        objects: 'cactus.fbx',
/*         nbObjects: 8,
 */        positions: [
            { x: -100, y: 0, z: 16 },
            { x: -100, y: 0, z: 22 },
            { x: -100, y: 0, z: 15 },
            { x: -100, y: 0, z: 25 },
            { x: -100, y: 0, z: 16 },
            { x: -100, y: 0, z: 33 },
            { x: -100, y: 0, z: 24 },
            { x: -100, y: 0, z: 22 },
        ]
    }

   
]

export const Environment = () => {
    // load cactus fbx (ONCE!!!)
    new FBXLoader().load('models/cactus.fbx', (object) => {


        object.traverse(function (child) {

            if (child.isMesh) {
                // child.material = material;
                child.castShadow = true;
                child.receiveShadow = false;

            }

        });
        object.scale.set(.0051, .0051, .0051);
        object.castShadow = true; //default is false
        object.receiveShadow = false;
        cactusObject = object;
        console.log(cactusObject)
        
        // spawn cactuses every (between 2 and 1.5 seconds)
        setInterval(() => cactusRespawner(Math.floor(Math.random()*2) + 0), Math.floor((Math.random() * 2000) + 1500));

        // default cactuses 

        cactusRespawner(0, -60);
        cactusRespawner(0, -40);
 

        cactusRespawner(0, -20);
        cactusRespawner(0, -30);

        cactusRespawner(1, -55);
        cactusRespawner(1, -45);
        cactusRespawner(1, -15);
        cactusRespawner(1, -25);
        
        cactusRespawner(0, 8);
        cactusRespawner(0, 14); 
        cactusRespawner(1, 1 );
        cactusRespawner(1, 33);

    });



    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(250, 0, 22);
        let materialFloor = new THREE.MeshPhongMaterial({
            color: farFloors[i].color,
            specular: 0x000000,
            shininess: 100
        });
        let floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
        floorMesh.receiveShadow = true;
        scene.add(floorMesh); // add second and third floor to the scene
        floorMesh.position.set(
            farFloors[i].position.x,
            farFloors[i].position.y,
            farFloors[i].position.z
        );
        
    }
}
export const cactusRespawner = (floorNB, initialCac=false ) => {
    let good = cactusObject.clone();
        // console.log(floorNB)
        // console.log(farFloors[floorNB])
        good.position.set(
            initialCac ? initialCac  : -100,
            farFloors[floorNB].positions[0].y, 
            farFloors[floorNB].positions[Math.floor((Math.random() * 6) + 1)].z
        );
            
    scene.add(good);

    // to move
    /* cactusesIntervalToMove =  */
    setInterval(() => {
        good.position.x += (floorNB === 1 ? .109 : .1) + (Math.floor(Math.random() * .008) + .004);
    }, Math.floor((Math.random() * .5) + 1));

    floorNB === 1 ? 
        cactuses1.unshift(good): // unshift to global array to control if reach the pointer
            cactuses2.unshift(good)

}
