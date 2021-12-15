const fs = require('fs')

const file = fs.readFileSync('input').toString('utf-8').split('\n\n')
const nums = file[0].split(',').map(num => +num)
let boards = file
	.slice(1)
	.map(board => board.split('\n')
		.map(line => line.split(/\s+/)
			.map(n => parseInt(n))
			.filter(n => !isNaN(n))
		)
		.filter(line => line.length > 0)
	)

for (let i = 4; i < nums.length; i++) {
	
	let loosers = find_loosers(boards, nums.slice(0, i + 1))
	if (loosers.length === 0) {
		return calc_winner_score(boards[0], nums.slice(0, i + 1))
	}
	boards = loosers
}

function invert(board) {
	let inverted = []
	for (let i = 0; i < 5; i++) {
		inverted[i] = []
		for (let j = 0; j < 5; j++) {
			inverted[i][j] = board[j][i]
		}
	}
	return inverted
}

function find_loosers(boards, numbers) {
	return boards.filter(board => !does_win(board, numbers))
}

function does_win(board, numbers) {
	return board.some(line => line.every(number => numbers.includes(number)))
		|| invert(board).some(line => line.every(number => numbers.includes(number)))
}

function calc_winner_score(board, nums) {
	console.log(board
		.reduce((acc, val) => [...acc, ...val], [])
		.filter(n => !nums.includes(n))
		.reduce((acc, val) => acc + val, 0) * nums[nums.length - 1]
	)
}
