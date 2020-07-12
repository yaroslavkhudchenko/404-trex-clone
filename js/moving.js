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
    playerModel1low,
    playerModel2low,
    playerModel3low,
    playerModelJump,
    enemyObjTopOne,
    enemyObjTopTwo,
    enemyObjTopThree,

} from './loader.js';

import { scoreValue, frame, isJump, low, scene } from './app.js';
import { enemies, enemiesPtero, randomSelector, enemySpawner } from './enemies.js';

let currentRunModel = 'one';
let currentPteroModel = 'one';
let cooler = 15000; // control the speed

let enemiesRespPos = {
    max:-150,
    min:-125
}

let stopGlobaRespawn = false;
let yesYouCan = true;
let respawnCooldown = () =>{
    setTimeout(() => {
        yesYouCan = true;
    }, 3000);
}
const enemiesMove = () => {

    
    // console.log('enemiesmove')
    enemies.map((one,index) => {
        if(one.position) {
            one.position.x += .5 + (scoreValue / cooler);

            if (one.position.x > 25) {
                scene.remove(one);
                enemies.pop() // remove from both scene and array s
                stopGlobaRespawn = true;
                enemySpawner();
            }
        } else {
            one.one.position.x += .5 + (scoreValue / cooler);
            one.two.position.x += .5 + (scoreValue / cooler);
            one.three.position.x += .5 + (scoreValue / cooler);
            if (one.one.position.x > 25) {
                scene.remove(one.one);
                scene.remove(one.two);
                scene.remove(one.three);
                
                enemies.pop() // remove from both scene and array s
                stopGlobaRespawn = true;
                enemySpawner();
            }
        }
        
           
    })
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
    
    // changing models to have 'animation' effect

    if (
            playerModel1 && 
            playerModel2 && 
            playerModel3 && 
            frame % 5 === 0 && 
            !isJump
        ) { // check for test
        playerModelJump.visible = false;

        if (currentRunModel === 'one') {
            if(low) {
                playerModel1.visible = false;
                playerModel2.visible = false;
                playerModel3.visible = false;

                playerModel1low.visible = false;
                playerModel2low.visible = true;
            }else {
                playerModel1low.visible = false;
                playerModel2low.visible = false;
                playerModel3low.visible = false;


                playerModel1.visible = false;
                playerModel2.visible = true;
                
            } currentRunModel = 'two';
        } else if (currentRunModel === 'two') {
            if(low) {
                playerModel1.visible = false;
                playerModel2.visible = false;
                playerModel3.visible = false;

                playerModel2low.visible = false;
                playerModel3low.visible = true;
            }   else {         

                playerModel1low.visible = false;
                playerModel2low.visible = false;
                playerModel3low.visible = false;


                playerModel2.visible = false;
                playerModel3.visible = true;
            } currentRunModel = 'three';

        } else if (currentRunModel === 'three') {
            if(low) {
                playerModel1.visible = false;
                playerModel2.visible = false;
                playerModel3.visible = false;

                playerModel3low.visible = false;
                playerModel2low.visible = true;

            }else {
                playerModel1low.visible = false;
                playerModel2low.visible = false;
                playerModel3low.visible = false;



                playerModel3.visible = false;
                playerModel2.visible = true;
                
            } currentRunModel = 'four';
        } else {
            if(low) {
                playerModel1.visible = false;
                playerModel2.visible = false;
                playerModel3.visible = false;

                playerModel2low.visible = false;
                playerModel1low.visible = true;
            }else {

                playerModel1low.visible = false;
                playerModel2low.visible = false;
                playerModel3low.visible = false;


                playerModel2.visible = false;
                playerModel1.visible = true;
               
            } currentRunModel = 'one';
        }
    }
    //console.log(enemiesPtero)
    if (frame % 15 === 0) { // check for test
            console.log('in ptero moving')
        if (currentPteroModel === 'one') {
          

            enemies.map(one => {
                if(one.one) {
                    one.one.visible = false;
                    one.two.visible = true;
                }
            })


            currentPteroModel = 'two';

        } else if (currentPteroModel === 'two') {
        
            enemies.map((one) => {
                if (one.two) {
                one.two.visible = false;
                one.three.visible = true;
                }
            });


            currentPteroModel = 'three';

        } else if (currentPteroModel === 'three') {
            
        
            enemies.map((one) => {
                if (one.three) {
                    one.three.visible = false;
                    one.two.visible = true;
                }
            });
            currentPteroModel = 'four';
        } else {
            
             enemies.map((one) => {
               if (one.two) {
                 one.two.visible = false;
                 one.one.visible = true;
               }
             });

            currentPteroModel = 'one';
        }
    }

}