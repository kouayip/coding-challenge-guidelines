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

    const { xLabel, yLabels } = canvasOptionRef.current

    const chart = new Chart(canvasRef.current, {
      type: 'bubble',
      data,
      options: {
        animation: false,
        aspectRatio: 2,
        scales: {
          x: {
            min: 0,
            max: xLabel.length - 1,
            ticks: {
              stepSize: 1,
              callback: value => xLabel[value as number], // Use custom labels for the Y axis
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
      },
    })

    return () => {
      chart.destroy() // if the component is re-rendered, destroy chart instance
    }
  }, [data])

  return <canvas data-testid={testId} ref={canvasRef} />
}

export default BubbleChart