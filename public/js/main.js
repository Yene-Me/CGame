import {Howl} from 'howler';
import Level from "../js/Level";


let level = new Level();
level.createLevelView();

let isSoundOn = true;


//Play some background music forever
let backgroundMusic = new Howl({
    src: ['public/asset/audio/music/TheMonkeyIsland.mp3'],
    autoplay: true,
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
