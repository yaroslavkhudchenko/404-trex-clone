import * as THREE from './libs/three.module.js';
import { camera } from './app.js';

export let backMusicController = null;

export const backMusic = () => {
    // create an AudioListener and add it to the camera
    let listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    backMusicController = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    let audioLoader = new THREE.AudioLoader();
    audioLoader.load('./audio/back.mp3', function (buffer) {
        backMusicController.setBuffer(buffer);
        backMusicController.setLoop(true);
        backMusicController.setVolume(0.5);
        backMusicController.play();
    })
}

export const jumpMusic = () => {
    // create an AudioListener and add it to the camera
    let listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    let sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    let audioLoader = new THREE.AudioLoader();
    audioLoader.load('./audio/back.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    })

}