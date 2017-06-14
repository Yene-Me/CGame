export default class SizeFinder
{

  static get CUBE_SIZE()
  {
    const MAX_SIZE = 12;
    let w = window.innerWidth*MAX_SIZE/100;
    let h = window.innerHeight*MAX_SIZE/100;

    return Math.floor(Math.min(w,h))*window.devicePixelRatio;

  }
}
