import { numGen } from './colors';;

export const getFlatDataOneKey = (data, key) => {
  const flatData = data.data
    .map(thing => thing)
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    })
    .map(page => {
      const rgb = [numGen(), numGen(), numGen()].join(',');
      return {
        ...page,
        rgbSolid: `rgba(${rgb},1)`,
        rgbHover: `rgba(${rgb},.5)`,
      }
    })

  return flatData
}

export const pFSH = ({ flatData }) => {
  return flatData.reduce((acc, curr) => {
    acc.profiles.push(curr.name);
    acc.followers.push(curr.followers);
    acc.solids.push(curr.rgbSolid);
    acc.hovers.push(curr.rgbHover);
    acc.avgEngagement.push(curr.avgEngag);
    acc.pricePerPost.push(curr.pricePerPost);
    acc.avgViewsPerVideo.push(curr.avgViewsPerVideo);
    acc.commentBrandMentions.push(curr.commentBrandMentions);
    
    return acc;
  }, {
    profiles: [],
    followers: [],
    solids: [],
    hovers: [],
    avgEngagement: [],
    pricePerPost: [],
    avgViewsPerVideo: [],
    commentBrandMentions: [],
  })
} 