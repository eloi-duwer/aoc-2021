const fs = require('fs')

const N_ITER = 256

let initial = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')
  [0]
  .split(',')
  .map(f => +f)

let fishs = {}

initial.forEach(fish => {
  if (!fishs[fish])
    fishs[fish] = 0
  fishs[fish]++
})

console.log(fishs)

for (let i = 0; i < N_ITER; i++) {
  let new_fishs = {}
  Object.entries(fishs).forEach(([days, nb]) => {
    if (+days === 0) {
      new_fishs[6] = nb
      new_fishs[8] = nb
    } else {
      if (!new_fishs[+days - 1])
        new_fishs[+days - 1] = 0
      new_fishs[+days - 1] += nb
    }
  })
  fishs = new_fishs
  console.log(i + 1, Object.values(fishs).reduce((acc, val) => acc + val, 0))
}

console.log(Object.values(fishs).reduce((acc, val) => acc + val, 0))