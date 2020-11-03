import React, { Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import PostInsights from '../PostInsights';
import PostTrends from '../PostTrends';
import ProfileTrends from '../ProfileTrends';
import ProfileInsights from '../ProfileInsights';
import FourOhFour from '../Utilities/404';

import { getFlatDataOneKey } from '../../cleaners/init'

import './Presentation.css';

const Presentation = ({ 
  pageInfo, 
  sportOptions,
  regionOptions,
  match,
  location,
  history
}) => {

  if (!pageInfo || !pageInfo.file) {
    throw new Error('Nope')
  }

  const data = require(`../../data/${pageInfo.file}`);
  const raw = getFlatDataOneKey(data, pageInfo.key);
  const dateLabels = data.dateLabels;

  // this is kinda ghetto...
  const tabLabel = location.pathname.split('/')[2];
  const onTabIndex = (tab) => history.push(`${match.path}/${tab}`);

  const mixpanelInfo = {
    groupName: pageInfo.key,
    pageName: tabLabel,
  }

  return (
    <Fragment>
      <Header
        title={`${pageInfo.display}`}
        onTabToggle={(idx) => onTabIndex(idx)}
        tabLabel={tabLabel}
      />

      <Switch>

        <Route exact path={`${match.url}/`}>
          <Redirect to={`${match.url}/profileInsight`} />
        </Route>

        <Route
          path={`${match.url}/profileInsight`} 
          render={() => {
            return (
              <ProfileInsights
                raw={raw}
                sportOptions={sportOptions}
                regionOptions={regionOptions}
                mixpanelInfo={mixpanelInfo}
              />
            )
        }}/>

        <Route path={`${match.url}/postInsight`} render={() => {
          return (
            <PostInsights
              raw={raw}
              dateLabels={dateLabels}
              mixpanelInfo={mixpanelInfo}
            />
          )
        }} />

        <Route path={`${match.url}/postTrend`} render={() => {
          return (
            <PostTrends
              raw={raw}
              dateLabels={dateLabels}
              sportOptions={sportOptions}
              regionOptions={regionOptions}
              mixpanelInfo={mixpanelInfo}
            />
          )
        }} />

        <Route path={`${match.url}/profileTrend`} render={() => {
          return (
            <ProfileTrends
              raw={raw}
              sportOptions={sportOptions}
              regionOptions={regionOptions}
              mixpanelInfo={mixpanelInfo}
            />
          )
        }} />

        <Route component={FourOhFour} />
      </Switch>

    </Fragment>
  )
}

export default withRouter(Presentation);