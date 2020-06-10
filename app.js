import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

let camera, scene, renderer, controls;
let geometryFloor, materialFloor, floorMesh, light;
let canvas = document.querySelector('#gameCanvas');

let playerMesh, playerGeo, playerMat;



const init = () => {

    
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    //camera.position.set(5.962310066149917, 5.396010288886008, -9.42343565435011);
/* camera.position.z = -3;
camera.position.y = 2; */
    camera.position.set(
        5.189239552338781,
        3.7861393344249135,
        -9.815769086484597
    );
    scene = new THREE.Scene();


    // axis helper
    let axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    light = new THREE.DirectionalLight(0xffe57c, 1);
    // light = new THREE.AmbientLight(0xffffff,1);
    scene.add(light);

    // floor
    geometryFloor = new THREE.BoxGeometry(111, 0, 7);
    materialFloor = new THREE.MeshPhongMaterial({
        color: 0x656565,
        specular: 0x000000,
        shininess: 100/* ,
        envMaps:refraction */
    });
    floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
    scene.add(floorMesh);

    // player
    playerGeo = new THREE.CubeGeometry(1,1,1);
    playerMat = new THREE.MeshBasicMaterial({color:0x000000})
    playerMesh = new THREE.Mesh(playerGeo,playerMat);
    playerMesh.position.set(2,1,0);
    scene.add(playerMesh);

    setInterval(() => enemySpawner(), Math.floor((Math.random() * 3000) + 500));


    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
    });
    renderer.setClearColor(0xfff000);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create the controls
    controls = new OrbitControls(camera, canvas);
    controls.update();


    let pointerGeo = new THREE.CubeGeometry(2, 2, 2);
    let pointerMat = new THREE.MeshBasicMaterial({ color: 0x0000f0 })
    let pointer = new THREE.Mesh(pointerGeo, pointerMat);
    pointer.position.set(15, 1, 0);
    scene.add(pointer);



}

const enemySpawner = () => {
    console.log('enemyspawner')
    let enemyG = new THREE.CubeGeometry(1, 1, 1);
    let enemyMat = new THREE.MeshBasicMaterial({ color: 0x00f000 })
    let enemy = new THREE.Mesh(enemyG, enemyMat);
    enemy.position.set(Math.floor((Math.random() * -20) + -15), Math.floor((Math.random() * 2) + 1), 0);
    scene.add(enemy);
    
}


   

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    // console.log(camera.position);
}

init();
animate();