


import * as THREE from './libs/three.module.js';

import Stats from 'stats.js';
import { loader,
    playerDefaultPosition, 
    playerModelJump, 
    playerModel1, 
    playerModel2, 
    playerModel3 } from './loader.js';
import { moving, checkForOthers } from './moving.js';
import { player, playerHitboxMesh } from './player.js';
import { enemySpawner, enemyPteroSpawner, enemies, enemiesPtero, intervalToMove } from './enemies.js';
import { Environment } from './environment.js';


export let camera, scene, renderer, controls;
export let light;
export let canvas = document.querySelector('#gameCanvas');
export let mainLoaded = 0;
export let add = () => {
    mainLoaded++;
}
import { backMusicController, jumpMusicController, coinMusicController, collisionMusicController, music } from './sounds.js';

import {OrbitControls} from './libs/OrbitControls';


export let collissionDetected = false;
export let scoreValue = 0;
export let low = false;
export let isJump = false;

export let frame = 0;
let scoreValueDisplay = document.querySelector('#scoreValue');
let clock = new THREE.Clock();
let spawnPteros = true;

// GLOBAL STATES 
let isPlaying = false;
let isCollapsed = false


let collapsedScreen = document.querySelector('#collapsedScreen');
let collapsedScreenScore = document.querySelector('#finalScore');
let collapsedScreenButton = document.querySelector('#restartButton');
 collapsedScreenButton.addEventListener("click", () => {
   reset();
   collapsedScreen.style.display = "none";
 });

let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
//document.body.appendChild(stats.dom);



const init = () => { // init all required environment

    let bestValue = localStorage.getItem('score') ? localStorage.getItem('score') : '00000';
    console.log(bestValue)
    console.log(bestValue.length)
    let goodBestValue = `${bestValue.length === 1 ?
            '0000' : bestValue.length === 2 ?
                '000' : bestValue.length === 3 ?
                '00' : bestValue.length === 4 ?
                '0': ''
    }${bestValue}
`
    // if there is a hi score in localstorage grab it and if not set value to 0
    document.querySelector('#bestValue').innerHTML = goodBestValue

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 500);
    
    camera.position.set(
        12.812632627090226,
        15.972268469235177,
        -9.39261128834728
    )
    camera.rotation.set(
        -2.496329585729413,
        0.6314816254240349,
        2.723419319960275
    )
    
    // create scene
     scene = new THREE.Scene();

    // lights
    let DLight = new THREE.DirectionalLight(0xC19A4B , .5);
    let DLightTargetObject = new THREE.Object3D();
    DLight.position.set(-40, 60, -120);
    DLight.target = DLightTargetObject;
    DLightTargetObject.position.set(10, 2, 10);
    DLight.castShadow = true;
    DLight.shadow.radius = 2;
     // create shadows on objects
    DLight.castShadow = true;
    DLight.shadow.radius =5;
    DLight.shadow.mapSize.width = 1024 * 1;
    DLight.shadow.mapSize.height = 1024 * 1;
    DLight.shadow.camera.scale.y = 10;
    DLight.shadow.camera.scale.x = 20;
    DLight.shadow.camera.near = 0;
    DLight.shadow.camera.far = 200; 
    // // ambient light(everywhere)
    let ALight = new THREE.AmbientLight(0xccb5ac, 1);
    //let h = new THREE.DirectionalLightHelper(DLight,.5);
    scene.add(ALight);
    //scene.add(h)
    scene.add(DLightTargetObject);


    scene.add(DLight);

    


    // add fog
    scene.fog = new THREE.Fog(0xE7B251, 1, 125);

    // scene background color(environment)
    scene.background = new THREE.Color(0xE7B251);

    loader();// all objects loaders

    renderer = new THREE.WebGLRenderer({
       /*  alpha: true, */
        antialias: true,
        canvas: canvas // render to existing canvas
    });

    //renderer.setClearColor(0xE6CBB2); // to have light background color
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap ;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.Uncharted2ToneMapping
    
    // just for testing
    // controls = new OrbitControls(camera, canvas);

    // pointer to see where enemies should be eliminated
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
    
    if (e.code === "KeyS" || e.code === "ArrowDown") {
        if (isJump || playerModel1.position.x > 9) return;
        isJump = false;
        // hit box
        playerHitboxMesh.scale.y = .6;
        playerHitboxMesh.position.y = 5;
        low = true;
    } else if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") {

    
        if (isJump || low || playerModel1.position.x > 9)return;
        jumpMusicController.play();

        isJump = true;
        playerHitboxMesh.position.y = 13;
        
        playerModelJump.position.y = 11;

        playerModel1.visible = false;
        playerModel2.visible = false;
        playerModel3.visible = false;
        playerModelJump.visible = true;


        // reset position y not to fly
        setTimeout(() => {
            playerHitboxMesh.position.y = 8;
            
            playerModelJump.position.y = 5;

            isJump = false;
            
            

        }, 500);
        
    }
}
const keyUpHandler = (e) => {
    if(e.code === "KeyS" || e.code === "ArrowDown") {

        setTimeout(() => {
            playerHitboxMesh.position.y = 8;
            playerHitboxMesh.scale.y = 1;
           /*  playerModel1.scale.set(.2, .2, .2)
            playerModel2.scale.set(.2, .2, .2)
            playerModel3.scale.set(.2, .2, .2) */
            low = false;
            /* playerModel1low */
        }, 100);
        
    }
}
// for collision detection
let eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const reset = () => {
    console.log(`%c reset`, 'font-size:40px')

    isJump = false;// if collision was in the air
   
    eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    enemies.length = 0;
    console.log('11111111111111sssawfa')
    console.log(scene.children.length);

    scene.children = scene.children.filter((one) => one.name !== "enemy");
   
    console.log('2222222222sssawfa')
    console.log(scene.children.length);


    /* playerModel.position.set(
        playerDefaultPosition.x,
        1.5,
        playerDefaultPosition.z
    ) */
    playerHitboxMesh.position.set(
        playerDefaultPosition.x,
        8,
        playerDefaultPosition.z
    )
    scoreValue = 0;
    

    let bestValue = localStorage.getItem('score') ? localStorage.getItem('score') : '00000';
    console.log(bestValue)
    console.log(bestValue.length)
    let goodBestValue = `${bestValue.length === 1 ?
        '0000' : bestValue.length === 2 ?
            '000' : bestValue.length === 3 ?
                '00' : bestValue.length === 4 ?
                    '0' : ''
        }${bestValue}`
    // if there is a hi score in localstorage grab it and if not set value to 0
    document.querySelector('#bestValue').innerHTML = goodBestValue


    isCollapsed = false;
    isPlaying = true;
        
    // default cactuses
    // enemies[0].position.x = -180
    // enemies[1].position.x = -239
    // enemies[2].position.x = -311
    // enemies[3].position.x = -433
    renderer.render(scene,camera)
    console.log('after')
    console.log(enemies)
    console.log(scene.children)


    enemySpawner({ x: -150 });
    enemySpawner({ x: -210 });
    enemySpawner({ x: -260 });
    enemySpawner({ x: -310 });


    backMusicController.play();

}

