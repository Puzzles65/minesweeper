

function init(){
    // selecting the elements from html 
    const board = document.querySelector('.inner-board');
    // variables
    const mines = 9;
    const height = 9;
    const width = 10;
    const cellCount = height * width;
    const cells = [];

    // create game board
    function createBoard(){
        for(let i=0; i<cellCount; i++){
            const cell = document.createElement('div');
    
            cell.innerText = i;
    
            cell.dataset.index = i;
    
            cell.style.height = `${100 / height}%`;
            cell.style.width = `${100 / width}%`;
    
            board.appendChild(cell);
    
            cells.push(cell);
        }
    }
    createBoard();
    
}
// Functions
function minesRand(){
    
}
// game logic 
// randomize mines placement on the given board 
// timer 
// mines left that value are decresing with each flag 
// can flag more than existing mines therefore the value after 9 flag is
// going to (-) negative value

// advent listeners 
// for board listening to the right click of player to reveal 
// for flag listening to the left click of the player to assign flag 
// flagged element is blocking right clicking option
// play again button 

// calling init function
window.addEventListener('DOMContentLoaded', init);