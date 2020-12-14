const text = (await Deno.readTextFile('input.txt')).trim()

const allOnes = 2n ** 36n - 1n

enum Operation {
  MASK,
  SET
}

interface Instruction {
  operation: Operation
}

interface MaskInstruction extends Instruction {
  operation: Operation.MASK
  newAndMask: bigint
  newOrMask:  bigint
}

interface SetInstruction extends Instruction {
  operation: Operation.SET
  addr:  bigint
  value: bigint
}

const program: (MaskInstruction | SetInstruction)[] = text.split('\n').map(line => {
  if(line.startsWith('mask')) {
    const [,,mask] = line.split(' ')

    let newAndMask = 0n
    let newOrMask = 0n

    mask.split('').forEach(bit => {
      newAndMask <<= 1n
      newOrMask  <<= 1n

      if(bit === '0') {
        newAndMask &= allOnes - 1n // set to 0
        newOrMask  &= allOnes - 1n // set to 0
      } else if(bit === '1') {
        newAndMask &= allOnes - 1n // set to 0
        newOrMask  |= 1n           // set to 1
      } else {
        newAndMask |= 1n           // set to 1
        newOrMask  &= allOnes - 1n // set to 0
      }
    })

    return {
      operation: Operation.MASK,
      newAndMask,
      newOrMask
    }
  } else {
    // starts with mem

    const [memStr,,valueStr] = line.split(' ')

    const addr = BigInt( memStr.match(/\d+/)![0] )
    const value = BigInt(valueStr)

    return {
      operation: Operation.SET,
      addr,
      value
    }
  }
})

// task 1

const memory1 = new Map<bigint, bigint>()

let andMask1 = 0n
let orMask1  = 0n

program.forEach(instruction => {
  if(instruction.operation === Operation.MASK) {
    andMask1 = instruction.newAndMask
    orMask1 = instruction.newOrMask
  } else {
    const { addr, value } = instruction

    const written = (value & andMask1 | orMask1) & allOnes

    memory1.set(addr, written) 
  }
})

let sum1 = 0n
memory1.forEach(value => {
  sum1 += value
})

console.log(`#1 ${sum1}`)

// task 2

const memory2 = new Map<bigint, bigint>()

let andMask2 = 0n
let orMask2  = 0n

program.forEach((instruction, i) => {
  if(instruction.operation === Operation.MASK) {
    andMask2 = instruction.newAndMask
    orMask2 = instruction.newOrMask
  } else {
    const { addr, value } = instruction

    const beAny = new Set<bigint>()
    let forceOneMask = 0n

    for(let i = 0n; i < 36n; i += 1n) {
      forceOneMask >>= 1n

      const currBit = 1n << i

      if(andMask2 & currBit) {
        // 1 0 -> X
        beAny.add(i)
      } else {
        if(orMask2 & currBit) {
          // 0 1 -> 1
          forceOneMask |= 1n << 35n          // set to 1
        } else {
          // 0 0 -> 0
          forceOneMask &= allOnes >> 1n // set to 0
        }
      }
    }

    const base = addr | forceOneMask

    if(beAny.size === 0) {
      memory2.set(base, value)
    } else {
      const bits = Array.from(beAny)

      const addresses: bigint[] = []

      // all combinations
      for(let i = 0n; i < 2n ** BigInt(beAny.size); i += 1n) {
        let addr = base

        bits.forEach((bit, j) => {
          if( i & (1n << BigInt(j)) ) {
            // if j-th bit on i is 1
            addr |= 1n << bit
          } else {
            addr &= ~(1n << bit)
          }
        })

        addresses.push(addr)
      }

      addresses.forEach(addr => memory2.set(addr, value))
    }
  }
})

let sum2 = 0n
memory2.forEach(value => {
  sum2 += value
})

console.log(`#2 ${sum2}`)