enum Operation {
  ACC,
  JMP,
  NOP
}

interface Instruction {
  operation: Operation
  argument: number
}

function printLines(instructions: Instruction[], finishesMap: Map<number, boolean>) {
  const outLines = []
  for(let i = 0; i < instructions.length; i += 1) {
    let line = ''

    line += finishesMap.get(i)! ? '👍' : '👎'
    line += ' '

    line += (i + 1).toString().padStart(4, ' ') + ' '

    let op = instructions[i].operation === Operation.ACC
      ? 'acc'
      : instructions[i].operation === Operation.JMP
       ? 'jmp'
       : 'nop'
    op += ' ' + (instructions[i].argument > 0 ? '+' + instructions[i].argument : instructions[i].argument)
    line += op.padEnd(10, ' ')

    if(
      instructions[i].operation === Operation.NOP ||
      instructions[i].operation === Operation.JMP
    ) {
      line += '-> ' + (i + 1 + instructions[i].argument)
    }

    outLines.push(line)
  }
  console.log(outLines.join('\n'))
}