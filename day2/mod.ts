const text = await Deno.readTextFile('input.txt')

const records = text.split('\n')

let validOne = 0
let validTwo = 0

for(let i = 0; i < records.length; i += 1) {
  const record = records[i]

  const [rule, password] = record.split(':').map(s => s.trim()) 

  const [ruleRange, ruleLetter] = rule.split(' ')
  const [ruleFirst, ruleSecond] = ruleRange.split('-').map(s => parseInt(s))

  // task 1
  const letterCount = password.split('').reduce(
    (count, letter) => count + (letter === ruleLetter ? 1 : 0),
    0
  )

  if(ruleFirst <= letterCount && letterCount <= ruleSecond) {
    validOne += 1
  }

  // task 2
  const first = password[ruleFirst - 1]
  const second = password[ruleSecond - 1]

  if(
    (first === ruleLetter && second !== ruleLetter) ||
    (first !== ruleLetter && second === ruleLetter)
  ) {
    validTwo += 1
  }
}

console.log(`#1 Found ${validOne} valid passwords`)
console.log(`#2 Found ${validTwo} valid passwords`)

