import { useFormatter } from 'next-intl';
import { memo } from 'react';
import { Area, AreaChart, Brush, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartTooltip from './chart-tooltip';
import ChartTraveler from './chart-traveller';
import Column from '../column';

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0]) || /FORMATTING_ERROR/.test(args[0])) return;
  error(...args);
};

const CHART_COLOR = '#FB9501';
const CHART_MARGIN = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};
const MS_FACTOR = 1000;

const data2 = [
  {
    name: 'Jan',
    uv: 40,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 30,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: -90,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 50,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: -20,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: -25,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 34,
    pv: 4300,
    amt: 2100,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data2.map((i) => i.uv));
  const dataMin = Math.min(...data2.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

const SupplyAreaChart = () => {
  const format = useFormatter();

  const formatChartDate = (unixTime: number): string => {
    const dateTime = new Date(unixTime * MS_FACTOR);
    return format.dateTime(dateTime, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Column>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={data2}
          margin={CHART_MARGIN}
        >
          <XAxis
            dataKey='name'
            axisLine={true}
            tick={{ fontSize: 14 }}
            className='select-none'
            tickMargin={2}
            // tickFormatter={formatChartDate}
          />
          <YAxis
            axisLine={false}
            className='select-none'
            tick={{ fontSize: 14 }}
            tickMargin={5}
            tickFormatter={(tick) => `${tick}%`}
          />
          <Tooltip
            content={({ active, payload }) => {
              const formattedDate = formatChartDate(payload?.[0]?.payload.time);
              return <ChartTooltip active={active} payload={payload} formattedDate={formattedDate} />;
            }}
          />
          <defs>
            <linearGradient id='splitColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset={off} stopColor={CHART_COLOR} stopOpacity={1} />
              <stop offset={off} stopColor='#DC4E4E' stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            stroke='url(#splitColor)'
            dataKey='uv'
            fill='transparent'
            isAnimationActive={true}
          />

          <ReferenceLine y={0} stroke='#CCD3D6' strokeDasharray='3 3' />
          <Brush dataKey='name' stroke='transparent' traveller={ChartTraveler} height={36} fill='transparent' >
            <AreaChart
              data={data2}
            >
              <Area
                type='monotone'
                stroke='url(#splitColor)'
                dataKey='uv'
                fill='transparent'
                isAnimationActive={true}
              />
            </AreaChart>
          </Brush>
        </AreaChart>
      </ResponsiveContainer>
    </Column>
  );
};

export default memo<typeof SupplyAreaChart>(SupplyAreaChart);