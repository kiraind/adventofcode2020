const text = (await Deno.readTextFile('input.txt')).trim()

enum Operation {
  ACC,
  JMP,
  NOP
}

interface Instruction {
  operation: Operation
  argument: number
}

const instructions: Instruction[] = text.split('\n').map((line, lineId) => {
  const [rawOp, rawArg] = line.split(' ')

  let operation

  switch (rawOp) {
    case 'acc':
      operation = Operation.ACC
      break;
    case 'jmp':
      operation = Operation.JMP
      break;
    default:
      operation = Operation.NOP
      break;
  }

  const argument = parseInt(rawArg)

  return {
    line: lineId,
    operation,
    argument,
  }
})

function execute(instructions: Instruction[]): [accumulator: number, success: boolean, gotHit: Set<number>] {
  let accumulator = 0
  const gotHit = new Set<number>()

  for(let ip = 0; ip < instructions.length;) {
    const instruction = instructions[ip] 
  
    if(gotHit.has(ip)) {
      return [accumulator, false, gotHit]
    }

    gotHit.add(ip)
  
    switch(instruction.operation) {
      case Operation.ACC:
        accumulator += instruction.argument
        ip += 1
        break;
      case Operation.JMP:
        ip += instruction.argument
        break;
      case Operation.NOP:
        ip += 1
        break;
    }
  }

  return [accumulator, true, gotHit]
}

const [failedAcc,, gotHit] = execute(instructions)
console.log(`#1 After failed execution accumulator is ${failedAcc}`)

const finishesMap = new Map<number, boolean>()

function finished(instructions: Instruction[], from = 0): boolean {
  const executed: Array<boolean> = new Array(instructions.length).fill(false)

  const visited = []

  for(let ip = from; ip < instructions.length;) {
    if(finishesMap.has(ip)) {
      const success = finishesMap.get(ip)!

      visited.forEach(line => {
        finishesMap.set(line, success)
      })

      return success
    } else {
      visited.push(ip)
    }

    const instruction = instructions[ip]  
  
    if(executed[ip]) {
      visited.forEach(line => {
        finishesMap.set(line, false)
      })

      return false
    }

    executed[ip] = true
  
    switch(instruction.operation) {
      case Operation.JMP:
        ip += instruction.argument
        break;
      default:
        ip += 1
        break;
    }
  }

  visited.forEach(line => {
    finishesMap.set(line, true)
  })

  return true
}

// create map
for(let i = instructions.length - 1; i >= 0; i -= 1) {
  if(!finishesMap.has(i)) {
    const success = finished(instructions, i)

    finishesMap.set(i, success)
  }
}

// fixing error
for(let i = 0; i < instructions.length; i += 1) {
  if(!gotHit.has(i)) {
    continue
  }

  const instruction = instructions[i]

  if(instruction.operation === Operation.NOP) {
    const potentialTarget = i + instruction.argument

    if(finishesMap.get(potentialTarget)!) {
      // fix error
      instructions[i].operation = Operation.NOP
      break
    }
  } else if(instruction.operation === Operation.JMP) {
    const potentialTarget = i + 1

    if(finishesMap.get(potentialTarget)!) {
      // fix error
      instructions[i].operation = Operation.NOP
      break
    }
  }
}

const [finalAccumulator] = execute(instructions)

console.log(`#2 After successful execution accumulator is ${finalAccumulator}`)
