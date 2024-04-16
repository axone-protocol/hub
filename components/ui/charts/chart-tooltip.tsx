import Row from '../row';


type TooltipPayload = {
  value: number;
}[];

type TooltipProps = {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string;
  formattedDate?: string;
}

/**
 * ChartTooltip component
 * Represents the tooltip in the chart
 */
const ChartTooltip = ({ active, payload, formattedDate }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-axone-dark-blue rounded-md p-1 custom-tooltip'>
        <p className='rounded-t-md p-2 bg-axone-bg-dark mb-2'>{formattedDate}</p>
        <Row className='px-4'>
          <div className='w-5 h-5 bg-axone-orange rounded-full' />
          <p className='text-axone-white ml-2'><span className='text-axone-khaki'>Price:</span> ${Math.floor(payload[0].value).toFixed(2)}</p>
        </Row>
        <Row className='px-4 mb-4'>
          <div className='w-5 h-5 bg-axone-dark-blue rounded-full' />
          <p className='text-axone-white ml-2'><span className='text-axone-khaki'>Supplier:</span> AXONE</p>
        </Row>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;