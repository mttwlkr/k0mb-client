import React from 'react';
import { pFSH } from '../../cleaners/init';
import { getShareOfVoice } from '../../cleaners/voice';
import { compareTwo } from '../../cleaners/compare';


export const withProfileTrend = Component => (props) => {
  const { data } = props;
  const { 
    profiles, 
    followers, 
    solids, 
    hovers,
    avgEngagement,
    pricePerPost,
    avgViewsPerVideo,
    commentBrandMentions,
  } = pFSH({ flatData: data });

  // todo - refactor these into one?

  const totalPhotosVsVideos = compareTwo({
    flatData: data,
    key1: 'totalVideoCount',
    key2: 'totalPhotoCount',
    solids,
    hovers,
    label1: 'Video',
    label2: 'Photo'
  })

  const avgLikes = compareTwo({
    flatData: data,
    key1: 'avgLikesPerVideo',
    key2: 'avgLikesPerPhoto',
    solids,
    hovers,
    label1: 'Video',
    label2: 'Photo'
  })

  const avgComments = compareTwo({
    flatData: data,
    key1: 'avgCommentsPerVideo',
    key2: 'avgCommentsPerPhoto',
    solids,
    hovers,
    label1: 'Video',
    label2: 'Photo'
  })

  const shareOfVoice = getShareOfVoice({ flatData: data })
  const areThereSomeBrandMentions = commentBrandMentions.some(val => val > 0);

  return (
    <Component
      {...props}
      data={{
        profiles,
        followers,
        solids,
        hovers,
        avgEngagement,
        pricePerPost,
        avgViewsPerVideo,
        commentBrandMentions,
        totalPhotosVsVideos,
        avgLikes,
        avgComments,
        areThereSomeBrandMentions,
        shareOfVoice,
      }}
    />
  )
}