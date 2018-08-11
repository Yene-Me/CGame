import {Howl} from 'howler';
import Level from "../js/Level";
const FastSimplexNoise = require('fast-simplex-noise').default;



//const noiseGen = new FastSimplexNoise({ frequency: 0.01, max: 255, min: 0, octaves: 8 })

//for (let x = 0; x < 10; x++) for (let y = 0; y < 7; y++) {
//    console.log("test noise 1: " , noiseGen.scaled3D(x, y,y));
//}


let level = new Level();
level.createLevelView();

let isSoundOn = true;


//Play some background music forever
let backgroundMusic = new Howl({
    src: ['public/asset/audio/music/TheMonkeyIsland.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5,
});

let soundButton = document.createElement("div");

soundButton.classList.add("sound");

soundButton.addEventListener('click', ()=>{

  if(isSoundOn)
  {
    backgroundMusic.stop();
    soundButton.classList.add("mute");
    isSoundOn = false;
  }
  else
  {
    backgroundMusic.play();
    soundButton.classList.remove("mute");
    isSoundOn = true;
  }

  backgroundMusic.volume = 0;
});


document.body.appendChild(soundButton);
