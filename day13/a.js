const fs = require('fs')

let [coords, instructions] = fs.readFileSync('input')
    .toString('utf-8')
    .split('\n\n')

coords = coords.split('\n').map(c => c.split(',').map(n => +n))
instructions = instructions.split('\n')

let inst = instructions[0].slice(11)

let [maxX, maxY] = coords.reduce(([maxX, maxY], [x, y]) => {
    let ret = [maxX, maxY]
    if (x > maxX)
        ret[0] = x
    if (y > maxY)
        ret[1] = y
    return ret
}, [0, 0])

console.log({maxX, maxY})

// printCoords()

if (inst[0] === 'x')
    foldX(+(inst.split('=')[1]))
else
    foldY(+(inst.split('=')[1]))
// printCoords()
removeDuplicates()


console.log(coords.length)

function removeDuplicates() {
    coords = [...new Set(coords.map(c => c.join(',')))].map(c => c.split(',').map(c => +c))
}

function foldX(x) {
    coords = coords.map(coord => {
        if (coord[0] <= x)
            return coord
        return [x - (coord[0] - x), coord[1]]
    })
    maxX = x
}

function foldY(y) {
    coords = coords.map(coord => {
        if (coord[1] <= y)
            return coord
        return [coord[0], y - (coord[1] - y)]
    })
    maxY = y
}

function printCoords() {
    for (let i = 0; i <= maxY; i++) {
        let str = ''
        for (let j = 0; j <= maxX; j++) {
            if (coords.find(c => c[0] === j && c[1] === i))
                str += '#'
            else
                str += '.'
        }
        console.log(str)
    }
    console.log()
}