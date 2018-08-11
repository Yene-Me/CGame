import * as THREE from "three";
import ParticlesGenerator from "../particle/ParticlesGenerator";
import SizeFinder from "../util/SizeFinder";

export default class Cube {

    constructor(){
        this.main = null;
        this.size = SizeFinder.CUBE_SIZE;
    }

    createBoxItem(x, y, z, colour, isMainCube) {
        let geometry = new THREE.BoxGeometry(this.size, this.size, this.size);

        let material = [
            new THREE.MeshStandardMaterial({color: colour[0], metalness: 0.1}),
            new THREE.MeshStandardMaterial({color: colour[1], metalness: 0.1}),
            new THREE.MeshStandardMaterial({color: colour[2], metalness: 0.1}),
            new THREE.MeshStandardMaterial({color: colour[3], metalness: 0.1}),
            new THREE.MeshStandardMaterial({color: colour[4], metalness: 0.1}),
            new THREE.MeshStandardMaterial({color: colour[5], metalness: 0.1})
        ];

        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = y;
        mesh.position.x = x;
        mesh.position.z = z;
        mesh._faceColour = colour;
        mesh._isMainCube = isMainCube;
        this.scene.add(mesh);
        return mesh;
    }

    createBoxItemTexture(x, y, z, colour, isMainCube,context) {
        let geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        let texture1 = new THREE.TextureLoader().load( "public/asset/image/pattern-1.gif" );
        //let texture2 = new THREE.TextureLoader().load( "public/asset/image/pattern-2.png" );
        //let texture3 = new THREE.TextureLoader().load( "public/asset/image/pattern-3.gif" );
        //let texture4 = new THREE.TextureLoader().load( "public/asset/image/pattern-3.jpeg" );
        //let texture5 = new THREE.TextureLoader().load( "public/asset/image/pattern-5.png" );
        //let texture6 = new THREE.TextureLoader().load( "public/asset/image/pattern-1.gif" );


        let material = [
            new THREE.MeshLambertMaterial({color: colour[0], metalness: 2,map:texture1}),
            new THREE.MeshLambertMaterial({color: colour[1], metalness: 2,map:texture1}),
            new THREE.MeshLambertMaterial({color: colour[2], metalness: 2,map:texture1}),
            new THREE.MeshLambertMaterial({color: colour[3], metalness: 2,map:texture1}),
            new THREE.MeshLambertMaterial({color: colour[4], metalness: 2,map:texture1}),
            new THREE.MeshLambertMaterial({color: colour[5], metalness: 2,map:texture1})
        ];

        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = y;
        mesh.position.x = x;
        mesh.position.z = z;
        mesh._faceColour = colour;
        mesh._isMainCube = isMainCube;
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        context.scene.add(mesh);
        return mesh;
    }


    createBoxStackTexture(x, y, z, colour, isMainCube,context) {
        let geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        let texture1 = new THREE.TextureLoader().load( "public/asset/image/pattern-1.gif" );
        let texture2 = new THREE.TextureLoader().load( "public/asset/image/pattern-2.png" );
        let texture3 = new THREE.TextureLoader().load( "public/asset/image/dirty.jpg" );
        //let texture4 = new THREE.TextureLoader().load( "public/asset/image/pattern-3.jpeg" );
        //let texture5 = new THREE.TextureLoader().load( "public/asset/image/pattern-5.png" );
        //let texture6 = new THREE.TextureLoader().load( "public/asset/image/pattern-1.gif" );


        let material = [
            new THREE.MeshLambertMaterial({color: colour[0], metalness: 2,map:texture3}),
            new THREE.MeshLambertMaterial({color: colour[1], metalness: 2,map:texture3}),
            new THREE.MeshLambertMaterial({color: colour[2], metalness: 2,map:texture3}),
            new THREE.MeshLambertMaterial({color: colour[3], metalness: 2,map:texture3}),
            new THREE.MeshLambertMaterial({color: colour[4], metalness: 2,map:texture3}),
            new THREE.MeshLambertMaterial({color: colour[5], metalness: 2,map:texture3})
        ];

        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = y;
        mesh.position.x = x;
        mesh.position.z = z;
        mesh._faceColour = colour;
        mesh._isMainCube = isMainCube;
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        context.groupCubes.add(mesh);

        return context.groupCubes;
    }

    createColourStackCube (context) {
        this.main = this.createBoxItemTexture(0, context.mainCubeY, 0, context.boxColour[0], true,context);
        let index = 0;

        for (let item of context._cubeLocation) {
            this.createBoxStackTexture(item.x, item.y, item.z, context.boxColour[context.randomColour[index]], false, context),
                index++;

        }
        context._cubeCollection.push(context.groupCubes);
        context.scene.add(context.groupCubes);
        console.log("this._cubeLocation 1: ",context._cubeCollection);
        console.log("this._cubeLocation 2: ",context._cubeLocation);
    }

    createColourBaseCube (context) {
        this.main = this.createBoxItemTexture(0, context.mainCubeY, 0, context.boxColour[0], true,context);
        let index = 0;
        for (let item of mainContext._cubeLocation) {
            let cubeData = {
                cube: this.createBoxItemTexture(item.x, -200, item.z, context.boxColour[context.randomColour[index]], false,context),
                angle: item.angel,
                //particles: this.createParticle(item.x,-200,item.z),
                rotation: {
                    x: Math.random() / 50,
                    y: Math.random() / 50,
                    z: Math.random() / 50
                }
            };
            index++;
            context._cubeCollection.push(cubeData);
        }
    }

    createParticle(x,y,z) {
        this.particles = new ParticlesGenerator(100);
        return this.particles;

    }
}