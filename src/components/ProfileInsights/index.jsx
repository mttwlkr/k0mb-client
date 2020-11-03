import React, { Fragment, useState } from 'react';
import { compose } from 'recompose';
import { Button, Icon, Switch, Typography } from 'antd';
import { withFilter } from '../Filters/withFilter';
import { withProfileInsights } from './withProfileInsights';
import {
  FilterContainer,
  FilterWrapper,
  SortCheckbox,
  SportAndRegionFilters
} from "../Filters/Filters";
import Table from './Table';
import ProfileStatistics from './ProfileStatistics';
import InsightsContainer from '../Utilities/InsightsContainer';
import { Mixpanel } from '../Mixpanel';

const { Title } = Typography;

const ProfileInsights = (props) => {
  const [usePicture, setUsePicture] = useState(false);
  const { data, mixpanelInfo } = props;

  return (
    <Fragment>
      <FilterContainer>
        <FilterWrapper title="Reset">
          <Button onClick={props.resetAllFilters}>
            <Icon type="undo" />
          </Button>
        </FilterWrapper>
        <FilterWrapper title="Filter">
          <SortCheckbox
            options={props.checkboxOptions}
            handleCheckboxFilter={props.handleCheckboxFilter}
            checkboxFilters={props.checkboxFilters}
          />
        </FilterWrapper>
        <SportAndRegionFilters
          handleStringFilter={props.handleStringFilter}
          sportOptions={props.sportOptions}
          regionOptions={props.regionOptions}
        />
      </FilterContainer>
      <InsightsContainer>
        <ProfileStatistics data={data} ranks={props.ranks} />
      </InsightsContainer>
      <Title
        style={{ textAlign: "center", paddingTop: "20px", marginBottom: 0 }}
      >
        Profile Rankings
      </Title>
      <div style={{ paddingLeft: "16px", paddingBottom: "8px" }}>
        <Typography.Paragraph
          strong
          style={{ marginBottom: "4px", fontSize: "14px" }}
        >
          Avatar
        </Typography.Paragraph>
        <Switch
          checked={usePicture}
          onChange={() => {
            setUsePicture(!usePicture);
            Mixpanel.track(
              `Avatar Toggle: ${mixpanelInfo.groupName} - ${!usePicture}`
            );
          }}
        />
      </div>
      <Table usePicture={usePicture} posts={data} />
    </Fragment>
  );
}

export default compose(
  withFilter,
  withProfileInsights
)(ProfileInsights)
