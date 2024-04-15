

type TooltipPayload = {
  value: number;
}[];

type TooltipProps = {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string;
}

/**
 * ChartTooltip component
 * Represents the tooltip in the chart
 */
const ChartTooltip = ({ active, payload, label }: TooltipProps) => {
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

export default ChartTooltip;