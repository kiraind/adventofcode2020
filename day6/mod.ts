const text = (await Deno.readTextFile('input.txt')).trim()

const groups = text.split('\n\n').map(gr => gr.split('\n').map(line => line.split('')))

let countCommon = 0
let count = 0

for(let i = 0; i < groups.length; i += 1) {
  const groupCommonSet = new Set<string>()
  let groupSet = new Set<string>( 'abcdefghijklmnopqrstuvwxyz'.split('') )

  groups[i].forEach(human => {
    const humanSet = new Set<string>()

    human.forEach(answer => {
      groupCommonSet.add(answer)
      humanSet.add(answer)
    })

    groupSet = new Set([...groupSet].filter(x => humanSet.has(x)))
  })

  countCommon += groupCommonSet.size
  count += groupSet.size
}

console.log(`#1 Yes-questions ${countCommon}`)
console.log(`#2 Yes-only-questions ${count}`)
