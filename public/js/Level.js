import ShapeGenerator from "../js/shapefactory/ShapeGenerator";

export default class Level
{
  constructor()
  {
    this.numberOfLevel = 10;

    this.shapeGenerator = new ShapeGenerator(document.getElementById("singleShape"));



    window.addEventListener('click', (event) => {
        this.shapeGenerator.onMouseMove(event);
    }, false);

  }

  createLevelView()
  {
    this.levelListHolder = document.createElement("DIV")
    this.levelListHolder.classList.add("levelListHolder");

    for(let index = 1 ; index < this.numberOfLevel ; index ++)
    {
      let level  = document.createElement("DIV");
      level.classList.add("level");
      this.levelListHolder.appendChild(level)
      level.textContent = index;
      level.VALUE = index;

      level.addEventListener('click', (event)=>
      {
         console.log(event.srcElement.VALUE);
         this.shapeGenerator.loadCube();
         this.shapeGenerator.animate();
         this.hideLevel();
      })
    }
    document.body.appendChild(this.levelListHolder);
  }

  hideLevel()
  {
    this.levelListHolder.style.display = "none";
  }

}
