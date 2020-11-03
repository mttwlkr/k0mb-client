import React from 'react';
import {
  getDayOfWeekNum,
  getDayOfWeekString,
  getTimeOfDay,
  getHour
} from '../../cleaners/time';
import {
  getAvg,
  getTop,
  flattenArray
} from '../../cleaners/stats';
import { generateOrientation } from '../../cleaners/orientation';

const addInsights = (post) => {
  const numDay = getDayOfWeekNum(post.timestamp * 1000);
  return {
    ...post,
    isVideo: `${post.isVideo}`,
    dayOfWeek: getDayOfWeekString(numDay),
    timeOfDay: getTimeOfDay(post.timestamp * 1000),
    comment: (post && post.comment && post.comment.slice(0, 50)) || '',
    commentTextLength: (post && post.comment && post.comment.length) || 0,
    numMentions: (post && post.commentTags && post.commentTags.length) || 0,
    numHashtags: (post && post.hashTags && post.hashTags.length) || 0,
    numTags: (post && post.profileTags && post.profileTags.length) || 0,
    orientation: post && post.dimensions && generateOrientation(post.dimensions)
  }
}

const getSingleArrays = (array) => {
  return array.reduce((acc, curr) => {
    acc.timestamps.push(curr.timestamp * 1000);
    acc.onlyIsVideos.push(curr.isVideo);
    acc.onlyCommentLengths.push(curr.commentTextLength);
    acc.onlyMentions.push(curr.numMentions);
    acc.onlyHashtags.push(curr.numHashtags);
    acc.onlyOrientation.push(curr.orientation);
    if (curr.viewCount > 0) {
      acc.onlyViews.push(curr.viewCount);
    }
    if (curr.videoDuration > 0) {
      acc.onlyDuration.push(curr.videoDuration);
    }
    return acc;
  }, {
    timestamps: [],
    onlyIsVideos: [],
    onlyCommentLengths: [],
    onlyMentions: [],
    onlyHashtags: [],
    onlyOrientation: [],
    onlyViews: [],
    onlyDuration: []
  })
}

const getConclusions = (array) => {
  const {
    timestamps,
    onlyIsVideos,
    onlyCommentLengths,
    onlyMentions,
    onlyHashtags,
    onlyOrientation,
    onlyViews,
    onlyDuration,
  } = getSingleArrays(array);

  const times = timestamps.map(getHour);
  const days = timestamps.map(getDayOfWeekNum);
  const avgCommentLength = getAvg(onlyCommentLengths);
  const avgMentions = getAvg(onlyMentions);
  const avgHashtags = getAvg(onlyHashtags);
  const avgViews = onlyViews.length > 0 ? getAvg(onlyViews) : 0;
  const durationTop = onlyDuration.length > 0 ? getTop(onlyDuration, 1) : 0;

  const flatHash = flattenArray(array, 'hashTags');
  const flatMention = flattenArray(array, 'commentTags');

  const videoTop = getTop(onlyIsVideos, 1)[0]
  const timeTop = getTop(times, 1);
  const dayTop = getTop(days, 1);
  const hashTop = getTop(flatHash, 3);
  const mentionTop = getTop(flatMention, 3);
  const orientationTop = getTop(onlyOrientation, 1);

  return {
    time: `${timeTop}:00`,
    day: getDayOfWeekString(parseInt(dayTop, 10)),
    hashTop,
    mentionTop,
    useVideo: videoTop,
    avgCommentLength,
    avgMentions,
    avgHashtags,
    orientationTop,
    avgViews,
    durationTop,
  }
}

export const withPostInsight = Component => (props) => {
  const { data } = props;
  const map = data.reduce((acc, curr) => {
    const sorted = curr.perPostData
      .sort((a, b) => b.engagement - a.engagement);

    if (!acc[curr.name]) {
      acc[curr.name] = {};
    }

    const middle = Math.ceil(sorted.length / 2) > 10 ? 10 : Math.ceil(sorted.length / 2);

    const topArray = sorted
      .slice(0, middle)
      .map(addInsights);
    const topConclusions = getConclusions(topArray);
    acc[curr.name].topPosts = topArray;
    acc[curr.name].topStats = topConclusions;

    const bottomArray = sorted
      .slice(sorted.length - middle, sorted.length)
      .reverse()
      .map(addInsights);

    const bottomConclusions = getConclusions(bottomArray);
    acc[curr.name].bottomPosts = bottomArray
    acc[curr.name].bottomStats = bottomConclusions

    return acc
  }, {})

  
  return (
    <Component
      {...props}
      map={map}
    />
  )
}

export default withPostInsight
