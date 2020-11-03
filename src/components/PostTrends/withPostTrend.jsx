import React from 'react';
import { getPerPost } from '../../cleaners/perPost';

export const withPostTrend = Component => (props) => {
  const data = getPerPost(props.data);

  return (
    <Component
      {...props}
      data={data}
      numOfDays={props.dateLabels.length}
      numOfPosts={data.postLabels.length}
    />
  )
}