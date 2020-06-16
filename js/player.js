import * as THREE from '../three.module.js';
import { FBXLoader } from '../FBXLoader.js';

import { scene } from './app.js';

export let playerHitboxMesh, playerHitboxGeo, playerHitboxMat;
export const playerDefaultPosition = {
    x: 9, y: 1, z: 0
};
export let mixer;

let material;
export let playerModel;

export const player = () => {
    
    // const TextureLoader = new THREE.TextureLoader();

    // load a resource
    /* loader.load(
        // resource URL
        'models/LowpolyRacoon_Albedo.png',

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            material = new THREE.MeshBasicMaterial({
                map: texture
            });
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function (err) {
            console.error('An error happened.');
        }
    ); */

    // player
    let fbxLoader = new FBXLoader();
    fbxLoader.load('models/racoon.fbx', function (object) {

        mixer = new THREE.AnimationMixer(object);

        let action = mixer.clipAction(object.animations[0]);
        action.play();


        object.traverse(function (child) {

            if (child.isMesh) {
                // child.material = material;
                child.castShadow = true;
                child.receiveShadow = false;

            }

        });
        object.position.set(playerDefaultPosition.x, 0.5, playerDefaultPosition.z);
        object.scale.set(.1, .1, .1);
        object.rotation.set(1.5, 0, 1.5);
        playerModel = object;
        scene.add(object);

    });

    // player hitbox
    playerHitboxGeo = new THREE.CubeGeometry(4, 3, 1);
    playerHitboxMat = new THREE.MeshBasicMaterial({ color: 0x000000, opacity:.7, transparent:true })
    playerHitboxMesh = new THREE.Mesh(playerHitboxGeo, playerHitboxMat);
    playerHitboxMesh.position.set(playerDefaultPosition.x, 1.5, playerDefaultPosition.z);
    scene.add(playerHitboxMesh);
    
}