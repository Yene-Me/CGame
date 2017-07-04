import * as THREE from 'three';

export default class Light {

    static get ADD_LIGHTS() {
        let lights = [];
        lights.push(new THREE.AmbientLight(0xFFFFFF, .5)); // soft white light

        lights[1] = new THREE.DirectionalLight(0xffffff, .5);
        lights[1].position.set(0, 10, 0);
        lights[1].castShadow = true;

        lights[2] = new THREE.DirectionalLight(0xffffff, .5);
        lights[2].position.set(10, 0, 0);
        lights[2].castShadow = true;

        lights[3] = new THREE.DirectionalLight(0xffffff, .5);
        lights[3].position.set(0, 0, 10);
        lights[3].castShadow = true;

        return lights;
    }
}
