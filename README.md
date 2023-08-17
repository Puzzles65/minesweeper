ReadMe Sections

Description

I chose to work on the Minesweeper project as part of my assignment with the General Assembly Software Engineering Immersive Course. This captivating game presents players with the challenge of strategically clearing a board filled with hidden mines in order to achieve victory. To bring this project to life, I used the power of HTML, JavaScript, and CSS.


Deployment link

https://project1-minesweeper.netlify.app/

Getting Started/Code Installation

Open the file from github link.  
Copy and paste the entire code into the vs or replit. 
Open the HTML file in a web browser. The code will be executed when the DOMContentLoaded event is triggered, which will call the init() function. The code will generate a game board with cells and mines. 
Interact with the game board by clicking on the cells. If a cell contains a mine, the game will be over. If a cell does not contain a mine, it will reveal the number of adjacent mines. Empty cells will recursively reveal neighboring empty cells. 
If a mine is clicked, all mines will be revealed, and an alert will indicate that the game is over. 
After a game over, the game will reset after a delay of 1 second, and a new game will be initialized.



Timeframe & Working Team (Solo/Pair/Group)


This was a solo project that I had been given a week to complete. 



Technologies Used

Insert your Technologies Used here:
HTML, JS and CSS 




Brief

Your App Must:
☐ Render a game in the browser.
☐ Include win/loss logic and render win/loss messages in HTML. Popup alerts using the alert() method are okay during development, but not production.
☐ Include separate HTML, CSS & JavaScript files.
☐ Use vanilla JavaScript, not jQuery.
☐ Have properly indented HTML, CSS & JavaScript. In addition, vertical whitespace needs to be consistent.
☐ No remaining unused and/or commented out code (code that will never be called) .
☐ Have functions and variables that are named sensibly. Remember, functions are typically named as verbs and variables (data) named as nouns.
☐ Be coded in a consistent manner. For example, choose between your preference for function declarations vs. function expressions.
☐ Be deployed online using GitHub Pages so that the rest of the world can play your game!


https://git.generalassemb.ly/SEI-72-LDN/SEIR-Courses-Materials/blob/main/Unit_1/project-1/project-1-requirements.md


Planning

I did the required sketch of Minesweeper, presenting it as a simple square with buttons including timer and mine count. This was all done using Figma. https://www.figma.com/file/wZ6hf3zxYSJYybVWW4XJOB/Untitled?type=design&t=zFItmNc5zS7LxVDy-6

below is my initial planning:
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






Build/Code Process

In the beginning, I established two crucial arrays: mineCounts and cells. Then, I used mineCounts to store the number of adjacent mines for each cell, and cells to hold references to all the individual cell elements on the game board.

const mineCounts = [];
const cells=[];

The init function served as the main setup for the game. During this phase, the positions of mines were generated, and the game board was established. To determine the positions of mines on the board, the minePositions array was generated using the minesRand function.

const minePositions = minesRand(cellCount, numMines);

Proceeding with the game setup, the game board was created utilizing the createBoard function. This function dynamically generated individual cell elements and then appended them to the game board container. In cases where a cell contained a mine, the mine class was added to visually indicate its presence.

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

Mine Placement
The minesRand function handles the random placement of mines on the game board. It generates an array called minePositions, where each element corresponds to a cell on the board. The value true at a particular index indicates the presence of a mine.

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

This function ensures that mines are placed randomly without overlapping, leading to a fair and challenging game.

Adding Numbers to Adjacent Mines

The addNumToAdjacentMines function calculates and assigns the number of adjacent mines to each non-mine cell on the game board. It iterates through each cell and examines its neighboring cells to determine the mine count.

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

