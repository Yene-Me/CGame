import * as THREE from 'three';
import SizeFinder from '../util/SizeFinder';
import Lights from '../util/Light';
import CubeLocation from '../util/CubeLocation';
import * as TWEEN from 'tween.js';

import Colours from "../util/Colours";
import Counter from "../core/counter";

export default class ShapeGenerator {
    constructor(uiElement) {
        this.TOTAL_CUBE_ITEMS = 10;
        this._shapeHolder = uiElement;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.size = SizeFinder.CUBE_SIZE;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.isCheckInProgress = false;
        this.randomColour = [];
        this.boxColour = [];

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);

        this.renderer.autoClear = false;
        this.renderer.setClearColor(0x000000, 0.0);

        this._shapeHolder.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;
        this.createColourSet();
        this.createRandomNumber();
        this.addLight();
        this._cubeLocation = new CubeLocation(this.TOTAL_CUBE_ITEMS, 200);

        this._cubeCollection = [];

        this.counter = new Counter();

        this.counter.startCounter();

        this.radius = Math.min(50*window.innerWidth/100,400);
    }

    createColourSet() {
        for (let index = 0; index < 10; index++) {
            this.boxColour.push(Colours.SET_OF_COLOURS)
        }
    }

    createRandomNumber() {

        let numberList = [];
        for(let index = 0; index < this.TOTAL_CUBE_ITEMS ; index ++)
        {
          numberList.push(index)
        }
        for (var a = numberList, i = a.length; i--;) {
            var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            this.randomColour.push(random);
        }

    }

    loadCube() {
        this.main = this.createBoxItem(0, 400, 0, this.boxColour[0]);
        var index = 0
        for (let item of this._cubeLocation) {
            let cubeData = {
                cube: this.createBoxItem(item.x, -200, item.z, this.boxColour[this.randomColour[index]]),
                angle: item.angel,
                rotation: {
                    x: Math.random() / 50,
                    y: Math.random() / 50,
                    z: Math.random() / 50
                }
            }
            index++;
            this._cubeCollection.push(cubeData);
        }
    }

    reloadCube() {
        this.main.position.set(0, 400, 0);

        for (let index = 0; index < this._cubeLocation.length; index++) {
            let item = this._cubeLocation[index];
            this._cubeCollection[index].cube.position.set(item.x, -200, item.z);
        }

        this.counter.startCounter();
    }

    addLight() {
        this.scene.add(Lights.ADD_LIGHTS[0]);
        this.scene.add(Lights.ADD_LIGHTS[1]);
        this.scene.add(Lights.ADD_LIGHTS[2]);
        this.scene.add(Lights.ADD_LIGHTS[3]);
    }

    createBoxItem(x, y, z, colour) {
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
        this.scene.add(mesh);
        return mesh;
    }

    onMouseMove(event) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    }

    update() {
        if (this.isCheckInProgress) {
            return;
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.scene.children);

        for (var i = 0; i < intersects.length; i++) {
            this.moveToPoint(intersects[i].object);
        }

    }

    moveToPoint(object) {
        let item = object;
        this.isCheckInProgress = true;

        let itemx = item["position"].x;
        let itemy = item["position"].y;

        this.counter.stopCounter();

        let tween = new TWEEN.Tween({
            x: itemx,
            y: itemy,
            scale: 1,
            rx: item.rotation.x,
            ry: item.rotation.y,
            rz: item.rotation.z
        })
            .to({x: 0, y: 100, scale: 2, rx: 0, ry: 0, rz: 0}, 2000)
            .easing(TWEEN.Easing.Back.Out)

            .onUpdate(function () {
                item["position"].x = this.x;
                item["position"].y = this.y;
                item["rotation"].x = this.rx;
                item["rotation"].y = this.ry;
                item["rotation"].z = this.rz;
            }).start().onComplete(() => {
                this.checkPickedWithMain(item);
            });


        let main = this.main;
        let AlignTween = new TWEEN.Tween({x: main.rotation.x, y: main.rotation.y, z: main.rotation.z})
            .to({x: 0, y: 0, z: 0}, 2000)
            .easing(TWEEN.Easing.Quartic.InOut)

            .onUpdate(function () {
                main["rotation"].x = this.x;
                main["rotation"].y = this.y;
                main["rotation"].z = this.z;
            }).start();


        this.camera.z = 100;


    }

    checkPickedWithMain(selectedObject) {

        selectedObject.rotation.y = 0;
        selectedObject.rotation.x = -0.02;
        selectedObject.rotation.z = 0;

        this.main.rotation.x = 0;
        this.main.rotation.y = 0;
        this.main.rotation.z = 0;
        this.isCompareOn = true;

        let main = this.main;


        let tween = new TWEEN.Tween({x: 0, y: 0, z: 0})
            .to({x: 0.08, y: 0.05, z: 1}, 500)
            .easing(TWEEN.Easing.Elastic.InOut)
            .repeat(5)
            .onUpdate(function () {
                selectedObject.rotation.x += this.x;
                main.rotation.x += this.x;

            }).start().onComplete(() => {
                //this.mouse = null;
                this.mouse.x = 0;
                this.mouse.y = 0;
                this.reloadCube();
                this.isCheckInProgress = false;
                this.isCompareOn = false;
            });

        this.counter.add();
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate()
        });

        if (!this.isCompareOn) {
            this.main.rotation.y -= 0.01;
            this.main.rotation.x -= 0.02;
            this.main.rotation.z -= 0.02;

            for (let item of this._cubeCollection) {
                item.cube.rotation.y += item.rotation.y;
                item.cube.rotation.x -= item.rotation.x;
                item.cube.rotation.z += item.rotation.z;

                item.cube.position.z = Math.cos(item.angle) * this.radius;
                item.cube.position.x = Math.sin(item.angle) * this.radius;

                item.angle += 0.01;
            }

        }

        this.update();
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);

    }
}
