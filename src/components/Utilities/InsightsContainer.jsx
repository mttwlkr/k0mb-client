import React, { Fragment } from 'react';
import { Typography, Divider } from 'antd';

const InsightsContainer = ({ children }) => {
  return (
    <Fragment>
      <Typography.Title
        style={{
          textAlign: 'center',
          marginBottom: 0,
          paddingTop: '20px',
          paddingBottom: '10px',
        }}
        level={4}
      >
        Insights
      </Typography.Title>
        {children}
      <Divider />
    </Fragment>
  )
}

export default InsightsContainer
