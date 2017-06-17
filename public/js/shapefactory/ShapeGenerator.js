import * as THREE from 'three';
import SizeFinder from '../util/SizeFinder';
import Lights from '../util/Lights';
import CubeLocation from '../util/CubeLocation';
import * as TWEEN from 'tween.js';
import Timer  from 'time-counter';

export default class ShapeGenerator
{
  constructor(uiElement)
  {
      this.TOTAL_CUBE_ITEMS = 5;
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

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);

      this.renderer.autoClear = false;
      this.renderer.setClearColor(0x000000, 0.0);

      this._shapeHolder.appendChild( this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      this.camera.position.z = 1000;
      this.createColourSet();
      this.createRandomNumber();
      this.addLight();
      this._cubeLocation = new CubeLocation(this.TOTAL_CUBE_ITEMS,250);
      this._cubeCollection = [];


      this.createTimer()



  }

  createTimer()
  {
    this.counter = document.createElement("DIV");
    this.counter.classList.add("counter");
    document.body.appendChild(this.counter);

    // creating a countdown timer
    this.countDown = new Timer({
        direction: 'up',
        startValue: '0:00' // one minute
    });

    this.countDown.on('change', (data)=>{
      this.counter.textContent = data;
    });

    this.countDown.on('end', function () {

    });
    this.countDown.start();
  }

  createColourSet()
  {
    for(let index = 0; index < 10 ; index++)
    {
      this.boxColour.push (Lights.SET_OF_COLOURS)
    }

  }


  createRandomNumber()
  {
    for (var a = [0,1,2,3,4,5,6,7], i = a.length; i-- ;) {
      var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
      this.randomColour.push(random);
    }

  }

  loadCube()
  {
    this.main = this.createBoxItem(0,400,0,this.boxColour[0]);

    var index = 0
    for(let item of this._cubeLocation)
    {
      let cubeData = {
        cube:this.createBoxItem(item.x,-200,item.z,this.boxColour[this.randomColour[index]]),
        angle:item.angel,
        rotation : {
          x: Math.random()/50,
          y: Math.random()/50,
          z: Math.random()/50
      }
    }
      index++;
      this._cubeCollection.push(cubeData);
    }
  }

  reloadCube()
  {
    this.main.position.set(0,400,0);

    this.countDown.stop();

    this.countDown = null;

    this.countDown = new Timer({
        direction: 'up',
        startValue: '0:00' // one minute
    });

    this.countDown.on('change', (data)=>{
      this.counter.textContent = data;
    });

    this.countDown.start();

    for(let index = 0 ; index < this._cubeLocation.length ; index++)
    {
      let item = this._cubeLocation[index];
      this._cubeCollection[index].cube.position.set(item.x,-200,item.z);
    }
  }

  addLight()
  {
    this.scene.add(Lights.ADD_LIGHTS[0]);
    this.scene.add(Lights.ADD_LIGHTS[1]);
    this.scene.add(Lights.ADD_LIGHTS[2]);
  }

  createBoxItem(x,y,z,colour)
  {
     let geometry = new THREE.BoxGeometry( this.size, this.size, this.size );

     let material = [new THREE.MeshLambertMaterial( { color: colour[0], wireframe: false } ),
     new THREE.MeshLambertMaterial( { color:  colour[1], wireframe: false } ),
        new THREE.MeshLambertMaterial( { color: colour[2], wireframe: false } ),
        new THREE.MeshLambertMaterial( { color: colour[3], wireframe: false } ),
        new THREE.MeshLambertMaterial( { color: colour[4], wireframe: false } ),
        new THREE.MeshLambertMaterial( { color: colour[5], wireframe: false } )
        ];

     let mesh = new THREE.Mesh( geometry, material );

     mesh.position.y = y;
     mesh.position.x = x;
     mesh.position.z = z;
     this.scene.add(mesh);
     return mesh;
  }

  onMouseMove( event )
  {
  	 this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	 this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  update()
  {
    if(this.isCheckInProgress)
    {
      return;
    }

  	this.raycaster.setFromCamera( this.mouse, this.camera );

  	// calculate objects intersecting the picking ray
  	var intersects = this.raycaster.intersectObjects( this.scene.children );

  	for ( var i = 0; i < intersects.length; i++ )
    {
  		//intersects[ i ].object.material[0].color.set( 0x000000 );
      this.moveToPoint(intersects[ i ].object);
  	}

}

moveToPoint(object)
{
  let item = object;
  this.isCheckInProgress = true;

  this.countDown.stop();


  let itemx = item["position"].x;
  let itemy = item["position"].y;

  let tween = new TWEEN.Tween( { x: itemx, y: itemy , scale: 1 } )
      .to( { x: 0 , y:100, scale:0.8 }, 2000 )
      .easing( TWEEN.Easing.Elastic.InOut )

      .onUpdate( function () {
          item["position"].x = this.x;
          item["position"].y = this.y;
      } ).start().onComplete(()=>{
            this.checkPickedWithMain(item);
      });
}

checkPickedWithMain(selectedObject)
{

  selectedObject.rotation.y = 0;
  selectedObject.rotation.x = 0;
  selectedObject.rotation.z = 0;

  this.main.rotation.x = 0;
  this.main.rotation.y = 0;
  this.main.rotation.z = 0;
  this.isCompareOn = true;

  let main = this.main;


  let tween = new TWEEN.Tween( { x: 0, y: 0 , z: 0 } )
      .to( { x:0.08 , y:0.05, z:1 }, 500 )
      .easing( TWEEN.Easing.Elastic.InOut )
      .repeat(5)
      .onUpdate( function () {
        selectedObject.rotation.x += this.x;
        main.rotation.x += this.x;

      } ).start().onComplete(()=>{
          //this.mouse = null;
          this.mouse.x = 0;
          this.mouse.y = 0;
          this.reloadCube();
          this.isCheckInProgress = false;
          this.isCompareOn = false;
      });
}

animate()
 {
  requestAnimationFrame( ()=>{
    this.animate()
  } );

    if(!this.isCompareOn)
    {
    this.main.rotation.y -=0.01;
    this.main.rotation.x -=0.02;
    this.main.rotation.z -=0.02;

    //this.firstItem.rotation.y -=0.01;
    //this.firstItem.rotation.x -=0.02;
    //this.firstItem.rotation.z -=0.02;

    //this.secondItem.rotation.y -=0.02;
    //this.secondItem.rotation.x +=0.01;
    //this.secondItem.rotation.z +=0.01;


    //this.thirdItem.rotation.y +=0.01;
    //this.thirdItem.rotation.x -=0.02;
    //this.thirdItem.rotation.z +=0.01;

    for(let item of this._cubeCollection)
    {
      item.cube.rotation.y +=item.rotation.x;
      item.cube.rotation.x -=item.rotation.y;
      item.cube.rotation.z +=item.rotation.z;

      item.cube.position.z = Math.cos(item.angle)*300;
      item.cube.position.x = Math.sin(item.angle)*300;

      item.angle+=0.02;
    }

  }

    this.update();
    TWEEN.update();
    this.renderer.render( this.scene, this.camera );

  }
}
