


import * as THREE from '../three.module.js';
import { OrbitControls } from '../OrbitControls.js';

import { player, playerMesh, playerDefaultPosition } from './player.js';
import { enemySpawner, enemies } from './enemies.js';

export let camera, scene, renderer, controls;
export let geometryFloor, materialFloor, floorMesh, light;
export let canvas = document.querySelector('#gameCanvas');


const init = () => {
    
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
    setInterval(() => enemySpawner(), Math.floor((Math.random() * 700) + 500));


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

   
// main animate function
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    // check if any of the enemies reach the destroyer pointer and if yes remove from the scene
    enemies.map((e, index) => {
        e.position.x > 25 ? 
            scene.remove(e)
                : false;
                
    });

}

init();
animate();

// events
document.addEventListener('keypress', keyPressedHandler);
document.addEventListener('keyup', keyUpHandler);
