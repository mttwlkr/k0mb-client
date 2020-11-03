import React from 'react';

const Thumbnail = ({ imgUrl, shortcode }) => {
  // console.log('url', url)
  return (
    <span>
      <a
        href={`https://www.instagram.com/${shortcode}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display:"inline-block", lineHeight: 0 }}
      >
        <img
          src={imgUrl}
          alt="#"
          style={{ height: '40px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Wikiversity-Mooc-Icon-Video.svg/1000px-Wikiversity-Mooc-Icon-Video.svg.png"
          }}
        />
      </a>
    </span>
  )
}

export default Thumbnail