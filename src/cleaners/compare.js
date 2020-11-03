export const compareTwo = ({ 
  flatData, 
  key1, 
  key2, 
  solids, 
  hovers,
  label1,
  label2
}) => {
  const total1 = flatData.map(page => page[key1])
  const total2 = flatData.map(page => page[key2])

  return [
    {
      label: label1,
      data: total1,
      backgroundColor: solids
    },
    {
      label: label2,
      data: total2,
      backgroundColor: hovers
    }
  ]
}