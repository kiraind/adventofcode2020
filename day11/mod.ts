const text = (await Deno.readTextFile('input.txt')).trim()

enum CellState {
  FLOOR,
  EMPTY,
  OCCUPIED
}

const seats = text.split('\n')
  .map(
    line => line.split('')
      .map(
        cell => cell === '.'
          ? CellState.FLOOR
          : cell === 'L'
            ? CellState.EMPTY
            : CellState.OCCUPIED
      )
  )

let simulation1 = seats.map(row => [...row])
let simulation2 = seats.map(row => [...row])

function countOccupied(field: CellState[][]) {
  // count occupied
  let occupied = 0

  for(let i = 0; i < field.length; i += 1) {
    for(let j = 0; j < field.length; j += 1) {
      if(field[i][j] === CellState.OCCUPIED) {
        occupied += 1
      }
    }
  }

  return occupied
}

function step(field: CellState[][], tolerance: number, occupiedMetric: (field: CellState[][], i: number, j: number) => number): [number, CellState[][]] {
  let changed = 0

  const afterStep = field.map(row => [...row])

  for(let i = 0; i < afterStep.length; i += 1) {
    for(let j = 0; j < afterStep.length; j += 1) {
      const adj = occupiedMetric(field, i, j)

      if(field[i][j] === CellState.EMPTY && adj === 0) {
        afterStep[i][j] = CellState.OCCUPIED
        changed += 1
      } else if(field[i][j] === CellState.OCCUPIED && adj >= tolerance) {
        afterStep[i][j] = CellState.EMPTY
        changed += 1
      }
    }
  }

  return [changed, afterStep]
}

function occupiedAdjacent(field: CellState[][], i: number, j: number): number {
  let count = 0

  for(let k = i - 1; k <= i + 1; k += 1) {
    for(let l = j - 1; l <= j + 1; l += 1) {
      if(k === i && l === j) {
        continue
      }

      const adjacent: CellState | undefined = field[k]?.[l]

      if (adjacent === CellState.OCCUPIED) {
        count += 1
      }
    }
  }

  return count
}

function occupiedAround(field: CellState[][], i: number, j: number): number {
  let count = 0

  for(let k = -1; k <= 1; k += 1) {
    for(let l = -1; l <= 1; l += 1) {
      if(k === 0 && l === 0) {
        continue
      }

      // direction = [k, l]

      for(let distance = 1;; distance += 1) {
        const cords = {
          i: i + k * distance,
          j: j + l * distance,
        }

        const seen: CellState | undefined = field[cords.i]?.[cords.j]

        if(seen === undefined) {
          break
        }

        if (seen === CellState.OCCUPIED) {
          count += 1
          break
        } else if(seen === CellState.EMPTY) {
          break
        }
      }
    }
  }

  return count
}

// sim 1

let changed = 0
do {
  [changed, simulation1] = step(simulation1, 4, occupiedAdjacent)
} while(changed !== 0)

// count occupied
const finallyOccupied1 = countOccupied(simulation1)

console.log(`#1 ${finallyOccupied1} finally occupied seats`)

// sim 2

do {
  [changed, simulation2] = step(simulation2, 5, occupiedAround)
} while(changed !== 0)

// count occupied
const finallyOccupied2 = countOccupied(simulation2)

console.log(`#2 ${finallyOccupied2} finally occupied seats`)
