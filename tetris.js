const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function createMatrix(numberOfItems) {


const matrix =  []

for (let i = 0; i < 3; i++) {
    const numbers = []
    matrix.push(numbers)
    for (let j = 0; j < numberOfItems; j++) {
        let randomNumber = getRandomNumber()
     numbers.push(randomNumber)
   
    }  
}
   console.log(matrix)
   return matrix
}

function getRandomNumber() {
    const randomNumber = Math.random()
    if (randomNumber < 0.5) {
        return 0;
    }
    else if (randomNumber > 0.5) {
        return 1;
    }
}
// createMatrix(4, 1)


const matrix = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]

];

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = 'blue';
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
    });
});

}

function update(timestamp) {
    draw()
    console.log(timestamp)
}


requestAnimationFrame(update)

const player = {
    pos: {x: 5, y:5},
    matrix: matrix
}

update()