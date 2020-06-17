


import * as THREE from './libs/three.module.js';
import { OrbitControls } from './libs/OrbitControls.js';

import { player, playerHitboxMesh, playerDefaultPosition, mixer, playerModel } from './player.js';
import { enemySpawner, enemies, intervalToMove } from './enemies.js';
import { Environment, cactuses1, cactuses2 } from './environment.js';
export let camera, scene, renderer, controls;
export let geometryFloor, materialFloor, floorMesh, light;
export let canvas = document.querySelector('#gameCanvas');

export let collissionDetected = false;

let scoreValueDisplay = document.querySelector('#scoreValue');
export let scoreValue = 0;
let clock = new THREE.Clock();

import Stats from 'stats.js';
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const init = () => {
    
    document.querySelector('#bestValue').innerHTML = localStorage.getItem('score') ? localStorage.getItem('score') : 0
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 500);

    // set camera position(look from right side)
  /*  // good 
    camera.position.set(
        9.756752570767734,
        12.042143843536,
        -15.201498053045437
    ) */
    // for test
    camera.position.set(
        16.541557178529693,
        10.661301140199619,
        -6.8735841518706104
    )
/* 
    camera.position.x = 22.609984741761778;
    camera.position.y = 3.428590611619372;
    camera.position.z = 7.37041093612718;

    camera.rotation.x = -0.2521795322818087;
    camera.rotation.y = 0.5626175577081858;
    camera.rotation.z = 0.1365832725087437; */

    // create scene
    scene = new THREE.Scene();

    // axis helper(to see axis visully)
    let axesHelper = new THREE.AxesHelper(9);
    scene.add(axesHelper);
    let ALight = new THREE.AmbientLight(0xedc9af, 1.5);
    scene.add(ALight);
    // light(like sun)
    /* light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.y = 33;   
    light.position.z = -22;
    light.position.x = -45;

    light.target.position.set(-20, -20, 22);


    light.castShadow = true;

    light.shadow.mapSize.width = 6666;
    light.shadow.mapSize.height = 6666;
    //light.shadowDarkness = 0.2;
    let d = 300;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 100;
    light.shadowCameraVisible = true;
    light.shadowCameraNear = 50;
    let helper = new THREE.DirectionalLightHelper(light, 11);
    scene.add(light);

    scene.add(helper); */

    let DLight = new THREE.DirectionalLight(0xedc9af , .5);
    let DLightTargetObject = new THREE.Object3D();
    DLight.position.set(-50, 30, -30);
    DLight.target = DLightTargetObject;
    DLightTargetObject.position.set(65, 9, 50);

    DLight.castShadow = true ;
    DLight.shadow.radius = 1;

    scene.fog = new THREE.Fog(0xE7B251, 1, 175);

    scene.fog.color.setRGB(.91, .70, .32);


    scene.background = new THREE.Color(0xE7B251);

    DLight.shadow.mapSize.width = 1024 * 3;
    DLight.shadow.mapSize.height = 1024 * 3;

    DLight.shadow.camera.scale.y = 10;
    DLight.shadow.camera.scale.x = 20;
    DLight.shadow.camera.near = 0;
    DLight.shadow.camera.far = 200;

    scene.add(DLight);
    scene.add(DLightTargetObject);

    geometryFloor = new THREE.BoxGeometry(150, 0, 11);
    materialFloor = new THREE.MeshPhongMaterial({
        color: 0xE7B251,
        specular: 0x000000,
        shininess: 100
    });
    floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMesh.position.x = -57;
    floorMesh.position.y = 1;
    // imported environment variales
    Environment();

    // call player function
    player();

    // spawn enemies every (between 2.5 and 2 seconds)
    setInterval(() => enemySpawner(), Math.floor((Math.random() * 2300) + 1100));


  




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
            
            scene.remove(e);
            cactuses1.pop();
           
            e = undefined; //clear any reference for it to be able to garbage collected 
        }
    })
    // console.log(cactuses2)
    cactuses2.map((e, index) => {
        

        if(e.position.x > 25) {
          /*   console.log('cactuses 2 more')
            console.log(cactuses2.length)
            console.log(scene.children) */
            scene.remove(e);
            cactuses2.pop();
            
            e = undefined; //clear any reference for it to be able to garbage collected 
        }
    })


    stats.end();
    requestAnimationFrame(animate);

    //console.log(camera.position)
}

init();
animate();

// events
document.addEventListener('keypress', keyPressedHandler);
document.addEventListener('keyup', keyUpHandler);
