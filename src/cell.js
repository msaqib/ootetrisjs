export default class Cell {
    constructor() {
        this.isFilled = false;
        this.color = null;
    }

    setFilled(isFilled, color) {
        this.isFilled = isFilled;
        this.color = color;
    }
}