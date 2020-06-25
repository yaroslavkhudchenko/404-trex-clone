


import * as THREE from './libs/three.module.js';
import { OrbitControls } from './libs/OrbitControls.js';

import { player, playerHitboxMesh, playerDefaultPosition, mixer, playerModel } from './player.js';
import { enemySpawner, enemies, intervalToMove } from './enemies.js';
import { Environment, cactuses1, cactuses2, fallenTrees, geometryFloor, materialFloor, floorMesh, cactusRespawner, secondM, firstM, runningFloor, runningFloor1 } from './environment.js';
export let camera, scene, renderer, controls;
export let light;
export let canvas = document.querySelector('#gameCanvas');

export let collissionDetected = false;

let scoreValueDisplay = document.querySelector('#scoreValue');
export let scoreValue = 0;
let clock = new THREE.Clock();

// GLOBAL STATES 

let isPlaying = false;
let isCollapsed = false
let isJump = false;

let collapsedScreen = document.querySelector('#collapsedScreen');
let collapsedScreenScore = document.querySelector('#finalScore');
let collapsedScreenButton = document.querySelector('#restartButton');

import Stats from 'stats.js';
let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const init = () => { // init all required environment
    
    // if there is a hi score in localstorage grab it and if not set value to 0
    document.querySelector('#bestValue').innerHTML = localStorage.getItem('score') ? localStorage.getItem('score') : 0

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 500);
    /* camera.position.set(
        16.541557178529693,
        10.661301140199619,
        -6.8735841518706104
    ) */
    camera.position.set(
12.11335282741436,
9.431344959973545,
-8.155109793722527
    )
    
    camera.rotation.set(
        -2.575459746596432,
        0.6059858107445513,
        2.794286842857644
    )
    /* camera.rotation.set(
        -2.143452805674477,
        0.9165936643864037,
        2.253095383937993
    ) */
    // create scene
     scene = new THREE.Scene();
/*
    // axis helper(to see axis visully)
    let axesHelper = new THREE.AxesHelper(9);
    scene.add(axesHelper);*/

    // lights
    let DLight = new THREE.DirectionalLight(0xedc9af , .5);
    let DLightTargetObject = new THREE.Object3D();
    DLight.position.set(-50, 30, -30);
    DLight.target = DLightTargetObject;
    DLightTargetObject.position.set(65, 9, 50);

    // create shadows on objects
    DLight.castShadow = true;
    DLight.shadow.radius = 1;
    DLight.shadow.mapSize.width = 1024 * 1;
    DLight.shadow.mapSize.height = 1024 * 1;
    DLight.shadow.camera.scale.y = 10;
    DLight.shadow.camera.scale.x = 20;
    DLight.shadow.camera.near = 0;
    DLight.shadow.camera.far = 200;
    // ambient light(everywhere)
    let ALight = new THREE.AmbientLight(0xedc9af, 1.5);
    scene.add(ALight);

    scene.add(DLight);
    scene.add(DLightTargetObject);

    // add fog
    scene.fog = new THREE.Fog(0xE7B251, 1, 125);

    // scene background color(environment)
    scene.background = new THREE.Color(0xE7B251);

    // init environment
    Environment();

    // init player
    player();

    // spawn enemies every (between 2.3 and 1.1 seconMath.random)
    //setInterval(() => enemySpawner(), Math.floor(Math.random() * (1700 - 700) + 1700));
  
    
    
    enemySpawner()
    setTimeout(() => {
        enemySpawner()
    }, 1400);
    setTimeout(() => {
        enemySpawner()
    }, 2400);
    setTimeout(() => {
        enemySpawner()
    }, 3400);
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas // render to existing canvas
    });
    
    renderer.setClearColor(0xE6CBB2); // to have light background color
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap ;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.Uncharted2ToneMapping
    /* // create the controls(for testing)
    controls = new OrbitControls(camera, canvas);
    console.log('000000000000000')
    console.log(camera.rotation)
    //controls.update();
    //controls = false;
 */
    controls = new OrbitControls(camera, canvas);
    // pointer to see where enemies eliminates
    let pointerGeo = new THREE.CubeGeometry(2, 2, 2);
    let pointerMat = new THREE.MeshBasicMaterial({ color: 0x0000f0 })
    let pointer = new THREE.Mesh(pointerGeo, pointerMat);
    pointer.position.set(25, 1, 0);
    scene.add(pointer);

    // on window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

