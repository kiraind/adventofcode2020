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

const instructions: Instruction[] = text.split('\n').map(line => {
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
    operation,
    argument
  }
})

function execute(instructions: Instruction[]): [accumulator: number, success: boolean] {
  let accumulator = 0
  const executed: Array<boolean> = new Array(instructions.length).fill(false)

  for(let ip = 0; ip < instructions.length;) {
    const instruction = instructions[ip] 
  
    if(executed[ip]) {
      return [accumulator, false]
    }

    executed[ip] = true
  
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

  return [accumulator, true]
}

const [accumulator, success] = execute(instructions)

console.log(`#1 After failed execution accumulator is ${accumulator}`)

for(let i = 0; i < instructions.length; i += 1) {
  const instruction = instructions[i]

  if(instruction.operation === Operation.JMP) {
    // mutate
    instruction.operation = Operation.NOP

    const [accumulator, success] = execute(instructions)

    if(success) {
      console.log(`#2 After successful execution accumulator is ${accumulator}`)
      break
    }

    // revert
    instruction.operation = Operation.JMP
  } else if(instruction.operation === Operation.NOP) {
    // mutate
    instruction.operation = Operation.JMP

    const [accumulator, success] = execute(instructions)

    if(success) {
      console.log(`#2 After successful execution accumulator is ${accumulator}`)
      break
    }

    // revert
    instruction.operation = Operation.NOP
  }
}

