import React from "react";
import { Typography } from "antd";
import "./PostInsights.css";
import { RenderList } from "../Utilities/TextSnippets";

const { Paragraph, Text } = Typography;

const handleNaN = (num1, num2) => {
  if (isNaN(num1) && isNaN(num2)) {
    return 0;
  }
  if (!isNaN(num1)) {
    return Math.round(num1);
  }
  if (!isNaN(num2)) {
    return Math.round(num2);
  }
};

const PostStatistics = ({ topStats, bottomStats, side }) => {
  const typeOfMedia = topStats.useVideo === "true" ? "video" : "photo";
  const useLongerComments =
    topStats.avgCommentLength > bottomStats.avgCommentLength;
  const useMoreHashtags = topStats.avgHashtags > bottomStats.avgHashtags;

  const hashTagNumber = useMoreHashtags
    ? handleNaN(topStats.avgHashtags, bottomStats.avgHashtags)
    : handleNaN(bottomStats.avgHashtags, topStats.avgHashtags);

  const plural =
    hashTagNumber > 1 || hashTagNumber === 0 || isNaN(hashTagNumber) ? "s" : "";

  return (
    <div>
      <Paragraph className="statistics-wrapper">
        <Text>Your best time to post is </Text>
        <Text strong>{topStats.day}</Text>
        <Text> at </Text>
        <Text strong>
          {topStats.time === ":00" ? "to be determined" : topStats.time}
        </Text>
        <Text>. Your ideal post should be a </Text>
        <Text strong>{typeOfMedia}</Text>
        <Text> in </Text>
        <Text strong>{topStats.orientationTop}</Text>
        <Text> orientation </Text>
        <Text> with a </Text>
        <Text strong>{useLongerComments ? "longer " : "shorter "}</Text>
        <Text>description than usual, try to use </Text>
        <Text>{useLongerComments ? "more than " : "less than "}</Text>
        <Text strong>
          {useLongerComments
            ? handleNaN(topStats.avgCommentLength, bottomStats.avgCommentLength)
            : handleNaN(
                bottomStats.avgCommentLength,
                topStats.avgCommentLength
              )}
        </Text>
        <Text> characters. </Text>
        <Text>
          {typeOfMedia === "video" &&
            topStats.durationTop > 0 &&
            `The video should be around ${topStats.durationTop} seconds long`}
        </Text>
        <RenderList
          list={topStats.mentionTop}
          title="You do your best work with "
          fallback="You dont really work with others."
          symbol="@"
        />
        <Text> Your posts do best with </Text>
        <Text strong>{hashTagNumber === 1 ? "a " : `${hashTagNumber} `}</Text>
        <Text>{`hashtag${plural}. `}</Text>
        <RenderList
          list={topStats.hashTop}
          title="Your best hashtags are "
          fallback="You dont really use hashtags."
          symbol="#"
        />
      </Paragraph>
    </div>
  );
};

export default PostStatistics;
