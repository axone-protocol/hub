'use client';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from './button';
import Column from './column';
import LogoDark from './logo-dark';
import Row from './row';
import SidebarNavItem from './sidebar-nav-item';
import SidebarWelcomeAxoneBox from './sidebar-welcome-box';
import { Switch } from './switch';
import Text from '../typography/text';

const WIDTH = 'w-64';

const Sidebar = () => {
  const t  = useTranslations('Index');
  const locale = useLocale();

  return (
    <Column className={cn('justify-between pt-5 bg-axone-dark-blue min-h-screen border-r border-r-axone-box-border', WIDTH)}>
      <Column>
        {/* Logo */}
        <div className='px-10'>
          <LogoDark className='mb-5' />
        </div>
        {/* Navigation items */}
        <SidebarNavItem title={t('Dashboard')} href={`/${locale}`} firstItem />
        <SidebarNavItem title={t('Wallet')} href={`/${locale}/wallet`} />
        <SidebarNavItem title={t('Bridge')} href={`/${locale}/bridge`} />
        <SidebarNavItem title={t('Staking')} href={`/${locale}/staking`}  />
        <SidebarNavItem title={t('Governance')} href={`/${locale}/governance`}  />
        <SidebarNavItem title={t('FAQ')} href={`/${locale}/faq`} />

        {/* Welcome block */}
        <SidebarWelcomeAxoneBox />
      </Column>

      {/* Bottom part of sidebar */}
      <div className='px-5 mb-14'>
        <Row className='justify-center items-center mb-10'>
          <Text className='text-base text-axone-khaki mb-0 mr-3 uppercase'>{t('Light')}</Text>
          <Switch className='w-16 h-8' checked={true} onCheckedChange={() => null} id='airplane-mode' />
          <Text className='text-base text-axone-khaki mb-0 ml-3 uppercase'>{t('Dark')}</Text>
        </Row>
        <Button className='w-full' variant={'rounded'}>
          {t('Explore')}
        </Button>
      </div>
    </Column>
  );
};

export default Sidebar;