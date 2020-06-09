import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

let camera, scene, renderer, controls;
let geometry, material, mesh, light;
let canvas = document.querySelector('#gameCanvas');




const init = () => {

    
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(0,5,-10);
    scene = new THREE.Scene();

    light = new THREE.DirectionalLight(0xffe57c, 1);
    // light = new THREE.AmbientLight(0xffffff,1);
    scene.add(light);

    geometry = new THREE.BoxGeometry(11, 1, 4);
    material = new THREE.MeshPhongMaterial({
        color: 0x656565,
        specular: 0x000000,
        shininess: 100/* ,
        envMaps:refraction */
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
    });
    renderer.setClearColor(0xfff000);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create the controls
    controls = new OrbitControls(camera, canvas);
    controls.update();

}
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();