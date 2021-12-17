const fs = require('fs')

let heights = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')

const len = heights[0].length

heights = heights
  .join('')
  .split('')

const lowests = heights.filter((h, i) =>
  lt(h, heights[i - len])
  && (i % len === 0 || lt(h, heights[i - 1]))
  && ((i + 1) % len === 0 || lt(h, heights[i + 1]))
  && lt(h, heights[i + len]))

console.log(lowests.reduce((acc, val) => acc + +val + 1, 0))

function lt(a, b) {
  if (isNaN(a) || isNaN(b))
    return true
  return a < b
}