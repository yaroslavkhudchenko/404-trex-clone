import * as THREE from './libs/three.module.js';
import { scene, scoreValue } from './app.js';
import { OBJLoader } from './libs/OBJLoader.js';
import { enemyObj } from './loader.js';
export let enemies = [];

export let intervalToMove = null;
let randomSelector = [4.5, 1.5];

let enemyG = new THREE.CubeGeometry(2, 2, 2);
let enemyMat = new THREE.MeshBasicMaterial({ color: 0x00f000 });


// to spawn enemies
export const enemySpawner = () => {


    // enemy mesh
    let enemy = enemyObj.clone(); // new THREE.Mesh(enemyG, enemyMat);
    enemy.name = 'enemy';
    
    // set position
    enemy.position.set(-70, scoreValue > 400 ? randomSelector[Math.floor(Math.random() * Math.floor(2))] : 1.5, 0);
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    

    enemies.unshift(enemy); // unshift to global array to control if reach the pointer

}