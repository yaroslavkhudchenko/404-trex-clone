import * as THREE from './libs/three.module.js';
import { camera } from './app.js';
export const backMusic = () => {
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('./audio/back.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    })
}

export const jumpMusic = () => {


}