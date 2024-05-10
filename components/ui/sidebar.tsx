'use client';
import { useChain } from '@cosmos-kit/react-lite';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { chainName } from '@/core/config';
import { cn } from '@/lib/utils';
import { Button } from './button';
import Column from './column';
import LogoDark from './logo-dark';
import TermsModal from './modals/terms/terms-modal';
import Row from './row';
import SidebarNavItem from './sidebar-nav-item';
import SidebarWelcomeAxoneBox from './sidebar-welcome-box';
import { Switch } from './switch';
import Text from '../typography/text';

const WIDTH = 'w-64';

const Sidebar = () => {
  const t  = useTranslations('Index');
  const locale = useLocale();
  const [openTerms, setOpenTerms] = useState(false);
  const { openView, isWalletConnected } = useChain(chainName);

  const openConnectWalletModal = useCallback(async () => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (termsAccepted) {
      openView();
    } else {
      setOpenTerms(true);
    }
  }, [openView]);

  return (
    <Column className={cn('lg:flex mobile:hidden justify-between pt-5 bg-axone-dark-blue min-h-screen border-r border-r-axone-box-border', WIDTH)}>
      <Column>
        {/* Logo */}
        <div className='px-10'>
          <LogoDark className='mb-5' />
        </div>
        {/* Navigation items */}
        <SidebarNavItem title={t('Dashboard')} href={`/${locale}/dashboard`} firstItem />
        <SidebarNavItem beforeNavigation={!isWalletConnected ? openConnectWalletModal : undefined} title={t('Wallet')} href={`/${locale}/wallet`} />
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
        <Button className='w-full font-bold' variant={'rounded'}>
          {t('Explore')}
        </Button>
      </div>
      <TermsModal open={openTerms} setOpen={setOpenTerms} openWalletModal={openView} />
    </Column>
  );
};

export default Sidebar;
