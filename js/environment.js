import * as THREE from '../three.module.js';
import { scene } from './app.js';

const farFloors = [
    
]

export const Environment = () => {

    // floor
    geometryFloor = new THREE.BoxGeometry(250, 0, 11);
    materialFloor = new THREE.MeshPhongMaterial({
        color: 0x656565,
        specular: 0x000000,
        shininess: 100
    });
    floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
    scene.add(floorMesh);
    


}