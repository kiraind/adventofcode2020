const text = (await Deno.readTextFile('input.txt')).trim()

const numbers = text.split('\n').map(s => parseInt(s))

const windowSpan = 25
let invalidNumber: number | null = null

for(let i = windowSpan; i < numbers.length; i += 1) {
  const curr = numbers[i]
  const prevSpan = numbers.slice(i - windowSpan, i)

  let isSum = false

  for(let j = 0; j < prevSpan.length - 1; j += 1) {
    for(let k = j + 1; k < prevSpan.length; k += 1) {
      const a = prevSpan[j]
      const b = prevSpan[k]

      if(a + b === curr) {
        isSum = true
        break
      }
    }

    if(isSum) {
      break
    }
  }

  if(!isSum) {
    invalidNumber = curr
    break
  }
}

console.log(`#1 First number not being sum of two previous is ${invalidNumber}`)

for(let i = 0; i < numbers.length - 1; i += 1) {
  for(let j = i + 2; j <= numbers.length; j += 1) {
    const span = numbers.slice(i, j)

    const sum = span.reduce((sum, curr) => sum + curr, 0)

    if(sum === invalidNumber) {
      const max = Math.max(...span)
      const min = Math.min(...span)

      console.log(`#2 Sum of max and min in span is ${max + min}`)

      break
    }
  }
}