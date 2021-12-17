const fs = require('fs')

let heights = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')
  .map(l => l
    .split('')
    .map(n => +n)
    .map(n => ({
      n: n === 9 ? +Infinity : n,
      group: null
    })))

const lowests = []

for (let i = 0; i < heights.length; i++) {
  for (let j = 0; j < heights[0].length; j++ ) {
    let n = heights[i][j]
    if ( lt(n, heights[i - 1]?.[j])
      && lt(n, heights[i + 1]?.[j])
      && lt(n, heights[i][j - 1])
      && lt(n, heights[i][j + 1])) {
        lowests.push({i, j})
      }
  }
}

console.log(lowests)

function lt(a, b) {
  if (isNaN(a?.n) || isNaN(b?.n))
    return true
  return a.n < b.n
}

lowests.forEach(({i: origI, j: origJ}, index) => {
  let list = [{i: origI, j: origJ}]

  while (list.length) {
    let {i, j}  = list.pop()
    if ((heights[i]?.[j].n ?? +Infinity) !== +Infinity) {
      heights[i][j].group = index
      if (heights[i][j - 1] && heights[i][j - 1].group === null)
        list.push({i, j: j - 1})
      if (heights[i][j + 1] && heights[i][j + 1].group === null)
        list.push({i, j: j + 1})
      if (heights[i - 1]?.[j] && heights[i - 1][j].group === null)
        list.push({i: i - 1, j})
      if (heights[i + 1]?.[j] && heights[i + 1][j].group === null)
        list.push({i: i + 1, j: j})
    }
  }
})

let groupSizes = []

lowests.forEach(({i, j}) => {
  groupSizes
    .push(heights
      .reduce((acc, line) => acc + line
          .filter(n => n.group === heights[i][j].group)
          .length,
        0
      )
    )
})

groupSizes.sort((a, b) => b - a)
console.log(groupSizes)
console.log(groupSizes[0] * groupSizes[1] * groupSizes[2])