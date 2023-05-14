

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
    addNumToAdjacentMines(cells, width, cellCount);
    
    // event listener to the bomb 
    let squares = document.querySelectorAll('div');
    for(let i=0; i<squares.length; i++){
        squares[i].addEventListener('click', function(){
            gameOver(squares[i]);
        })
    }
    
    
// randomize mines 
    console.log(cells);
    
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

            if(count > 0) cell.textContent = count;
            
        }
    }
}

function gameOver(square){
    if(square.classList.contains('mine')){
        alert('gameover');
    } else {
        console.log('clicked');
    }
}
// function gameOver(){
//     const mine = element.classList.contains('mine');
//     mine.addEventListener('click', function(){
//         alert('boom!!!');
//     });
// }
// function adjacentMinesNum(){
    
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