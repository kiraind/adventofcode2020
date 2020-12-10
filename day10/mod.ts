const text = (await Deno.readTextFile('input.txt')).trim()

const adapters = text.split('\n').map(s => parseInt(s))

const sortedAdapters = adapters.sort((a, b) => a - b)

let oneJoints = 0
let threeJoints = 0

let prev = 0 

for(let i = 0; i < sortedAdapters.length; i += 1) {
  const curr = sortedAdapters[i]

  if(curr - prev === 1) {
    oneJoints += 1
  } else if(curr - prev === 3) {
    threeJoints += 1
  }

  prev = curr
}

// built-in
threeJoints += 1

console.log(`#1 Multiple of counts of 1-diffs and 3-diffs is ${oneJoints * threeJoints}`)

const finalVoltage = sortedAdapters[sortedAdapters.length - 1] + 3
const adaptersSet = new Set(sortedAdapters)

const memo = new Map<number, number>()
function countArrangements(from: number): number {
  if(memo.has(from)) {
    return memo.get(from)!
  }

  if(from === finalVoltage - 3) {
    memo.set(from, 1)
    return 1
  }
  if(from > finalVoltage - 3) {
    memo.set(from, 0)
    return 0
  }

  let count = 0

  for(let i = from + 1; i <= from + 3; i += 1) {
    if(adaptersSet.has(i)) {
      count += countArrangements(i)
    }
  }

  memo.set(from, count)
  return count
}

const totalArrangements = countArrangements(0)
console.log(`#2 Number of total adapter arrangements is ${totalArrangements}`)
