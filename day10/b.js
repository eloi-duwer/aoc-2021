const fs = require('fs')
const { exit } = require('process')

const lines = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')

const rules = [{
    opening: '<',
    closing: '>',
    points: 4
  }, {
    opening: '(',
    closing: ')',
    points: 1
  }, {
    opening: '[',
    closing: ']',
    points: 2
  }, {
    opening: '{',
    closing: '}',
    points: 3
  }
]

const scores = lines.filter(line => {
  let stack = []
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    const rule = rules.find(r => c === r.opening || c === r.closing)
    if (c === rule.opening) {
      stack.push(c)
    }
    else if (c === rule.closing) {
      if (stack.length === 0) {
        console.error('Stack empty!!!')
        exit(1)
      }
      let pop = stack.pop()
      if (pop !== rule.opening)
        return false
    }
  }
  return true
}).map(line => {
  let stack = []
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    const rule = rules.find(r => c === r.opening || c === r.closing)
    if (c === rule.opening) {
      stack.push(c)
    }
    else if (c === rule.closing) {
      if (stack.length === 0) {
        console.error('Stack empty!!!')
        exit(1)
      }
      let pop = stack.pop()
      if (pop !== rule.opening) {
        console.error('Invalid closing!!!')
        exit(1)
      }
    }
  }
  return calcScore(stack)
}).sort((a, b) => a - b)

function calcScore(stack) {
  return stack
    .reverse()
    .reduce((acc, val) => {
      return acc * 5 + rules.find(r => r.opening === val).points
    }, 0)
}

console.log(scores[Math.floor(scores.length / 2)])