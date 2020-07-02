import { scene, scoreValue } from './app.js';
import { enemyObjbottom } from './loader.js';
export let enemies = [];

export let intervalToMove = null;
export const randomSelector = [6, 2];

// to spawn enemies
export const enemySpawner = () => {

    // enemy mesh
    let enemy = enemyObjbottom.clone(); // new THREE.Mesh(enemyG, enemyMat);
    enemy.name = 'enemy';
    enemy.scale.set(2.5,2.5,2.5)
    enemy.rotation.set(0,0,0)

    // set position
    enemy.position.set(-300, scoreValue > 400 ? randomSelector[Math.floor(Math.random() * Math.floor(2))] : 2, 0);
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    enemies.unshift(enemy); // unshift to global array to control if reach the pointer

}