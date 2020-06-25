
import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';
import { FBXLoader } from './libs/FBXLoader.js';
import { add, scene } from './app.js';
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
           
            scene.add(object);
            enemyObj = object;
            add();
        },
        // called when loading is in progresses
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded -> twoCactuses'),
        // called when loading has errors
        (error) => console.log('An error while loading twoCactuses => ', error)
    )

   
    // running floor
    new OBJLoader().load(
        // resource URL
        'models/floorgood.obj',
        // called when resource is loaded
        function (object) {
            // declare material
            let materialD = new THREE.MeshPhongMaterial({});
            materialD.map = textureLoader.load(`models/floorgood.png`);
            
            object.traverse(function (node) {

                if (node.isMesh) node.material = materialD;

            });
            object.material = materialD;
            object.receiveShadow = true;
            object.position.set(-120, -2 ,-13)
            
            object.scale.set(8,8,8)
            object.rotation.y = Math.PI / 2;
            runningFloor = object;
            
            scene.add(object);

            runningFloor1 = runningFloor.clone();
            runningFloor1.position.set(-358, -2, -13)

            scene.add(runningFloor1)
            console.log('first')
            add();
        },
        // called when loading is in progresses
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded -> floorRunning') ,
        // called when loading has errors
        (error) => console.log('An error while loading floorRunning => ', error)
    ); 





    //Mountain_1.fbx
    new FBXLoader().load('models/Mountain_1.fbx', (object) => {

        object.scale.set(.8, .8, .8);
        object.position.set(-110,-10,150);
        
        firstM = object;

        scene.add(object)
        console.log('seconds')
        add();
        // called when loading is in progresses
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded -> Mountain_1'),
        // called when loading has errors
        (error) => console.log('An error while loading Mountain_1 => ', error)
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
        // called when loading is in progresses
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded -> cactus'),
        // called when loading has errors
        (error) => console.log('An error while loading cactus => ', error)
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
        // called when loading is in progresses
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded -> bigTree'),
        // called when loading has errors
        (error) => console.log('An error while loading bigTree => ', error)
    });


}