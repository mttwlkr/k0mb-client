import React, { useEffect } from "react";
import ReactGA from "react-ga";

ReactGA.initialize('UA-33672229-3');

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const ProdHOC = props => {
    useEffect(() => trackPage(props.location.pathname), [
      props.location.pathname
    ]);

    return <WrappedComponent {...props} />;
  };

  const DevHOC = props => {
    return <WrappedComponent {...props} />;
  };

  return process.env.NODE_ENV === 'production' ? ProdHOC : DevHOC;
};