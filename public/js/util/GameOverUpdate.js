import PubSub from '../core/PubSub';
import Const from '../core/Const';
export default class GameOverUpdate
{
  constructor()
  {
    this.counter = document.createElement("DIV");
    document.body.appendChild(this.counter);

    this.counter.addEventListener('click', (e)=>
    {
      e.preventDefault();
      this.counter.style.display = "none";
      PubSub.publish(Const.RELOAD,"reload");

    });

    PubSub.subscribe(Const.RESULT,(point)=>{
      this.showMessage(point+ " Matched!");
    });
  }

  showMessage(msg)
  {
    this.counter.style.display = "flex";
    this.counter.classList.add("gameover");
    this.counter.textContent = msg;
    this.reload = document.createElement("DIV");
    this.reload.classList.add("touchReload");
    this.reload.textContent = "Touch Reload.";
    
    PubSub.publish(Const.GAME_OVER,"GameOver");
    this.counter.appendChild(this.reload);
  }

  hideMessage()
  {
      this.counter.textContent = "";
  }
}
