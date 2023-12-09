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

let computerMoveTimeout; // This will hold the timeout ID

document.getElementById('ticTacToeButton').addEventListener('click', function() {
    var ticTacToeWidget = document.getElementById('ticTacToeWidget');
    ticTacToeWidget.style.display = ticTacToeWidget.style.display === 'block' ? 'none' : 'block';
    if (ticTacToeWidget.style.display === 'block') {
        startGame();
    }
});

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== 'X') {
        return;
    }

    makeMove(clickedCell, clickedCellIndex, currentPlayer);
    if (!checkForWinner()) {
        currentPlayer = 'O';
        setTimeout(computerMove, 2000);
    }
}

function makeMove(cell, index, player) {
    gameState[index] = player;
    cell.innerHTML = player;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function computerMove() {
    if (!gameActive || currentPlayer !== 'O') {
        return;
    }

    let availableSpots = gameState.map((cell, index) => cell === "" ? index : null).filter(val => val !== null);

    if (availableSpots.length === 0) {
        return;
    }

    let computerMoveIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    let cell = document.querySelectorAll('.tic-tac-toe-cell')[computerMoveIndex];
    makeMove(cell, computerMoveIndex, 'O');
    checkForWinner();
}

function checkForWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
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
        alert(`Player ${currentPlayer === 'O' ? 'O (Computer)' : 'X (You)'} has won!`);
        gameActive = false;
        return true;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        alert("The game ended in a draw!");
        gameActive = false;
        return true;
    }

    return false;
}

function startGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('tic-tac-toe-cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function resetGame() {
    clearTimeout(computerMoveTimeout);
    startGame();
}

