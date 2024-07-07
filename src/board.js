import Cell from './cell';

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.createGrid();
    this.scoreObservers = []
    this.gameoverObservers = []
  }

  addScoreObserver(observer) {
    this.scoreObservers.push(observer)
  }

  removeScoreObserver(observer) {
      this.scoreObservers = this.scoreObservers.filter(ob => ob !== observer)
  }

  notifyScoreObservers(score) {
      this.scoreObservers.forEach(observer => observer.update(score))
  }

  addGameoverObserver(observer) {
    this.gameoverObservers.push(observer)
  }

  removeGameoverObserver(observer) {
      this.gameoverObservers = this.gameoverObservers.filter(ob => ob !== observer)
  }

  notifyGameoverObservers() {
      this.gameoverObservers.forEach(observer => observer.end())
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

  isValidPosition(tetromino) {
    const isValid = tetromino.shape.every((row, i) => {
      const ret = row.every((value, j) => {
        if (value) {
          const y = tetromino.position.y + i;
          const x = tetromino.position.x + j;
          return y >= 0 && y < 20 && x >= 0 && x < 10 && !this.grid[y][x].isFilled;
        }
        return true; // If the cell is empty, no need to check further
      })
      return ret
      }
      
    );
    return isValid;
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
    this.isCellInFirstRowFilled()
    return this.clearLines()
  }

  clearLines() {
    let count = 0
    // Clear completed lines and update score
    for (let i = 0 ; i < this.grid.length ; i++) {
      if(this.grid[i].every( cell => cell.isFilled)) {
        count++
        for (let k = i ; k > 0 ; k--) {
          for (let l = 0 ; l < this.grid[k].length ; l++) {
            this.grid[k][l] = this.grid[k - 1][l]
          }
        }
      }
    }
    if (count > 0) {
      this.notifyScoreObservers(count)
    }
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
      }
    }
  }

  isCellInFirstRowFilled() {
    if (this.grid[0].some(cell => cell.isFilled)) {
      this.notifyGameoverObservers()
    }
  }
}