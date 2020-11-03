import React from 'react';
import { Bar } from 'react-chartjs-2';
import { insertCommas, toPercent } from '../../../cleaners/numbers';

const BarGrouped = ({ labels, data, labelDisplay }) => {
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

                // 'val', val)

                return val
              }
            }
          }
        }}
      />
    // </div>
  )
}

export default BarGrouped