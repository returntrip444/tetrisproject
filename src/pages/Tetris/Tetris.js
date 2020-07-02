import React, { useState, useEffect, useRef } from "react";

const style = {
  height: "90vh",
  width: "auto",
};

const Tetris = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    startGame();
  });

  
  const createMatrix = (w, h) => {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  };

  const arena = createMatrix(12, 20);

  const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
  };

  const arenaSweep = () => {
    let rowCount = 1;
    outer:  for (let y = arena.length -1; y > 0; --y) {
          for (let x = 0; x < arena[y].length; ++x) {
              if (arena[y][x] === 0) {
                  continue outer;
              }
          }
          const row = arena.splice(y, 1)[0].fill(0)
          arena.unshift(row);
          ++y
  
          player.score += rowCount * 10;
          rowCount *= 2;
  
      }
  }

  const startGame = () => {
    const canvas = canvasRef.current,
      context = canvas.getContext("2d"),
      colors = [
        null,
        "purple",
        "yellow",
        "orange",
        "blue",
        "pink",
        "green",
        "red",
        "aqua",
        "silver",
      ];
    context.scale(20, 20);

    const matrix = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];

    const matrix1 = [
      [0, 0, 2],
      [0, 0, 2],
      [0, 2, 2],
    ];

    const matrix2 = [
      [0, 0, 0, 0],
      [3, 3, 3, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const matrix3 = [
      [0, 4, 0, 0],
      [0, 4, 0, 0],
      [0, 4, 0, 0],
      [0, 4, 0, 0],
    ];

    const matrix4 = [
      [5, 0, 0],
      [5, 0, 0],
      [5, 5, 0],
    ];

    const matrix5 = [
      [0, 0, 6],
      [0, 6, 6],
      [0, 6, 0],
    ];

    const matrix6 = [
      [7, 0, 0],
      [7, 7, 0],
      [0, 7, 0],
    ];

    const matrix7 = [
      [0, 0, 0],
      [0, 8, 8],
      [8, 8, 0],
    ];

    const matrix8 = [
      [0, 0, 0],
      [9, 9, 0],
      [0, 9, 9],
    ];

    const matrix9 = [
      [10, 10],
      [10, 10],
    ];

    const generatePieces = type => {
      switch (type) {
        case "0":
          return matrix;
        case "1":
          return matrix1;
        case "2":
          return matrix2;
        case "3":
          return matrix3;
        case "4":
          return matrix4;
        case "5":
          return matrix5;
        case "6":
          return matrix6;
        case "7":
          return matrix7;
        case "8":
          return matrix8;
        case "9":
          return matrix9;
        default:
          return;
      }
    };

    const updateScore = () => {
        document.getElementById('score').innerText = player.score
    }

    const playerReset = () =>  {
        const pieces = "0123456789"
        player.matrix = generatePieces(pieces[pieces.length * Math.random() | 0]);
        player.pos.y = 0;
        player.pos.x = (arena[0].length /2 | 0) - (player.matrix[0].length / 2 | 0);
        if(collide(arena, player)) {
            arena.forEach(row => row.fill(0));
            player.score = 0;
            updateScore();
        }
    }

    const draw = () => {
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      drawMatrix(arena, { x: 0, y: 0 });
    };

    const drawMatrix = (matrix, offset) => {
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            context.fillStyle = colors[value];
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
          }
        });
      });
    };


    const collide = (arena, player) => {
        const m = player.matrix;
        const o = player.pos;
         for (let y = 0; y < m.length; ++y) {
             for (let x =0; x < m[y].length; ++x) {
                 if (m[y][x] !== 0 &&
                    (arena[y + o.y] &&
                    arena[y + o.y] [x + o.x]) !== 0) {
    
                        return true;
                    
                }
             }
         }
       return false;
    };

    const merge = (arena, player) => {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                   //  console.log(value)
       
                }
            });
    });
    const rotate = (matrix, dir) => {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
    
    
                 
            }
        }
    
          if (dir > 0) {
              matrix.forEach(row => row.reverse());
    
          } else {
              matrix.reverse()
          }
    }

    

    const playerMove = (dir) => {
            
    player.pos.x += dir;
    if (collide (arena, player)) {
        player.pos.x -= dir;
     }
    }

    const playerRotate = (dir) => {
        const position = player.pos.x;
        let offset = 1;
        rotate(player.matrix, dir)
       while(collide(arena, player)) {
           player.pos.x += offset;
           offset = -(offset + (offset > 0 ? 1 : -1));
           if(offset > player.matrix[0].length) {
               rotate(player.matrix, -dir);
               player.pos.x = position;
               return;
           }
       }
    }

    const playerDrop = () => {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            merge(arena, player);
            playerReset();
            arenaSweep();
            updateScore();
        }
        dropCounter = 0;
    };

    

    let dropCounter = 0,
        dropInterval = 1000,
        lastTime = 0;

    const update = (time = 0) => {
        const deltaTime  = time - lastTime;

        dropCounter += deltaTime;
        if(dropCounter > dropInterval) {
            playerDrop();
        }
        lastTime = time;
        draw();
        requestAnimationFrame(update);
    };

    document.addEventListener('keydown', event => {
        console.log(event.keyCode)
       if (event.keyCode === 37) {
           playerMove(-1);
       }
        else if (event.keyCode === 39) {
            playerMove(1);
        }
        else if (event.keyCode === 40) {
            playerDrop()
        }
        else if (event.keyCode === 81) {
            playerRotate(-1)
        }
        else if (event.keyCode === 87) {
            playerRotate(1)
        }
    
    
    });

};



  

  return (<>
      <h1>TETRIS</h1>
      <p>{props.name}</p>
      <div id="score"></div>
      <canvas
        ref={canvasRef}
        id="tetris"
        width="240"
        height="400"
        style={style}
      ></canvas>
    </>
  );

  };
};
  export default Tetris;
