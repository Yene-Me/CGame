import * as THREE from 'three';

export default class Light {

    static get ADD_LIGHTS() {
        let lights = [];
        lights[0] = new THREE.DirectionalLight(0xffffff, 1);
        lights[0].position.set(0, 1, 0);
        lights[0].castShadow = true;

        lights[1] = new THREE.DirectionalLight(0xffffff, 1);
        lights[1].position.set(1, 0, 0);
        lights[1].castShadow = true;

        lights[2] = new THREE.DirectionalLight(0xffffff, 1);
        lights[2].position.set(0, 0, 1);
        lights[2].castShadow = true;

        return lights;
    }

    static get COLOURS() {

        let colourBank = [];

        for (let index = 0; index < 3; index++) {
            let colourSet = [];

            for (let j = 0; j < 6; j++) {
                colourSet.push("#" + Math.floor(Math.random() * 16777215).toString(16))
            }

            colourBank.push(colourSet);
        }
        return colourBank;
    }

    static get SET_OF_COLOURS() {

        let colourBank = [];
        let colourSet = [];

        for (let j = 0; j < 6; j++) {
            colourBank.push("#" + Math.floor(Math.random() * 16777215).toString(16))
        }

        for (let j = 0; j < 6; j++) {
            colourSet.push(colourBank[j % 3]);
        }
        return colourSet;
    }

}
