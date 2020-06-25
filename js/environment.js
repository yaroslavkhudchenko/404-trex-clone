import * as THREE from './libs/three.module.js';
import { scene, renderer } from './app.js';
import { FBXLoader } from './libs/FBXLoader.js';
import { OBJLoader } from './libs/OBJLoader.js';
export let cactuses1 = [];
export let cactuses2 = [];
export let fallenTrees = [];
export let cactusesIntervalToMove = null;
import { Water } from './libs/Water2.js';


export let secondM = null;
export let firstM = null;
export let runningFloor = null;
export let runningFloor1 = null;

export let geometryFloor, materialFloor, floorMesh;


// deserttext


let textureLoader = new THREE.TextureLoader();


let cactusObject = null;
let fallenTreeObject = null;

const farFloors = [
    {
        position: {
            x: -65,
            y: 0,
            z: -15//0
        },
        scale: {
            x: 250,
            y: 0,
            z: 30//1//80
        },
        color: 0xE7B251,
        positions: [
            { x: -100, y: .5, z: -5 },
            { x: -100, y: .5, z: -15 },
            { x: -100, y: .5, z: -22 },
            { x: -100, y: .5, z: -35 },
            { x: -100, y: .5, z: -52 }
        ]
    },

    // river 
    {
        position: {
            x: -55,
            y:  1.3,
            z: 10
        },
        scale: {
            x: 350,
            y: 0,
            z: 9
        },
        color: 0x00ffff
    },
    // second left after water
    {
        position:{
            x:-45,
            y:3,
            z:40
        },
        color: 0xE7B251 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 4, z: 31 },
            { x: -100, y: 4, z: 35 },
            { x: -100, y: 4, z: 41 },
            { x: -100, y: 4, z: 44 },
            { x: -100, y: 4, z: 38 }
        ]
    },
    // first left after water
    {
        position:{
            x:-85,
            y:2,
            z:25
        },
        scale : {
            x: 350,
            y: 0,
            z: 20
        },
        color: 0xE7B251 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 2, z: 13 },
            { x: -100, y: 2, z: 17 },
            { x: -100, y: 2, z: 22 },
            { x: -100, y: 2, z: 25 },
            { x: -100, y: 2, z: 22 }
        ]
    },
    {
        position: {
            x: -40,//7,
            y: 4.5,
            z: 75//0
        },
        scale: {
            x: 150,
            y: 2,
            z: 50
        },
        color: 0xE7B251

    }
   
]

