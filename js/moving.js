import * as THREE from './libs/three.module.js';
import {
    cactuses1,
    cactuses2,
    
    bigTrees
} from './environment.js';

import {
    runningFloor,
    runningFloor1,
    firstM,
    playerModel1,
    playerModel2,
    playerModel3,
    playerModelJump
} from './loader.js';

import  { scoreValue, frame, isJump } from './app.js';
import { enemies, enemiesPtero, randomSelector } from './enemies.js';

let currentRunModel = 'one';
let cooler = 15000; // control the speed

let enemiesRespPos = {
    max:-150,
    min:-125
}

// calcute respawn position for each enemy when reach pointer
const checkForOthers  = () => {
    let far = 0;


    for(let i = 0; i<enemies.length; i++ ){
        far = enemies[i].position.x < far ? enemies[i].position.x : far;
    }
    
    for (let i = 0; i < enemiesPtero.length; i++) {
        far = enemiesPtero[i].position.x < far ? enemiesPtero[i].position.x : far;
    }

    return far < -300 ? far + far / 100 * 20 : (-200 - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max);
}

const enemiesMove = () => {
    // ENEMIES //

    if (enemies[0]) {
        enemies[0].position.x += .5 + (scoreValue / cooler);
        if (enemies[0].position.x > 25) {

            enemies[0].rotation.y += Math.random() * (30 - 15) + 30; // random rotation on y
            enemies[0].position.x = checkForOthers()

        }
    }
    if (enemies[1]) {
        enemies[1].position.x += .5 + (scoreValue / cooler);
        if (enemies[1].position.x > 25) {
            
              
            enemies[1].rotation.y += Math.random() * (30 - 15) + 30; // random rotation on y
            enemies[1].position.x = checkForOthers()
        }
    }
    
    if (enemiesPtero[0]) {

        enemiesPtero[0].position.x += .5 + (scoreValue / cooler);
        if (enemiesPtero[0].position.x > 25) {

            enemiesPtero[0].position.x = checkForOthers()
        }
    } if (enemiesPtero[1]) {
        enemiesPtero[1].position.x += .5 + (scoreValue / cooler);
        if (enemiesPtero[1].position.x > 25) {

            enemiesPtero[1].position.x = checkForOthers()
        }
    } 
    if (enemies[2]) {
        enemies[2].position.x += .5 + (scoreValue / cooler);

        if (enemies[2].position.x > 25) {
            enemies[2].rotation.y += Math.random() * (30 - 15) + 30; // random rotation on y
            enemies[2].position.x = checkForOthers()
        }
    }
    if (enemiesPtero[2]) {

        enemiesPtero[2].position.x += .5 + (scoreValue / cooler);
        
        if (enemiesPtero[2].position.x > 25) {
            enemiesPtero[2].position.x = checkForOthers()
        }
    }
}


let decorationsInitialPos = {
    bigtree0: -120,
    bigtree1: -155,
    bigtree2: -125,
    bigtree3: -111,
    cactuses10: -154,
    cactuses11: -102,
    cactuses20:-100,
    cactuses21:-123
}

export const moving = () => {
    

    // TREES
    if (bigTrees[0]) {
        bigTrees[0].position.x += .09;// * scoreValue / 10;
        if (bigTrees[0].position.x > 25) {

            bigTrees[0].position.x = decorationsInitialPos.cactuses21 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.bigtree0 = bigTrees[0].position.x;

            bigTrees[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[1]) {
        bigTrees[1].position.x += .09;// * scoreValue / 10;
        if (bigTrees[1].position.x > 25) {

            bigTrees[1].position.x = decorationsInitialPos.bigtree0 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.bigtree1 = bigTrees[1].position.x;
            


            bigTrees[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[2]) {
        bigTrees[2].position.x += .09;// * scoreValue / 10;
        if (bigTrees[2].position.x > 25) {

            bigTrees[2].position.x = decorationsInitialPos.bigtree1 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.bigtree2 = bigTrees[2].position.x;
            

            bigTrees[2].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[3]) {
        bigTrees[3].position.x += .09;// * scoreValue / 10;
        if (bigTrees[3].position.x > 25) {

            bigTrees[3].position.x = decorationsInitialPos.bigtree2 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.bigtree3 = bigTrees[3].position.x;


            bigTrees[3].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }






    if (cactuses1[0]) {
        cactuses1[0].position.x += .09; // * scoreValue / 10;
        if (cactuses1[0].position.x > 25) {

            cactuses1[0].position.x = decorationsInitialPos.bigtree3 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.cactuses10 = cactuses1[0].position.x;

            cactuses1[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses1[1]) {
        cactuses1[1].position.x += .09; // * scoreValue / 10;
        if (cactuses1[1].position.x > 25) {

            cactuses1[1].position.x = decorationsInitialPos.cactuses10 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.cactuses11 = cactuses1[1].position.x;

            cactuses1[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }

    if (cactuses2[0]) {
        cactuses2[0].position.x += .09; // * scoreValue / 10;
        if (cactuses2[0].position.x > 25) {

            cactuses2[0].position.x = decorationsInitialPos.cactuses11 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.cactuses20 = cactuses2[0].position.x;

            cactuses2[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses2[1]) {
        cactuses2[1].position.x += .09; // * scoreValue / 10;
        if (cactuses2[1].position.x > 25) {

            cactuses2[1].position.x = decorationsInitialPos.cactuses20 - Math.random() * (-10 - -15) + -15
            decorationsInitialPos.cactuses21 = cactuses2[0].position.x;


            cactuses2[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }



    // floors
    if (runningFloor) {
        runningFloor.position.x > 130 ?
            runningFloor.position.x = -345 :
            runningFloor.position.x += .5  + (scoreValue / cooler)
    }
    if (runningFloor1) {
        runningFloor1.position.x > 130 ?
            runningFloor1.position.x = -345 :
            runningFloor1.position.x += .5  + (scoreValue / cooler)
    }

    // mountain
    if (firstM) {
        firstM.position.x > 111 ?
            firstM.position.x = -120 :
            firstM.position.x += 0.07
    }

    enemiesMove();
    

    //console.log(scoreValue.toFixed(0))
    // changing models to have animation effect
    if (
            playerModel1 && 
            playerModel2 && 
            playerModel3 && 
            frame % 15 === 0 && 
            !isJump
        ) { // check for test
        playerModelJump.visible = false;
        if (currentRunModel === 'one') {
            playerModel1.visible = false;
            playerModel2.visible = true;
            currentRunModel = 'two';

        } else if (currentRunModel === 'two') {
            playerModel2.visible = false;
            playerModel3.visible = true;
            currentRunModel = 'three';

        } else if (currentRunModel === 'three') {
            playerModel3.visible = false;
            playerModel2.visible = true;
            currentRunModel = 'four';
        } else {
            playerModel2.visible = false;
            playerModel1.visible = true;
            currentRunModel = 'one';
        }
    }







}