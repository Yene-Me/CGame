export default class Colours {
    static get SET_OF_COLOURS() {

        let colourBank = [];
        let colourSet = [];

        for (let j = 0; j < 6; j++) {
            colourBank.push(Colours.GET_RANDOM_COLOUR())
        }

        for (let j = 0; j < 6; j++) {
            colourSet.push(colourBank[j % 3]);
        }
        return colourSet;
    }

    static GET_RANDOM_COLOUR() {
        return Colours.COLOUR_LIST[Math.floor(Math.random() * Colours.COLOUR_LIST.length)];
    }

    static get COLOUR_LIST() {
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