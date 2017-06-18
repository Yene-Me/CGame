import {Howl} from 'howler';
//import ShapeGenerator from "../js/shapefactory/ShapeGenerator";
import Level from "../js/Level";

//let shapeGenerator = new ShapeGenerator(document.getElementById("singleShape"));

let level = new Level();
level.createLevelView();

//shapeGenerator.loadCube();
//shapeGenerator.animate();

//window.addEventListener('click', (event) => {
//    shapeGenerator.onMouseMove(event);
//}, false);


//Play some background music forever
let backgroundMusic = new Howl({
    src: ['public/asset/audio/music/TheMonkeyIsland.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
});
