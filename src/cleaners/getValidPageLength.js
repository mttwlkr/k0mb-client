export const getValidPageLength = (flatData, num) => {
  const sliced = flatData.slice(0, num);
  const pageWithPosts = sliced.find(page => page.perPostData.length > 0);
  const pageWithTimes = sliced.find(page => page.perDateData.length > 0);

  return {
    numOfPosts: pageWithPosts.perPostData.length,
    numOfDays: pageWithTimes.perDateData.length,
  }
}