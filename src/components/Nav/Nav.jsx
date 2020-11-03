import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { Mixpanel } from '../Mixpanel';

const Nav = ({ navOptions }) => {
  return (
    <Menu 
      mode="horizontal"
      style={{ textAlign: 'center' }}
    >
      <Menu.Item>
        <Link to={"/contact"}>
          <Icon type="home" />
        </Link>
      </Menu.Item>

      {navOptions.map(opt => {
        return (
          <Menu.Item
            key={`${Date.now()}-${opt.key}`}
            onClick={() => {
              Mixpanel.track(`Nav Click: ${opt.display}`, {
                pageName: 'nav',
                profile: opt.display
              })
            }}
          >
            <Link to={opt.url}>{opt.display}</Link>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default Nav
