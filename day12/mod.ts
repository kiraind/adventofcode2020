const text = (await Deno.readTextFile('input.txt')).trim()

const {
  cos,
  sin,
  PI,
  round,
  abs
} = Math

enum Action {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  LEFT,
  RIGHT,
  FORWARD
}

interface Instruction {
  action: Action,
  value: number
}

abstract class Ship {
  x = 0
  y = 0

  abstract execute(instruction: Instruction): void

  get manhattanDist() {
    return round(
      (abs(this.x) +  abs(this.y)) * 100
    ) / 100
  }
}

class ShipTask1 extends Ship {
  azimuth = -90

  execute(instruction: Instruction): void {
    const {
      action,
      value
    } = instruction

    switch(action) {
      case Action.NORTH: {
        this.y -= value
        break
      }
      case Action.SOUTH: {
        this.y += value
        break
      }
      case Action.EAST: {
        this.x += value
        break
      }
      case Action.WEST: {
        this.x -= value
        break
      }
      case Action.LEFT: {
        this.azimuth -= value
        break
      }
      case Action.RIGHT: {
        this.azimuth += value
        break
      }
      case Action.FORWARD: {
        this.x += value * sin(this.azimuth / 180 * PI)
        this.y += value * cos(this.azimuth / 180 * PI)
        break
      }
    }
  }
}

class ShipTask2 extends Ship {
  waypointX = 10 
  waypointY = -1

  execute(instruction: Instruction): void {
    const {
      action,
      value
    } = instruction

    switch(action) {
      case Action.NORTH: {
        this.waypointY -= value
        break
      }
      case Action.SOUTH: {
        this.waypointY += value
        break
      }
      case Action.EAST: {
        this.waypointX += value
        break
      }
      case Action.WEST: {
        this.waypointX -= value
        break
      }
      case Action.LEFT: {
        const deg = -value / 180 * PI

        const x = this.waypointX
        const y = this.waypointY

        this.waypointX = x * cos(deg) - y * sin(deg)
        this.waypointY = x * sin(deg) + y * cos(deg)
        break
      }
      case Action.RIGHT: {
        const deg = value / 180 * PI

        const x = this.waypointX
        const y = this.waypointY

        this.waypointX = x * cos(deg) - y * sin(deg)
        this.waypointY = x * sin(deg) + y * cos(deg)
        break
      }
      case Action.FORWARD: {
        this.x += value * this.waypointX
        this.y += value * this.waypointY
        break
      }
    }
  }
}

const instructions = text.split('\n').map(line => {
  let action: Action = Action.FORWARD

  switch(line[0]) {
    case 'N': {
      action = Action.NORTH
      break
    }
    case 'S': {
      action = Action.SOUTH
      break
    }
    case 'E': {
      action = Action.EAST
      break
    }
    case 'W': {
      action = Action.WEST
      break
    }
    case 'L': {
      action = Action.LEFT
      break
    }
    case 'R': {
      action = Action.RIGHT
      break
    }
    case 'F': {
      action = Action.FORWARD
      break
    }
  }

  const value = parseFloat(line.slice(1))

  return {
    action,
    value
  } as Instruction
})

const ship1 = new ShipTask1()

instructions.forEach(instruction => ship1.execute(instruction))

console.log(`#1 Manhattan distance from starting position ${ship1.manhattanDist}`)

const ship2 = new ShipTask2()

instructions.forEach(instruction => ship2.execute(instruction))

console.log(`#2 Manhattan distance from starting position ${ship2.manhattanDist}`)
