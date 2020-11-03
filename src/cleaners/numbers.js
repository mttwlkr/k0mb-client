const getNum = (dunno) => {
  return dunno === 'number'
    ? dunno
    : parseFloat(dunno)
}

export const insertCommas = (
  n, 
  numRemain, 
  includeSymbol
) => {
  const num = getNum(n);

  const amount = num
    .toFixed(numRemain)
    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return includeSymbol ? `$${amount}` : amount;
}

export const toPercent = (float, numRemain, includeSymbol) => {
  const n = getNum(float);
  const num = n * 100;
  return includeSymbol
    ? `${num.toFixed(numRemain)}%`
    : `${num.toFixed(numRemain)}`
}