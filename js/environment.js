import * as THREE from './libs/three.module.js';
import { scene } from './app.js';

export let cactuses1 = [];
export let cactuses2 = [];
export let fallenTrees = [];
export let bigTrees = []
export let cactusesIntervalToMove = null;

export let secondM = null;
import {
    bigTreeObject,
    cactusObject
} from './loader.js';

export let geometryFloor, materialFloor, floorMesh;

const farFloors = [
    {
        position: {
            x: -65,
            y: 0,
            z: -15//0
        },
        scale: {
            x: 250,
            y: -1,
            z: 30//1//80
        },
        color: 0xE7B251
    },

    // river 
    {
        position: {
            x: -55,
            y:  3,
            z: 10
        },
        scale: {
            x: 350,
            y: 3,
            z: 9
        },
        color: 0x00ffff
    },
    // second left after water
    {
        position:{
            x:-45,
            y:5,
            z:40
        },
        scale : {
            x: 350,
            y: 4,
            z: 20
        },
        color: 0xE7B251 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 7, z: 30 },
            { x: -100, y: 7, z: 32 },
            { x: -100, y: 7, z: 35 },
            { x: -100, y: 7, z: 37 },
            { x: -100, y: 7, z: 42 }
        ]
    },
    // first left after water
    {
        position:{
            x:-85,
            y:3,
            z:25
        },
        scale : {
            x: 350,
            y: 4,
            z: 20
        },
        color: 0xE7B251 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 5, z: 15 },
            { x: -100, y: 5, z: 17 },
            { x: -100, y: 5, z: 19 },
            { x: -100, y: 5, z: 21 },
            { x: -100, y: 5, z: 23 }
        ]
    },
    // last one
    {
        position: {
            x: -40,//7,
            y: 8,
            z: 75//0
        },
        scale: {
            x: 150,
            y: 3,
            z: 50
        },
        color: 0xE7B251,
        positions: [
            { x: -100, y: 9.5, z: 55 },
            { x: -100, y: 9.5, z: 55 },
            { x: -100, y: 9.5, z: 55 },
            { x: -100, y: 9.5, z: 55 },
            { x: -100, y: 9.5, z: 55 }
        ]

    }
   
]

export const Environment = () => {

    bigTreesRespawner(4, -20)
    bigTreesRespawner(4, -100)
    bigTreesRespawner(3, -30)
    bigTreesRespawner(3, -100)

    cactusRespawner(2, -60);
    cactusRespawner(2, -40);
    cactusRespawner(3, 1);
    cactusRespawner(3, 33);

    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(
            farFloors[i].scale ? farFloors[i].scale.x : 150,
            farFloors[i].scale ? farFloors[i].scale.y :0,
            farFloors[i].scale ? farFloors[i].scale.z : 20
        );
            
            let materialFloor = new THREE.MeshPhongMaterial({
                color: farFloors[i].color
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


export const bigTreesRespawner = (floorNB, initialCac = false) => {
        let good = bigTreeObject.clone();
        good.name = 'bigTree';
        good.position.set(
            initialCac ? initialCac : -100,
            farFloors[floorNB].positions[0].y,
            farFloors[floorNB].positions[Math.floor((Math.random() * 4) + 1)].z
        );
        scene.add(good);
        bigTrees.unshift(good);
       
}

export const cactusRespawner = (floorNB, initialCac=false ) => {
    if (floorNB === 0 || floorNB === 1) return;
        
    let good = cactusObject.clone();
    good.name = 'cactus';
   
        good.position.set(
            initialCac ? initialCac  : -100,
            farFloors[floorNB].positions[0].y, 
            farFloors[floorNB].positions[Math.floor((Math.random() * 4) + 1)].z
        );
            
    scene.add(good);

    floorNB === 2 ? 
        cactuses1.unshift(good) : // unshift to global array to control if reach the pointer
            floorNB === 3 ?    
                cactuses2.unshift(good) :
                    console.log('not good floor')

}
