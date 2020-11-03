import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Page = ({ title, children, showFilter }) => {
  return (
    <div
      style={{ padding: '50px 48px' }}
    >
      <Title
        style={{
          textAlign: 'center'
        }}
      >
        {title}
      </Title>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Page
