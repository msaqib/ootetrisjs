import Game from './game'
import { ScoreObserver } from './scoreobserver';
export default class GameController {
    constructor(context) {
        if (!GameController.instance) {
            this.game = new Game(context);
            const scoreElement = document.getElementById('score')
            this.scoreUI = new ScoreObserver(scoreElement)
            this.game.board.addScoreObserver(this.scoreUI)
            this.game.board.addGameoverObserver(this)
            this.intervalId = null;
            GameController.instance = this;
            this.gameSpeed = 1;
        }
        return GameController.instance;
    }

    handleInput() {
        // Handle keyboard input
        document.onkeydown = ( event => {
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
        })
    }

    startLoop() {
        this.intervalId = setInterval(() => {
            this.game.render();
            this.game.update();
        }, 1000 / this.gameSpeed); // 60 FPS
        this.handleInput()
    }

    stopLoop() {
        clearInterval(this.intervalId);
    }

    end() {
        this.stopLoop()
    }
}