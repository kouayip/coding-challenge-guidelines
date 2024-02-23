import React, { useEffect, useRef } from "react";
import { Chart, ChartData } from "chart.js/auto";
import { TestProps } from "../Common/TestProps.ts";

type BubbleChartProps = {
  xLabel: string[];
  yLabels: string[];
  data: ChartData<"bubble">;
} & TestProps;

const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  testId,
  ...options
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOptionRef = useRef(options);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { xLabel, yLabels } = canvasOptionRef.current;

    const chart = new Chart(canvasRef.current, {
      type: "bubble",
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
              callback: (value) => xLabel[value as number], // Utilisez les labels personnalisés
            },
            offset: true,
            grid: {
              display: false, // Masquer la grille de l'axe X
            },
          },
          y: {
            min: 0,
            max: yLabels.length - 1,
            ticks: {
              stepSize: 1,
              callback: (value) => yLabels[value as number], // Utilisez les labels personnalisés
            },
            offset: true,
            grid: {
              display: false, // Masquer la grille de l'axe Y
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas data-testid={testId} ref={canvasRef} />;
};

export default BubbleChart;
