


import * as THREE from './libs/three.module.js';
import { OrbitControls } from './libs/OrbitControls.js';

import { player, playerHitboxMesh, playerDefaultPosition, mixer, playerModel } from './player.js';
import { enemySpawner, enemies, intervalToMove } from './enemies.js';
import { Environment, cactuses1, cactuses2, geometryFloor, materialFloor, floorMesh, } from './environment.js';
export let camera, scene, renderer, controls;
export let light;
export let canvas = document.querySelector('#gameCanvas');

export let collissionDetected = false;

let scoreValueDisplay = document.querySelector('#scoreValue');
export let scoreValue = 0;
let clock = new THREE.Clock();


import Stats from 'stats.js';
let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const init = () => { // init all required environment
    
    // if there is a hi score in localstorage grab it and if not set value to 0
    document.querySelector('#bestValue').innerHTML = localStorage.getItem('score') ? localStorage.getItem('score') : 0

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 500);
    camera.position.set(
        16.541557178529693,
        10.661301140199619,
        -6.8735841518706104
    )

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

    


    // imported environment variales
    Environment();

    // call player function
    player();

    // spawn enemies every (between 2.5 and 2 seconMath.randds)
    setInterval(() => enemySpawner(), Math.floor(Math.random() * (2300 - 1100) + 2300));
    /* for(let i=0;i<5;i++) {
        console.log('-------------')
        console.log(Math.floor(Math.random() * (2300 - 1100) + 2300));
        setTimeout(() => {
            enemySpawner();
        }, Math.floor(Math.random() * (2300 - 1100) + 2300));
    } */

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
    });
    
    renderer.setClearColor(0xE6CBB2); // to have light background color
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap ;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.Uncharted2ToneMapping
    // create the controls(for testing)
    controls = new OrbitControls(camera, canvas);
    //controls.update();
    controls = false;


    // pointer to see where enemies eliminates
    let pointerGeo = new THREE.CubeGeometry(2, 2, 2);
    let pointerMat = new THREE.MeshBasicMaterial({ color: 0x0000f0 })
    let pointer = new THREE.Mesh(pointerGeo, pointerMat);
    pointer.position.set(25, 1, 0);
    scene.add(pointer);
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
            playerModel.scale.set(.05,.05,.05);
            playerModel.position.y = 1.5;
            
            // hit box
            playerHitboxMesh.scale.y = .5;
            playerHitboxMesh.position.y = 2;

            break;
        case "Space":
            playerHitboxMesh.position.y = 4.5;
            playerModel.position.y = 3;
            
            // reset position y not to fly
            setTimeout(() => {
                playerHitboxMesh.position.y = 2.5;
                playerModel.position.y = 1.5;
            }, 350);
            
            break;
    }
}
const keyUpHandler = (e) => {
    if(e.code === "KeyS") {

        setTimeout(() => {
            playerHitboxMesh.position.y = 2.5;
            playerHitboxMesh.scale.y = 1;

            playerModel.position.y = 1.5;
            playerModel.scale.set(.1, .1, .1);

        }, 100);
        
    }
}

let eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());







// main animate function
const animate = () => {


    stats.begin();
    if (collissionDetected) return; 
        console.log(scene.children.length);

    
    let delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    // controls.update();
    renderer.render(scene, camera);
    
    // update the score
    scoreValueDisplay.innerHTML = scoreValue.toFixed(0);
    scoreValue += .3;

    
    // check if any of the enemies reach the destroyer pointer and if yes remove from the scene
    enemies.map((e, index) => {
        // console.log(e)
        e.position.x > 25 ? 
            scene.remove(e) && enemies.pop() // remove from both scene and array s
                : false;

        let pBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        pBox.setFromObject(playerHitboxMesh);
        eBox.setFromObject(e);
        if (eBox.intersectsBox(pBox)) {
           /*  e.scale.set(3,3,3);


            collissionDetected = true;
            
            let score = localStorage.getItem('score');

            // if there is a value and that value is less than current
            if(score*1 < scoreValue) {
                localStorage.setItem('score', scoreValue.toFixed(0));
            }
            


            console.log('collision has happened')
            for (var i = 1; i < 222; i++)
                window.clearInterval(i); */

        }
    });
    // console.log(camera.position)
    cactuses1.map((e, index) => {
        if (e.position.x > 25) {
            e.position.x = Math.random() * (-90 - -95) + -95;
            e.rotation.y += Math.random() * (30 - 15) + 30;
           
        }
    })
    cactuses2.map((e, index) => {
        if(e.position.x > 25) {
            e.position.x = Math.random() * (-90 - -95) + -95;
            e.rotation.y += Math.random() * (30 - 15) + 30;
        }
    })


    stats.end();
    requestAnimationFrame(animate);

    //console.log(camera.position)



}


init();
/* let inteval = null;
 */
let startScreen = document.querySelector('.startMenu');

document.querySelector('.startGameButton').addEventListener('click',()=>{

    startScreen.style.display = 'none';
    animate();
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