export const Environment = () => {

    // add floor ( for running )
  /*   geometryFloor = new THREE.BoxGeometry(250, 0, 11);
    materialFloor = new THREE.MeshPhongMaterial({
        color: 0xE7B251,
        specular: 0x000000,
        shininess: 100
    });
    floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMesh.position.x = -57;
    floorMesh.position.y = 1; */
 



    /*new FBXLoader().load('models/floor.fbx', (object) => {
 
     
        object.name = 'floor';
        object.scale.x = .01
        object.scale.z = .01
        object.position.x = -2;
        object.position.y = 2;
        object.rotateZ(-Math.PI * 0.5)
        object.rotateY(-Math.PI * 1)

        object.receiveShadow = true;
        scene.add(object)

    }); */



   
    // load a resource
    new OBJLoader().load(
        // resource URL
        'models/floorgood.obj',
        // called when resource is loaded
        function (object) {
            // declare material
            let materialD = new THREE.MeshPhongMaterial({
               /*  color: 0xE7B251,
               specular: 0xE7B251, */
               shininess: 1
           });
            materialD.map = textureLoader.load(`models/floorgood.png`);
            
            object.traverse(function (node) {

                if (node.isMesh) node.material = materialD;

            });
            object.material = materialD;
            object.receiveShadow = true;
            object.position.set(-25,0,-7)
            object.scale.set(5,5,5)
            object.rotation.y = Math.PI / 2;
            runningFloor = object;
            //object.scale.set(30,5,9)
            // object.scale.y = 5;
            // object.scale.z = 9;
            scene.add(object);

            runningFloor1 = runningFloor.clone();
            runningFloor1.position.set(-125, 3, -7)

            scene.add(runningFloor1)
        },
        // called when loading is in progresses
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    ); 







    //Mountain_1.fbx
    new FBXLoader().load('models/Mountain_1.fbx', (object) => {

        object.scale.set(.8, .8, .8);
        object.position.set(-110,-10,150);
        
        firstM = object;

        scene.add(object)


    });

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
        console.log('in env')

        cactusRespawner(2, -60);
        cactusRespawner(2, -40);
 
        cactusRespawner(3, 1 );
        cactusRespawner(3, 33);

    });

    /* // load fallenTree fbx(ONCE!!!)
    new FBXLoader().load('models/fallenTree.fbx', (object) => {

        // declare material
        let materialD = new THREE.MeshBasicMaterial();
        materialD.map = textureLoader.load(`models/0.jpg`, (t) => {
            materialD.normalMap = t;
        });

        console.log('ffffffffffffffffffff')
        object.traverse(function (child) {

            if (child.isMesh) {
                child.material = materialD;
                child.castShadow = true;
                child.receiveShadow = false;

            }

        });
        object.scale.set(.0151, .0151, .0151);
        object.castShadow = true; //default is false
        object.receiveShadow = false;
        fallenTreeObject = object;
        console.log('in env')
        fallenTreeRespawner(0, -60)

       
        fallenTreeRespawner(0, 33)


    }); */



    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(
            farFloors[i].scale ? farFloors[i].scale.x : 150,
            farFloors[i].scale ? farFloors[i].scale.y :0,
            farFloors[i].scale ? farFloors[i].scale.z : 20
        );
            
            let materialFloor = new THREE.MeshPhongMaterial({
                color: farFloors[i].color,
                /* specular: 0xffffff,
                shininess: 100 */
            });
            let floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
            floorMesh.receiveShadow = true;
            scene.add(floorMesh); // add second and third floor to the scene
            floorMesh.position.set(
                farFloors[i].position.x,
                farFloors[i].position.y,
                farFloors[i].position.z
            );/* 
            if(i===4) {
                floorMesh.rotation.x = -.01
            } */
//}
    }
}


export const fallenTreeRespawner = (floorNB, initialCac = false) => {
    let good = fallenTreeObject.clone();
    good.name = 'fallenTree';
    good.position.set(
        initialCac ? initialCac : -100,
        farFloors[floorNB].positions[0].y,
        farFloors[floorNB].positions[Math.floor((Math.random() * 4) + 1)].z
    );
    scene.add(good);


    // to move
    /* cactusesIntervalToMove =  */
   /*  setInterval(() => {
        good.position.x +=
            (floorNB === 1 ? 0.06 : 0.04) +
            (Math.floor(Math.random() * (0.008 - 0.004) + 0.008));
    }, Math.floor(Math.random() * (1 - .5) + 1)); */


    fallenTrees.unshift(good);
    /* floorNB === 2 ?
        cactuses1.unshift(good) : // unshift to global array to control if reach the pointer
        floorNB === 3 ?
            cactuses2.unshift(good) :
            console.log('not good floor') */

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

    // to move
    /* cactusesIntervalToMove =  */
   /*  setInterval(() => {
      good.position.x +=
        (floorNB === 1 ? 0.06 : 0.04) +
        (Math.floor(Math.random() * (0.008 - 0.004) + 0.008));
    }, Math.floor(Math.random() * (1 - .5) + 1));
 */
    floorNB === 2 ? 
        cactuses1.unshift(good) : // unshift to global array to control if reach the pointer
            floorNB === 3 ?    
                cactuses2.unshift(good) :
                    console.log('not good floor')

}
