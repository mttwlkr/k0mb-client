import React from 'react';
import { Bar } from 'react-chartjs-2';
import { insertCommas, toPercent } from '../../../cleaners/numbers';

const RenderBar = ({ 
  labels, 
  data, 
  label, 
  solids, 
  hovers,
  labelDisplay
}) => {

  const bigD = {
    labels: labels,
    datasets: [
      {
        label,
        backgroundColor: hovers,
        borderColor: solids,
        hoverBackgroundColor: solids,
        hoverBorderColor: solids,
        borderWidth: 1,
        data: data
      }
    ]
  }

  // const isDesktop = window.innerWidth > 768;

  return (
    // <div className="graph-container">
      <Bar
        data={bigD}
        // width={isDesktop ? null : 1000}
        // height={isDesktop ? null : 600}
        options={{
          // maintainAspectRatio: isDesktop,
          tooltips: {
            callbacks: {
              label: (tooltip, data) => {
                const {
                  usePercent,
                  numRemain,
                  includeSymbol
                } = labelDisplay;

                let val;

                if (!usePercent) {
                  val = insertCommas(
                    tooltip.value,
                    numRemain,
                    includeSymbol
                  )
                } else {
                  val = toPercent(
                    tooltip.value,
                    numRemain,
                    includeSymbol
                  )
                }

                return val
              }
            }
          }
        }}
      />
    // </div>
  )
}

export default RenderBar
