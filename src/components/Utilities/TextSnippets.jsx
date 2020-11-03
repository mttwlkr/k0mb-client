import React, { Fragment } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const RenderList = ({ list, title, fallback, symbol }) => {
  if (list.length === 3) {
    return (
      <Fragment>
        <Text>{title}</Text>
        <Text strong>{`${symbol}${list[0]}, `}</Text>
        <Text strong>{`${symbol}${list[1]}`}</Text>
        <Text> and </Text>
        <Text strong>{`${symbol}${list[2]}.`}</Text>
      </Fragment>
    )
  }

  if (list.length === 2) {
    return (
      <Fragment>
        <Text>{title}</Text>
        <Text strong>{`${symbol}${list[0]}`}</Text>
        <Text> and </Text>
        <Text strong>{`${symbol}${list[1]}.`}</Text>
      </Fragment>
    )
  }

  if (list.length === 1) {
    return (
      <Fragment>
        <Text>{title}</Text>
        <Text strong>{`${symbol}${list[0]}.`}</Text>
      </Fragment>
    )
  }

  return <Text>{fallback}</Text>
}


export const WorstRoast = ({ name }) => {
  return (
    <Fragment>
      <Text> Everybody else, particuarily </Text>
      <Text strong>{`${name},`}</Text>
      <Text> should take notes. </Text>
    </Fragment>
  )
}