const fs = require('fs')
const { exit } = require('process')

const lines = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')

const rules = [{
    opening: '<',
    closing: '>',
    points: 25137
  }, {
    opening: '(',
    closing: ')',
    points: 3
  }, {
    opening: '[',
    closing: ']',
    points: 57
  }, {
    opening: '{',
    closing: '}',
    points: 1197
  }
]

const scores = lines.map(line => {
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
        return rule.points
    }
  }
  return 0
})

console.log(scores.reduce((acc, val) => acc + val, 0))