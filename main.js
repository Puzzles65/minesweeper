


// global array 
const mineCounts = [];
//const minePositions = [];
function init(){
    // selecting the elements from html 
    const board = document.querySelector('.inner-board');
    // variables
    const numMines = 10;
    const height = 10;
    const width = 10;
    const cellCount = height * width;
    const cells = [];
    
    const minePositions = minesRand(cellCount, numMines);
    
    // create game board
    function createBoard(){

        

        for(let i=0; i<cellCount; i++){
            const cell = document.createElement('div');
            
            cell.dataset.index = i;

            cell.style.height = `${100 / height}%`;
            cell.style.width = `${100 / width}%`;
            

            board.appendChild(cell);
            cells.push(cell);
            
            // adding mine 
            if (minePositions[i]) {
                cell.classList.add('mine');
              } 

              
            
        }
    }

      
    createBoard();
    addNumToAdjacentMines(cells, width, cellCount);
    

    console.log(mineCounts);

    // adding event listeners to the global array 
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            if(cell.classList.contains('flag')){
              return;
            }

            if (mineCounts[index] === 0) {
                revealCell(index, cells, width, cellCount);
              } else if(mineCounts[index] === 'mine' && 
              !cell.classList.contains('revealed')) {
                gameOver(cell);
              } 
              //adding class revealed
            if (!cell.classList.contains('revealed')) {
            cell.classList.add('revealed');

            // adding the adjacent numbers to the board 
            if (mineCounts[index] !== 'mine' && mineCounts[index] !==0) {
              cell.textContent = mineCounts[index];
            }
            
            
          }
        });

        // flag 
        cell.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          flag(cell);
        })

      });
      
    
    
}
// Functions
function minesRand(cellCount, numMines){
    const minePositions = new Array(cellCount).fill(false);


    for (let i=0; i<numMines; i++) {
      let randomIndex = Math.floor(Math.random() * cellCount);

        // without this often overlaps and implements less mines 
      while (minePositions[randomIndex]) {
        randomIndex = Math.floor(Math.random() * cellCount);
      }
      minePositions[randomIndex] = true;
    }
    
    return minePositions;
}

function addNumToAdjacentMines(cells, width, cellCount){
    
    for(let i=0; i<cells.length; i++){
        const cell = cells[i];
        if(!cell.classList.contains('mine')){
            let count = 0;
            //cell.style.color = transparent;
            // taking string value of div index to int 
            const cellIndex = parseInt(cell.dataset.index);
            
        // checking board if board edges
            const isLeftEdge = (cellIndex % width === 0);
            const isRightEdge = (cellIndex % width === width -1);
            const isTopEdge = (cellIndex < width);
            const isBottomEdge = (cellIndex >= cellCount - width);

        // checking neighboring squares 
            if(!isLeftEdge && cells[cellIndex - 1].classList.contains('mine')) count++;
            if(!isRightEdge && cells[cellIndex + 1].classList.contains('mine')) count++;
            if(!isTopEdge && cells[cellIndex - width].classList.contains('mine')) count++;
            if(!isBottomEdge && cells[cellIndex + width].classList.contains('mine')) count++;
        
        // squares on diagonal 
            if(!isTopEdge && !isLeftEdge && cells[cellIndex - width - 1].classList.contains('mine')) count++;
            if(!isTopEdge && !isRightEdge && cells[cellIndex - width + 1].classList.contains('mine')) count++;
            if(!isBottomEdge && !isLeftEdge && cells[cellIndex + width -1].classList.contains('mine')) count++;
            if(!isBottomEdge && !isRightEdge && cells[cellIndex + width + 1].classList.contains('mine')) count++;


            // adding count to the global array 
            if(count >= 0) {
                
                mineCounts[cellIndex] = count;
                
                } 
                // adding mines to the global array 
                cells.map((cell, index) => {
                    if(cell.classList.contains('mine')){
                        mineCounts[index] = 'mine';
                    }
                })    
        }
    }
}


function revealCell(cellIndex, cells, width, cellCount) {
  function floodFill(index) {
      if (index >= 0 && index < cellCount) {
          const adjacentCell = cells[index];
          const adjacentCount = mineCounts[index];

          if (adjacentCell && !adjacentCell.classList.contains('revealed')) {
              if (adjacentCount === 0) {
                  adjacentCell.classList.add('revealed');
                  floodFill(index - 1); // Left
                  floodFill(index + 1); // Right
                  floodFill(index - width); // Up
                  floodFill(index + width); // Down
                  
              } else if (!adjacentCell.classList.contains('mine')) {
                  adjacentCell.classList.add('revealed');
                  adjacentCell.textContent = adjacentCount; // Display the number
              }
          }
      }
  }
  floodFill(cellIndex);
}

// flag functionality

function flag(cell) {
    if(!cell.classList.contains('revealed')) {
      const isFlagged = cell.dataset.flagged === 'true'; 
      if (isFlagged) {
          cell.dataset.flagged = false;
          cell.classList.remove('flag');
          cell.textContent = ''; 
      } else {
          cell.dataset.flagged = true;
          cell.classList.add('flag');
          cell.textContent = '🚩'; 
      }
  }
}

// recursion to open adjacent cells 

function gameOver(clickedCell) {
  if (clickedCell.classList.contains('mine') && !clickedCell.classList.contains('flag')) {
      // Show all unflagged mines
      const mines = document.querySelectorAll('.mine:not(.flag)');
      mines.forEach((mine) => {
          mine.classList.add('revealed');
          mine.classList.add('mine-revealed');
      });

      // Reset the game
      setTimeout(() => {
          resetGame();
          alert('Game Over!!!');
      }, 100);
  }
}

  
  function resetGame() {
    // Clear the game board
    const board = document.querySelector('.inner-board');
    board.innerHTML = '';
  
    // Reset the mineCounts array
    mineCounts.length = 0;
  
    // Call the init function to initialize a new game
    setTimeout(() => {
        init();
      }, 1000);
  }
    
// }
// const mine = element.classList.contains('mine');
// randomize mines placement on the given board 
// using Math.random and add it to the boards of divs using array

// game logic 
// click on the board reveal a number or mine (meaning game over)
// recursion to scan for mines and adding the numbers to the board indicating 
// the placement of mine 
// click on empty space reveal neighboring empty spaces

// adding flag function
// mines left that value are decresing with each flag 
// can flag more than existing mines therefore the value after 9 flag is
// going to (-) negative value

// advent listeners 
// for board listening to the right click of player to reveal 
// for flag listening to the left click of the player to assign flag 
// flagged element is blocking right clicking option

// click on bomb, game over and reset board
// add play again button? 
// add timer?

// calling init function
window.addEventListener('DOMContentLoaded', init);