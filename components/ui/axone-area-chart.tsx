import { memo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '@/app/mock-chart-data';

type AxoneAreaChartProps = {
  data: ChartData[];
};

type TooltipPayload = {
  value: number;
}[];

type TooltipProps = {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`Date : ${label}`}</p>
        <p className='intro'>{`Price : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const AxoneAreaChart = ({ data }: AxoneAreaChartProps) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#FB9501' stopOpacity={1}/>
            <stop offset='100%' stopColor='#FB9501' stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey='name' axisLine={false} tick={{ fontSize: 14 }} tickMargin={5} />
        <YAxis axisLine={false} tick={{ fontSize: 14 }} tickMargin={5}/>
        <Tooltip content={<CustomTooltip />} />
        <Area type='linear' dot={<circle r={4} fill='#FB9501' stroke='none' fillOpacity={1} />} dataKey='price' stroke='#FB9501' fill='url(#colorUv)' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo<typeof AxoneAreaChart>(AxoneAreaChart);