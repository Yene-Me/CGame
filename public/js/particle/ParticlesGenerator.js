import * as THREE from 'three';

export default class ParticleGenerator {

    constructor(size) {

        this.geometry = new THREE.Geometry();
        this.size= size;
    }

    create(x,y,z) {

        for(var index= 0; index < this.size; index++) {

            const x = (Math.random() * x) - x;
            const y = (Math.random() * y) - y;
            const z = (Math.random() * z) - z;

            this.geometry.vertices.push(new THREE.Vector3(x, y, z));

        }

        let material = new THREE.PointCloudMaterial({
            color: 0xFF0000,
            size:10
        });

        return new THREE.PointCloud(this.geometry, material);
    }

    getParticles() {
        return this.geometry;
    }
}