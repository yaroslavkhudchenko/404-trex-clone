import * as THREE from './libs/three.module.js';
import {
    cactuses1,
    cactuses2,
    
    bigTrees
} from './environment.js';

import {
    runningFloor,
    runningFloor1,
    firstM
} from './loader.js';
import  { scoreValue } from './app.js';
import { enemies, enemiesPtero, randomSelector } from './enemies.js';

let enemiesInitialPos = {
    zero : -120,
    first: -239,
    
    pteroOne: -180,
    pteroTwo: -239,

    second: -311,

    pteroThree: -311
    
}



let enemiesRespPos = {
    max:-80,
    min:-50
}

const enemiesMove = () => {







    // ENEMIES //
    if (enemies[0]) {

        enemies[0].position.x += .5 + (scoreValue / 8000);
        if (enemies[0].position.x > 25) {
            
            enemies[0].rotation.y += Math.random() * (30 - 15) + 30;

            enemies[0].position.x = enemiesInitialPos.pteroThree - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max

            console.log('enemy 1 more')
            console.log(enemies[0].position.x)


            enemiesInitialPos.zero = enemies[0].position.x;
        }
    }
    if (enemies[1]) {
        enemies[1].position.x += .5 + (scoreValue / 8000);
        if (enemies[1].position.x > 25) {
            
              
            enemies[1].rotation.y += Math.random() * (30 - 15) + 30;
            


            enemies[1].position.x = enemiesInitialPos.zero - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max//Math.random() * (-180 - -250) + -250
            

            console.log('enemy 2 more')
            console.log(enemies[1].position.x)


            enemiesInitialPos.first = enemies[1].position.x;
        }
    }
    
    if (enemiesPtero[0]) {

        enemiesPtero[0].position.x += .5 + (scoreValue / 8000);
        if (enemiesPtero[0].position.x > 25) {


            enemiesPtero[0].position.x = enemiesInitialPos.first - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max//Math.random() * (-180 - -250) + -250
            enemiesInitialPos.pteroOne = enemiesPtero[0].position.x;
        }
    } if (enemiesPtero[1]) {
        enemiesPtero[1].position.x += .5 + (scoreValue / 8000);
        if (enemiesPtero[1].position.x > 25) {


            enemiesPtero[1].position.x = enemiesInitialPos.pteroOne - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max//Math.random() * (-180 - -250) + -250
            enemiesInitialPos.pteroTwo = enemiesPtero[1].position.x;
        }
    } 
    if (enemies[2]) {
        enemies[2].position.x += .5 + (scoreValue / 8000);
        if (enemies[2].position.x > 25) {

            enemies[2].rotation.y += Math.random() * (30 - 15) + 30;


            enemies[2].position.x = enemiesInitialPos.pteroTwo - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max//Math.random() * (-180 - -250) + -250


            console.log('enemy 3 more')
            console.log(enemies[2].position.x)

            enemiesInitialPos.second = enemies[2].position.x;
        }
    }
    if (enemiesPtero[2]) {
        enemiesPtero[2].position.x += .5 + (scoreValue / 8000);
        if (enemiesPtero[2].position.x > 25) {


            enemiesPtero[2].position.x = enemiesInitialPos.second - Math.random() * (enemiesRespPos.min - enemiesRespPos.max) + enemiesRespPos.max//Math.random() * (-180 - -250) + -250

           
            enemiesInitialPos.pteroThree = enemiesPtero[2].position.x;
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

            bigTrees[0].position.x = decorationsInitialPos.cactuses21 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.bigtree0 = bigTrees[0].position.x;

            bigTrees[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[1]) {
        bigTrees[1].position.x += .09;// * scoreValue / 10;
        if (bigTrees[1].position.x > 25) {

            bigTrees[1].position.x = decorationsInitialPos.bigtree0 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.bigtree1 = bigTrees[1].position.x;
            


            bigTrees[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[2]) {
        bigTrees[2].position.x += .09;// * scoreValue / 10;
        if (bigTrees[2].position.x > 25) {

            bigTrees[2].position.x = decorationsInitialPos.bigtree1 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.bigtree2 = bigTrees[2].position.x;
            

            bigTrees[2].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (bigTrees[3]) {
        bigTrees[3].position.x += .09;// * scoreValue / 10;
        if (bigTrees[3].position.x > 25) {

            bigTrees[3].position.x = decorationsInitialPos.bigtree2 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.bigtree3 = bigTrees[3].position.x;


            bigTrees[3].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }






    if (cactuses1[0]) {
        cactuses1[0].position.x += .09; // * scoreValue / 10;
        if (cactuses1[0].position.x > 25) {

            cactuses1[0].position.x = decorationsInitialPos.bigtree3 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.cactuses10 = cactuses1[0].position.x;
            
            
            //Math.random() * (-90 - -95) + -95;

            cactuses1[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses1[1]) {
        cactuses1[1].position.x += .09; // * scoreValue / 10;
        if (cactuses1[1].position.x > 25) {

            cactuses1[1].position.x = decorationsInitialPos.cactuses10 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.cactuses11 = cactuses1[1].position.x;

            cactuses1[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }

    if (cactuses2[0]) {
        cactuses2[0].position.x += .09; // * scoreValue / 10;
        if (cactuses2[0].position.x > 25) {

            cactuses2[0].position.x = decorationsInitialPos.cactuses11 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.cactuses20 = cactuses2[0].position.x;

            cactuses2[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses2[1]) {
        cactuses2[1].position.x += .09; // * scoreValue / 10;
        if (cactuses2[1].position.x > 25) {

            cactuses2[1].position.x = decorationsInitialPos.cactuses20 - Math.random() * (-10 - -15) + -15//Math.random() * (-90 - -95) + -95;
            decorationsInitialPos.cactuses21 = cactuses2[0].position.x;


            cactuses2[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }





    // floors
    if (runningFloor) {
        runningFloor.position.x > 130 ?
            runningFloor.position.x = -345 :
            runningFloor.position.x += .5  + (scoreValue / 8000)
    }
    if (runningFloor1) {
        runningFloor1.position.x > 130 ?
            runningFloor1.position.x = -345 :
            runningFloor1.position.x += .5  + (scoreValue / 8000)
    }

    // mountain
    if (firstM) {
        firstM.position.x > 111 ?
            firstM.position.x = -120 :
            firstM.position.x += 0.07
    }
    /* 
        if (bigTreeObject)
    */



    enemiesMove();


}