import React, { Fragment } from 'react';
import { Typography } from 'antd';
import { WorstRoast } from '../Utilities/TextSnippets';
import { getTop } from '../../cleaners/stats';

const { Paragraph, Text } = Typography;

const DontRepeat = ({ list, ending }) => {
  // console.log('list', list)
  const noRepeats = [...new Set(list.filter(val => val !== null))];
  
  if (noRepeats.length === 3) {
    return (
      <Fragment>
        <Text strong>{`${noRepeats[0]}, `}</Text>
        <Text strong>{`${noRepeats[1]} `}</Text>
        <Text> and </Text>
        <Text strong>{`${noRepeats[2]} `}</Text>
        <Text>{ending}</Text>
      </Fragment>
    )
  } 
  
  if (noRepeats.length === 2) {
    return (
      <Fragment>
        <Text strong>{`${noRepeats[0]} `}</Text>
        <Text> and </Text>
        <Text strong>{`${noRepeats[1]} `}</Text>
        <Text>{ending}</Text>
      </Fragment>
    )
  }

  if (noRepeats.length === 1) {
    return (
      <Fragment>
        <Text strong>{`${noRepeats[0]} `}</Text>
        <Text>{ending}</Text>
      </Fragment>
    )
  }
}

const MostPopular = ({ name }) => (
  <Fragment>
    <Text strong>{` ${name} `}</Text>
    <Text> is the most popular. </Text>
  </Fragment>
)

const BestDayAndTime = ({ bestDay, bestTime }) => {
  return (
    <Fragment>
      <Text>This group's best day to post is </Text>
      <Text strong>{` ${bestDay} `}</Text>
      <Text> at </Text>
      <Text strong>{` ${bestTime}. `}</Text>
    </Fragment>
  )
}

const Cadence = ({ best, worst }) => {
  return (
    <Fragment>
      <Text strong>{`${best} `}</Text>
      <Text>likes to post the most, while </Text>
      <Text strong>{`${worst} `}</Text>
      <Text>seems to be the most shy. </Text>
    </Fragment>
  )
}

const Engagement = ({ best, worst }) => {
  return (
    <Fragment>
      <Text strong>{`${best}`}</Text>
      <Text> engages the best out of this crew, while </Text>
      <Text strong>{`${worst} `}</Text>
      <Text> should try a new strategy. </Text>
    </Fragment>
  )
}

const ProfileStatistics = ({ ranks, data }) => {
  // console.log('ranks', ranks)
  // console.log('data', data)

  const samePhotoAndVideoScore = ranks.bestPhotoScore === ranks.bestVideoScore;
  const diffPhotoAndVideoScore = ranks.bestPhotoScore !== ranks.bestVideoScore;
  // best overall
  const { dayOnly, timeOnly } = data.reduce((acc, curr) => {
    acc.dayOnly.push(curr.bestDay)
    acc.timeOnly.push(curr.bestTime)
    return acc;
  }, {
    dayOnly: [],
    timeOnly: [],
  });

  const bestDay = getTop(dayOnly, 1);
  const bestTime = getTop(timeOnly, 1)

  // {`${}`}

  return (
    <div>
      <Paragraph
        className="statistics-wrapper"
      >
        {samePhotoAndVideoScore && (
          <Fragment>
            <Text>This round is over! </Text>
            <Text strong>{`${ranks.bestPhotoScore.name} `}</Text>
            <Text> is the best at photo and video.</Text>
            <WorstRoast name={ranks.worstOverallScore.name} />
            <BestDayAndTime
              bestDay={bestDay}
              bestTime={bestTime}
            />
            {ranks.bestCadence.name !== ranks.worstCadence.name && (
              <Cadence
                best={ranks.bestCadence.name}
                worst={ranks.worstCadence.name}
              />
            )}
          </Fragment>
        )}
        {diffPhotoAndVideoScore && (
          <Fragment>
            <Text>This round is close! </Text>
            <Text strong>{`${ranks.bestPhotoScore.name}`}</Text>
            <Text> is crushing the photo game, while </Text>
            <Text strong>{`${ranks.bestVideoScore.name}`}</Text>
            <Text> has video on lock.</Text>
            <Text strong>{` ${ranks.bestOverallScore.name}`}</Text>
            <Text> is the best overall. </Text>
            <MostPopular name={ranks.mostFollowers.name} />
            <Engagement 
              best={ranks.bestOverallEngagement.name}
              worst={ranks.worstOverallEngagement.name}
            />
            <DontRepeat
              list={[
                ranks.worstOverallEngagement.name === ranks.worstPhotoScore.name ? null : ranks.worstPhotoScore.name,
                ranks.worstOverallEngagement.name === ranks.worstVideoScore.name ? null : ranks.worstVideoScore.name,
                ranks.worstOverallEngagement.name === ranks.worstOverallScore.name ? null : ranks.worstOverallScore.name,
              ]}
              ending='should take better notes in every class. '
            />
            <BestDayAndTime
              bestDay={bestDay}
              bestTime={bestTime}
            />
            {ranks.bestCadence.name !== ranks.worstCadence.name && (
              <Cadence
                best={ranks.bestCadence.name}
                worst={ranks.worstCadence.name}
              />
            )}
          </Fragment>
        )}
      </Paragraph>
    </div>
  )
}

export default ProfileStatistics;

// {/* {bestEngagementAndMostFollowers && (
//           <Fragment>
//             <Text>This is rare. But, </Text>
//             <Text strong>{`${ranks.bestOverallEngagement.name} `}</Text>
//             <Text> is the most popular and has the best engagement.</Text>
//             <Text> You can't win much more. </Text>
//             <WorstRoast name={ranks.worstOverallEngagement.name} />
//             {ranks.bestCadence.name !== ranks.worstCadence.name && (
//               <Cadence
//                 best={ranks.bestCadence.name}
//                 worst={ranks.worstCadence.name}
//               />
//             )}
//             <BestDayAndTime
//               bestDay={bestDay}
//               bestTime={bestTime}
//             />
//           </Fragment>
//         )} */}