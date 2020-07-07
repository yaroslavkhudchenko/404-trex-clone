import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';
import { playerModel1, playerModel2, playerModel3, playerModelJump, playerDefaultPosition } from './loader.js';
import { scene } from './app.js';
/* import { OBJLoader } from './libs/OBJLoader.js';
 */
export let playerHitboxMesh, playerHitboxGeo, playerHitboxMat;


//export let mixer;

export const player = () => {
    



    scene.add(playerModel1);
    scene.add(playerModel2);
    scene.add(playerModel3);
    scene.add(playerModelJump);
    // player hitbox
    playerHitboxGeo = new THREE.CubeGeometry(3.8, 3.7, 1);
    playerHitboxMat = new THREE.MeshBasicMaterial({ color: 0x000000, opacity:.2, transparent:true })
    playerHitboxMesh = new THREE.Mesh(playerHitboxGeo, playerHitboxMat);
    playerHitboxMesh.position.set(playerDefaultPosition.x, 5, playerDefaultPosition.z);
    //scene.add(playerHitboxMesh);
    
}