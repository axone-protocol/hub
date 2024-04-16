import { SVGProps } from 'react';

type SpinnerProps = SVGProps<SVGSVGElement> & {
  size?: number;
}

/**
 * Represents a default loading spinner component.
 * @param {SpinnerProps} props - The props of the spinner component.
 */

const Spinner = ({ size = 40, ...props }: SpinnerProps) => {
  return (
    <svg className='animate-spin' width={size} height={size} viewBox='0 0 108 108' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g filter='url(#filter0_d_143_295)'>
        <path d='M49 0H59V25H49V0ZM49 75H59V100H49V75ZM104 45V55H79V45H104ZM29 45V55H4V45H29ZM85.82 11.11L92.89 18.18L75.21 35.86L68.14 28.79L85.82 11.11ZM32.79 64.14L39.86 71.21L22.18 88.89L15.11 81.82L32.79 64.14ZM92.89 81.82L85.82 88.89L68.14 71.21L75.21 64.14L92.89 81.82ZM39.86 28.79L32.79 35.86L15.11 18.18L22.18 11.11L39.86 28.79Z' fill='white'/>
      </g>
      <defs>
        <filter id='filter0_d_143_295' x='0' y='0' width='108' height='108' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix'/>
          <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/>
          <feOffset dy='4'/>
          <feGaussianBlur stdDeviation='2'/>
          <feComposite in2='hardAlpha' operator='out'/>
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/>
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_143_295'/>
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_143_295' result='shape'/>
        </filter>
      </defs>
    </svg>
  );
};

export default Spinner;