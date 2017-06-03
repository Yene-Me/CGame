import Ajax from '../js/network/Ajax';

import ShapeGenerator from "../js/shapefactory/ShapeGenerator";


let shapeGenerator = new ShapeGenerator(document.getElementById("singleShape"));

shapeGenerator.init();
shapeGenerator.animate();

