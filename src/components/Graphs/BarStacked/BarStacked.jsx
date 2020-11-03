import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarStacked = ({ labels, label, data, rgb }) => {
  const bigD = {
    labels: labels,
    datasets: data
  }

  // const isDesktop = window.innerWidth > 768;

  return (
    // <div className="graph-container">
      <Bar 
        // width={isDesktop ? null : 1000}
        // height={isDesktop ? null : 600}
        data={bigD}
        options={{
          // maintainAspectRatio: isDesktop,
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        }}
      />
    // </div>
  )
}

export default BarStacked