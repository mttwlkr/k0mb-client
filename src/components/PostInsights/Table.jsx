import React, { Fragment, useState, useEffect } from 'react';
import { Table, Tag, Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import { toPercent, insertCommas } from '../../cleaners/numbers';
import { colorMap } from '../../cleaners/colors';
import Thumbnail from '../Utilities/Thumbnail';
import { Mixpanel } from '../Mixpanel';

const RenderTable = ({ posts, topHashTags, topMentions, profile, location }) => {
  const [data, setData] = useState(posts)
  const [sortedInfo, setSortedInfo] = useState({
    order: null,
    columnKey: null
  });

  useEffect(() => {
    setData(posts)
    return () => setData(posts);
  }, [posts])

  const handleChange = (pagination, filters, sorter, extra) => {
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
      
      const pageName = location.pathname.split('/')[2];
      Mixpanel.track(`Sort ${pageName} (${profile}): ${columnKey} - ${order}`, {
        order,
        columnKey,
        pageName,
        profile,
      })
    }
  };

  const generateTag = (tag, type, idx) => {
    let color;
    let link;

    if (type === 'user') {
      if (tag === topMentions[0]) color = colorMap["1"];
      if (tag === topMentions[1]) color = colorMap["2"];
      if (tag === topMentions[2]) color = colorMap["3"];
      link = `https://instagram.com/${tag}/`;
    }

    if (type === 'hash') {
      if (tag === topHashTags[0]) color = colorMap["1"];
      if (tag === topHashTags[1]) color = colorMap["2"];
      if (tag === topHashTags[2]) color = colorMap["3"];
      link = `https://instagram.com/explore/tags/${tag}/`;
    }

    return (
      <Tag
        key={`${tag}-${Date.now()}-${idx}`}
        color={color}
      >
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tag}
        </a>
      </Tag>
    )
  }

  const columnWidth = 60;
  const tagWidth = 225;

  const anyVideos = posts.some(post => post.viewCount > 0);
  const views = anyVideos ? {
    title: 'Views',
    dataIndex: 'viewCount',
    sortOrder: sortedInfo.columnKey === 'viewCount' && sortedInfo.order,
    elipsis: true,
    render: (val) => (<span>{insertCommas(val, 0, false)}</span>)
  } : {}

  const anyDuration = posts.some(post => post.videoDuration > 0);
  const duration = anyDuration ? {
    title: 'Duration',
    dataIndex: 'videoDuration',
    sortOrder: sortedInfo.columnKey === 'videoDuration' && sortedInfo.order,
    elipsis: true,
    render: (val) => (<span>{insertCommas(val, 0, false)}</span>)
  } : {}

  const columns = [
    {
      title: 'Post',
      dataIndex: 'thumbnail',
      render: (url, { shortcode }) => <Thumbnail imgUrl={url} shortcode={`/p/${shortcode}`} />,
      sorter: false,
      sortOrder: false,
      height: 50,
      className: "table-image",
      elipsis: true,
      width: columnWidth,
      fixed: 'left', 
    },
    {
      title: 'Engage',
      dataIndex: 'engagement',
      sorter: (a, b) => a.engagement - b.engagement,
      sortOrder: sortedInfo.columnKey === 'engagement' && sortedInfo.order,
      elipsis: true,
      render: (val) => (<span>{toPercent(val, 2, true)}</span>)
      // fixed: 'left',
    },
    {
      title: 'Like',
      dataIndex: 'numLikes',
      sorter: (a, b) => a.numLikes - b.numLikes,
      sortOrder: sortedInfo.columnKey === 'numLikes' && sortedInfo.order,
      elipsis: true,
      render: (val) => (<span>{insertCommas(val, 0, false)}</span>)
    },
    {
      title: 'Comments',
      dataIndex: 'numComments',
      sorter: (a, b) => a.numComments - b.numComments,
      sortOrder: sortedInfo.columnKey === 'numComments' && sortedInfo.order,
      elipsis: true,
      width: columnWidth,
    },
    {
      title: 'Day',
      dataIndex: 'dayOfWeek',
      elipsis: true,
    },
    {
      title: 'Time',
      dataIndex: 'timeOfDay',
      elipsis: true,
    },
    {
      title: 'Orientation',
      dataIndex: 'orientation',
    },
    {
      title: 'Video?',
      dataIndex: 'isVideo',
      sortOrder: sortedInfo.columnKey === 'isVideo' && sortedInfo.order,
      elipsis: true,
      // elipsis: true
    },
    views,
    duration,
    {
      title: 'Description Length',
      dataIndex: 'commentTextLength',
      elipsis: true,
      width: columnWidth,
    },
    {
      title: '#',
      dataIndex: 'numHashtags',
      width: columnWidth,
    },
    {
      title: () => <LabelKey />,
      dataIndex: 'hashTags',
      width: tagWidth,
      elipsis: true,
      render: tags => {
        if (tags.length > 0) {
          return (
            <span>
              {tags.map((tag, idx) => generateTag(tag, 'hash', idx))}
            </span>
          )
        }
        return <span>No Hashtags</span>
      }
    },
    {
      title: '@',
      dataIndex: 'numMentions',
      width: columnWidth,
    },
    {
      title: () => <LabelKey />,
      dataIndex: 'commentTags',
      width: tagWidth,
      elipsis: true,
      render: tags => {
        if (tags.length > 0) {
          return (
            <span>
              {tags.map((tag, idx) => generateTag(tag, 'user', idx))}
            </span>
          )
        }
        return <span>No Mentions</span>
      }
    },
    // {
    //   title: 'Colors',
    //   render: () => <span>Coming Soon</span>
    // }
    // {
    //   title: 'Comment',
    //   dataIndex: 'comment',
    //   sorter: false,
    //   sortOrder: false,
    //   // elipsis: true,
    //   // width: columnWidth,
    // },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      onChange={handleChange}
      pagination={false}
      scroll={{ x: 1120 }}
    />
  )
}


const LabelKey = () => (
  <Fragment>
    <Badge color={colorMap["1"]} text="1st" />
    <Badge color={colorMap["2"]} text="2nd" style={{ marginLeft: '10px' }} />
    <Badge color={colorMap["3"]} text="3rd" style={{ marginLeft: '10px' }} />
  </Fragment>
)

export default withRouter(RenderTable);