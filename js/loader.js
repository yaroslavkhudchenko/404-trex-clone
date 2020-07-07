
import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';
import { FBXLoader } from './libs/FBXLoader.js';
import { add, scene } from './app.js';
export let enemyObjbottom = null;
export let enemyObjTopOne = null;
export let enemyObjTopTwo = null;
export let firstM = null;
export let runningFloor = null;
export let runningFloor1 = null;
export let bigTreeObject = null;

export let cactusObject = null;


export let playerModel1;
export let playerModel2;
export let playerModel3;
export let playerModelJump;
export const playerDefaultPosition = {
    x: 9, y: 1, z: 0
};
let textureLoader = new THREE.TextureLoader();
export let mixer;
export const loader = async () => {
  /*   
    // player1
    new FBXLoader().load('models/Dino_cube_test.fbx',

        (object) => {


            mixer = new THREE.AnimationMixer(object);
            // Play a specific animation
            let clip = object.animations[0];
            let action = mixer.clipAction(clip);
            console.log(action)
            action.play();

            console.log(object)
       
            let materialD = new THREE.MeshPhongMaterial();
        let texture = textureLoader.load(`models/dinozaur-01.png`);
            materialD.map = texture;
          
            object.traverse(function (child) {

                if (child.isMesh) {
                    // child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = false;
                    child.material = materialD;
                    child.material.skinning = true;
                    
                }

            });
            object.position.set(playerDefaultPosition.x, 2, playerDefaultPosition.z);
            object.scale.set(.1, .1, .1);
            object.rotation.y = Math.PI / 1
            object.rotation.x = -.03
            playerModel1 = object;
            scene.add(object);
          



        },
        (xhr) => {
            if ((xhr.loaded / xhr.total * 100) === 100) {
                console.log('zero1')
                add();
            }
        },
        (error) => console.log('error while loading player model ', error)

    );


 */
    // player1
    new OBJLoader().load('models/dinozaur-01.obj',

        (object) => {

   
            let materialD = new THREE.MeshPhongMaterial(/* { opacity: 1, transparent: true} */);
            materialD.map = textureLoader.load(`models/dinozaur-01.png`);
            object.traverse(function (child) {

                if (child.isMesh) {
                    // child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = false;
                    child.material = materialD;
                }

            });
            object.position.set(playerDefaultPosition.x, 2, playerDefaultPosition.z);
            object.scale.set(.2, .2, .2);
            object.rotation.y = Math.PI / 1
            object.rotation.x = -.03
            playerModel1 = object;

        },
        (xhr) => {
            if ((xhr.loaded / xhr.total * 100) === 100) {
                console.log('zero1')
                add();
            }
        },
        (error) => console.log('error while loading player model ', error)

    );
    // player2
    new OBJLoader().load('models/dinozaur-02.obj',

        (object) => {

         
            let materialD = new THREE.MeshPhongMaterial(/* { opacity: 0, transparent: true} */);
            materialD.map = textureLoader.load(`models/dinozaur-02.png`);
            object.traverse(function (child) {

                if (child.isMesh) {
                    // child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = false;
                    child.material = materialD;
                }

            });
            object.position.set(playerDefaultPosition.x, 2, playerDefaultPosition.z);
            object.scale.set(.2, .2, .2);
            object.rotation.y = Math.PI / 1;

            object.visible = false;
            playerModel2 = object;

        },
        (xhr) => {
            if ((xhr.loaded / xhr.total * 100) === 100) {
                console.log('zero2')
                add();
            }
        },
        (error) => console.log('error while loading player model ', error)

    );
    // player3
    new OBJLoader().load('models/dinozaur-03.obj',

        (object) => {

         
            let materialD = new THREE.MeshPhongMaterial(/* { opacity: 0, transparent: true} */);
            materialD.map = textureLoader.load(`models/dinozaur-03.png`);
            object.traverse(function (child) {

                if (child.isMesh) {
                    // child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = false;
                    child.material = materialD;
                }

            });
            object.position.set(playerDefaultPosition.x, 2, playerDefaultPosition.z);
            object.scale.set(.2, .2, .2);
            object.rotation.y = Math.PI / 1;
            object.rotation.x = .03
            object.visible = false;
            playerModel3 = object;

        },
        (xhr) => {
            if ((xhr.loaded / xhr.total * 100) === 100) {
                console.log('zero4')
                add();
            }
        },
        (error) => console.log('error while loading player model ', error)

    ); 
    // player jump
    new OBJLoader().load('models/dinozaur-jump.obj',

        (object) => {

          
            let materialD = new THREE.MeshPhongMaterial(/* { opacity: 1, transparent: true} */);
            materialD.map = textureLoader.load(`models/dinozaur-01.png`);
            object.traverse(function (child) {

                if (child.isMesh) {
                    // child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = false;
                    child.material = materialD;
                }

            });
            object.position.set(playerDefaultPosition.x, 2, playerDefaultPosition.z);
            object.scale.set(.2, .2, .2);
            object.rotation.y = Math.PI / 1
            object.visible = false;
            playerModelJump = object;

        },
        (xhr) => {
            if ((xhr.loaded / xhr.total * 100) === 100) {
                console.log('zero1')
                add();
            }
        },
        (error) => console.log('error while loading player model ', error)

    ); 
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
           
            // await scene.add(object);
            enemyObjbottom = object;
           
        },
        // called when loading is in progresses
        (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded -> twoCactuses')
            if ((xhr.loaded / xhr.total * 100) === 100){
                console.log('zero3')
                add();
            }
        },
        // called when loading has errors
        (error) => console.log('An error while loading twoCactuses => ', error)
    )
    // load a ptero
    await new OBJLoader().load(
        // resource URL
        'models/ptero-01.obj',
        // called when resource is loaded
        async (object) => {
            // declare material
            let materialD = new THREE.MeshPhongMaterial({
                /*  color: 0xE7B251,
                specular: 0xE7B251, */
            });
            materialD.map = textureLoader.load(`models/ptero-01.png`);

            await object.traverse(function (node) {

                if (node.isMesh) node.material = materialD;

            });

            //await scene.add(object);
            enemyObjTopOne = object;

        },
        // called when loading is in progresses
        (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded -> twoCactuses')
            if ((xhr.loaded / xhr.total * 100) === 100) {
                console.log('zero3')
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
            object.position.set(-120, 1 ,-13)
            
            object.scale.set(8,8,8)
            object.rotation.y = Math.PI / 2;
            runningFloor = object;
            
            scene.add(object);

            runningFloor1 = runningFloor.clone();
            runningFloor1.position.set(-358, 1, -13)

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