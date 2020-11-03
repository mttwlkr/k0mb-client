import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Presentation from "../Presentation/Presentation";
import Home from "../Home/Home";
import Nav from "../Nav/Nav";
import FourOhFour from "../Utilities/404";

// const regionOptions = [
//   { value: null, display: 'All' },
//   { value: 'usa', display: 'USA' },
//   { value: 'canada', display: 'Canada' },
//   { value: 'europe', display: 'Europe' },
//   { value: 'oceania', display: 'Oceania' },
// ]

const resortRegionOptions = [
  { value: null, display: "All" },
  { value: "global", display: "North America" },
  { value: "co", display: "Colorado" },
  { value: "canada", display: "Canada" },
  { value: "cali", display: "California" },
  { value: "ut", display: "Utah" },
  { value: "pnw", display: "PNW" },
  { value: "east", display: "East Coast" },
];

const skiBoardOptions = [
  { value: null, display: "All" },
  { value: "ski", display: "Ski" },
  { value: "snowboard", display: "Snowboard" },
  { value: "both", display: "Both" },
];

// const celebOptions = [
//   { value: null, display: "All" },
//   { value: "bike", display: "Bike" },
//   { value: "climb", display: "Climb" },
//   { value: "moto", display: "Moto" },
//   { value: "skate", display: "Skate" },
//   { value: "ski", display: "Ski" },
//   { value: "snowboard", display: "Snowboard" },
// ];

const map = {
  boards: {
    file: "boards.json",
    url: "/boards",
    key: "boards",
    display: "Boards",
    region: null,
    sport: null,
  },
  boarders: {
    file: "boarders.json",
    url: "/boarders",
    key: "boarders",
    display: "Boarders",
    region: null,
    sport: null,
  },
  // celeb: {
  //   file: 'celeb.json',
  //   url: '/celeb',
  //   key: 'celeb',
  //   display: 'Celeb',
  //   region: null,
  //   sport: celebOptions,
  // },
  influencers: {
    file: "influencers.json",
    url: "/influencers",
    key: "influencers",
    display: "Outdoor Influencers",
    region: null,
    sport: null,
  },
  media: {
    file: "media.json",
    url: "/media",
    key: "media",
    display: "Media",
    region: null,
    sport: skiBoardOptions,
  },
  resorts: {
    file: "resorts.json",
    url: "/resorts",
    key: "resorts",
    display: "Resorts",
    region: resortRegionOptions,
    sport: null,
  },
  skis: {
    file: "skis.json",
    url: "/skis",
    key: "skis",
    display: "Skis",
    region: null,
    sport: null,
  },
  softgoods: {
    file: "softgoods.json",
    url: "/softgoods",
    key: "softgoods",
    display: "Softgoods",
    region: null,
    sport: skiBoardOptions,
  },
  skiers: {
    file: "skiers.json",
    url: "/skiers",
    key: "skiers",
    display: "Skiers",
    region: null,
    sport: null,
  },
};

const brandArray = Object.keys(map).map((key) => map[key]);

const AppRouter = (props) => {
  // const mixpanelID = Mixpanel.getDistinctId();
  return (
    <div>
      <Nav navOptions={brandArray} />
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/resorts" />
          </Route>

          {brandArray &&
            brandArray.map((brand) => {
              return (
                <Route key={`${brand.key}-${Date.now()}`} path={`${brand.url}`}>
                  <Presentation
                    pageInfo={brand}
                    regionOptions={brand.region && brand.region}
                    sportOptions={brand.sport && brand.sport}
                  />
                </Route>
              );
            })}
          {/* Existing route 404 */}
          {/* <Route path="/skiers" render={() => {
            return (
              <Home FourOhFour />
            )
          }}/> */}
          <Route path="/contact" component={Home} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </div>
  );
};

export default AppRouter;
