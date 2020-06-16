import * as THREE from '../three.module.js';
import { scene } from './app.js';

const farFloors = [
    {
        size: (250, 0, 11),
        position:{
            x:0,
            y:0,
            z:50
        },
        color: 0x00ffff
    },
    {
        size: (250, 0, 11),
        position:{
            x:0,
            y:0,
            z:25
        },
        color: 0xffffff
    }
]

export const Environment = () => {

    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(250, 0, 22);
        let materialFloor = new THREE.MeshPhongMaterial({
            color: farFloors[i].color,
            specular: 0x000000,
            shininess: 100
        });
        let floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
        scene.add(floorMesh);
        floorMesh.position.set(
            farFloors[i].position.x,
            farFloors[i].position.y,
            farFloors[i].position.z
        );
        console.log(floorMesh.position)
    }

    
    


}