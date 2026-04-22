import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DynamicLine = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), { ssr: false });
const DynamicBar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), { ssr: false });
const DynamicPie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), { ssr: false });

type GenericChartProps = {
  data: any;
  options?: any;
  className?: string;
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: { position: 'bottom' as const },
    tooltip: { intersect: false },
  },
};

function sanitizeDataset(dataset: any) {
  if (!dataset || !Array.isArray(dataset.data)) return dataset;
  return {
    ...dataset,
    data: dataset.data.map((value: unknown) => {
      const numeric = typeof value === 'number' ? value : Number(value);
      return Number.isFinite(numeric) ? numeric : 0;
    }),
  };
}

function sanitizeChartData(data: any) {
  if (!data || !Array.isArray(data.datasets)) return data;
  return {
    ...data,
    datasets: data.datasets.map(sanitizeDataset),
  };
}

function ChartFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`chart-card min-h-[260px] ${className}`}>{children}</div>;
}

export function LineChart({ data, options, className }: GenericChartProps) {
  const safeData = useMemo(() => sanitizeChartData(data), [data]);
  return (
    <ChartFrame className={className}>
      <DynamicLine data={safeData} options={{ ...baseOptions, ...options }} redraw />
    </ChartFrame>
  );
}

export function BarChart({ data, options, className }: GenericChartProps) {
  const safeData = useMemo(() => sanitizeChartData(data), [data]);
  return (
    <ChartFrame className={className}>
      <DynamicBar data={safeData} options={{ ...baseOptions, ...options }} redraw />
    </ChartFrame>
  );
}

export function PieChart({ data, options, className }: GenericChartProps) {
  const safeData = useMemo(() => sanitizeChartData(data), [data]);
  return (
    <ChartFrame className={className}>
      <DynamicPie data={safeData} options={{ ...baseOptions, ...options }} redraw />
    </ChartFrame>
  );
}
