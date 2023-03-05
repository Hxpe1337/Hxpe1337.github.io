let turn = 1;
let gameEnded = false;
const board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
	[0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
	[0, 4, 8], [2, 4, 6] // diagonal
];

function markCell(cell) {
	if (gameEnded || board[cell.id] !== '') {
		return;
	}

	const symbol = turn === 1 ? 'X' : 'O';
	cell.innerHTML = symbol;
	board[cell.id] = symbol;

	if (checkWin()) {
		endGame(`${symbol} wygrywa!`);
	} else if (checkTie()) {
		endGame("Remis!");
	} else {
		turn = turn === 1 ? 2 : 1;
		document.getElementById('turn').innerHTML = `Runda gracza: ${turn}`;
	}
}

function checkWin() {
	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return true;
		}
	}
	return false;
}

function checkTie() {
	return board.every(cell => cell !== '');
}

function endGame(message) {
	gameEnded = true;
	document.getElementById('result').innerHTML = message;
	document.getElementById('result').style.display = 'block';
	document.getElementById('play-again').style.display = 'block';
}

function resetGame() {
	turn = 1;
	gameEnded = false;
	board.fill('');
	document.querySelectorAll('td').forEach(cell => cell.innerHTML = '');
	document.getElementById('turn').innerHTML = `Rozpoczyna gracz 1!`;
	document.getElementById('result').style.display = 'none';
	document.getElementById('play-again').style.display = 'none';
}

document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', () => markCell(cell)));
document.getElementById('play-again').addEventListener('click', resetGame);
