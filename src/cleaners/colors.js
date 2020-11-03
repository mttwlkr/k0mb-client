export const numGen = () => {
  return Math.floor(Math.random() * 256)
}

export const rgaGenerator = (number) => {
  // console.log('number', number)
  const arr = Array.from(Array(number).keys())
  const colors = arr.map(() => {
    return [
      numGen(),
      numGen(),
      numGen(),
    ]
  })
  // console.log('colors', colors)
  return {
    four: colors.map(color => `(${color.concat('.4').join(',')})`),
    solid: colors.map(color => `(${color.concat(1).join(',')})`),
    two: colors.map(color => `(${color.concat('.2').join(',')})`),
  }
}


export const hexGen = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

export const hexGenerator = (number) => {
  return Array.from(Array(number).keys())
    .map(val => hexGen())
}

// pink
// red
// yellow
// orange
// cyan
// green
// blue
// purple
// geekblue
// magenta
// volcano
// gold
// lime

export const colorMap = {
  '1': 'purple', 
  '2': 'geekblue', 
  '3': 'cyan', 
  '4': 'green', 
  '5': 'lime', 
  '6': 'gold', 
  '7': 'orange', 
  '8': 'volcano', 
  '9': 'red',
  '10': 'magenta', 
}

// '1': 'magenta',
// '2': 'red',
// '3': 'volcano',
// '4': 'orange',
// '5': 'gold',
// '6': 'lime',
// '7': 'green',
// '8': 'cyan',
// '9': 'geekblue',
// '10': 'purple',