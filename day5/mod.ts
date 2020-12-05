const text = (await Deno.readTextFile('input.txt')).trim()

const paths = text.split('\n')

const seats = paths.map(path => {
  let rowFront = 0
  let rowBack  = 127

  for(let i = 0; i < 7; i += 1) {
    if(path[i] === 'F') {
      rowBack = rowFront + Math.floor((rowBack - rowFront) / 2)
    } else {
      rowFront = rowFront + Math.ceil((rowBack - rowFront) / 2)
    }
  }

  let colLeft  = 0
  let colRight = 7

  for(let i = 7; i < 10; i += 1) {
    if(path[i] === 'L') {
      colRight = colLeft + Math.floor((colRight - colLeft) / 2)
    } else {
      colLeft = colLeft + Math.ceil((colRight - colLeft) / 2)
    }
  }

  return {
    row: rowFront,
    col: colLeft
  }
})

const seatIds = seats.map(({ row, col }) => row * 8 + col)

seatIds.sort((a, b) => a - b)

const maxSeatId = seatIds[seatIds.length - 1]

console.log(`#1 Highest seat ID on a boarding pass: ${maxSeatId}`)

for(let i = 0; i < seatIds.length - 1; i += 1) {
  const left  = seatIds[i]
  const right = seatIds[i + 1]

  if(right - left === 2) {
    console.log(`#2 My seat ID: ${left + 1}`)
    break
  }
}
