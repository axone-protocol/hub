import { memo } from 'react';
import { Area, AreaChart, Brush, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '@/app/mock-chart-data';
import ChartTooltip from './chart-tooltip';
import ChartTraveler from './chart-traveller';
import Column from '../column';

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

type AxoneAreaChartProps = {
  data: ChartData[];
};

const CHART_COLOR = '#FB9501';

const AxoneAreaChart = ({ data }: AxoneAreaChartProps) => {
  return (
    <Column>
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
              <stop offset='0%' stopColor={CHART_COLOR} stopOpacity={1}/>
              <stop offset='100%' stopColor={CHART_COLOR} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id='colorUv2' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor={CHART_COLOR} stopOpacity={0.2}/>
              <stop offset='100%' stopColor={CHART_COLOR} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey='name' axisLine={false} className='select-none' tick={{ fontSize: 14 }} tickMargin={5} height={40}/>
          <YAxis axisLine={false} className='select-none' tick={{ fontSize: 14 }} tickMargin={5} />
          <Tooltip content={<ChartTooltip />} />
          <Area type='linear' dot={<circle r={4} fill={CHART_COLOR} stroke='none' fillOpacity={1} />} dataKey='price' stroke={CHART_COLOR} fill='url(#colorUv)' />
          <Brush dataKey='name' stroke='transparent' traveller={ChartTraveler} height={36} fill='transparent' >
            <AreaChart
              data={data}
            >
              <Area type='linear' dataKey='price' stroke={CHART_COLOR}  fillOpacity={1} fill='url(#colorUv2)' />
            </AreaChart>
          </Brush>
        </AreaChart>
      </ResponsiveContainer>
    </Column>
  );
};

export default memo<typeof AxoneAreaChart>(AxoneAreaChart);