import * as THREE from '../three.module.js';
import { scene } from './app.js';
export let playerMesh, playerGeo, playerMat;
export const playerDefaultPosition = {
    x: 2, y: 1, z: 0
};
export const player = () => {
    
    // player
    playerGeo = new THREE.CubeGeometry(1, 2, 1);
    playerMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
    playerMesh = new THREE.Mesh(playerGeo, playerMat);
    playerMesh.position.set(playerDefaultPosition.x, playerDefaultPosition.y, playerDefaultPosition.z);
    scene.add(playerMesh);



}