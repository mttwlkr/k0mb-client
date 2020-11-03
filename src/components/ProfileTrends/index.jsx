import React, { Fragment } from "react";
import { compose } from "recompose";
import { Button, Icon } from "antd";
import GraphWrapper from "../GraphWrapper/GraphWrapper";
import BarSingle from "../Graphs/BarSingle/BarSingle";
import BarStacked from "../Graphs/BarStacked/BarStacked";
import BarGrouped from "../Graphs/BarGrouped/BarGrouped";
import Pie from "../Graphs/Pie/Pie";
import { withFilter } from "../Filters/withFilter";
import { withProfileTrend } from "./withProfileTrends";
import {
  FilterContainer,
  FilterWrapper,
  StringFilters,
  SortGroup,
  sortOptions,
  FilterBtnContainer,
  SortCheckbox,
} from "../Filters/Filters";

const ProfileTrends = (props) => {
  const { data } = props;
  const { shareOfVoice, areThereSomeBrandMentions } = data;
  // console.log('ProfileTrends props', props)

  return (
    <Fragment>
      <FilterContainer>
        <FilterWrapper title="Reset">
          <Button onClick={props.resetAllFilters}>
            <Icon type="undo" />
          </Button>
        </FilterWrapper>
        <FilterWrapper title="Sort">
          <SortGroup
            defaultValue={"alphabetical"}
            options={sortOptions}
            handleFilter={props.handleSortFilter}
            width={200}
          />
        </FilterWrapper>
        <FilterWrapper title="Filter">
          <SortCheckbox
            options={props.checkboxOptions}
            handleCheckboxFilter={props.handleCheckboxFilter}
            checkboxFilters={props.checkboxFilters}
          />
        </FilterWrapper>
        <FilterBtnContainer>
          <StringFilters
            handleStringFilter={props.handleStringFilter}
            sportOptions={props.sportOptions}
            regionOptions={props.regionOptions}
          />
          {/* <FilterWrapper title="Trim (via sort)">
            <TrimFilter
              trimState={props.trimState}
              handleTrimFilter={props.handleTrimFilter}
            />
          </FilterWrapper> */}
        </FilterBtnContainer>
      </FilterContainer>
      <GraphWrapper title="Share of Voice">
        <Pie
          // this ALWAYS uses percent
          numRemain={2}
          labelDisplay={{
            numRemain: 2,
            includeSymbol: true,
          }}
          label="Share of Voice"
          labels={data.profiles}
          data={shareOfVoice.percent}
          solids={data.solids}
          hovers={data.hovers}
        />
      </GraphWrapper>
      <GraphWrapper title="Followers" showFilter>
        <BarSingle
          labelDisplay={{
            usePercent: false,
            numRemain: 0,
            includeSymbol: false,
          }}
          data={data.followers}
          labels={data.profiles}
          solids={data.solids}
          hovers={data.hovers}
          label=""
        />
      </GraphWrapper>
      <GraphWrapper title={`Type of Content`}>
        <BarStacked
          data={data.totalPhotosVsVideos}
          labels={data.profiles}
          label="Videos vs Photos"
        />
      </GraphWrapper>
      <GraphWrapper title="Avg Engagement">
        <BarSingle
          labelDisplay={{
            usePercent: true,
            numRemain: 2,
            includeSymbol: true,
          }}
          data={data.avgEngagement}
          labels={data.profiles}
          solids={data.solids}
          hovers={data.hovers}
          label=""
        />
      </GraphWrapper>
      {areThereSomeBrandMentions && (
        <GraphWrapper title="Number of Brand Mentions in Comments">
          <BarSingle
            labelDisplay={{
              usePercent: false,
              numRemain: 0,
              includeSymbol: false,
            }}
            data={data.commentBrandMentions}
            labels={data.profiles}
            solids={data.solids}
            hovers={data.hovers}
            label=""
          />
        </GraphWrapper>
      )}
      {/* <GraphWrapper title="Avg Value per Post">
        <BarSingle
          labelDisplay={{
            usePercent: false,
            numRemain: 2,
            includeSymbol: true
          }}
          data={data.pricePerPost}
          labels={data.profiles}
          solids={data.solids}
          hovers={data.hovers}
          label=""
        />
      </GraphWrapper> */}
      <GraphWrapper title="Avg Likes">
        <BarGrouped
          labelDisplay={{
            usePercent: false,
            numRemain: 0,
            includeSymbol: false,
          }}
          data={data.avgLikes}
          labels={data.profiles}
          label="Likes"
        />
      </GraphWrapper>
      <GraphWrapper title="Avg Comments">
        <BarGrouped
          labelDisplay={{
            usePercent: false,
            numRemain: 0,
            includeSymbol: false,
          }}
          data={data.avgComments}
          labels={data.profiles}
          label="Comments"
        />
      </GraphWrapper>
      <GraphWrapper title="Avg Video Views">
        <BarSingle
          labelDisplay={{
            usePercent: false,
            numRemain: 0,
            includeSymbol: false,
          }}
          data={data.avgViewsPerVideo}
          labels={data.profiles}
          solids={data.solids}
          hovers={data.hovers}
          label=""
        />
      </GraphWrapper>
    </Fragment>
  );
};

export default compose(withFilter, withProfileTrend)(ProfileTrends);
