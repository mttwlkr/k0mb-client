import mixpanel from 'mixpanel-browser';
mixpanel.init('489f49dc00c50ad6b8f401b1e55dbbf8');

// let env_check = true;
let env_check = process.env.NODE_ENV === 'production';

let actions = {
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  getDistinctId: () => {
    if (env_check) {
      const distinctId = mixpanel.get_distinct_id();
      return distinctId;
    }
    return null;
  },
  // identify: (id) => {
  //   if (env_check) mixpanel.identify(id);
  // },
  // alias: (id) => {
  //   if (env_check) mixpanel.alias(id);
  // },
  // people: {
  //   set: (props) => {
  //     if (env_check) mixpanel.people.set(props);
  //   },
  // },
};

export let Mixpanel = actions;