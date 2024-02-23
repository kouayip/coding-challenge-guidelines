import React from 'react'

import { render, screen } from '@testing-library/react'
import BubbleChart from './BubbleChart'
import { ChartData } from 'chart.js'

describe('BubbleChart Component', () => {
  const chartData: ChartData<'bubble'> = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 1, y: 2, r: 10 },
          { x: 2, y: 3, r: 20 },
          { x: 3, y: 4, r: 30 },
        ],
        backgroundColor: 'red',
      },
    ],
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders component', () => {
    render(<BubbleChart data={chartData} xLabels={[]} yLabels={[]} />)
  })

  it('renders a canvas element', () => {
    render(
      <BubbleChart
        testId="test-canvas"
        data={chartData}
        xLabels={[]}
        yLabels={[]}
      />,
    )
    expect(screen.getByTestId('test-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('test-canvas')).toContainHTML('canvas')
  })
})
