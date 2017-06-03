import * as THREE from 'three'

export default class ShapeGenerator
{
  constructor(uiElement)
  {
            this._shapeHolder = uiElement;
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.geometry = null;
            this.material = null;
            this.mesh = null;

  }

  init() {
       console.log(THREE)
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      this.camera.position.z = 1000;

      this.geometry = new THREE.BoxGeometry( 200, 200, 200 );

      this.material = [new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } ),
      new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } ),
      new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: false } ),
      new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: false } ),
      new THREE.MeshBasicMaterial( { color: 0x333333, wireframe: false } ),
      new THREE.MeshBasicMaterial( { color: 0x454545, wireframe: false } ),
      ];

      this.mesh = new THREE.Mesh( this.geometry, this.material );

      this.mesh.position.y = 200;
      this.scene.add( this.mesh );

      this.firstItem = this.selectionItem(-400,0x0004ff)
      this.secondItem = this.selectionItem(0,0xff03ff)
      this.thirdItem = this.selectionItem(400,0x04ff33)

      this.scene.add(this.firstItem);
      this.scene.add(this.secondItem);
       this.scene.add(this.thirdItem);



      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( window.innerWidth, window.innerHeight );

     this._shapeHolder.appendChild( this.renderer.domElement );

  }

  selectionItem(x,colour)
  {
     let geometry = new THREE.BoxGeometry( 200, 200, 200 );

     let material = [new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } ),
        new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: false } ),
        new THREE.MeshBasicMaterial( { color: colour, wireframe: false } ),
        new THREE.MeshBasicMaterial( { color: 0x333333, wireframe: false } ),
        new THREE.MeshBasicMaterial( { color: 0x454545, wireframe: false } ),
        ];

     let mesh = new THREE.Mesh( geometry, material );

     mesh.position.y = -200;
     mesh.position.x = x;

     return mesh;
  }
  animate() {

        requestAnimationFrame( ()=>{
        this.animate()
        } );

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;

        this.firstItem.rotation.y -=0.01;
        this.firstItem.rotation.x -=0.02;

         this.secondItem.rotation.y -=0.02;
         this.secondItem.rotation.x +=0.01;

         this.thirdItem.rotation.y +=0.01;
         this.thirdItem.rotation.x -=0.02;

        this.renderer.render( this.scene, this.camera );

     }

}