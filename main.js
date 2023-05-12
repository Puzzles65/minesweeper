

function init(){
    // selecting the elements from html 
    const board = document.querySelector('.inner-board');
    // variables
    const numMines = 9;
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
            
            if (minePositions[i]) {
                cell.classList.add('mine');
              }
        }
    }
    createBoard();
    
// randomize mines 
    console.log(cells);
    
}
// Functions
function minesRand(cellCount, numMines){
    const minePositions = new Array(cellCount).fill(false);

    for (let i=0; i<numMines; i++) {
      let randomIndex = Math.floor(Math.random() * cellCount);
      while (minePositions[randomIndex]) {
        randomIndex = Math.floor(Math.random() * cellCount);
      }
      minePositions[randomIndex] = true;
    }
    
    return minePositions;
}


const mine = element.classList.contains('mine');
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