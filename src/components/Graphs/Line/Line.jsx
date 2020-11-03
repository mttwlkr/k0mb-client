import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { insertCommas, toPercent } from '../../../cleaners/numbers';

import './Line.css';

const RenderLine = ({ 
  labels, 
  data, 
  label, 
  labelDisplay,
  scalesConfig,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltip, setTooltip] = useState({
    top: 0,
    left: 0,
    value: null,
    label: null,
    thumbnail: null,
    id: null,
    page: null,
    side: 'auto'
  })

  const bigD = {
    labels,
    datasets: data
  }

  const chartRef = useRef(null);
  
  const handleShowTooltip = (tooltip) => {
    const chart = chartRef.current;
    if (!chart) {return}

    if (tooltip.opacity === 0) {
      setTooltip({
        top: 0,
        left: 0,
        value: null,
        label: null,
        thumbnail: null,
        id: null,
        page: null,
        side: 'right',
      })
      setShowTooltip(false)
      return;
    }

    const position = chart.chartInstance.canvas.getBoundingClientRect();
    const dataPoint = tooltip.dataPoints[0];
    const page = tooltip &&
      tooltip.body && 
      tooltip.body[0] && 
      tooltip.body[0].lines && 
      tooltip.body[0].lines[0] &&
      tooltip.body[0].lines[0].split(':') && 
      tooltip.body[0].lines[0].split(':')[0] &&
      tooltip.body[0].lines[0].split(':')[0];

    const meta = data[dataPoint.datasetIndex].thumbnails[dataPoint.index];
    const thumbnail = meta.thumbnail;
    const id = meta.id;
    const top = position.top + window.pageYOffset + tooltip.caretY;
    const left = position.left + window.pageXOffset + tooltip.caretX;

    let side;
    if (tooltip.xAlign === 'right') {
      side = 'left'
    }

    setTooltip({
      thumbnail,
      id,
      top,
      left,
      label: dataPoint.label,
      value: dataPoint.value,
      page,
      side
    })
    setShowTooltip(true)
  }

  const isDesktop = window.innerWidth > 768;
  
  const options = {
    maintainAspectRatio: isDesktop,
    scales: scalesConfig,
    tooltips: {
      enabled: false,
      custom: handleShowTooltip,
    }
  }

  return (
    <div className="graph-container">
      <Line
        data={bigD}
        ref={chartRef}
        options={options}
        width={isDesktop ? null : 1000}
        height={isDesktop ? null : 600}
      />
      {showTooltip && (
        <Node
          labelDisplay={labelDisplay}
          tooltip={tooltip}
          label={label}
          setShowTooltip={setShowTooltip}
        />
      )}
    </div>
  )
}

const Node = ({ tooltip, label, setShowTooltip, labelDisplay }) => {
  // console.log('tooltip.value', tooltip.value)
  let left = tooltip.side === 'left' 
    ? (tooltip.left - 160)
    : tooltip.left;

  const display = labelDisplay.usePercent 
    ? toPercent(
      tooltip.value, 
      labelDisplay.numRemain,
      labelDisplay.includeSymbol
    )
    : insertCommas(
      tooltip.value, 
      labelDisplay.numRemain, 
      labelDisplay.includeSymbol
    )

  return (
    <div
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        padding: '5px',
        borderRadius: '5px',
        position: 'absolute',
        top: tooltip.top,
        left: left,
        background: `rgba(0,0,0, .8)`,
      }}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.instagram.com/p/${tooltip.id}/`}>
        <img
          alt="#"
          src={tooltip.thumbnail}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Wikiversity-Mooc-Icon-Video.svg/1000px-Wikiversity-Mooc-Icon-Video.svg.png";
            e.target.style.width = '150px';
          }}
        />
      </a>
      <h2 className="node-info">
        {`${label}: ${display}`}
      </h2>
      <h6 className="node-info">{`Page: ${tooltip.page}`}</h6>
    </div>
  )
}

export default RenderLine;