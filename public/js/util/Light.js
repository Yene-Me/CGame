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
        lights[3].position.set(0, -600, -500);
        lights[3].castShadow = true;

        return lights;
    }

    static get SPOT_LIGHTS() {
        let lights= [];

        let spotLight = new THREE.SpotLight( 0xffffff, 2 );
        spotLight.position.set( 0, 700, 0 );
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 1;
        spotLight.decay = 2;
        spotLight.distance = 800;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 0;
        spotLight.shadow.camera.far = 0;

        let spotLight2 = new THREE.SpotLight( 0xffffff, 2 );
        spotLight2.position.set( window.innerWidth, 0, 100 );
        spotLight2.angle = Math.PI / 4;
        spotLight2.penumbra = 1;
        spotLight2.decay = 2;
        spotLight2.distance = 0;
        spotLight2.castShadow = true;
        spotLight2.shadow.mapSize.width = 0;
        spotLight2.shadow.mapSize.height = 0;
        spotLight2.shadow.camera.near = 0;
        spotLight2.shadow.camera.far = 0;

        let spotLight3 = new THREE.SpotLight( 0xffffff, 2 );
        spotLight3.position.set( window.innerWidth*-1, 0, 100 );
        spotLight3.angle = Math.PI / 4;
        spotLight3.penumbra = 1;
        spotLight3.decay = 2;
        spotLight3.distance = 0;
        spotLight3.castShadow = true;
        spotLight3.shadow.mapSize.width = 0;
        spotLight3.shadow.mapSize.height = 0;
        spotLight3.shadow.camera.near = 0;
        spotLight3.shadow.camera.far = 0;

        let spotLight4= new THREE.SpotLight( 0xffffff, 2 );
        spotLight4.position.set( 0, window.innerHeight, 0 );
        spotLight4.angle = Math.PI/1.5;
        spotLight4.penumbra = 1;
        spotLight4.decay = 2;
        spotLight4.distance = 500;
        spotLight4.castShadow = true;
        spotLight4.shadow.mapSize.width = 0;
        spotLight4.shadow.mapSize.height = 0;
        spotLight4.shadow.camera.near = 0;
        spotLight4.shadow.camera.far = 1000;

        lights.push(spotLight);
        lights.push(spotLight2);
        lights.push(spotLight3);
        lights.push(spotLight4);

        return lights;

    }
}
