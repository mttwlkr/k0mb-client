import React, { useState, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { 
  PageHeader, 
  Typography, 
  Button, 
  Icon, 
  Select, 
  Radio,
  InputNumber,
  Checkbox,
  Menu,
  Dropdown
} from 'antd';

import './Filters.css'

const { Option } = Select;

export const FilterContainer = ({ title, children }) => {
  return (
    <PageHeader
      className="head"
      title={title}
      subTitle={
        <div className="title-container">
          {children}
        </div>
      }
    />
  )
}

export const FilterWrapper = ({ title, children }) => {
  return (
    <div className="filter-input-wrapper">
      <Typography.Paragraph
        strong
        style={{
          marginBottom: 0,
        }}
      >
        {title}
      </Typography.Paragraph>
      {children}
    </div>
  )
}

export const SortGroup = ({
  isDisabled,
  defaultValue,
  options,
  handleFilter,
  width = 100,
}) => {
  return (
    <Select
      disabled={isDisabled}
      defaultValue={defaultValue}
      style={{ width: width }}
      onChange={(val) => handleFilter(val)}
    >
      {options && options.map(opt => {
        return (
          <Option
            key={`${Date.now()}-${opt.value}`}
            value={opt.value}
          >
            {opt.display}
          </Option>
        )
      })}
    </Select>
  )
}

export const SortCheckbox = ({
  options,
  handleCheckboxFilter,
  checkboxFilters,
}) => {
  const menu = (
    <Menu>
      { options.map((opt, idx) => {
        return (
          <Menu.Item
            key={`${idx + 1}`}
          >
            <Checkbox
              onChange={() => handleCheckboxFilter(opt.value)}
              checked={checkboxFilters[opt.value]}
            >
              {opt.display}
            </Checkbox>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={["click"]} style={{ width: 150 }}>
      <Button>
        Profiles
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
}

export const RadioGroup = ({
  filterKey,
  options,
  handleFilter
}) => {

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Fragment>
      <Radio.Group
        onChange={(e) => {
          let value = e.target.value;
          if (value === 'none') value = null;
          if (value === 'yes') value = true;
          if (value === 'no') value = false;

          handleFilter(filterKey, value)
        }}
        defaultValue="none"
      >
        {
          options.map(opt => {
            return (
              <Radio
                key={`${Date.now()}-${opt}`}
                value={opt}
                style={radioStyle}
              >
                {opt}
              </Radio>
            )
          })
        }
      </Radio.Group>
    </Fragment>
  )
}

export const TrimFilter = ({ trimState, handleTrimFilter }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Radio.Group
        defaultValue={trimState.side}
        buttonStyle="solid"
        onChange={(e) => handleTrimFilter({ side: e.target.value })}
      >
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
      </Radio.Group>
      <InputNumber
        style={{ width: '122px' }}
        min={0}
        // max={currentState.length}
        defaultValue={trimState.amount}
        onChange={(val) => handleTrimFilter({ amount: val })}
      />
    </div>
  )
}


const yesNoNoneOptions = [
  { display: 'Yes', value: true },
  { display: 'No', value: false },
  { display: 'None', value: null },
]

export const sortOptions = [
  {
    value: 'alphabetical',
    display: 'Alphabetical',
  },
  {
    value: 'avgCommentPerPost',
    display: 'Avg Comments'
  },
  {
    value: 'avgEngag',
    display: 'Avg Engagement'
  },
  {
    value: 'avgLikePerPost',
    display: 'Avg Likes'
  },
  {
    value: 'commentBrandMentions',
    display: 'Brand Mentions'
  },
  {
    value: 'followers',
    display: 'Followers'
  },
  {
    value: 'totalPhotoCount',
    display: 'Photo Count'
  },
  {
    value: 'totalComments',
    display: 'Total Comments'
  },
  {
    value: 'totalLikes',
    display: 'Total Likes'
  },
  {
    value: 'totalVideoCount',
    display: 'Video Count'
  }
]

export const SportAndRegionFilters = ({
  handleStringFilter,
  sportOptions,
  regionOptions
}) => {
  const showSport = sportOptions && sportOptions.length > 0;
  const showRegion = regionOptions && regionOptions.length > 0;

  return (
    <HorizontalWrapper>
      <FilterWrapper title="Sport">
        <SortGroup
          isDisabled={!showSport}
          width={100}
          defaultValue="None"
          options={sportOptions}
          handleFilter={(val) => handleStringFilter('sport', val)}
        />
      </FilterWrapper>
      <FilterWrapper title="Region">
        <SortGroup
          isDisabled={!showRegion}
          width={100}
          defaultValue="None"
          options={regionOptions}
          handleFilter={(val) => handleStringFilter('region', val)}
        />
      </FilterWrapper>
    </HorizontalWrapper>
  )
};

export const StringFilters = ({ 
  handleStringFilter,
  sportOptions,
  regionOptions,
}) => {
  const showSport = sportOptions && sportOptions.length > 0;
  const showRegion = regionOptions && regionOptions.length > 0;

  return (
    <HorizontalWrapper>
      <FilterWrapper title="Sport">
        <SortGroup
          isDisabled={!showSport}
          width={100}
          defaultValue="None"
          options={sportOptions}
          handleFilter={(val) => handleStringFilter('sport', val)}
        />
      </FilterWrapper>
      <FilterWrapper title="Region">
        <SortGroup
          isDisabled={!showRegion}
          width={100}
          defaultValue="None"
          options={regionOptions}
          handleFilter={(val) => handleStringFilter('region', val)}
        />
      </FilterWrapper>
      <FilterWrapper title="Is Verified">
        <SortGroup
          isDisabled={false}
          width={100}
          defaultValue="None"
          options={yesNoNoneOptions}
          handleFilter={(val) => handleStringFilter('isVerified', val)}
        />
      </FilterWrapper>
      <FilterWrapper title="Is Business">
        <SortGroup
          isDisabled={false}
          width={100}
          defaultValue="None"
          options={yesNoNoneOptions}
          handleFilter={(val) => handleStringFilter('isBusinessAccount', val)}
        />
      </FilterWrapper>
    </HorizontalWrapper>
  )
}

const HorizontalWrapper = ({ children }) => (
  <div className="options-wrapper">
    {children}
  </div>
)
  

export const FilterBtnContainer = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Fragment>
      <Button
        // type="primary"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="filter-btn"
      >
        <Icon type="menu-unfold" />
        Filters
      </Button>
      {isFilterOpen && (
        <CSSTransition
          timeout={500}
          classNames="options"
        >
          <HorizontalWrapper>
            {children}
          </HorizontalWrapper>
        </CSSTransition>
      )}
    </Fragment>
  )
}




// {
//   isProfile && (
//     <FilterContainer>
//       <FilterHeader title="Trim" />
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         <Radio.Group
//           defaultValue={trimFilter.side}
//           buttonStyle="solid"
//           onChange={(e) => handleTrimFilter({ side: e.target.value })}
//         >
//           <Radio.Button value="left">Left</Radio.Button>
//           <Radio.Button value="right">Right</Radio.Button>
//         </Radio.Group>
//         <InputNumber
//           style={{ width: '122px' }}
//           min={0}
//           max={currentState.length}
//           defaultValue={trimFilter.amount}
//           onChange={(val) => handleTrimFilter({ amount: val })}
//         />
//       </div>
//     </FilterContainer>
//   )
// }

// export const SortFilter = () => {
//   return (
//     <FilterContainer>
//       <FilterHeader title="Sort" />
//       <SortGroup
//         isDisabled={false}
//         options={sortOptions}
//         handleFilter={setSortFilter}
//         defaultValue="Alphabetical"
//         width={140}
//       />
//     </FilterContainer>
//   )
// }


// import React from 'react';
// import { InputNumber, Radio } from 'antd';

// const TrimFilter = ({ state, handleFilter, arrayLength }) => {
//   return (
//     <div>
//       <InputNumber 
//         min={0} 
//         max={arrayLength} 
//         defaultValue={state.amount}
//         onChange={(val) => handleFilter({ amount: val })}
//       />
//       <Radio.Group 
//         defaultValue={state.side}
//         style={{
//           marginTop: '5px',
//         }}
//         buttonStyle="solid"
//         onChange={(e) => handleFilter({ side: e.target.value })}
//       >
//         <Radio.Button value="left">Left</Radio.Button>
//         <Radio.Button value="right">Right</Radio.Button>
//       </Radio.Group>
//     </div>
//   )
// }

// export default TrimFilter

// import React from 'react';
// import { Select } from 'antd';
// const { Option } = Select;

// const SortGroup = ({ 
//   isDisabled, 
//   defaultValue, 
//   options, 
//   handleFilter,
//   width = 100,
// }) => {
//   return (
//     <Select 
//       disabled={isDisabled}
//       defaultValue={defaultValue}
//       style={{ width: width }} 
//       onChange={(val) => handleFilter(val)}
//     >
//       {options && options.map(opt => {
//         return (
//           <Option 
//             key={`${Date.now()}-${opt.value}`}
//             value={opt.value}
//           >
//             {opt.display}
//           </Option>
//         )
//       })}
//     </Select>
//   )
// }

// export default SortGroup


// import React, { Fragment } from 'react';
// import { Radio } from 'antd';

// const RadioGroup = ({ 
//   filterKey, 
//   options, 
//   handleFilter 
// }) => {

//   const radioStyle = {
//     display: 'block',
//     height: '30px',
//     lineHeight: '30px',
//   };

//   return (
//     <Fragment>
//       <Radio.Group
//         onChange={(e) => {
//           let value = e.target.value;
//           if (value === 'none') value = null;
//           if (value === 'yes') value = true;
//           if (value === 'no') value = false;

//           handleFilter(filterKey, value)
//         }}
//         defaultValue="none"
//       >
//         {
//           options.map(opt => {
//             return (
//               <Radio
//                 key={`${Date.now()}-${opt}`}
//                 value={opt}
//                 style={radioStyle}
//               >
//                 {opt}
//               </Radio>
//             )
//           })
//         }
//       </Radio.Group>
//     </Fragment>

//   )
// }

// export default RadioGroup