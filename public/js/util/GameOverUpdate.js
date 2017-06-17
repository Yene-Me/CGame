export default class GameOverUpdate
{
  constructor()
  {
    this.counter = document.createElement("DIV");
    document.body.appendChild(this.counter);
  }

  showMessage()
  {
      this.counter.classList.add("gameover");
    this.counter.textContent = "Game Over";
    this.reload = document.createElement("DIV");
    this.counter.appendChild(this.reload);

  }

  hideMessage()
  {
      this.counter.textContent = "";
  }
}
