const text = (await Deno.readTextFile('input.txt')).trim()

const records = text.split('\n')

const rules = records.map(record => {
  const [id, decsr] = record.split('contain').map(s => s.trim())

  const idParts = id.split(' ')
  const name = idParts[0] + ' ' + idParts[1]

  const contains = decsr === 'no other bags.'
    ? []
    : decsr.split(',').map(s => s.trim()).map(bags => {
      const words = bags.split(' ')

      const count = parseInt(words[0])
      const title = words[1] + ' ' + words[2]

      return {
        count,
        title,
      }
    })

  return {
    name,
    contains,
  }
})

const shinyGold: Record<string, number> = {
  'shiny gold': 1
}

let added = 0

do {
  added = 0

  rules.forEach(rule => {
    if(shinyGold[rule.name] !== undefined) {
      return
    }

    const contained = rule.contains.find(bag => bag.title in shinyGold && bag.count > 0)

    if(
      contained !== undefined
    ) {
      shinyGold[rule.name] = 1
      added += 1
    }
  })
} while(added !== 0)

const shinyGoldCount = Object.keys(shinyGold).length - 1 // -1 because of shiny gold

console.log(`#1 ${shinyGoldCount} bag colors can contain shiny gold`)

const countContained = (name: string) => {
  let count = 1

  for(let i = 0; i < rules.length; i += 1) {
    const rule = rules[i]

    if(rule.name === name) {
      rule.contains.forEach(contained => {
        count += contained.count * countContained(contained.title)
      })

      break
    }
  }

  return count
}

const shinyGoldContains = countContained('shiny gold') - 1 // -1 because of shiny gold

console.log(`#2 Shiny gold must contain ${shinyGoldContains} other bags`)
