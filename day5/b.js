const fs = require('fs')

const lines = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')
  .filter(line => line.length)

let heights = {}

lines.forEach(line => {
  let coords = line.split(' -> ')
  let [x1, y1] = coords[0].split(',').map(a => +a)
  let [x2, y2] = coords[1].split(',').map(a => +a)

  addPpoint(x1, y1)
  while (x1 != x2 || y1 != y2) {
    if (x1 < x2)
      x1++
    else if (x1 > x2)
      x1--
    if (y1 < y2)
      y1++
    else if (y1 > y2)
      y1--
    addPpoint(x1, y1)
  }
})

function addPpoint(x, y) {
  if (!heights[`${x},${y}`])
    heights[`${x},${y}`] = 0
  heights[`${x},${y}`]++
}

console.log(Object.values(heights).filter(v => v > 1).length)