import { scene, scoreValue } from './app.js';
import { enemyObjbottom, enemyObjTopOne } from './loader.js';
export let enemies = [];
export let enemiesPtero = [];
export let intervalToMove = null;
export const randomSelector = [6, 2];

// to spawn enemies
export const enemySpawner = () => {

    // enemy mesh
    let enemy = enemyObjbottom.clone(); // new THREE.Mesh(enemyG, enemyMat);
    enemy.name = 'enemyCactus';
    enemy.scale.set(2.5,2.5,2.5)
    // enemy.rotation.set(0,0,0)

    // set position
    enemy.position.set(-300, 2, 0);
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    enemies.unshift(enemy); // unshift to global array to control if reach the pointer

}
export const enemyPteroSpawner = () => {

    // enemy mesh
    let enemy = enemyObjTopOne.clone(); // new THREE.Mesh(enemyG, enemyMat);
    enemy.name = 'enemyPtero';
    enemy.scale.set(0.2, 0.2, 0.2)
    enemy.rotation.set(0, 0, 0)

    // set position
    enemy.position.set(-300, 6, 0);
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    enemiesPtero.unshift(enemy); // unshift to global array to control if reach the pointer
}
// enemyObjTopOne
// enemyObjTopTwo