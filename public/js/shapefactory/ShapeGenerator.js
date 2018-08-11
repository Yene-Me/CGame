import * as THREE from 'three';
import SizeFinder from '../util/SizeFinder';
import Lights from '../util/Light';
import CubeLocation from '../util/CubeLocation';
import * as TWEEN from 'tween.js';
import PubSub from '../core/PubSub';
import Const from '../core/Const';
import Colours from "../util/Colours";
import Counter from "../core/counter";
import Cube from "./Cube";

export default class ShapeGenerator {
    constructor(uiElement) {
        this.TOTAL_CUBE_ITEMS = 27;
        this._shapeHolder = uiElement;
        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.raycaster = new THREE.Raycaster();

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
        this.mainCubeY = window.innerHeight*0.50;
        this._cubeCollection = [];
        this.radius = Math.min(50 * window.innerWidth / 100, 400);
        this.lights = [];

        this.cube = new Cube();
        this.groupCubes = new THREE.Group();

        PubSub.subscribe(Const.RELOAD, () => {
            console.log("reload Game");
            this.counter.startCounter();
        });

    }

    init(level) {
        this.TOTAL_CUBE_ITEMS = 27;
        this.mouse = null;
        this.removeAllObject();
        this._cubeLocation = new CubeLocation(this.TOTAL_CUBE_ITEMS, 200).createSimpleStackPoints();

        this.createColourSet();
        this.createRandomNumber();
        this.addLight();
        //this.initLights();
        this.mouse = new THREE.Vector2();
        this.mouse.x = -1000;
        this.mouse.y = -1000;
    }

    removeAllObject()
    {
      while(this.scene.children.length > 0){
            this.scene.remove(this.scene.children[0]);
          }
    }

    createColourSet() {
        for (let index = 0; index < this.TOTAL_CUBE_ITEMS; index++) {
            this.boxColour.push(Colours.SET_OF_COLOURS)
        }
    }

    createRandomNumber() {
        let numberList = [];
        for (let index = 0; index < this.TOTAL_CUBE_ITEMS; index++) {
            numberList.push(index)
        }
        for (let a = numberList, i = a.length; i--;) {
            let random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            this.randomColour.push(random);
        }
    }


    loadCube(cubeType) {

        if(cubeType === 1) {
            this.cube.createColourStackCube(this);
        }

        if(this.counter)
        {
          this.counter.startCounter();
        }
         else
        {
            this.counter = new Counter();
            this.counter.startCounter();
        }
    }

    reloadCube() {
        this.main.position.set(0, this.mainCubeY, 0);

        for (let index = 0; index < this._cubeLocation.length; index++) {
            let item = this._cubeLocation[index];
            this._cubeCollection[index].cube.position.set(item.x, -200, item.z);
        }
    }

    addLight() {
        this.scene.add(Lights.ADD_LIGHTS[0]);
        this.scene.add(Lights.ADD_LIGHTS[1]);
        this.scene.add(Lights.ADD_LIGHTS[2]);
        this.scene.add(Lights.ADD_LIGHTS[3]);



        this.scene.add( Lights.SPOT_LIGHTS[0]);
        this.scene.add( Lights.SPOT_LIGHTS[1]);
        this.scene.add( Lights.SPOT_LIGHTS[2]);
        this.scene.add( Lights.SPOT_LIGHTS[3]);

        //let lightHelper = new THREE.SpotLightHelper( Lights.SPOT_LIGHTS[3] );
        //var helper = new THREE.DirectionalLightHelper( Lights.ADD_LIGHTS[3], 5 );
        //this.scene.add( lightHelper );
    }

    initLights() {
        let distance = 20;
        let c = new THREE.Vector3();
        let geometry = new THREE.SphereBufferGeometry( 1, 1, 1 );

        for ( let i = 0; i < 40 ; i ++ ) {
            console.log(i);
            let light = new THREE.PointLight( 0xffffff, 2.0, distance );
            c.set( Math.random(), Math.random(), Math.random() ).normalize();
            light.color.setRGB( c.x, c.y, c.z );
            this.scene.add( light );
            this.lights.push( light );
            let material = new THREE.MeshBasicMaterial( { color: light.color } );
            let emitter = new THREE.Mesh( geometry, material );
            light.add( emitter );
        }

        let directionalLight = new THREE.DirectionalLight( 0x101010 );
        directionalLight.position.set( -1, 1, 1 ).normalize();
        this.scene.add( directionalLight );

        //let spotLight = new THREE.SpotLight( 0x404040 );
        //spotLight.position.set( 0, 50, 0 );
        //this.scene.add( spotLight );
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

            if (this.isCheckInProgress) {
                return;
            }

            if (!intersects[i].object._isMainCube) {
                this.moveToPoint(intersects[i].object);
            }
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
        let AlignTween = new TWEEN.Tween({
            x: main.rotation.x,
            y: main.rotation.y,
            z: main.rotation.z
        })
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

        let playerSelection = selectedObject["_faceColour"];
        let mainObject = this.main["_faceColour"];


        this.findMatch(mainObject, playerSelection);

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

    findMatch(mainObject, playerObject) {
        let counter = 0;
        let point = 0;
        let id = setInterval(() => {
            if (counter >= 5) {
                clearInterval(id);
                PubSub.publish(Const.RESULT, point);
            }
            let index = counter++
            if (playerObject[index] == mainObject[index]) {
                point += 1;
            }
        }, 500)
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate()
        });

        this.moveStackCubes();

        this.update();
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }

    moveStackCubes() {
        if (this.isCompareOn) {
            return;
        }

        this.cube.main.rotation.y -= 0.01;
        this.cube.main.rotation.x -= 0.02;
        this.cube.main.rotation.z -= 0.02;

        //this.groupCubes.rotation.y -= 0.01;
        //this.groupCubes.rotation.x -= 0.02;
        //this.groupCubes.rotation.z -= 0.02;
        this.groupCubes.position.x = -200;
        this.groupCubes.position.y = -200;

        for (let item of this._cubeCollection) {

            for(let child of item.children){
                child.rotation.y += 0.01;
            }

        }
    }

    moveInLine () {
        if (this.isCompareOn) {
            return;
        }

        this.main.rotation.y -= 0.01;
        this.main.rotation.x -= 0.02;
        this.main.rotation.z -= 0.02;

        for (let item of this._cubeCollection) {
            item.cube.rotation.y += item.rotation.y;
            item.cube.rotation.x -= item.rotation.x;
            item.cube.rotation.z += item.rotation.z;

            if(!this.canMoveDown) {
                item.cube.position.y +=1;
                if(item.cube.position.y > 200) {
                    this.canMoveDown = true;
                }

            }else {
                item.cube.position.y-=1;
                if(item.cube.position.y < -200) {
                    this.canMoveDown = false;
                }
            }
        }
    }

    moveAroundInCircle () {
        if (this.isCompareOn) {return;}

        this.main.rotation.y -= 0.01;
        this.main.rotation.x -= 0.02;
        this.main.rotation.z -= 0.02;


        for (let item of this._cubeCollection) {
            item.cube.rotation.y += item.rotation.y;
            item.cube.rotation.x -= item.rotation.x;
            item.cube.rotation.z += item.rotation.z;

            item.cube.position.z = Math.cos(item.angle) * this.radius ;
            item.cube.position.x = Math.sin(item.angle) * this.radius ;
            item.cube.position.y = Math.cos(item.angle) *-150 ;
            item.angle += 0.01;
        }

    }
}
