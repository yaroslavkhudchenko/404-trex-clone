


import * as THREE from '../three.module.js';
import { OrbitControls } from '../OrbitControls.js';

import { player, playerMesh, playerDefaultPosition } from './player.js';
import { enemySpawner, enemies, intervalToMove } from './enemies.js';

export let camera, scene, renderer, controls;
export let geometryFloor, materialFloor, floorMesh, light;
export let canvas = document.querySelector('#gameCanvas');

export let collissionDetected = false;

let scoreValueDisplay = document.querySelector('#scoreValue');
let scoreValue = 0;
const init = () => {
    
    document.querySelector('#bestValue').innerHTML = localStorage.getItem('score');
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);

    // set camera position(look from right side)
    camera.position.set(
        5.189239552338781,
        3.7861393344249135,
        -9.815769086484597
    );
    
    // create scene
    scene = new THREE.Scene();

    // axis helper(to see axis visully)
    let axesHelper = new THREE.AxesHelper(9);
    scene.add(axesHelper);
    
    // ambient light for scene
    let ambient = new THREE.AmbientLight(0xffffff, 1);
    // light(like sun)
    light = new THREE.DirectionalLight(0xffe57c, 1);
    scene.add(light);
    scene.add(ambient)
    // floor
    geometryFloor = new THREE.BoxGeometry(111, 0, 7);
    materialFloor = new THREE.MeshPhongMaterial({
        color: 0x656565,
        specular: 0x000000,
        shininess: 100
    });
    floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
    scene.add(floorMesh);


    // call player function
    player();

    // spawn enemies every (between 3 and .5 seconds)
    setInterval(() => enemySpawner(), Math.floor((Math.random() * 2000) + 800));


    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
    });
    renderer.setClearColor(0xfff000); // to have light background color
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create the controls(for testing)
    controls = new OrbitControls(camera, canvas);
    controls.update();


    // pointer to see where enemies eliminates
    let pointerGeo = new THREE.CubeGeometry(2, 2, 2);
    let pointerMat = new THREE.MeshBasicMaterial({ color: 0x0000f0 })
    let pointer = new THREE.Mesh(pointerGeo, pointerMat);
    pointer.position.set(25, 1, 0);
    scene.add(pointer);



}


// handle keypress/ up function to interact with the player obj
const keyPressedHandler = (e) => {
    switch (e.code) {
        case "KeyS":
            console.log('S');
            playerMesh.scale.y = .5;
            playerMesh.position.y = 1;
            break;
        case "Space":
            console.log('space');
            playerMesh.position.y = 3;
            setTimeout(() => {
                playerMesh.position.y = playerDefaultPosition.y;
            }, 200);
            break;
    }
}
const keyUpHandler = (e) => {
    if(e.code === "KeyS") {
        playerMesh.position.y = playerDefaultPosition.y;
        playerMesh.scale.y = 1;
    }
}

let eBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

// main animate function
const animate = () => {
    if (collissionDetected)return;
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    
    // update the score
    scoreValueDisplay.innerHTML = scoreValue;
    scoreValue += 1;

    // check if any of the enemies reach the destroyer pointer and if yes remove from the scene
    enemies.map((e, index) => {
        e.position.x > 25 ? 
            scene.remove(e) && enemies.pop() // remove from both scene and array s
                : false;

        let pBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        pBox.setFromObject(playerMesh);
        eBox.setFromObject(e);
        if (eBox.intersectsBox(pBox)) {
            e.scale.set(3,3,3);


            collissionDetected = true;
            
            localStorage.setItem('score', scoreValue);


            console.log('shit is happening!!!!!!!!!!!!!!!!!')
            for (var i = 1; i < 222; i++)
                window.clearInterval(i);

        }
    });

   
   
}

init();
animate();

// events
document.addEventListener('keypress', keyPressedHandler);
document.addEventListener('keyup', keyUpHandler);
