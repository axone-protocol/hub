import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Title } from '@/components/typography';
import { ButtonWithIcon } from './button-with-icon';
import Column from './column';

const WIDTH = 206;
const HEIGHT = 140;

type SidebarWelcomeAxoneBoxProps = {
  handleClick: () => void;
};

const SidebarWelcomeAxoneBox: FC<SidebarWelcomeAxoneBoxProps> = ({ handleClick }) => {
  const t = useTranslations('Index');

  return (
    <Column className={'w-full lg:w-52 relative rounded-lg bg-axone-light-blue p-5 my-8 lg:ml-5'}>
      <Title className='lg:hidden flex mb-0 z-10 cursor-pointer'>{t('JoinThe')}&nbsp;{t('Axone')}</Title>
      <Title className='hidden lg:flex mb-0 z-10 cursor-pointer'>{t('JoinThe')}</Title>
      <Title className='hidden lg:flex mb-0 z-10 cursor-pointer'>{t('Axone')}</Title>
      <Title className='mb-0 z-10 cursor-pointer'>{t('Ecosystem')}!</Title>
      <ButtonWithIcon
        variant={'link'}
        className='uppercase font-bold px-0 pb-0 justify-start z-10 text-axone-dark-blue-2'
        iconClassName='text-axone-dark-blue-2 w-5 h-5'
        onClick={handleClick}
      >
        {t('GetStarted')}
      </ButtonWithIcon>
      <svg className='absolute top-0 right-0 lg:left-0' width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_317_1974)'>
          <rect width={WIDTH} height={HEIGHT} rx='20' fill='#D8FAFF'/>
          <g opacity='0.1'>
            <line x1='133.89' y1='16.5122' x2='204.89' y2='0.512232' stroke='#0062AC'/>
            <line x1='158.667' y1='41.6267' x2='204.667' y2='0.626742' stroke='#0062AC'/>
            <line x1='101' y1='16.5' x2='133' y2='16.5' stroke='#0062AC'/>
            <line x1='133.354' y1='16.6464' x2='158.354' y2='41.6464' stroke='#0062AC'/>
            <line x1='158.44' y1='41.7618' x2='175.285' y2='72.846' stroke='#0062AC'/>
            <line x1='131.496' y1='0.935618' x2='133.461' y2='16.0679' stroke='#0062AC'/>
            <line x1='121.296' y1='0.402731' x2='100.296' y2='15.8543' stroke='#0062AC'/>
            <line x1='100.473' y1='17.8382' x2='113.473' y2='55.8382' stroke='#0062AC'/>
            <line x1='114.864' y1='54.9172' x2='158.864' y2='42.5225' stroke='#0062AC'/>
            <line x1='132.761' y1='17.2219' x2='113.449' y2='56.2219' stroke='#0062AC'/>
            <line x1='205.181' y1='60.4663' x2='175.181' y2='72.0811' stroke='#0062AC'/>
            <line x1='205' y1='42.5' x2='160' y2='42.5' stroke='#0062AC'/>
            <line x1='174.873' y1='72.4836' x2='113.873' y2='56.4837' stroke='#0062AC'/>
            <line x1='204.726' y1='92.4182' x2='175.726' y2='73.4182' stroke='#0062AC'/>
            <circle cx='133.5' cy='16.5' r='2.5' fill='#0062AC'/>
            <circle cx='158.5' cy='42.5' r='2.5' fill='#0062AC'/>
            <circle cx='174.5' cy='72.5' r='2.5' fill='#0062AC'/>
            <circle cx='100.5' cy='16.5' r='2.5' fill='#0062AC'/>
            <circle cx='113.5' cy='55.5' r='2.5' fill='#0062AC'/>
          </g>
          <g filter='url(#filter0_f_317_1974)'>
            <ellipse cx='170.585' cy='41.0907' rx='62.6487' ry='89.4817' transform='rotate(54.1407 170.585 41.0907)' fill='#0062AC' fillOpacity='0.12'/>
          </g>
        </g>
        <rect x='0.5' y='0.5' width='205' height='139' rx='19.5' stroke='white' strokeOpacity='0.06'/>
        <defs>
          <filter id='filter0_f_317_1974' x='29.2891' y='-91.8828' width='282.594' height='265.953' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix'/>
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/>
            <feGaussianBlur stdDeviation='30' result='effect1_foregroundBlur_317_1974'/>
          </filter>
          <clipPath id='clip0_317_1974'>
            <rect width={WIDTH} height={HEIGHT} rx='20' fill='white'/>
          </clipPath>
        </defs>
      </svg>
    </Column>
  );
};

export  { SidebarWelcomeAxoneBox };