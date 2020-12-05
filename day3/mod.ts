const text = (await Deno.readTextFile('input.txt')).trim()

const treesMap = text
  .split('\n')
  .map(
    line => line.split('').map(ch => ch === '#')
  )

const height = treesMap.length
const width  = treesMap[0].length

const countTrees = (slopeRight: number, slopeDown: number) => {
  let posX = 0
  let posY = 0
  let count = 0

  while(posY < height) {
    if(treesMap[posY][posX % width]) {
      count += 1
    }

    posX += slopeRight
    posY += slopeDown
  }

  return count
}

console.log(`#1 Encountered ${countTrees(3, 1)} trees`)

console.log(`#2 Product is ${[
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce(
  (prod, [right, down]) => prod * countTrees(right, down),
  1
)}`)
