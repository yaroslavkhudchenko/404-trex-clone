import * as THREE from './libs/three.module.js';
import { scene, scoreValue } from './app.js';
export let enemies = [];

export let intervalToMove = null;
let randomSelector = [4.5, 1.5];
// to spawn enemies
export const enemySpawner = () => {

    //console.log('enemy spawner')

    // enemy mesh
    let enemyG = new THREE.CubeGeometry(2, 2, 2);
    let enemyMat = new THREE.MeshBasicMaterial({ color: 0x00f000 })
    let enemy = new THREE.Mesh(enemyG, enemyMat);

    
    // set position
    enemy.position.set(-70, scoreValue > 400 ? randomSelector[Math.floor(Math.random() * Math.floor(2))] : 1.5, 0);
    enemy.name = 'enemy';
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    // to move
    intervalToMove = setInterval(() => {
        enemy.position.x += .1 + (scoreValue/10000);
    }, Math.floor((Math.random() * .5) + 1));

    enemies.unshift(enemy); // unshift to global array to control if reach the pointer

}