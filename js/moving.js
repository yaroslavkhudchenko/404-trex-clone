import * as THREE from './libs/three.module.js';
import {
    cactuses1,
    cactuses2,
    firstM,
    bigTrees
} from './environment.js';

import {
    runningFloor,
    runningFloor1
} from './loader.js';

import { enemies } from './enemies.js';
import { randomSelector } from './app.js';

export const moving = () => {
    if (bigTrees[0]) {
        bigTrees[0].position.x += .09;// * scoreValue / 10;
        if (bigTrees[0].position.x > 25) {

            bigTrees[0].position.x = Math.random() * (-90 - -95) + -95;

            bigTrees[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[1]) {
        bigTrees[1].position.x += .09;// * scoreValue / 10;
        if (bigTrees[1].position.x > 25) {

            bigTrees[1].position.x = Math.random() * (-90 - -95) + -95;

            bigTrees[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[2]) {
        bigTrees[2].position.x += .09;// * scoreValue / 10;
        if (bigTrees[2].position.x > 25) {

            bigTrees[2].position.x = Math.random() * (-90 - -95) + -95;

            bigTrees[2].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[3]) {
        bigTrees[3].position.x += .09;// * scoreValue / 10;
        if (bigTrees[3].position.x > 25) {

            bigTrees[3].position.x = Math.random() * (-90 - -95) + -95;

            bigTrees[3].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (runningFloor) {
        runningFloor.position.x > 77 ?
            runningFloor.position.x = -220 :
            runningFloor.position.x += 0.417
    }
    if (runningFloor1) {
        runningFloor1.position.x > 77 ?
            runningFloor1.position.x = -220 :
            runningFloor1.position.x += 0.417
    }

    if (firstM) {
        firstM.position.x > 65 ?
            firstM.position.x = -120 :
            firstM.position.x += 0.07
    }
    /* 
        if (bigTreeObject)
    */
    if (enemies[0]) {
        enemies[0].position.x += .5;// * scoreValue/10;
        if (enemies[0].position.x > 25) {
            scoreValue > 400 ?
                enemies[0].position.y = randomSelector[Math.floor(Math.random() * Math.floor(2))]
                : false

            enemies[0].position.x = -100
        }
    }
    if (enemies[1]) {
        enemies[1].position.x += .5;// * scoreValue/10;
        if (enemies[1].position.x > 25) {
            scoreValue > 400 ?
                enemies[1].position.y = randomSelector[Math.floor(Math.random() * Math.floor(2))]
                : false

            enemies[1].position.x = -100
        }
    }
    if (enemies[2]) {
        enemies[2].position.x += .5;// * scoreValue/10;
        if (enemies[2].position.x > 25) {
            scoreValue > 400 ?
                enemies[2].position.y = randomSelector[Math.floor(Math.random() * Math.floor(2))]
                : false

            enemies[2].position.x = -100
        }
    }
    if (enemies[3]) {
        enemies[3].position.x += .5;// * scoreValue/10;
        if (enemies[3].position.x > 25) {
            scoreValue > 400 ?
                enemies[3].position.y = randomSelector[Math.floor(Math.random() * Math.floor(2))]
                : false
            // console.log(enemies[3 ].position.x)

            enemies[3].position.x = -100
        }
    }

    if (cactuses1[0]) {
        cactuses1[0].position.x += .09;// * scoreValue / 10;
        if (cactuses1[0].position.x > 25) {

            cactuses1[0].position.x = Math.random() * (-90 - -95) + -95;

            cactuses1[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses1[1]) {
        cactuses1[1].position.x += .09;// * scoreValue / 10;
        if (cactuses1[1].position.x > 25) {

            cactuses1[1].position.x = Math.random() * (-90 - -95) + -95;

            cactuses1[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }

    if (cactuses2[0]) {
        cactuses2[0].position.x += .09;// * scoreValue / 10;
        if (cactuses2[0].position.x > 25) {
      
            cactuses2[0].position.x = Math.random() * (-90 - -95) + -95;

            cactuses2[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses2[1]) {
        cactuses2[1].position.x += .09;// * scoreValue / 10;
        if (cactuses2[1].position.x > 25) {
         
            cactuses2[1].position.x = Math.random() * (-90 - -95) + -95;

            cactuses2[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
}