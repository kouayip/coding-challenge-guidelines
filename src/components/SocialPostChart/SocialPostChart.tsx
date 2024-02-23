import React, { useState } from 'react'

import BubbleChart from '../BubbleChart'

import { PostDataPoint, SocialPostChartProps } from './SocialPostChart.types'
import { xLabel, yLabels } from './constants.ts'

import './SocialPostChart.less'

const SocialPostChart: React.FC<SocialPostChartProps> = ({ type }) => {
  const [data] = useState<PostDataPoint[]>([])
  const [postCount] = useState(0)

  return (
    <div data-testid={`social-post-chart-${type}`} className="social-card">
      <p>Number of posts processed: {postCount}</p>
      <BubbleChart
        yLabels={yLabels}
        xLabel={xLabel}
        data={{
          datasets: [
            {
              data: data,
              label: type,
              backgroundColor: '#323232',
            },
          ],
        }}
      />
    </div>
  )
}

export default SocialPostChart
