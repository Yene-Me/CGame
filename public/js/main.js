import {Howl} from 'howler';
import Level from "../js/Level";



let level = new Level();
level.createLevelView();



//Play some background music forever
let backgroundMusic = new Howl({
    src: ['public/asset/audio/music/TheMonkeyIsland.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
});
