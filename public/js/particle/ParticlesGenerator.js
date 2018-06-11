import * as THREE from 'three';

export default class ParticleGenerator {

    constructor(size) {

        this.geometry = new THREE.Geometry();
        this.size= size;
    }

    create() {

        for(var index= 0; index < this.size; index++) {

            const x = (Math.random() * 800) - 400;
            const y = (Math.random() * 800) - 400;
            const z = (Math.random() * 800) - 400;

            this.geometry.vertices.push(new THREE.Vector3(x, y, z));

        }

        let material = new THREE.PointCloudMaterial({
            color: 0xFF0000
        });

        return new THREE.PointCloud(this.geometry, material);
    }

    getParticles() {
        return this.geometry;
    }
}