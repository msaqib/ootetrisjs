export default class Tetromino {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.position = { x: 0, y: 0 };
    }

    transpose() {
        let rotatedShape = []
        const numRows = this.shape[0].length
        const numColumns = this.shape.length
        for (let i = 0 ; i < numRows ; i++) {
            let row = []
            for (let j = 0 ; j < numColumns ; j++) {
                row.push(this.shape[j][i])
            }
            rotatedShape.push(row)
        }
        return rotatedShape
    }

    multiply(A, B) {
        const numRowsA = A.length
        const numColumnsA = A[0].length
        const numRowsB = numColumnsA
        const numColumnsB = B[0].length
        let result = []

        for (let i = 0 ; i < numRowsA ; i ++) {
            let row = []
            for (let j = 0 ; j < numColumnsB ; j++) {
                row.push(0)
            }
            result.push(row)
        }

        for (let i = 0 ; i < numRowsA ; i++) {
            for (let j = 0 ; j < numColumnsB ; j++) {
                for (let k = 0 ; k < numColumnsA ; k++) {
                    result[i][j] = result[i][j] + A[i][k] * B[k][j]
                }
            }

        }
        return result
    }

    rotate() {
        // Rotate tetromino
        const numRows = this.shape[0].length
        const numColumns = numRows
        let i = []
        for (let x = 0 ; x < numColumns ; x++) {
            let row = []
            for (let y = 0 ; y < numRows ; y++) {
                row.push(0)
            }
            row[numColumns - x - 1] = 1
            i.push(row)
        }
        return this.multiply(this.transpose(this.shape), i)
    }

    moveLeft() {
        // Move left
    }

    moveRight() {
        // Move right
    }

    moveDown() {
        this.position.y += 1
    }

    render(context) {
        const cellWidth = context.canvas.width / 10; // Assuming 10 columns
        const cellHeight = context.canvas.clientHeight / 20;
    
        context.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    context.fillRect(
                        (this.position.x + x) * cellWidth,
                        (this.position.y + y) * cellHeight,
                        cellWidth,
                        cellHeight
                    );
                }
            });
        });
    }
}