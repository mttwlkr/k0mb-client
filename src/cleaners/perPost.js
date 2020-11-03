const lineConfig = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'square',
  borderDash: [], // try [5, 15] for instance
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 8,
  pointHoverBorderWidth: 2,
  pointRadius: 4,
  pointHitRadius: 10,
  spanGaps: true,
}

const dataPerPost = (data) => {
  return data.reduce((acc, curr) => {
    if (!curr || curr === null) {
      acc.thumbnails.push({ thumbnail: null, id: null })
      acc.likes.push(null)
      acc.comments.push(null)
      acc.engagement.push(null)
    } else {
      acc.thumbnails.push({ thumbnail: curr.thumbnail, id: curr.shortcode })
      acc.likes.push(curr.numLikes)
      acc.comments.push(curr.numComments)
      acc.engagement.push(curr.engagement)
    }

    return acc;
  }, {
    thumbnails: [],
    likes: [],    
    comments: [],    
    engagement: [],  
  })
}

export const getPerPost = (flatData) => {
  let profileWithMostPosts = [];

  const perPost = flatData.reduce((acc, page) => {

    const sorted = page.perPostData.sort((a, b) => b.timestamp - a.timestamp);
    if (sorted.length > profileWithMostPosts.length) {
      profileWithMostPosts = sorted;
    } 

    const config = {
      ...lineConfig,
      label: page.name,
      borderColor: page.rgbHover, // The main line color
      pointBackgroundColor: page.rgbSolid,
      pointHoverBackgroundColor: page.rgbHover,
      pointHoverBorderColor: page.rgbSolid,
      backgroundColor: page.rgbHover,
    }

    const time = dataPerPost(page.perDateData);
    const perPost = dataPerPost(sorted);
    
    // acc.sorted = sorted
    acc.likeTime.push(Object.assign({}, config, { data: time.likes }, { thumbnails: time.thumbnails }));
    acc.likePost.push(Object.assign({}, config, { data: perPost.likes }, { thumbnails: perPost.thumbnails }));
    acc.commentTime.push(Object.assign({}, config, { data: time.comments }, { thumbnails: time.thumbnails }));
    acc.commentPost.push(Object.assign({}, config, { data: perPost.comments }, { thumbnails: perPost.thumbnails }));
    acc.engagementTime.push(Object.assign({}, config, { data: time.engagement }, { thumbnails: time.thumbnails }));
    acc.engagementPost.push(Object.assign({}, config, { data: perPost.engagement }, { thumbnails: perPost.thumbnails }));

    return acc;
  }, {
    likeTime: [],
    likePost: [],
    commentTime: [],
    commentPost: [],
    engagementTime: [],
    engagementPost: [],
    // sorted: [],
  })
  perPost.postLabels = profileWithMostPosts.map((d, i) => `Post ${i + 1}`)

  return perPost;
}