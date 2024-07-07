import Game from './game'
import { ScoreObserver } from './scoreobserver';
export default class GameController {
    constructor(context) {
        if (!GameController.instance) {
            this.context = context
            GameController.instance = this;
        }
        return GameController.instance;
    }

    newGame() {
        this.game = new Game(this.context);
        const scoreElement = document.getElementById('score')
        this.scoreUI = new ScoreObserver(scoreElement)
        this.game.board.addScoreObserver(this.scoreUI)
        this.game.board.addGameoverObserver(this)
        this.intervalId = null;
        this.gameSpeed = 1;
        this.paused = false
    }

    handleInput() {
        // Handle keyboard input
        document.onkeydown = ( event => {
            if (!this.paused) {
                if (event.key === "ArrowUp") {
                    this.game.rotateCurrentTetromino()
                    }
                    else if (event.key === "ArrowRight") {
                        this.game.moveCurrentTetrominoRight()
                    }
                    else if (event.key === "ArrowLeft") {
                        this.game.moveCurrentTetrominoLeft()
                    }
                    else if (event.key === "ArrowDown") {
                        this.game.moveCurrentTetrominoDown()
                    }
                }
            })
    }

    startLoop() {
        this.intervalId = setInterval(() => {
            this.game.render();
            this.game.update();
        }, 1000 / this.gameSpeed); // 60 FPS
        this.handleInput()
    }

    pauseLoop() {
        clearInterval(this.intervalId)
        this.paused = true
    }

    resumeLoop() {
        this.startLoop()
        this.paused = false
    }

    stopLoop() {
        clearInterval(this.intervalId);
    }

    end() {
        this.stopLoop()
        this.paused = true
        this.game.board.removeGameoverObserver(this)
        this.game.board.removeScoreObserver(this.scoreUI)
        this.context.reset()
    }
}