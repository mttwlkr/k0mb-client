import React, { useState, Fragment } from 'react';
import { Radio, Button, Icon } from 'antd';
import { compose } from 'recompose';
import GraphWrapper from '../GraphWrapper/GraphWrapper';
import { withPostTrend } from './withPostTrend';
import { withFilter } from '../Filters/withFilter';
import Line from '../Graphs/Line/Line';
import {
  FilterContainer,
  StringFilters,
  FilterWrapper,
  FilterBtnContainer,
  SortCheckbox
} from '../Filters/Filters';

const PostTrends = (props) => {
  const [timeOrNumPosts, setTimeOrNumPosts] = useState('time');
  const { data } = props;
  const { numOfDays, numOfPosts, dateLabels } = props;

  const noTimeScalesConfig = {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }

  const timeScalesConfig = {
    xAxes: [{
      ticks: {
        maxTicksLimit: 20
      }
    }]
  }

  return (
    <Fragment>
      <FilterContainer>
        <FilterWrapper title="Reset">
          <Button
            onClick={props.resetAllFilters}
          >
            <Icon type="undo" />
          </Button>
        </FilterWrapper>
        <FilterWrapper title="Days or Posts">
          <Radio.Group
            defaultValue={timeOrNumPosts}
            buttonStyle="solid"
            onChange={(e) => setTimeOrNumPosts(e.target.value)}
          >
            <Radio.Button value="time">{`${numOfDays} days`}</Radio.Button>
            <Radio.Button value="numPosts">{`${numOfPosts} posts`}</Radio.Button>
          </Radio.Group>
        </FilterWrapper>
        <FilterWrapper title="Filter">
          <SortCheckbox
            options={props.checkboxOptions}
            handleCheckboxFilter={props.handleCheckboxFilter}
            checkboxFilters={props.checkboxFilters}
          />
        </FilterWrapper>
        <FilterBtnContainer>
          <FilterWrapper title="Start">
            <Button disabled={true}>
              {dateLabels[0]}
            </Button>
          </FilterWrapper>
          <FilterWrapper title="End">
            <Button
              disabled={true}
            >
              {dateLabels[dateLabels.length - 1]}
            </Button>
          </FilterWrapper>
          <FilterWrapper>
            <StringFilters
              handleStringFilter={props.handleStringFilter}
              sportOptions={props.sportOptions}
              regionOptions={props.regionOptions}
            />
          </FilterWrapper>
        </FilterBtnContainer>
        {/* <FilterWrapper title="Filter">
          <Typography.Text>
            Click on a profile's key below.
          </Typography.Text>
        </FilterWrapper> */}
      </FilterContainer>
      {timeOrNumPosts === 'time' && (
        <Fragment>
          <GraphWrapper title={`Engagement per post over ${numOfDays} days`}>
            <Line
              labelDisplay={{
                usePercent: true,
                numRemain: 2,
                includeSymbol: true
              }}
              scalesConfig={timeScalesConfig}
              label="Engage"
              data={data.engagementTime}
              labels={dateLabels}
            />
          </GraphWrapper>
          <GraphWrapper title={`Likes per post over ${numOfDays} days`}>
            <Line
              labelDisplay={{
                usePercent: false,
                numRemain: 0,
                includeSymbol: false
              }}
              scalesConfig={timeScalesConfig}
              label="Likes"
              data={data.likeTime}
              labels={dateLabels}
            />
          </GraphWrapper>
          <GraphWrapper title={`Comments per post over ${numOfDays} days`}>
            <Line
              labelDisplay={{
                usePercent: false,
                numRemain: 0,
                includeSymbol: false
              }}
              scalesConfig={timeScalesConfig}
              label="Comments"
              data={data.commentTime}
              labels={dateLabels}
            />
          </GraphWrapper>
        </Fragment>
      )}
      {timeOrNumPosts === 'numPosts' && (
        <Fragment>
          <GraphWrapper title={`Engagement per post over ${numOfPosts} posts`}>
            <Line
              labelDisplay={{
                usePercent: true,
                numRemain: 2,
                includeSymbol: true
              }}
              label="Engage"
              data={data.engagementPost}
              labels={data.postLabels}
              scalesConfig={noTimeScalesConfig}
            />
          </GraphWrapper>
          <GraphWrapper title={`Likes per post over ${numOfPosts} posts`}>
            <Line
              labelDisplay={{
                usePercent: false,
                numRemain: 0,
                includeSymbol: false
              }}
              label="Likes"
              data={data.likePost}
              labels={data.postLabels}
              scalesConfig={noTimeScalesConfig}
            />
          </GraphWrapper>
          <GraphWrapper title={`Comments per post over ${numOfPosts} posts`}>
            <Line
              labelDisplay={{
                usePercent: false,
                numRemain: 0,
                includeSymbol: false
              }}
              label="Comments"
              data={data.commentPost}
              labels={data.postLabels}
              scalesConfig={noTimeScalesConfig}
            />
          </GraphWrapper>
        </Fragment> 
      )}
       
    </Fragment>
  )
}

export default compose(
  withFilter,
  withPostTrend,
)(PostTrends)