import Tetromino from './tetromino'

export default class TetrominoFactory {
    
    static shapes = [
            [[0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]],
            [[0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]],
            [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]],
            [[0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],],
            [[1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0]],
            [[0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]],
            [[0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]],
            [[0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]],
            [[0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]],
            [[0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]],
            [[0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]],
            [[1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]],
            [[0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]],
            [[0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]],
            [[0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]],
            [[0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]],
            [[0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]],
            [[0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]],
            [[0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]],
            [[1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]],
            [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]],
            [[0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]],
            [[0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]],
            [[0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]],
            [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],
            [[0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]],
            [[0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]],
            [[0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]]
        ];
        static colors = ["cyan", "yellow", "purple", "green", "red", "blue", "orange"];

    static createTetromino() {
        
        const index = Math.floor(Math.random() * this.shapes.length);
        return new Tetromino(this.shapes[index], this.colors[index % 4], index);
    }

    static rotateTetromino(index) {
        const rotatedIndex = Math.floor(index / 4) * 4 + (index + 1) % 4
        return {
            index: rotatedIndex, 
            shape: this.shapes[rotatedIndex]
        }
    }
}