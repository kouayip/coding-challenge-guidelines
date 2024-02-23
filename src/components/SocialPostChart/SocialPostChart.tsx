import React, { useEffect, useState } from 'react'

import BubbleChart from '../BubbleChart'
import { useSocialPostStream } from '../../hooks/useSocialPostStream.ts'
import {
  PostDataPoint,
  PostPayload,
  SocialPostChartProps,
} from './SocialPostChart.types'
import { xLabel, yLabels } from './constants.ts'

import './SocialPostChart.less'

const SocialPostChart: React.FC<SocialPostChartProps> = ({ type }) => {
  const [data, setData] = useState<PostDataPoint[]>([])
  const [postCount, setPostCount] = useState(0)

  const { stream } = useSocialPostStream()

  /**
   * Updates the graph data with a new data point.
   * @param {PostDataPoint[]} prevData - Existing data in the graph.
   * @param {PostPayload} newData - New data to be added.
   * @returns {PostDataPoint[]} The updated data in the graph.
   */
  const updateData = (
    prevData: PostDataPoint[],
    newData: PostPayload,
  ): PostDataPoint[] => {
    // Converts the timestamp into a Date object
    const timestamp = new Date(newData.timestamp * 1000)

    // Gets the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const dayOfWeek = timestamp.getUTCDay()

    // Gets the time of day (0-23)
    const hourOfDay = timestamp.getUTCHours()

    // Creates a new data point with the time, day and an initial counter of 1
    const newDataPoint: PostDataPoint = { x: hourOfDay, y: dayOfWeek, r: 1 }

    const updatedData = [...prevData]

    // Find out if the data point already exists
    const existingEntryIndex = updatedData.findIndex(
      entry => entry.x === newDataPoint.x && entry.y === newDataPoint.y,
    )

    // If the data point already exists, increment the counter
    if (existingEntryIndex !== -1) {
      updatedData[existingEntryIndex].r += 1
    } else {
      // Otherwise, add the new data point
      updatedData.push(newDataPoint)
    }

    return updatedData
  }

  useEffect(() => {
    // Subscribes an observable to listen to messages from the specified social event
    const observable = stream.observeMessage<PostPayload>(type)

    // When a new message is received, updates the graph data and increments the publication counter
    observable.subscribe(
      data => {
        setData(prevData => updateData(prevData, data))
        setPostCount(prevState => prevState + 1)
      },
      err => console.error(err),
    )

    return () => {
      // Cleans the observable subscription when the component is dismantled
      observable.unsubscribe()
    }
  }, [stream, type])

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
