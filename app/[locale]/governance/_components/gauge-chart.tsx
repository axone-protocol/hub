'use client';

import dynamic from 'next/dynamic';

const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const GaugeChart = ({ val = 0 }) => {
  return (
    <div className='flex flex-row items-center relative w-[100px] h-full'>
      <GaugeComponent
        className='w-[80px] h-[60px] absolute top-0 left-0'
        value={val}
        type='radial'
        arc={{
          subArcs: [
            { length: val === 100 ? 1 : val/100, color: '#FB9501' },
            { length: val === 100 ? 0 : 1 - val/100, color: '#00213A' }
          ],
          padding: 0.002,
          width: 0.15,
          cornerRadius: 10
        }}
        pointer={{
          elastic: true,
          animationDelay: 0,
          color: '#FB9501',
          length: 0.8,
          width: 25
        }}
        labels={{
          valueLabel: {
            matchColorWithArc: true,
            style: { fontSize: 70 }
          },
          tickLabels: {
            type: 'inner',
            hideMinMax: true,
          }
        }}
      />
    </div>
  );
};

export { GaugeChart };