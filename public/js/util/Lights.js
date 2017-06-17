
import * as THREE from 'three';

export default class Light{

  static get ADD_LIGHTS()
  {
    let lights = [];
      lights.push(new THREE.AmbientLight( 0xFFFFFF, .5 )); // soft white light

    lights[1] = new THREE.DirectionalLight( 0xffffff, .5 );
    lights[1].position.set( 0, 10, 0 );
    lights[1].castShadow = true;

    lights[2] = new THREE.DirectionalLight( 0xffffff, .5 );
    lights[2].position.set( 10, 0, 0 );
    lights[2].castShadow = true;

    lights[3] = new THREE.DirectionalLight( 0xffffff, .5 );
    lights[3].position.set( 0, 0, 10 );
    lights[3].castShadow = true;

    return lights;
  }

  static get COLOURS()
  {
    let colourBank = [];

    for(let index = 0; index < 3 ; index++)
    {
       let colourSet =[];

       for(let j = 0 ; j < 6 ; j ++)
       {
         colourSet.push(Light.SET_OF_COLOURS)
       }

       colourBank.push(colourSet);
    }
   return colourBank;
  }

  static get SET_OF_COLOURS()
  {

        let colourBank = [];
        let colourSet = [];

        for(let j = 0 ; j < 6 ; j ++)
        {
          colourBank.push(Light.GET_RANDOM_COLOUR())
        }

        for(let j = 0 ; j < 6 ; j ++)
        {
            colourSet.push(colourBank[j%3]);
        }
        return colourSet;
  }

  static GET_RANDOM_COLOUR()
  {
      return Light.COLOUR_LIST[Math.floor(Math.random()*Light.COLOUR_LIST.length)];
  }

  static get COLOUR_LIST()
  {
      return [
      "#E91E63",
      "#9C27B0",
      "#3F51B5",
      "#2196F3",
      "#4CAF50",
      "#FFEB3B",
      "#FF9800",
      "#FF5722",
      ]
  }

}
