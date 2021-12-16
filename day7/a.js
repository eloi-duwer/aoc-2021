const fs = require('fs')

let min = +Infinity
let max = -Infinity

let nums = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')
  [0]
  .split(',')
  .map(n => +n)

nums.forEach(n => {
  if (n < min)
    min = n
  if (n > max)
    max = n
})

console.log(nums, min, max)

let min_fuel = +Infinity

for (let target = min; target < max; target++) {
  let fuel = calcToTarget(target)
  if (fuel < min_fuel)
    min_fuel = fuel
}

console.log(min_fuel)

function calcToTarget(target) {
  return nums.reduce((acc, val) => {
    return acc + Math.abs(target - val)
  }, 0)
}