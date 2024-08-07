import { useFormatter } from 'next-intl';
import { FC, memo } from 'react';
import { Area, AreaChart, Brush, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SupplyRateChartDTO } from '@/hooks/dto/supply-rate.dto';
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

enum ChartColorsEnum {
  ORANGE = '#FB9501',
  RED = '#DC4E4E',
  GRAY = '#CCD3D6'
}

const CHART_MARGIN = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};
const MS_FACTOR = 1000;

const isAllZero = (data: SupplyRateChartDTO[]) => data.every(item => item.percentChange === '0.00' || item.percentChange === '-0.00');

const calculateDomain = (data: SupplyRateChartDTO[]) => {
  const allZero = isAllZero(data);
  if (allZero) {
    return [-0.5, 0.5];
  }
  const min = Math.min(...data.map(item => Number(item.percentChange)));
  const max = Math.max(...data.map(item => Number(item.percentChange)));
  return [min, max];
};

const yAxisTickFormatter = (tick: string | number) => `${tick}%`;

type SupplyAreaChartProps = {
  data: SupplyRateChartDTO[];
};

const SupplyAreaChart: FC<SupplyAreaChartProps> = ({ data }) => {
  const format = useFormatter();

  const formatChartDate = (date: string): string => {
    const raw = new Date(date);
    const unixTime = Math.floor(raw.getTime() / 1000);
    const dateTime = new Date(unixTime * MS_FACTOR);
    return format.dateTime(dateTime, {
      month: 'short',
      day: 'numeric'
    });
  };
  const domain = calculateDomain(data);
  const allZero = isAllZero(data);
  return (
    <Column>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={data}
          margin={CHART_MARGIN}
        >
          <XAxis
            dataKey='time'
            axisLine={true}
            tick={{ fontSize: 14 }}
            className='select-none'
            tickMargin={2}
            tickFormatter={formatChartDate}
          />
          <YAxis
            axisLine={true}
            dataKey={'percentChange'}
            className='select-none'
            tick={{ fontSize: 12 }}
            tickMargin={5}
            tickFormatter={yAxisTickFormatter}
            domain={domain}
          />
          <Tooltip
            content={({ active, payload }) => {
              const formattedDate = formatChartDate(payload?.[0]?.payload.time);
              return <ChartTooltip type='supply' active={active} payload={payload} formattedDate={formattedDate} />;
            }}
          />
          <defs>
            <linearGradient id='splitColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={ChartColorsEnum.ORANGE} stopOpacity={1} />
              <stop offset='95%' stopColor={ChartColorsEnum.RED} stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='percentChange'
            stroke={allZero ? ChartColorsEnum.ORANGE : 'url(#splitColor)'}
            fill='transparent'
            isAnimationActive={true}
          />

          <ReferenceLine y={0} stroke={ChartColorsEnum.GRAY} strokeOpacity={.1} strokeDasharray='3 3' />
          <Brush
            dataKey='change'
            stroke='transparent'
            traveller={ChartTraveler}
            height={36}
            fill='transparent'
          >
            <AreaChart
              data={data}
            >
              <Area
                type='monotone'
                stroke='url(#splitColor)'
                dataKey='change'
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