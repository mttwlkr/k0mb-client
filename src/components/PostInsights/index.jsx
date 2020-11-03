import React, { Fragment, useState } from 'react';
import { Typography, Button } from 'antd';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import Table from './Table';
import PostStatistics from './PostStatistics';
import { withFilter } from '../Filters/withFilter';
import { withPostInsight } from './withPostInsight';
import InsightsContainer from '../Utilities/InsightsContainer';
import { FilterContainer, FilterWrapper, SortGroup } from '../Filters/Filters';
import { Mixpanel } from '../Mixpanel';

const { Title } = Typography;

const PostInsights = (props) => {
  const { map, dateLabels, history, location, match } = props;
  const names = Object.keys(map);
  const options = names.map(name => ({ display: name, value: name }));
  const profileLabel = location.pathname.split('/')[3];
  const [key, setKey] = useState(profileLabel || names[0]);

  const onProfileClick = (profile) => history.push(`${match.path}/${profile}`);

  return (
    <Fragment>
      <FilterContainer>
        <FilterWrapper title="Profile">
          <SortGroup
            defaultValue={key}
            options={options}
            handleFilter={(val) => {
              setKey(val);
              onProfileClick(val);
              Mixpanel.track(`Select Profile: ${val}`, {
                pageName: 'postInsight',
                profile: val
              })
            }}
            width={200}
          />
        </FilterWrapper>
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
      </FilterContainer>
      <Switch>

        <Route exact path={`${match.url}/`}>
          <Redirect to={`${match.url}/${key}`} />
        </Route>

        <Route path={`${match.url}/:profile`} render={() => {
          return map && map[key] && map[key].topStats ? (
            <Fragment>
              <InsightsContainer>
                <PostStatistics
                  topStats={map[key].topStats}
                  bottomStats={map[key].bottomStats}
                />
              </InsightsContainer>
              <Title style={{ textAlign: 'center', padding: '20px 0px 10px' }}>{`${key}'s Best Posts`}</Title>
              <Table
                posts={map[key].topPosts}
                topHashTags={map[key].topStats.hashTop}
                topMentions={map[key].topStats.mentionTop}
                profile={key}
              />
              <Title style={{ textAlign: 'center', padding: '20px 0px 10px' }}>{`${key}'s Worst Posts`}</Title>
              <Table
                posts={map[key].bottomPosts}
                topHashTags={map[key].topStats.hashTop}
                topMentions={map[key].topStats.mentionTop}
                profile={key}
              />
            </Fragment>
          ) : (
            <Route>
              <Redirect to={`${match.url}/${names[0]}`} />
            </Route>
          )
        }} />

      </Switch>
    </Fragment>
  )
}

export default compose(
  withRouter,
  withFilter,
  withPostInsight,
)(PostInsights)


// time: "15:00"
// day: "Sunday"
// hashTop: (3)["FindYourBackcountryPhoto:", "ClimateStrike", "NationalCoffeeDay!Photo:"]
// mentionTop: (3)["roundtheworldgirl", "maddiebrenneman", "jonisadventures"]
// useVideo: "false"
// avgCommentLength: 466.3
// avgMentions: 0.8
// avgHashtags: 0.8


// isVideo: "true"
// numLikes: 4361
// numComments: 50
// engagement: 0.002
// comment: "That feeling when you find a perfectly ripe avocad"
// timestamp: 1561996656
// commentTags: ["FreshOffTheGrid!"]
// hashTags: []
// profileTags: []
// shortcode: "BzYUWH9BnwK"
// thumbnail: "https://instagram.fapa1-1.fna.fbcdn.net/vp/60abe8da10316687e74e2324ababccf5/5DA79876/t51.2885-15/e35/s150x150/64576296_452997725486473_1888993488713304444_n.jpg?_nc_ht=instagram.fapa1-1.fna.fbcdn.net&_nc_cat=101"
// dayOfWeek: "Monday"
// timeOfDay: "09:57"
// commentTextLength: 186
// numMentions: 1
// numHashtags: 0
// numTags: 0