import React, { useState, useEffect, Fragment } from "react";
import { PageHeader, Button, Tabs } from "antd";
import { withRouter } from "react-router-dom";

const { TabPane } = Tabs;

const tabMap = {
  1: "profileInsight",
  2: "postInsight",
  3: "postTrend",
  4: "profileTrend",
};

const idxMap = {
  profileInsight: "1",
  postInsight: "2",
  postTrend: "3",
  profileTrend: "4",
};

const RenderPageHeader = (props) => {
  const { title, onTabToggle, tabLabel } = props;
  const [tabIdx, setTabIdx] = useState(idxMap[tabLabel]);

  useEffect(() => {
    setTabIdx(idxMap[tabLabel]);
  }, [tabLabel]);

  return (
    <PageHeader
      title={title}
      extra={[
        <Fragment key="render-page-header-extra">
          {/* <Dropdown trigger="click" disabled overlay={<Options options={[
            "Instagram", 
            "YouTube", 
            "Twitter"
          ]} />}>
            <Button disabled>
              Instagram
              <Icon type="down" />
            </Button>
          </Dropdown> */}
          <Button type="primary" disabled>
            Download CSV
          </Button>
          <Button type="primary" disabled>
            Export
          </Button>
        </Fragment>,
      ]}
      footer={[
        <Tabs
          key="render-page-header-footer"
          activeKey={tabIdx}
          onChange={(key) => onTabToggle(tabMap[key])}
        >
          <TabPane tab="Profile Insights" key="1" />
          <TabPane tab="Post Insights" key="2" />
          <TabPane tab="Post Trends" key="3" />
          <TabPane tab="Profile Graphs" key="4" />
        </Tabs>,
      ]}
    ></PageHeader>
  );
};

// Not good for mobile, wait til YT is done...
// const Options = ({ options }) => {
//   return (
//     <Menu>
//       {options.map(opt => <Item disabled>{opt}</Item>)}
//     </Menu>
//   )
// }

export default withRouter(RenderPageHeader);