// handle keypress/ up function to interact with the player obj
const keyPressedHandler = (e) => {
    switch (e.code) {
        case "KeyS":
            // model
            //playerModel.scale.set(.05,.05,.05);
            //playerModel.position.y = 1.5;
            isJump = false;
            // hit box
            playerHitboxMesh.scale.y = .5;
            playerHitboxMesh.position.y = 2;

            break;
        case "Space":
            if(isJump)return;
            isJump = true;
            playerHitboxMesh.position.y = 7;
            //playerModel.position.y = 3;
            
            // reset position y not to fly
            setTimeout(() => {
                playerHitboxMesh.position.y = 2.5;
                //playerModel.position.y = 1.5;
                isJump = false;
            }, 400);
            
            break;
    }
}
const keyUpHandler = (e) => {
    if(e.code === "KeyS") {

        setTimeout(() => {
            playerHitboxMesh.position.y = 2.5;
            playerHitboxMesh.scale.y = 1;

            //playerModel.position.y = 1.5;
            //playerModel.scale.set(.1, .1, .1);

        }, 100);
        
    }
}

// for collision detection
let eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const reset = () => {

    isJump = false;// if collision was in the air

    //console.log(scene);
   
    eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

    /* playerModel.position.set(
        playerDefaultPosition.x,
        1.5,
        playerDefaultPosition.z
    ) */
    playerHitboxMesh.position.set(
        playerDefaultPosition.x,
        2.5,
        playerDefaultPosition.z
    )
    scoreValue = 0;
    // if there is a hi score in localstorage grab it and if not set value to 0
    document.querySelector('#bestValue').innerHTML = localStorage.getItem('score');
    isCollapsed = false;
    isPlaying = true;
    // spawn enemies every (between 2.3 and 1.1 seconMath.random)
    //setInterval(() => enemySpawner(), Math.floor(Math.random() * (2300 - 1100) + 2300));
    //cactusRespawner(2, -75);

    enemies[0].position.x = -100
    enemies[1].position.x = -120
    enemies[2].position.x = -140
    enemies[3].position.x = -160


    /* cactusRespawner(2, Math.random() * (-95 - -128) + -128)

    cactusRespawner(2, Math.random() * (-65 - -100) + -128);

    
    cactusRespawner(3, Math.random() * (-75 - -111) + -128);
    cactusRespawner(3, Math.random() * (-85 - -158) + -128); */


   /*  e.position.x = Math.random() * (-90 - -95) + -95;
    e.rotation.y += Math.random() * (30 - 15) + 30;
 */



}
let randomSelector = [4.5, 1.5];

