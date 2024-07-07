export class ScoreObserver {
    constructor(element) {
        this.scoreElement = element
        this.score = 0
    }

    update(score) {
        this.score += score
        this.scoreElement.innerText = this.score
    }
}