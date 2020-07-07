import { scene, scoreValue } from './app.js';
import { enemyObjbottom, enemyObjTopOne, enemyObjTopTwo, enemyObjTopThree } from './loader.js';
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
    enemy.position.set(-100, 5, 0);
    enemy.castShadow = true; //default is false
    enemy.receiveShadow = false;
    scene.add(enemy);

    enemies.unshift(enemy); // unshift to global array to control if reach the pointer

}
export const enemyPteroSpawner = () => {

    // ptero mesh
    let enemy = { 
        one: enemyObjTopOne.clone(),
        two: enemyObjTopTwo.clone(),
        three: enemyObjTopThree.clone()
    }
    enemy.one.name = 'enemyPtero1';
    enemy.two.name = 'enemyPtero2';
    enemy.three.name = 'enemyPtero3';

    enemy.one.scale.set(0.2, 0.2, 0.2)
    enemy.two.scale.set(0.2, 0.2, 0.2)
    enemy.three.scale.set(0.2, 0.2, 0.2)

    enemy.one.rotation.set(0, 0, 0)
    enemy.two.rotation.set(0, 0, 0)
    enemy.three.rotation.set(0, 0, 0)

    // set position
    enemy.one.position.set(-100, 9, 0);
    enemy.two.position.set(-100, 9, 0);
    enemy.three.position.set(-100, 9, 0);

    enemy.one.castShadow = true; //default is false
    enemy.two.castShadow = true; //default is false
    enemy.three.castShadow = true; //default is false

    enemy.one.receiveShadow = false;
    enemy.two.receiveShadow = false;
    enemy.three.receiveShadow = false;

    enemy.two.visible = false;
    enemy.three.visible = false;


    scene.add(enemy.one);
    scene.add(enemy.two);
    scene.add(enemy.three);


    enemiesPtero.unshift(enemy); // unshift to global array to control if reach the pointer
}
// enemyObjTopOne
// enemyObjTopTwo