/* 
const introScene = () => {
    
}
 */


// main animate function ( game loop )
const animate = () => {
    requestAnimationFrame(animate);
  
    frame++;

    stats.begin();

    if (!isPlaying || isCollapsed)return;
 
    // check + movement for all the elements
    moving();


    // update the score
    scoreValueDisplay.innerHTML = `${
        scoreValue.toFixed(0).length === 1 ? 
            '0000' : scoreValue.toFixed(0).length === 2 ?  
            '000' : scoreValue.toFixed(0).length === 3 ? 
            '00' : scoreValue.toFixed(0).length === 4 ?
            '0' : ''
    }${scoreValue.toFixed(0)}`;
    scoreValue += .3;


    if (scoreValue.toFixed(0) * 1 % 100 === 0 && scoreValue.toFixed(0) * 1 !== 0) {
        // enemySpawner();
    }

    if (scoreValue.toFixed(0) * 1 % 100 === 0 && scoreValue.toFixed(0) * 1 !== 0) {
        // console.log('3222222222222220')
        coinMusicController.play()
    }
    // collision check
    if (enemies.length) {
        // console.log('true true true')
    // check if any of the enemies reach the destroyer pointer and if yes remove from the scene
        enemies.map((e, index) => {

            let pBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
            pBox.setFromObject(playerHitboxMesh);
            eBox.setFromObject(e.one ? e.one : e);
               
            if (eBox.intersectsBox(pBox)) {
                console.log('1111collision')
                backMusicController.pause()
                collisionMusicController.play();
                collapsedScreen.style.display = 'block';
                collapsedScreenScore.innerHTML = `Score:${scoreValue.toFixed(0)}`;
               
                isCollapsed = true;
                isPlaying = false;
                let score = localStorage.getItem('score');

                // if there is a value and that value is less than current
                if(score*1 < scoreValue) {
                    localStorage.setItem('score', scoreValue.toFixed(0));
                }
            
            }
            
        });
        
    }
  
    renderer.render(scene, camera);

    stats.end();
    // console.log(camera.position)
    // console.log(camera.rotation)

}



let startScreen = document.querySelector('.startMenu');
let buttonStart = document.querySelector(".startGameButton");

buttonStart.addEventListener('click',()=>{

    startScreen.style.display = 'none';
    isPlaying = true;

    backMusicController.play();
    enemySpawner({x:-150})
    enemySpawner({ x: -210 });
    enemySpawner({ x: -260 });
    enemySpawner({ x: -310 });

})



// events
document.addEventListener('keydown', keyPressedHandler);
document.addEventListener('keyup', keyUpHandler);


let loadingBar = document.querySelector('#loadingBarValue');
let stopLoadingObjectsLoop = true;
const loadingObjects = () => {
    
    if (!stopLoadingObjectsLoop)return;
    
    loadingBar.style.width = `${mainLoaded*5.3}%`
    if (mainLoaded === 20/*  && buttonStart.style.display === 'block' */) {
        console.log('20');
        //init();
        buttonStart.style.display = "block";
        document.querySelector('#loadingBarValue').style.display = 'none';

        // init environment
        Environment();

        // init player
        player();
        
        stopLoadingObjectsLoop = false;

    }
    requestAnimationFrame(loadingObjects);

}

loadingObjects()
init();
animate();
