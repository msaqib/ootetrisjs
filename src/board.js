import Cell from './cell';

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.createGrid();
  }

  createGrid() {
    let grid = [];
    for (let x = 0; x < this.height; x++) {
        let row = [];
        for (let y = 0; y < this.width; y++) {
            row.push(new Cell());
        }
        grid.push(row);
    }
    return grid;
  }

  isValidPosition(tetromino, position) {
    // Check if tetromino can be placed at the position
    tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                if ( position.y + y > 19 || position.x + x > 9 || this.grid[position.y + y][position.x + x].isFilled) {
                    return false
                }
            }
        })
    })
    return true
  }

  addTetromino(tetromino) {
    // Add tetromino to the grid
    const startX = tetromino.position.x
    const y = tetromino.position.y

    tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                this.grid[tetromino.position.y + y][tetromino.position.x + x].setFilled(true, tetromino.color)
            }
        })
    })
  }

  clearLines() {
    // Clear completed lines and update score
  }

  render(context) {
    const cellWidth = context.canvas.width / this.width;
    const cellHeight = context.canvas.height / this.height;

    context.strokeStyle = '#ccc';

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const cell = this.grid[row][col];
        if (cell.isFilled) {
          context.fillStyle = cell.color;
          context.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        }
        context.strokeStyle = '#ccc';
        context.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      }
    }
  }
}