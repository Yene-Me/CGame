import Timer from "time-counter";

export default class Counter
{

  constructor()
  {
    this.counter = document.createElement("DIV");
    this.counter.classList.add("counter");
    document.body.appendChild(this.counter);
  }

  startCounter()
  {
    // creating a countdown timer
    this.countDown = new Timer({
        direction: 'up',
        startValue: '0:00' // one minute
    });

    this.countDown.start();

      this.countDown.on('change', (data)=>{
      this.counter.textContent = data;
      });


  }

  stopCounter()
  {
    this.countDown.on('end', function () {

    });

    this.countDown.stop();
  }
}
