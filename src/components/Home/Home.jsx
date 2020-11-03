import React, { Fragment } from 'react';
import { Typography, Layout } from 'antd';
import { Mixpanel } from '../Mixpanel';

import './Home.css';

const { Content } = Layout;

const paraStyle = {
  lineHeight: 1.8,
  textAlign: 'center',
  maxWidth: '400px',
}

const Home = ({ FourOhFour }) => {
  return (
    <Content 
      style={{
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 320,
      }}>
      <Typography.Title>
        K0mb.
      </Typography.Title>
      { FourOhFour && (
        <Typography.Paragraph style={paraStyle}>
          There used to be good information here. It's gone.
          <ContactUs />
          for fresh info
        </Typography.Paragraph>
      )}
      { !FourOhFour && (
        <Typography.Paragraph style={paraStyle}>
          <ContactUs />
          , for custom groups, faster loading, various exports,
          consistent data, unique filters, private pages and more.
      </Typography.Paragraph>
      )}
    </Content>
  )
}

const ContactUs = () => (
  <Fragment>
    <span> </span>
    <ContactUsLink />
    <span>, </span>
    <ContactUsHover />
    <span> </span>
  </Fragment>
)

const ContactUsLink = () => (
  <a
    onClick={() => Mixpanel.track("Contact Email Link Clicked")}
    href="mailto: team.k0mb@gmail.com"
  >
    Contact us
  </a>
)

const ContactUsHover = () => (
  <span
    onClick={() => Mixpanel.track("Contact Email Copied")}
    className="email-span"
  >
    team.k0mb@gmail.com
  </span>
)

export default Home