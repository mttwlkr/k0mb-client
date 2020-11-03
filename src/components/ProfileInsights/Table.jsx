import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom'
import { insertCommas, toPercent } from '../../cleaners/numbers';
import { colorMap } from '../../cleaners/colors';
import Thumbnail from '../Utilities/Thumbnail';
import { Mixpanel } from '../Mixpanel';

const isPresenting = false;

const RenderTable = ({ posts, usePicture, location, history }) => {
  const [data, setData] = useState(posts);
  const [sortedInfo, setSortedInfo] = useState({
    order: null,
    columnKey: null
  });

  useEffect(() => {
    setData(posts)
    return () => setData(posts);
  }, [posts])

  const handleChange = (pagination, filters, sorter, extra) => {
    // console.log('pagination', pagination)
    // console.log('filters', filters)
    // console.log('extra', extra)
    const { order, column, columnKey } = sorter;
    // console.log('sorter', sorter)
    if (sorter && order && columnKey) {
      setSortedInfo({
        order,
        columnKey
      })
      const sorted = data.sort(column.sorter)
      setData(sorted);

      const split = location.pathname.split('/');
      const group = split[1];
      const pageName = split[2];
      Mixpanel.track(`Sort ${pageName} (${group}): ${columnKey} - ${order}`, {
        order,
        columnKey,
        pageName,
        profile,
      })
    }
  };

  let profile;

  if (usePicture) {
    profile = {
      title: 'Profile',
      dataIndex: 'profilePic',
      fixed: 'left',
      render: (picUrl, user) => (
        <Thumbnail 
          imgUrl={picUrl} 
          shortcode={user.username} 
        />
      ),
    }
  }

  if (!usePicture) {
    profile = {
      title: 'Profile',
      dataIndex: 'name',
      width: 60,
      fixed: 'left',
      sorter: (a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        if (a.name === b.name) {
          return 0;
        }
      },
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      render: (name, user) => (
        <span>
          <a
            href={`https://instagram.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </span>
      )
    }
  }

  const sameCadence = posts.every(val => val.cadence === posts[0].cadence);
  const cadence = sameCadence ? {} : {
    title: (
      <Tooltip title="How frequent, per week, they post">
        Cadence
      </Tooltip>
    ),
    dataIndex: 'cadence',
    sorter: (a, b) => a.cadence - b.cadence,
    sortOrder: sortedInfo.columnKey === 'cadence' && sortedInfo.order,
    render: (val) => <span>{`${insertCommas((val * 7), 2, false)}/wk`}</span>,
  };

  const postButton = {
    title: (
      <Tooltip title="The profile's best and worst posts">
        Post Insights
      </Tooltip>
    ),
    dataIndex: null,
    render: (insta) => {
      const totalPosts = insta.totalPostCount > 20 ? 10 : Math.ceil(insta.totalPostCount / 2);
      return (
        <Button
          onClick={() => {
            Mixpanel.track(`Route: Profile to ${insta.name}`)
            window.scrollTo(0, 0)
            history.push(`postInsight/${insta.name}`)
          }}
        >
          {`Best ${totalPosts} Posts`}
        </Button>
      )
    }
  }

  const followers = {
    title: 'Followers',
    dataIndex: 'followers',
    sorter: (a, b) => a.followers - b.followers,
    sortOrder: sortedInfo.columnKey === 'followers' && sortedInfo.order,
    render: (val) => <span>{insertCommas(val, 0, false)}</span>,
  };

  const bestDay = {
    title: (
      <Tooltip title="Their best day to post">
        Day
      </Tooltip>
    ),
    dataIndex: 'bestDay',
  };

  const bestTime = {
    title: (
      <Tooltip title="Their best time to post">
        Time
      </Tooltip>
    ),
    dataIndex: 'bestTime',
  }

  const shareOfVoice = {
    title: (
      <Tooltip title="Share of Voice">
        Voice
      </Tooltip>
    ),
    dataIndex: 'shareOfVoice',
    sorter: (a, b) => a.shareOfVoice - b.shareOfVoice,
    sortOrder: sortedInfo.columnKey === 'shareOfVoice' && sortedInfo.order,
    render: (val) => <span>{toPercent(val, 2, true)}</span>,
  };

  const avgLikes = {
    title: (
    <Tooltip title="Average Likes">
      Likes
    </Tooltip>
    ),
    dataIndex: 'avgLikePerPost',
    sorter: (a, b) => a.avgLikePerPost - b.avgLikePerPost,
    sortOrder: sortedInfo.columnKey === 'avgLikePerPost' && sortedInfo.order,
    render: (val) => <span>{insertCommas(val, 0, false)}</span>,
  };

  const avgComments = {
    title: (
      <Tooltip title="Average Comments">
        Comm
    </Tooltip>
    ),
    dataIndex: 'avgCommentPerPost',
    sorter: (a, b) => a.avgCommentPerPost - b.avgCommentPerPost,
    sortOrder: sortedInfo.columnKey === 'avgCommentPerPost' && sortedInfo.order,
    render: (val) => <span>{insertCommas(val, 0, false)}</span>,
  };

  const avgViews = {
    title: (
      <Tooltip title="Average Video Views">
        Views
    </Tooltip>
    ),
    dataIndex: 'avgViewsPerVideo',
    sorter: (a, b) => a.avgViewsPerVideo - b.avgViewsPerVideo,
    sortOrder: sortedInfo.columnKey === 'avgViewsPerVideo' && sortedInfo.order,
    render: (val) => <span>{insertCommas(val, 0, false)}</span>,
  };

  const valuePerPost = {
    title: (
      <Tooltip title="Average Post Value: (Followers / 10) * Average Post Engagement">
        Value
      </Tooltip>
    ),
    dataIndex: 'pricePerPost',
    sorter: (a, b) => a.pricePerPost - b.pricePerPost,
    sortOrder: sortedInfo.columnKey === 'pricePerPost' && sortedInfo.order,
    render: (val) => <span>{insertCommas(val, 2, true)}</span>,
  };

  const avgEngagement = {
    title: (
      <Tooltip title="Average Post Engagement">
        Engage
      </Tooltip>
    ),
    dataIndex: 'avgEngag',
    sorter: (a, b) => a.avgEngag - b.avgEngag,
    sortOrder: sortedInfo.columnKey === 'avgEngag' && sortedInfo.order,
    render: (val) => <span>{toPercent(val, 2, true)}</span>
  };

  const photoRank = {
    title: (
      <Tooltip title="Photo Ranking: (Followers / 10) * Photo Engagement">
        Photo
      </Tooltip>
    ),
    dataIndex: 'photoRank',
    sorter: (a, b) => a.photoRank - b.photoRank,
    sortOrder: sortedInfo.columnKey === 'photoRank' && sortedInfo.order,
    render: (rank) => {
      const color = colorMap[rank];
      return (
        <span>
          <Tag color={color}>{rank}</Tag>
        </span>
      )
    }
  };

  const videoRank = {
    title: (
      <Tooltip title="Video Ranking: (Followers / 10) * Video Engagement">
        Video
      </Tooltip>
    ),
    dataIndex: 'videoRank',
    sorter: (a, b) => a.videoRank - b.videoRank,
    sortOrder: sortedInfo.columnKey === 'videoRank' && sortedInfo.order,
    render: (rank) => {
      const color = colorMap[rank]
      return (
        <span>
          <Tag color={color}>{rank}</Tag>
        </span>
      )
    }
  };

  const overallRank = {
    title: (
      <Tooltip title="Overall Ranking: (Followers / 10) * Post Engagement">
        Overall
      </Tooltip>
    ),
    dataIndex: 'overallRank',
    sorter: (a, b) => a.overallRank - b.overallRank,
    sortOrder: sortedInfo.columnKey === 'overallRank' && sortedInfo.order,
    render: (rank) => {
      const color = colorMap[rank]
      return (
        <span>
          <Tag color={color}>{rank}</Tag>
        </span>
      )
    }
  };

  const presColumns = [
    profile,
    avgEngagement,
    bestDay,
    avgLikes,
    shareOfVoice,
    photoRank,
    videoRank,
    overallRank,
    // cutoff
    followers,
    valuePerPost,
    bestTime,
    cadence,
    avgComments,
    avgViews,
  ]

  const normalColumns = [
    profile,
    followers,
    bestDay,
    bestTime,
    cadence,
    shareOfVoice,
    avgLikes,
    avgComments,
    avgViews,
    avgEngagement,
    valuePerPost,
    postButton,
    photoRank,
    videoRank,
    overallRank,
  ]

  const columns = isPresenting ? presColumns : normalColumns

  return (
    <Table
      dataSource={data}
      columns={columns}
      onChange={handleChange}
      pagination={false}
      scroll={{ x: 1030 }}
    />
  )
}

export default withRouter(RenderTable);

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