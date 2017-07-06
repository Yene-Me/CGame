import PubSub from '../core/PubSub';
import Const from '../core/Const';
export default class GameOverUpdate {
    constructor() {
        this.level = document.createElement("DIV");
        document.body.appendChild(this.level);

        this.level.addEventListener('click', (e) => {
            e.preventDefault();

        });

        PubSub.subscribe(Const.RESULT, (point) => {
            this.showMessage(point + " Matched!");
        });
    }

    showMessage(msg) {

        this.level.style.display = "flex";
        this.level.classList.add("gameover");
        this.level.textContent = msg;

        this.createButton(this.level,"Quit","quit", ()=>{
          this.level.style.display = "none";
          PubSub.publish(Const.RELOAD, "quit");
        });

        this.createButton(this.level, "Repeat", "repeat",  ()=>{
          this.level.style.display = "none";
          PubSub.publish(Const.RELOAD, "reload");
        }
      );

        this.createButton(this.level,"Next", "Next" , ()=>{
          this.level.style.display = "none";
          PubSub.publish(Const.LEVEL, "level");
        });

        PubSub.publish(Const.GAME_OVER, "GameOver");

    }

    createButton(holder, text, className, callBack)
    {
      let button = document.createElement("DIV");
          button.classList.add("touchReload");
          button.textContent = text;

      holder.appendChild(button);

      button.addEventListener('click', (e)=>
      {
        callBack();
        console.log(e);
      })
    }

    hideMessage() {
        this.counter.textContent = "";
    }
}
