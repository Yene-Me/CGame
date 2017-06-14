import Ajax from '../js/network/Ajax';

import ShapeGenerator from "../js/shapefactory/ShapeGenerator";


let shapeGenerator = new ShapeGenerator(document.getElementById("singleShape"));

shapeGenerator.loadCube();
shapeGenerator.animate();

window.addEventListener( 'click', (event)=>{
  shapeGenerator.onMouseMove(event);
}, false );
