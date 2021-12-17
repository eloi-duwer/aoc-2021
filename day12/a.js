const fs = require('fs')

let nodes = {}

fs.readFileSync('input')
    .toString('utf-8')
    .split('\n')
    .forEach(path => {
        let [start, end] = path.split('-')
        if (!nodes[start])
            nodes[start] = []
        nodes[start].push(end)
        if (!nodes[end])
            nodes[end] = []
        nodes[end].push(start)
    })

console.log(nodes)

let finishedPaths = []
let paths = nodes.start.map(to => [to, 'start'])

while (paths.length > 0) {
    path = paths.pop()
    if (path[0] === 'end') {
        finishedPaths.push(path)
        continue
    }
    nodes[path[0]].forEach(to => {
        if (canGo(path, to))
            paths.push([to, ...path])
    })
}

function canGo(path, to) {
    return to !== 'start' && (isUpper(to) || !path.find(p => p === to))
}

function isUpper(str) {
    return str.split('').every(c => c >= 'A' && c <= 'Z')
}

console.log(finishedPaths.length)