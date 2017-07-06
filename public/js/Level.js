import ShapeGenerator from "../js/shapefactory/ShapeGenerator";
import PubSub from '../js/core/PubSub';
import Const from '../js/core/Const';

export default class Level {
    constructor() {
        this.numberOfLevel = 11;
        this.shapeGenerator = new ShapeGenerator(document.getElementById("singleShape"));
        document.getElementById("singleShape").addEventListener('click', (event) => {
            this.shapeGenerator.onMouseMove(event);
        }, false);

        PubSub.subscribe(Const.LEVEL, ()=>
        {
            this.showLevel();
        });
    }

    createLevelView() {
        this.levelListHolder = document.createElement("DIV");
        this.levelListHolder.classList.add("levelListHolder");

        this.levelTitle = document.createElement("h1");
        this.levelTitle.textContent = "Select Level";
        this.levelListHolder.appendChild(this.levelTitle);

        for (let index = 1; index < this.numberOfLevel; index++) {
            let level = document.createElement("DIV");
            level.classList.add("level");
            this.levelListHolder.appendChild(level);
            level.VALUE = index;


            //TODO: Locked / Unlocked system
            if (index > 5) {
                level.classList.add("locked");
            }
            else {
                level.textContent = index;
            }

            level.addEventListener('click', (event) => {

                this.shapeGenerator.init(Math.ceil(event.srcElement.VALUE * 1.5));
                this.shapeGenerator.loadCube();
                this.shapeGenerator.animate();
                this.hideLevel();
            })
        }
        document.body.appendChild(this.levelListHolder);
    }

    hideLevel() {
        this.levelListHolder.style.opacity = "0";

        setTimeout(() => {
            this.levelListHolder.style.display = "none";
        }, 1000)
    }

    showLevel()
    {
      this.levelListHolder.style.opacity = "1";

      setTimeout(() => {
          this.levelListHolder.style.display = "flex";
      }, 100)
    }

}
