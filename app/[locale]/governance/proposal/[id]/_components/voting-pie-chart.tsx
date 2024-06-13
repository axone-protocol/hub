'use client';

import { Cell, Pie, PieChart } from 'recharts';

type VoteItem = {
  name: string;
  value: number;
};

type VotingPieChartProps = {
  data: VoteItem[];
};

const COLORS = ['#DC4E4E'];

const VotingPieChart = ({ data }: VotingPieChartProps) => {
  const onPieEnter = () => {
    console.log('onPieEnter');
  };
  return(
    <PieChart width={160} height={160} onMouseEnter={onPieEnter}>
      <defs>
        <linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#3598C2' />
          <stop offset='95%' stopColor='#35C2C3' />
        </linearGradient>
      </defs>
      <Pie
        data={data}
        innerRadius={68}
        outerRadius={80}
        paddingAngle={4}
        dataKey='value'
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} stroke='transparent' fill={index === 0 ? 'url(#colorGradient)' : COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export { VotingPieChart };