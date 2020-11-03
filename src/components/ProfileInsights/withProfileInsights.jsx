import React from 'react';

const getRank = (data, key) => {
  return data
    .map(profile => {
      return {
        ...profile,
        [key]: (profile.followers / 100) * profile[key]
      }
    })
    .sort((a, b) => b[key] - a[key])
    .map((profile, idx) => ({ name: profile.name, rank: idx + 1 }))
    .reduce((acc, curr) => {
      if (!acc[curr]) {
        acc[curr.name] = curr.rank;
      }
      return acc;
    }, {})
}

const getTotal = (data) => {
  return data.reduce((acc, curr) => {
    acc += (curr.totalLikes + curr.totalComments);
    return acc;
  }, 0)
}

export const withProfileInsights = Component => (props) => {
  const { data } = props;
  
  const map = getRank(data, 'avgEngag');
  const photoMap = getRank(data, 'photoEngage');
  const videoMap = getRank(data, 'videoEngage');
  const totalVoice = getTotal(data);

  const dataWithRanks = data.map(profile => {
    return {
      ...profile,
      videoRank: videoMap[profile.name],
      photoRank: photoMap[profile.name],
      overallRank: map[profile.name],
      shareOfVoice: (profile.totalLikes + profile.totalComments) / totalVoice,
    }
  })

  const ranks = dataWithRanks.reduce((acc, curr) => {
    if (curr.followers > acc.mostFollowers.followers) {
      acc.mostFollowers = curr;
    }

    if (curr.avgEngag > acc.bestOverallEngagement.avgEngag) {
      acc.bestOverallEngagement = curr;
    }

    if (curr.avgEngag < acc.worstOverallEngagement.avgEngag || acc.worstOverallEngagement.avgEngag === 0) {
      acc.worstOverallEngagement = curr;
    }

    if (curr.photoEngage > acc.bestPhotoEngagement.engagement) {
      acc.bestPhotoEngagement = curr;
    }

    if (curr.photoEngage < acc.worstPhotoEngagement.engagement || acc.worstPhotoEngagement.engagement === 0 ) {
      acc.worstPhotoEngagement = curr;
    }

    if (curr.videoEngage > acc.bestVideoEngagement.engagement) {
      acc.bestVideoEngagement = curr;
    }

    if (curr.videoEngage > acc.worstVideoEngagement.engagement) {
      acc.worstVideoEngagement = curr;
    }

    if (curr.overallRank === 1) {
      acc.bestOverallScore = curr;
    }

    if (curr.videoRank === 1) {
      acc.bestVideoScore = curr;
    }

    if (curr.photoRank === 1) {
      acc.bestPhotoScore = curr;
    }

    if (curr.overallRank === dataWithRanks.length) {
      acc.worstOverallScore = curr;
    }

    if (curr.photoRank === dataWithRanks.length) {
      acc.worstPhotoScore = curr;
    }

    if (curr.videoRank === dataWithRanks.length) {
      acc.worstVideoScore = curr;
    }

    if (curr.cadence > acc.bestCadence.cadence) {
      acc.bestCadence = curr;
    }

    if (curr.cadence < acc.worstCadence.cadence || acc.worstCadence.cadence === 0) {
      acc.worstCadence = curr;
    }

    return acc;
  }, {
    bestOverallEngagement: { avgEngag: 0 },
    bestPhotoEngagement: { engagement: 0 },
    bestVideoEngagement: { engagement: 0 },
    bestOverallScore: { engagement: 0 },
    bestPhotoScore: { engagement: 0 },
    bestVideoScore: { engagement: 0 },
    worstOverallScore: { engagement: 0 },
    worstPhotoScore: { engagement: 0 },
    worstVideoScore: { engagement: 0 },
    worstOverallEngagement: { avgEngag: 0 },
    worstPhotoEngagement: { engagement: 0 },
    worstVideoEngagement: { engagement: 0 },
    mostFollowers: { followers: 0 },
    bestCadence: { cadence: 0 },
    worstCadence: { cadence: 0 },
    // mostLikes: { name: null, likes: 0 },
  }) 

  return (
    <Component
      {...props}
      data={dataWithRanks}
      ranks={ranks}
    />
  )
}

// name: "Backcountry"
// biography: "The backcountry is where you play, unwind, and connect with nature. We have everything you need to get you there. #FindYourBackcountry"
// isVerified: true
// isBusinessAccount: true
// followers: 730149
// followees: 2059
// newestTimestamp: 1571000598
// oldestTimestamp: 1560656378
// totalPostCount: 114
// totalLikes: 505156
// totalComments: 3155
// avgLikePerPost: 4431.19
// avgCommentPerPost: 27.68
// totalPhotoCount: 112
// totalVideoCount: 2
// totalLikesOnPhotos: 499272
// totalLikesOnVideos: 5884
// totalCommentsOnPhotos: 3111
// totalCommentsOnVideos: 44
// avgLikesPerPhoto: 4457.79
// avgLikesPerVideo: 2942
// avgCommentsPerPhoto: 27.78
// avgCommentsPerVideo: 22
// totalViewCount: 28863
// avgViewsPerVideo: 14431.5
// perPostData: (114)
// avgEngag: 0.006
// photoEngage: 0.006
// videoEngage: 0.004
// pricePerPost: 438.08939999999996
// commentBrandMentions: 0
// perDateData: (121)
// rgbSolid: "rgba(39,27,87,1)"
// rgbHover: "rgba(39,