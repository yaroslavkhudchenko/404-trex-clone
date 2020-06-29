
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

export const loader = async () => {

    // load a resource
    await new OBJLoader().load(
        // resource URL
        'models/twoCactuses.obj',
        // called when resource is loaded
        async (object) =>{
            // declare material
            let materialD = new THREE.MeshPhongMaterial({
                /*  color: 0xE7B251,
                specular: 0xE7B251, */
            });
            materialD.map = textureLoader.load(`models/twoCactuses.png`);

            await object.traverse(function (node) {

                if (node.isMesh) node.material = materialD;

            });
           
            await scene.add(object);
            enemyObj = object;
           
        },
        // called when loading is in progresses
        (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded -> twoCactuses')
            if ((xhr.loaded / xhr.total * 100) === 100){
                console.log('zero')
                add();
            }
        },
        // called when loading has errors
        (error) => console.log('An error while loading twoCactuses => ', error)
    )

   
    // running floor
    await new OBJLoader().load(
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
           
        },
        // called when loading is in progresses
        (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded -> floorRunning')
            console.log(xhr.loaded / xhr.total * 100)
            if ((xhr.loaded / xhr.total * 100) === 100){
                console.log('first')

                add();
            }
        },
        // called when loading has errors
        (error) => console.log('An error while loading floorRunning => ', error)
    ); 





    //Mountain_1.fbx
    await new FBXLoader().load('models/Mountain_1.fbx', 
        (object) => {
            object.scale.set(.8, .8, .8);
            object.position.set(-110,-10,150);
            
            firstM = object;

            scene.add(object);
        },   
        // called when loading is in progresses
        (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded -> Mountain_1');
            if ((xhr.loaded / xhr.total * 100) === 100){
                console.log('seconds');
                add();
            }
        },
        // called when loading has errors
        (error) => console.log('An error while loading Mountain_1 => ', error)
    );

    // load cactus fbx (ONCE!!!)
    await new FBXLoader().load('models/Cactus.fbx', 
        (object) => {

            let material = new THREE.MeshBasicMaterial();
            material.map = textureLoader.load(`models/CactusTexture.png`);

        
            object.traverse(function (child) {

                if (child.isMesh) {
                    // child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = false;
                    child.material= material;

                }

            });
            object.scale.set(.004,.004,.004);
            object.castShadow = true; //default is false
            object.receiveShadow = false;
            cactusObject = object;
        },    
        
        // called when loading is in progresses
        (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded -> cactus')
            if ((xhr.loaded / xhr.total * 100) >= 100){
                
                console.log('third');
                add();
            }
        },
        // called when loading has errors
        (error) => console.log('An error while loading cactus => ', error)
    );


    // load bigTree obj (ONCE!!!)
    await new OBJLoader().load('models/bigTree.obj', 
        (object) => {

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
            object.scale.set(3, 3, 3);
            object.castShadow = true; //default is false
            object.receiveShadow = false;
            bigTreeObject = object;
            
        },

        // called when loading is in progresses
        (xhr) => {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded -> bigTree')
            
            if ((xhr.loaded / xhr.total * 100) === 100){
                add();
                console.log('fourth');
            }
        },
        // called when loading has errors
        (error) => console.log('An error while loading bigTree => ', error)
    );


}