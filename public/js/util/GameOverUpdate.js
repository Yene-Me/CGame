export default class GameOverUpdate
{
  constructor()
  {
    this.counter = document.createElement("DIV");
    document.body.appendChild(this.counter);

    this.counter.addEventListener('click', ()=>
    {
      console.log(this);
    })
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
