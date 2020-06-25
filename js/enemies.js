import { scene, scoreValue } from './app.js';
import { enemyObj } from './loader.js';
export let enemies = [];

export let intervalToMove = null;
export const randomSelector = [4.5, 3];

// to spawn enemies
export const enemySpawner = () => {

    // enemy mesh
    let enemy = enemyObj.clone(); // new THREE.Mesh(enemyG, enemyMat);
    enemy.name = 'enemy';
    enemy.scale.set(3,3,3)
    enemy.rotation.set(0,0,0)

    // set position
    enemy.position.set(-70, scoreValue > 400 ? randomSelector[Math.floor(Math.random() * Math.floor(2))] : 1, 0);
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    enemies.unshift(enemy); // unshift to global array to control if reach the pointer

}