isPlaying = true;
// main animate function ( game loop )
const animate = () => {
    // console.log('frame')
    stats.begin();
    requestAnimationFrame(animate);

    // console.log('in animate we are')
    // console.log(!isPlaying)
    // console.log(isCollapsed)

    if (!isPlaying || isCollapsed)return;

    if (runningFloor) {
       /*  runningFloor.position.x > -25 ? 
            runningFloor.position.x = -50 : */
                runningFloor.position.x += 0.07
    }
    if (runningFloor1) {
        /* runningFloor1.position.x > -25 ?
            runningFloor1.position.x = -50 : */
            runningFloor1.position.x += 0.07
    }

    if(firstM) { 
        firstM.position.x > 65 ? 
        firstM.position.x = -120 :
        firstM.position.x += 0.07
    }

    if(enemies[0]) {
        enemies[0].position.x += .5;// * scoreValue/10;
        if(enemies[0].position.x > 25) {
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
            console.log('cactuses 10')

            cactuses1[0].position.x = Math.random() * (-90 - -95) + -95;

            cactuses1[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses1[1]) {
        cactuses1[1].position.x += .09;// * scoreValue / 10;
        if (cactuses1[1].position.x > 25) {
            console.log('cactuses 11')

            cactuses1[1].position.x = Math.random() * (-90 - -95) + -95;

            cactuses1[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }

    if (cactuses2[0]) {
        cactuses2[0].position.x += .09;// * scoreValue / 10;
        if (cactuses2[0].position.x > 25) {
            console.log('cactuses 20')

            //cactuses2[0].position.x = -100
            cactuses2[0].position.x = Math.random() * (-90 - -95) + -95;

            cactuses2[0].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }
    if (cactuses2[1]) {
        cactuses2[1].position.x += .09;// * scoreValue / 10;
        if (cactuses2[1].position.x > 25) {
            console.log('cactuses 21')

            //cactuses2[1].position.x = -100
            cactuses2[1].position.x = Math.random() * (-90 - -95) + -95;
          
            cactuses2[1].rotation.y += Math.random() * (30 - 15) + 30;
        }
    }





    

    // running player
    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    // controls.update();
    
    // update the score
    scoreValueDisplay.innerHTML = scoreValue.toFixed(0);
    scoreValue += .3;






    // console.log(enemies.length)
    if (enemies.length) {

    // check if any of the enemies reach the destroyer pointer and if yes remove from the scene
        enemies.map((e, index) => {

            let pBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
            pBox.setFromObject(playerHitboxMesh);
            eBox.setFromObject(e);
            
           /*  if (eBox.intersectsBox(pBox)) {
                
                
                collapsedScreen.style.display = 'block';
                collapsedScreenScore.innerHTML = `Score:${scoreValue.toFixed(0)}`;
                collapsedScreenButton.addEventListener('click',() => {
                  
                    reset();
                    collapsedScreen.style.display = 'none';
                })

                isCollapsed = true;
                isPlaying = false;
                let score = localStorage.getItem('score');

                // if there is a value and that value is less than current
                if(score*1 < scoreValue) {
                    localStorage.setItem('score', scoreValue.toFixed(0));
                }
            
            }   */
            
        });
    }
   /*  cactuses1.map((e, index) => {
        // console.log('-+>faw++f awfwafwafwa fwafwa fwaf waf')
        if (e.position.x > 25) {
            e.position.x = Math.random() * (-90 - -95) + -95;
            console.log('cactus one change position')
            console.log(e.position)
            e.rotation.y += Math.random() * (30 - 15) + 30;
           
        }
    })
    cactuses2.map((e, index) => {
        // console.log('-+>faw++f awfwafwafwa fwafwa fwaf waf')
        if(e.position.x > 25) {
            e.position.x = Math.random() * (-90 - -95) + -95;
            e.rotation.y += Math.random() * (30 - 15) + 30;
            console.log('cactus two change position')
            console.log(e.position)
        }
    })
    fallenTrees.map((e,index) => {
        if (e.position.x > 25) {
            e.position.x = Math.random() * (-90 - -95) + -95;
            e.rotation.y += Math.random() * (30 - 15) + 30;
            console.log('treefallen two change position')
        }
    }) */

    stats.end();
    renderer.render(scene, camera);
    // console.log('r')
    // console.log(camera.position)
    // console.log(camera.rotation)
}

let startScreen = document.querySelector('.startMenu');

document.querySelector('.startGameButton').addEventListener('click',()=>{

    startScreen.style.display = 'none';
    isPlaying = true;
    
   /*  inteval = setInterval(() => {
        seconds--;

        document.querySelector('.timer').innerHTML = seconds;
        if (seconds === 0) {
            console.log('seconds is 00000')
            clearInterval(inteval)
            setTimeout(() => {
                
            }, 5000);
            document.querySelector('.timer').style.display = 'none';
        }

    }, 1000);
     */
       
})

// events
document.addEventListener('keypress', keyPressedHandler);
document.addEventListener('keyup', keyUpHandler);


init();
animate()