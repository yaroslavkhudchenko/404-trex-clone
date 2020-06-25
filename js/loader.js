
import * as THREE from './libs/three.module.js';

import { OBJLoader } from './libs/OBJLoader.js';
import { FBXLoader } from './libs/FBXLoader.js';
import {  add, scene } from './app.js';
export let enemyObj = null;
export let firstM = null;
export let runningFloor = null;
export let runningFloor1 = null;
export let bigTreeObject = null;

export let cactusObject = null;
let textureLoader = new THREE.TextureLoader();

export const loader = () => {

    // load a resource
    new OBJLoader().load(
        // resource URL
        'models/twoCactuses.obj',
        // called when resource is loaded
        function (object) {
            // declare material
            let materialD = new THREE.MeshPhongMaterial({
                /*  color: 0xE7B251,
                specular: 0xE7B251, */
            });
            materialD.map = textureLoader.load(`models/twoCactuses.png`);

            object.traverse(function (node) {

                if (node.isMesh) node.material = materialD;

            });
            /*  object.material = materialD;
             
             object.position.set(-25, -1, -7)
        
             object.scale.set(5, 5, 5)
             object.rotation.y = Math.PI / 2;
             runningFloor = object;
             //object.scale.set(30,5,9)
             // object.scale.y = 5;
             // object.scale.z = 9;
             
        
             runningFloor1 = runningFloor.clone();
             runningFloor1.position.set(-174, -1, -7)
        
             scene.add(runningFloor1) */
            // object.receiveShadow = true;
            scene.add(object);
            enemyObj = object;
        },
        // called when loading is in progresses
        (xhr) => {
            console.log('zero')
            add()},        // called when loading has errors
        (error) => console.log('An error happened')
    )

   
    // running floor
    new OBJLoader().load(
        // resource URL
        'models/floorgood.obj',
        // called when resource is loaded
        function (object) {
            // declare material
            let materialD = new THREE.MeshPhongMaterial({
               /*  color: 0xE7B251,
               specular: 0xE7B251, */
           });
            materialD.map = textureLoader.load(`models/floorgood.png`);
            
            object.traverse(function (node) {

                if (node.isMesh) node.material = materialD;

            });
            object.material = materialD;
            object.receiveShadow = true;
            object.position.set(-25,-1,-7)
            
            object.scale.set(5,5,5)
            object.rotation.y = Math.PI / 2;
            runningFloor = object;
            //object.scale.set(30,5,9)
            // object.scale.y = 5;
            // object.scale.z = 9;
            scene.add(object);

            runningFloor1 = runningFloor.clone();
            runningFloor1.position.set(-174, -1, -7)

            scene.add(runningFloor1)
            console.log('first')
            add();
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
        console.log('seconds')
        add();

    });

    // load cactus fbx (ONCE!!!)
    new OBJLoader().load('models/cactus.obj', (object) => {

        let material = new THREE.MeshBasicMaterial();
        material.map = textureLoader.load(`models/cactus.png`);

       
        object.traverse(function (child) {

            if (child.isMesh) {
                // child.material = material;
                child.castShadow = true;
                child.receiveShadow = false;
                child.material= material;

            }

        });
        object.scale.set(2,2,2);
        object.castShadow = true; //default is false
        object.receiveShadow = false;
        cactusObject = object;
        console.log('third')
        add();
    });


    // load bigTree obj (ONCE!!!)
    new OBJLoader().load('models/bigTree.obj', (object) => {

        let material = new THREE.MeshBasicMaterial();
        material.map = textureLoader.load(`models/bigTree.png`);


        object.traverse(function (child) {

            if (child.isMesh) {
                // child.material = material;
                child.castShadow = true;
                child.receiveShadow = false;
                child.material = material;

            }

        });
        object.scale.set(2, 2, 2);
        object.castShadow = true; //default is false
        object.receiveShadow = false;
        bigTreeObject = object;
        
        console.log('fourth')

        add();
    });


}