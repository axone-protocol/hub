type ChartTravelerProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * ChartTraveler component
 * Represents the traveler in the chart brush
 */
const ChartTraveler = ({ x, y, width, height }: ChartTravelerProps) => (
  <svg width={width} height={height} viewBox='0 0 6 36'  x={x}
    y={y} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='4' y='36' width='2' height='36' transform='rotate(180 4 36)' fill='white'/>
    <rect x='0.75' y='6.75' width='4.5' height='22.5' rx='2.25' fill='#071622' stroke='white' strokeWidth='1.5'/>
  </svg>
);

export default ChartTraveler;