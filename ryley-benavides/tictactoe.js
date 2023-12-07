// Add an event listener to the message input field for word count limitation
document.getElementById('message').addEventListener('input', function () {
    var wordCount = this.value.split(/\s+/).length;
    if (wordCount > 250) {
        // Limit the input to 250 words
        this.value = this.value.split(/\s+/).slice(0, 250).join(" ");
    }
});

// Add an event listener to the contact widget button to toggle display
document.getElementById('contactWidgetButton').addEventListener('click', function() {
    var widget = document.getElementById('contactWidget');
    // Toggle the display of the contact widget
    widget.style.display = widget.style.display === 'block' ? 'none' : 'block';
});

// Function to close the contact widget
function closeContactWidget() {
    document.getElementById('contactWidget').style.display = 'none';
}

// Add an event listener to the Tic Tac Toe button to toggle game display
document.getElementById('ticTacToeButton').addEventListener('click', function() {
    var ticTacToeWidget = document.getElementById('ticTacToeWidget');
    // Toggle the display of the Tic Tac Toe widget
    ticTacToeWidget.style.display = ticTacToeWidget.style.display === 'block' ? 'none' : 'block';
    if (ticTacToeWidget.style.display === 'block') {
        // Start the game when the widget is displayed
        startGame();
    }
});

// Define initial game variables
let currentPlayer = 'X'; // Player is always 'X'
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Handle cell clicks for player moves
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        // Prevent move if the cell is already taken or the game is not active
        return;
    }

    // Make the player's move
    makeMove(clickedCell, clickedCellIndex, currentPlayer);
    if (!checkForWinner()) {
        // Delay the computer's move by 2 seconds
        setTimeout(computerMove, 2000); // 2000 milliseconds delay
    }
}

// Make a move on the game board
function makeMove(cell, index, player) {
    gameState[index] = player;
    cell.innerHTML = player;
}

// Function for the computer to make a move
function computerMove() {
    let availableSpots = gameState.map((cell, index) => cell === "" ? index : null).filter(val => val !== null);

    if (availableSpots.length === 0) {
        // No available spots, exit the function
        return;
    }

    let computerMoveIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    let cell = document.querySelectorAll('.tic-tac-toe-cell')[computerMoveIndex];
    makeMove(cell, computerMoveIndex, 'O');
    checkForWinner();
}

// Check the game state for a winner
function checkForWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer === 'X' ? 'X (You)' : 'O (Computer)'} has won!`);
        gameActive = false;
        return true;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        alert("The game ended in a draw!");
        gameActive = false;
        return true;
    }

    // Switch current player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    return false;
}

// Function to start a new game
function startGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('tic-tac-toe-cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

// Function to reset the game
function resetGame() {
    startGame();
}