// adding count to the global array
if(count >= 0) {
mineCounts[cellIndex] = count;
}
// adding mines to the global array
cells.map((cell, index) => {
if(cell.classList.contains('mine')){
mineCounts[index] = 'mine';
This function effectively populates the mineCounts array with the correct count of adjacent mines for each cell, facilitating the game's mechanics.

Revealing Cells and Recursive Flood-Fill

The revealCell function is responsible for revealing cells on the game board when they are clicked by the player. It employs a recursive flood-fill algorithm to reveal neighboring cells with zero adjacent mine counts.

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
floodFill(cellIndex);
checkWinCondition();

The revealCell function's flood-fill algorithm ensures that when a cell with zero adjacent mines is clicked, all adjacent cells are automatically revealed, creating a seamless and efficient player experience.

Flagging Cells 

The flag function allows players to flag cells using the right-click context menu. It toggles the flagged state of a cell and displays a flag emoji when flagged.

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

This function enhances gameplay by allowing players to mark cells they suspect contain mines, adding a strategic element to the game and avoid missclicking a potential mine.

Game Over and Reset 

The gameOver function handles the end-game scenario when a mine is clicked by the player. It reveals all mines on the board and displays a game over modal.

function gameOver(clickedCell) {
if (clickedCell.classList.contains('mine') && !clickedCell.classList.contains('flag')) {
// Show all unflagged mines
const mines = document.querySelectorAll('.mine:not(.flag)');
mines.forEach((mine) => {
mine.classList.add('revealed');
mine.classList.add('mine-revealed');
mine.textContent = '💣';
});
const modal = document.getElementById('gameOverModal');
modal.style.display = 'flex';


const playAgainButton = modal.querySelector('.play-again-button2');
playAgainButton.addEventListener('click', resetGame);

The resetGame function resets the game by clearing the board, cells, and mine counts, allowing players to start a new game session.

function resetGame() {
const winModal = document.querySelector('.win-modal');
winModal.style.display = 'none';
const modal = document.getElementById('gameOverModal');
modal.style.display = 'none';
// Clear the game board
const board = document.querySelector('.inner-board');
board.innerHTML = '';
// Clear the cells array
cells.length = 0;
// Reset mineCounts array
mineCounts.length = 0;
// Initialize the game again
setTimeout(() => {
init();
}, 100);

Win Condition 


function checkWinCondition() {
const nonMineCells = cells.filter(cell => !cell.classList.contains('mine'));
const allNonMineRevealed = nonMineCells.every(cell => cell.classList.contains('revealed'));
if (allNonMineRevealed) {
const winModal = document.querySelector('.win-modal');
winModal.style.display = 'flex';

The checkWinCondition function determines whether the player has won the game by revealing all non-mine cells. If the condition is met, a win modal is displayed.

Challenges

This project presented me with various challenges that added depth to my learning experience. Coming straight from an introductory course, I was tasked with applying my newfound knowledge. To overcome these hurdles, I took an active role in researching and refining my understanding of JavaScript, HTML and CSS. Each challenge I faced became an opportunity to enhance my problem-solving skills and broaden my perspective on coding solutions.

Throughout the journey of completing this project, I reached out to both the GA staff and friends in the field for assistance in overcoming the challenges I encountered. Their guidance and support helped me navigate through the obstacles and make progress.

Wins

I believe this project has been a valuable learning experience, significantly enhancing my understanding of coding in JS. Throughout its development, my research skills were put to the test, and with each line of code I added, I gained a deeper grasp of the concepts and banked some ideas for future projects. While the journey continues, I'm proud of the substantial progress I've made in creating a functional game.

Key Learnings/Takeaways

In moving forward, I am determined to enhance my approach to project planning and time management. To achieve this, I plan to implement a more detailed and organized planning phase, setting clear goals and prioritizing tasks based on their level of complexity and significance. I recognize the importance of building flexibility into my schedule to accommodate unexpected challenges, which I encountered during this project.

Bugs

Upon flagging a cell, if a neighboring cell triggers the flooding effect upon being clicked, the flag persists on the board. This bug doesn't impact the gameplay.


Future Improvements

adding timer and mine count - mine count indicates a number of mines that are left on the board when approaching the ending stages of the game (meaning only few mines left on the board) they help player to calculate the last positioning of mines. Timer could be used for competitive minesweeper competition or recording high scores.  
some css work to make it more flashy - this is an feature to differentiate this minesweeper from others, since the logic of the game and backend is very similar to each other
adding levels of difficulty - makes the game more entertaining as we get better at clearing beginners boards
record best time - this function is connected with timer, would record the best time and show it to the user

