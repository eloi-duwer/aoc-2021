const fs = require('fs')

const digits = fs.readFileSync('input')
  .toString('utf-8')
  .split('\n')

const res = digits.reduce((acc, val) => [...acc, ...(val.split('|')[1].trim().split(' '))], [])

console.log(res.filter(num => [2, 3, 4, 7].includes(num.length)).length)