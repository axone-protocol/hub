
type GradientColors = {
  start: string;
  end: string;
};

type ProgressBarProps =  {
  percentage: number;
  filledGradient: GradientColors;
  color?: string;
  showEndLine?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  filledGradient,
  color = '#ffffff',
  showEndLine = false
}) => {
  return (
    <div className='relative w-full h-[4px] rounded-md'>
      <div
        className='absolute w-full h-full rounded-md'
        style={{ backgroundColor: color }}
      />
      <div
        className='absolute h-full rounded-md'
        style={{
          width: `${percentage > 100 ? 100 : percentage}%`,
          background: `linear-gradient(to right, ${filledGradient.start}, ${filledGradient.end})`
        }}
      />
      {
        showEndLine
          ? (<div
            className='absolute rounded-md top-[2px] bottom-0 w-[4px] h-5 bg-white'
            style={{ right: `${100 - ((percentage > 100 ? 100 : percentage) - 2)}%`, marginTop: '-10px' }} />)
          : null
      }
    </div>
  );
};

export { ProgressBar };