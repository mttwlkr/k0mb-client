export const getMedian = (array) => {
  if (array.length === 0) return 0;

  array.sort((a, b) => {
    return a - b;
  });

  const half = Math.floor(array.length / 2);

  if (array.length % 2)
    return array[half];

  return (array[half - 1] + array[half]) / 2.0;
}

export const getAvg = (array) => {
  return (array.reduce((acc, curr) => acc += curr, 0)) / array.length;
}

export const getTop = (array, numToReturn) => {
  const map = array.reduce((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = 0;
    }
    acc[curr] += 1;
    return acc;
  }, {})

  return Object.keys(map)
    .map(key => [key, parseInt(map[key], 10)])
    .sort((a, b) => b[1] - a[1]) // => [value, occurance of value]
    .map(arr => arr[0]) // comment out if you want to check # occurances
    .slice(0, numToReturn)
}

export const flattenArray = (array, key) => {
  return array.reduce((acc, curr) => {
    if (curr[key].length > 0) {
      curr[key].forEach(val => acc.push(val))
    }
    return acc;
  }, [])
}