import * as THREE from './libs/three.module.js';
import { scene, floorMesh } from './app.js';
import { FBXLoader } from './libs/FBXLoader.js';
export let cactuses1 = [];
export let cactuses2 = [];
export let cactusesIntervalToMove = null;



let cactusObject = null;


const farFloors = [
    {
        position: {
            x: -57,
            y: 0,
            z: -10
        },
        color:0xc2b280
    },
    {
        position: {
            x: -57,
            y: 0,
            z: 10
        },
        color: 0x00ffff
    },
    {
        position:{
            x:-57,
            y:2,
            z:40
        },
        color: 0xc2b280 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 2, z: 31 },
            { x: -100, y: 2, z: 35 },
            { x: -100, y: 2, z: 41 },
            { x: -100, y: 2, z: 44 },
            { x: -100, y: 2, z: 38 }
        ]
    },
    {
        position:{
            x:-57,
            y:.3,
            z:25
        },
        color: 0xc2b280 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: .3, z: 13 },
            { x: -100, y: .3, z: 17 },
            { x: -100, y: .3, z: 22 },
            { x: -100, y: .3, z: 25 },
            { x: -100, y: .3, z: 22 }
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
        setInterval(() => cactusRespawner(Math.floor(Math.random()*3) + 2), Math.floor((Math.random() * 2500) + 2000));

        // default cactuses 

        cactusRespawner(2, -60);
        cactusRespawner(2, -40);
 
/* 
        cactusRespawner(0, -20);
        cactusRespawner(0, -30); */

       /*  cactusRespawner(2, -55);
        cactusRespawner(2, -45); */
        /* cactusRespawner(1, -15);
        cactusRespawner(1, -25);
        */ 
        /* cactusRespawner(1, 8);
        cactusRespawner(1, 14);  */
        cactusRespawner(3, 1 );
        cactusRespawner(3, 33);

    });



    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(150, 0,  i===1 ? 9 : 20);
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
            farFloors[floorNB].positions[Math.floor((Math.random() * 4) + 1)].z
        );
            
    scene.add(good);

    if(floorNB === 0 || floorNB === 1)return;


    // to move
    /* cactusesIntervalToMove =  */
    setInterval(() => {

        good.position.x += (floorNB === 1  ? .009 : .001) + (Math.floor(Math.random() * .008) + .004);
    }, Math.floor((Math.random() * .5) + 1));

    floorNB === 1 ? 
        cactuses1.unshift(good): // unshift to global array to control if reach the pointer
            cactuses2.unshift(good)

}
