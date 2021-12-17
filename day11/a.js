const fs = require('fs')

;(() => {
    let energy = fs.readFileSync('input')
        .toString('utf-8')
        .split('\n')
        .map(line => line.split('').map(c => +c))

    let ret = 0

    for (let iter = 0; iter < 100; iter++) {
        for (let i = 0; i < energy.length; i++) {
            for (let j = 0; j < energy[0].length; j++) {
                energy[i][j]++
            }
        }
        let flashes = findFlashes(energy)
        while (true) {
            upFlashes(energy, flashes)
            let newFlashes = findFlashes(energy)
            if (newFlashes.length === 0)
                break
            flashes = newFlashes
        }
        printEnergy(iter, energy)
        ret += countFlashes(energy)
    }
    console.log(ret)
})()

function findFlashes(energy) {
    return energy.reduce((acc, line, i) => {
        return [...acc, ...line.reduce((acc2, n, j) => {
            if (n > 9) {
                energy[i][j] = 0
                return [...acc2, {i, j}]
            }
            return [...acc2]
        }, [])]
    }, [])
}

function upFlashes(energy, flashes) {
    flashes.forEach(({i: x, j: y}) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i === 0 && j === 0)
                    || (isNaN(energy[x + i]?.[y + j]))
                    || energy[x + i][y + j] === 0)
                    continue
                energy[x + i][y + j]++
            }
        }
    })
}

function countFlashes(energy) {
    let ret = 0
    for (let i = 0; i < energy.length; i++) {
        for (let j = 0; j < energy[0].length; j++) {
            if (energy[i][j] === 0) {
                ret++
            }
        }
    }
    return ret
}

function printEnergy(iter, energy) {
    console.log(iter + 1, '\n' + energy.map(line => line.join('').replace(/0/g, '█')).join('\n') + '\n')
}