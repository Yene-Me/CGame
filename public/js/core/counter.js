import Timer from "time-counter";
import GameOverUpdate from "../util/GameOverUpdate";

export default class Counter {

    constructor() {
        this.counter = document.createElement("DIV");
        this.counter.classList.add("counter");
        document.body.appendChild(this.counter);
        this.gameOverUpdate = new GameOverUpdate();
    }

    add(seconds = 20) {
        //TODO: Add some time to the timer
    }

    startCounter() {
        // creating a countdown timer
        this.countDown = new Timer({
            direction: 'down',
            startValue: 30 // 30 seconds
        });

        this.countDown.on('change', (data) => {
            this.counter.textContent = data;

            if (data === "0:00") {
                //alert("Game Over // TODO");
                this.gameOverUpdate.showMessage("Game Over");
                this.stopCounter();
            }
        });

        this.countDown.start();
    }

    stopCounter() {
        this.countDown.stop();
    }
}
