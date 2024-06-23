import Tetromino from './tetromino'

export default class TetrominoFactory {
    static createTetromino() {
        const shapes = [
            [[0, 0, 0],[1, 1, 1], [0, 0, 0]], // I shape
            [[1, 1, 0], [1, 1, 0], [0, 0, 0]], // O shape
            [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T shape
            [[0, 0, 0], [0, 1, 1], [1, 1, 0]], // Z shape
            [[0, 1, 1], [0, 1, 0], [0, 1, 0]], // J shape
        ];

        const colors = ["cyan", "yellow", "purple", "green", "red", "blue", "orange"];
        const index = Math.floor(Math.random() * shapes.length);
        return new Tetromino(shapes[index], colors[index]);
    }

    static rotateTetromino() {

    }
}