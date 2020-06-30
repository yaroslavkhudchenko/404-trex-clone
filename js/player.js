import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';

import { scene } from './app.js';

export let playerHitboxMesh, playerHitboxGeo, playerHitboxMat;
export const playerDefaultPosition = {
    x: 9, y: 1, z: 0
};

export let mixer;

let material;
export let playerModel;
let textureLoader = new THREE.TextureLoader();
let materialD = new THREE.MeshPhongMaterial({});
materialD.map = textureLoader.load(`models/dinozaur-01.png`);
export const player = () => {
    


    // player
   let fbxLoader = new OBJLoader();
    fbxLoader.load('models/dinozaur-01.obj', 
    
    
     (object) => {

        //mixer = new THREE.AnimationMixer(object);

        //let action = mixer.clipAction(object.animations[0]);
        //action.play();

         console.log(object)

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
        playerModel = object;
        scene.add(object);
        
    },
    (e) => console.log('progress ',e),
    (error) => console.log('error while loading player model ',error)
    
    ); 

    // player hitbox
    playerHitboxGeo = new THREE.CubeGeometry(3.8, 3.7, 1);
    playerHitboxMat = new THREE.MeshBasicMaterial({ color: 0x000000, opacity:.2, transparent:true })
    playerHitboxMesh = new THREE.Mesh(playerHitboxGeo, playerHitboxMat);
    playerHitboxMesh.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
    scene.add(playerHitboxMesh);
    
}