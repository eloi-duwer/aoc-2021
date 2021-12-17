const fs = require('fs')

const digits = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')

console.log(digits.reduce((acc, line) => acc + decodeLine(line), 0))

function decodeLine(line) {
  let [clues, test] = line.split('|').map(l => l.trim().split(' '))
  
  clues = clues.map(c => sortLetters(c))
  test = test.map(t => sortLetters(t))

  const one = clues.filter(c => c.length === 2)[0]
  const four = clues.filter(c => c.length === 4)[0]
  const seven = clues.filter(c => c.length === 3)[0]
  const height = clues.filter(c => c.length === 7)[0]

  const nine = clues.filter(c => c.length === 6 && containsAll(four, c))[0]
  const zero = clues.filter(c => c.length === 6 && !equals(c, nine) && containsAll(one, c))[0]
  const six = clues.filter(c => c.length === 6 && !equals(c, nine) && !equals(c, zero))[0]
  const three = clues.filter(c => c.length === 5 && containsAll(one, c))[0]
  const five = clues.filter(c => c.length === 5 && containsAll(c, six))[0]
  const two = clues.filter(c => c.length === 5 && !equals(c, five) && !equals(c, three))[0]

  const nums = [zero, one, two, three, four, five, six, seven, height, nine]

  return test.reduce((acc, val) => 10 * acc + nums.findIndex(n => equals(n, val)), 0)
}

function sortLetters(word) {
  let ret = []
  for (let i = 0; i < word.length; i++) {
    ret.push(word[i])
  }
  return ret.sort((a, b) => a > b ? 1 : -1)
}

//checks that arrA contains all the letters from arrB
function containsAll(arrA, arrB) {
  return arrA.every(c => arrB.includes(c))
}

function equals(arrA, arrB) {
  return arrA.length === arrB.length && arrA.every((c, i) => c === arrB[i])
}