import { scene, scoreValue } from './app.js';
import { enemyObjbottom, enemyObjTopOne, enemyObjTopTwo, enemyObjTopThree } from './loader.js';
export let enemies = [];
export let enemiesPtero = [];
export let intervalToMove = null;
export const randomSelector = [9, 5];

// to spawn enemies
export const enemySpawner = (pos) => {
    
    if (randomSelector[Math.floor(Math.random() * randomSelector.length)]===5) {
        // enemy mesh
        let enemy = enemyObjbottom.clone(); // new THREE.Mesh(enemyG, enemyMat);
        enemy.name = 'enemy';
        enemy.scale.set(2.5, 2.5, 2.5)
        // set position
        enemy.position.set(pos && pos.x ? pos.x : -200, 5, 0);
        enemy.castShadow = true; //default is false
        enemy.receiveShadow = false;
        scene.add(enemy);

        enemies.unshift(enemy); // unshift to global array to control if reach the pointer
   } else {
   
        console.log('ptero resp')
        // ptero mesh
        let enemy = {
            one: enemyObjTopOne.clone(),
            two: enemyObjTopTwo.clone(),
            three: enemyObjTopThree.clone()
        }
        enemy.one.name = 'enemy';
        enemy.two.name = 'enemy';
        enemy.three.name = 'enemy';

        enemy.one.scale.set(0.2, 0.2, 0.2)
        enemy.two.scale.set(0.2, 0.2, 0.2)
        enemy.three.scale.set(0.2, 0.2, 0.2)

        enemy.one.rotation.set(0, 0, 0)
        enemy.two.rotation.set(0, 0, 0)
        enemy.three.rotation.set(0, 0, 0)

        // set position
        enemy.one.position.set(pos && pos.x ? pos.x : -200, 9, 0);
        enemy.two.position.set(pos && pos.x ? pos.x : -200, 9, 0);
        enemy.three.position.set(pos && pos.x ? pos.x : -200, 9, 0);

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


        enemies.unshift(enemy); // unshift to global array to control if reach the pointer
    }
}