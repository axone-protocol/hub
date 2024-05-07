import { useFormatter } from 'next-intl';
import { memo, useEffect, useState } from 'react';
import { Area, AreaChart, Brush, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '@/app/mock-chart-data';
import ChartTooltip from './chart-tooltip';
import ChartTraveler from './chart-traveller';
import Column from '../column';
import Spinner from '../spinner';

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0]) || /FORMATTING_ERROR/.test(args[0])) return;
  error(...args);
};

type AxoneAreaChartProps = {
  data: ChartData[];
};

const CHART_COLOR = '#FB9501';
const CHART_MARGIN = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};
const MS_FACTOR = 1000;

const AxoneAreaChart = ({ data }: AxoneAreaChartProps) => {
  const format = useFormatter();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const formatChartDate = (date: string): string => {
    const raw = new Date(date);
    const unixTime = Math.floor(raw.getTime() / 1000);
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
        {
          isLoading
            ? (<div className='w-full h-full flex flex-col justify-center items-center '>
              <Spinner />
            </div>)
            : (
              <AreaChart
                data={data}
                margin={CHART_MARGIN}
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
                <XAxis
                  dataKey='time'
                  axisLine={true}
                  tick={{ fontSize: 14 }}
                  className='select-none'
                  tickMargin={2}
                  tickFormatter={formatChartDate}
                />
                <YAxis axisLine={false} className='select-none' tick={{ fontSize: 14 }} tickMargin={5} />
                <Tooltip
                  content={({ active, payload }) => {
                    const formattedDate = formatChartDate(payload?.[0]?.payload.time);
                    return <ChartTooltip active={active} payload={payload} formattedDate={formattedDate} />;
                  }}
                />
                <Area type='linear' dot={<circle r={4} fill={CHART_COLOR} stroke='none' fillOpacity={1} />} dataKey='price' stroke={CHART_COLOR} fill='url(#colorUv)' />
                <Brush dataKey='name' stroke='transparent' traveller={ChartTraveler} height={36} fill='transparent' >
                  <AreaChart
                    data={data}
                  >
                    <Area type='linear' dataKey='price' stroke={CHART_COLOR}  fillOpacity={1} fill='url(#colorUv2)' />
                  </AreaChart>
                </Brush>
              </AreaChart>
            )
        }
      </ResponsiveContainer>
    </Column>
  );
};

export default memo<typeof AxoneAreaChart>(AxoneAreaChart);