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
            "#999",
            "#222",
            "#333",
            "#444",
            "#555",
            "#666",
            "#777",
            "#888",
        ]
    }
}