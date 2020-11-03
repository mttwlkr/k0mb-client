import React from 'react';
import { Pie } from 'react-chartjs-2';
import { toPercent } from '../../../cleaners/numbers';

const RenderPie = ({ 
  labels, 
  label, 
  data, 
  solids, 
  hovers,
  labelDisplay
}) => {


  const bigD = {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: hovers,
      hoverBackgroundColor: solids
    }]
  };

  const isDesktop = window.innerWidth > 768;
  const { numRemain, includeSymbol } = labelDisplay;

  return (
    <Pie 
      data={bigD}
      width={isDesktop ? null : 1000}
      height={isDesktop ? null : 600}
      options={{
        maintainAspectRatio: isDesktop,
        tooltips: {
          callbacks: {
            label: (tooltip, data) => {
              const float = data.datasets[tooltip.datasetIndex].data[tooltip.index] || null;

              const page = data.labels[tooltip.index]
              const val = toPercent(float, numRemain || 2, includeSymbol);
              return `${page}: ${val}`
            }
          }
        }
      }}
    />
  )
}

export default RenderPie
