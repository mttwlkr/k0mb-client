export const getShareOfVoice = ({ flatData }) => {
  const total = flatData.reduce((acc, curr) => {
    acc += (curr.totalLikes + curr.totalComments);
    return acc;
  }, 0)

  const percent = flatData.map(page => {
    const sum = (page.totalLikes + page.totalComments)
    return sum / total
  })
  return { total, percent }
}