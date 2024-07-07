import Board from './board'
import Tetromino from './tetromino';
import TetrominoFactory from './tetrominofactory';
export default class Game {
    constructor(context) {
        this.board = new Board(10, 20);
        this.context = context
        this.start()
    }

    start() {
        this.currentTetromino = TetrominoFactory.createTetromino();
        this.nextTetromino = TetrominoFactory.createTetromino();
        this.score = 0;
        this.isGameOver = false;
        this.scoreElement = document.getElementById('score')
    }

    rotateCurrentTetromino() {
        const rotated = TetrominoFactory.rotateTetromino(this.currentTetromino.shapeindex)
        const rotatedTetro = new Tetromino(rotated.shape, this.currentTetromino.color, rotated.index)
        rotatedTetro.position.x = this.currentTetromino.position.x
        rotatedTetro.position.y = this.currentTetromino.position.y
        if (rotatedTetro.position.x + rotatedTetro.shape[0].length > 9) {
            const diff = rotatedTetro.position.x + rotatedTetro.shape[0].length - 9
            rotatedTetro.position.x = rotatedTetro.position.x - diff + 1
        }
        if(this.board.isValidPosition(rotatedTetro)) {
            this.currentTetromino = rotatedTetro
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
        this.currentTetromino.moveRight()
        if (!this.board.isValidPosition(this.currentTetromino)) {
            this.currentTetromino.moveLeft()
        }
    }

    moveCurrentTetrominoLeft() {
        this.currentTetromino.moveLeft()
        if (!this.board.isValidPosition(this.currentTetromino)) {
            this.currentTetromino.moveRight()
        }
    }

    moveCurrentTetrominoDown() {
        this.currentTetromino.moveDown()
        if (!this.board.isValidPosition(this.currentTetromino)) {
            this.currentTetromino.moveUp()
        }
    }

    update() {
        // Update game state
        let endY = this.currentTetromino.shape.length - 1
        let found = false
        for (let i = this.currentTetromino.shape.length - 1 ; i >= 0 ; i--) {
            endY = i
            for (let j = 0 ; j < this.currentTetromino.shape[i].length ; j++) {
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
            if (this.board.isCellInFirstRowFilled()) {
                this.end()
            }
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
        this.drawSilhouette()
    }

    end() {
        // Handle game over
    }

    calculateSilhouette() {
        const clone = this.currentTetromino.clone()
        while(this.board.isValidPosition(clone)) {
            clone.moveDown()
        }
        clone.position.y -= 1
        return clone
    }

    drawSilhouette() {
        const silhouette = this.calculateSilhouette()
        const cellWidth = this.context.canvas.width / this.board.width;
        const cellHeight = this.context.canvas.height / this.board.height;

        this.context.fillStyle = "rgba(0, 0, 0, 0.2)"; // Translucent black for the silhouette
        silhouette.shape.forEach((row, dy) => {
        row.forEach((value, dx) => {
            if (value) {
            this.context.fillRect(
                (silhouette.position.x + dx) * cellWidth,
                (silhouette.position.y + dy) * cellHeight,
                cellWidth,
                cellHeight
            );
            }
        });
        });
    }
}