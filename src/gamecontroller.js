import Game from './game'
export default class GameController {
    constructor(context) {
        if (!GameController.instance) {
            this.game = new Game(context);
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
}