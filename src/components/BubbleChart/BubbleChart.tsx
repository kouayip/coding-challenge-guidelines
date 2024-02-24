import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

import { BubbleChartProps } from './BubbleChart.types.ts'

/**
 * A reusable component for bubble charts
 */
const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  testId,
  ...options
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasOptionRef = useRef(options)

  useEffect(() => {
    if (!canvasRef.current) return

    const { xLabels, yLabels } = canvasOptionRef.current

    const chart = new Chart(canvasRef.current, {
      type: 'bubble',
      data,
      options: {
        animation: false,
        aspectRatio: 2,
        scales: {
          x: {
            min: 0,
            max: xLabels.length - 1,
            ticks: {
              stepSize: 1,
              callback: value => xLabels[value as number], // Use custom labels for the Y axis
            },
            offset: true,
            grid: {
              display: false, // Hide the X axis grid
            },
          },
          y: {
            min: 0,
            max: yLabels.length - 1,
            ticks: {
              stepSize: 1,
              callback: value => yLabels[value as number], // Use custom labels for the X axis
            },
            offset: true,
            grid: {
              display: false, // Hide the Y axis grid
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: tooltipItems => {
                const { x, y, _custom } = tooltipItems.parsed

                // format date to prefix meridian period
                let time = xLabels[x].replace(/(am|pm)/, '') + ' '
                time += x < Math.floor(xLabels.length / 2) ? 'AM' : 'PM'

                return `${_custom} posts on ${yLabels[y]}. at ${time}` // ex: 10 posts on Monday at 1:00 AM
              },
            },
          },
        },
      },
    })

    return () => {
      chart.destroy() // if the component is re-rendered, destroy chart instance
    }
  }, [data])

  return <canvas data-testid={testId} ref={canvasRef} />
}

export default BubbleChart
