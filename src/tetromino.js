export default class Tetromino {
    constructor(shape, color, shapeindex) {
        this.shape = shape;
        this.color = color;
        this.shapeindex = shapeindex
        this.position = { x: 0, y: 0 };
    }

    moveLeft() {
            this.position.x -= 1
    }

    moveRight() {
            this.position.x += 1
    }

    moveDown() {
        this.position.y += 1
    }

    moveUp() {
        this.position.y -= 1
    }

    render(context) {
        const cellWidth = context.canvas.width / 10; // Assuming 10 columns
        const cellHeight = context.canvas.clientHeight / 20;
    
        context.fillStyle = this.color;
        context.strokeStyle = '#ccc';
        const borderWidth = 4
        context.lineWidth = borderWidth;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    context.strokeRect((this.position.x + x) * cellWidth,
                    (this.position.y + y) * cellHeight,
                    cellWidth,
                    cellHeight)
                    context.fillRect(
                        (this.position.x + x) * cellWidth + borderWidth / 2,
                        (this.position.y + y) * cellHeight + borderWidth / 2,
                        cellWidth - borderWidth,
                        cellHeight - borderWidth
                    )
                }
            });
        });
    }

    clone() {
        const clone = new Tetromino(this.shape, this.color, this.shapeindex)
        clone.position.x = this.position.x
        clone.position.y = this.position.y
        return clone
    }
}