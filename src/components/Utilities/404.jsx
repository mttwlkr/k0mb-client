import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd'

const ForOhFor = () => {
  return (  
    <div style={{ 
      textAlign: 'center'
    }}>
      <Typography.Title
        type="danger"
        level={4}
        style={{ paddingTop: '16px' }}
      >
        404
      </Typography.Title>
      <Link to="/">
        <Button
          type="primary"
        >
          Go Home
        </Button>
      </Link>
    </div>
  )
}

export default ForOhFor
