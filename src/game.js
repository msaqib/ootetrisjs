import Board from './board'
import Tetromino from './tetromino';
import TetrominoFactory from './tetrominofactory';
export default class Game {
    constructor(context) {
        this.board = new Board(10, 20);
        this.currentTetromino = TetrominoFactory.createTetromino();
        this.nextTetromino = TetrominoFactory.createTetromino();
        this.score = 0;
        this.isGameOver = false;
        this.context = context
    }

    start() {
        // Initialize and start the game loop
    }

    rotateCurrentTetromino() {
        const rotated = new Tetromino(this.currentTetromino.rotate(), this.currentTetromino.color)
        if(this.board.isValidPosition(rotated, this.currentTetromino.position)) {
            this.currentTetromino = rotated
        }
    }

    hit(currentTetromino) {
        for (let y = 0 ; y < currentTetromino.shape.length ; y++) {
            for (let x = 0 ; x < currentTetromino.shape[y].length ; x++){
                if (currentTetromino.shape[y][x]) {
                    if (currentTetromino.position.y + y + 1 > 19 || currentTetromino.position.x + x > 9 || this.board.grid[currentTetromino.position.y + y + 1][currentTetromino.position.x + x].isFilled) {
                        return true
                    }
                }
            }
        }
        return false
    }

    moveCurrentTetrominoRight() {
        if (this.board.isValidPosition(this.currentTetromino, {x: this.currentTetromino.position.x + 1, y: this.currentTetromino.position.y})) {
            this.currentTetromino.position.x += 1
        }
    }

    update() {
        // Update game state
        let endY = 2
        let found = false
        for (let i = 2 ; i >= 0 ; i--) {
            endY = i
            for (let j = 0 ; j < 3 ; j++) {
                if (this.currentTetromino.shape[i][j] === 1) {
                    found = true
                }
            }
            if (found) {
                break
            }
        }
        endY = this.currentTetromino.position.y + endY
        
        if ( (endY === 19) || ( this.hit(this.currentTetromino) )) {
            this.board.addTetromino(this.currentTetromino)
            this.currentTetromino = this.nextTetromino
            this.nextTetromino = TetrominoFactory.createTetromino()
        }
        else {
            this.currentTetromino.moveDown()
        }
    }

    render() {
        // Render game state to canvas
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    
        // Render the board
        this.board.render(this.context);
        
        // Render the current tetromino
        this.currentTetromino.render(this.context);
    }

    end() {
        // Handle game over
    }
}