import { ChartData } from 'chart.js/auto'
import { TestProps } from '../Common/TestProps.ts'

/**
 * Props for a BubbleChart component
 */
export type BubbleChartProps = {
  /**
   * x-axis labels.
   */
  xLabel: string[]

  /**
   * Labels for the y-axis.
   */
  yLabels: string[]

  /**
   * Data for the 'bubble' graph.
   */
  data: ChartData<'bubble'>
} & TestProps
