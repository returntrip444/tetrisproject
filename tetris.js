const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);


const matrix = [

    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
    
];

const matrix1 = [

    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
    
];

const matrix2 = [

    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    
];

const matrix3 = [

    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
    
];

const matrix4 = [

    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    
];

const matrix5 = [

    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
    
];

const matrix6 = [

    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    
];

const matrix7 = [

    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
    
];

const matrix8 = [

    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
    
];

const pieces = [matrix, matrix1, matrix2, matrix3, matrix4, matrix5, matrix6, matrix7, matrix8]
const randomPieces =  pieces[Math.floor(Math.random() * pieces.length)]
   console.log(randomPieces)
   console.log(Math.floor(Math.random() * pieces.length + 1))

const colors = [
    
    'purple',
    'yellow',
    'orange',
    'blue',
    'pink',
    'green',
    'red'
  ];

  const randomColors = colors[Math.floor(Math.random() * colors.length)]
  console.log(randomColors)


function collide(arena, player) {
    const[m, o] = [player.matrix, player.pos];
     for (let y = 0; y < m.length; ++y) {
         for (let x =0; x < m[y].length; ++x) {
             if ((m[y][x] !== 0 &&
                arena[y + o.y] &&
                arena[y + o.y] [x + o.x]) !== 0) {

                    return true;
                
            }
         }
     }
   return false
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix

}



function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix( arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = randomColors;
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
    });
});

}

function merge( arena, player) {
    player.matrix.forEach((row, y) => {
     row.forEach((value, x) => {
         if (value !== 0) {
             arena[y + player.pos.y][x +player.pos.x] = value;

         }
     });

    });

    

    

    
}

 function playerDrop() {
    player.pos.y = 15.5;
     if (collide(arena, player)) {
         player.pos.y--;
         merge(arena, player);
         player.pos.y = 0;

     }
    dropCounter = 0;
 }
 
function playerMove(dir) {
    player.pos.x += dir;
    if (collide (arena, player)) {
        player.pos.x -= dir;
    }
   
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time- lastTime;
    lastTime = time

    dropCounter += deltaTime;
     if (dropCounter > dropInterval) {
         player.pos.y++;
         dropCounter = 0;
     }
    draw()
    requestAnimationFrame(update)
    
}


const arena = createMatrix(12, 20)



const player = {
    pos: {x: 0, y: 0},
    matrix: randomPieces
}

document.addEventListener('keydown', event => {
   if (event.keyCode === 37) {
    player.pos.x --;
       playerMove(-1);
       
   }
    else if (event.keyCode === 39) {
        player.pos.x ++;
        playerMove(1);
        
    }
    else if (event.keyCode === 40) {
        
        playerDrop()
    }


});

update()