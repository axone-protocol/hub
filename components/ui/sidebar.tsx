'use client';
import { useChain } from '@cosmos-kit/react-lite';
import { useLocale, useTranslations } from 'next-intl';
import { useModal } from '@/context';
import { chainName } from '@/core/chain';
import { cn, EXPLORE_URL, GET_STARTED_URL, openInNewTab } from '@/lib/utils';
import { Button } from './button';
import Column from './column';
import LogoDark from './logo-dark';
import SidebarNavItem from './sidebar-nav-item';
import { SidebarWelcomeAxoneBox } from './sidebar-welcome-box';

const WIDTH = 'w-64';

const Sidebar = () => {
  const t  = useTranslations('Index');
  const locale = useLocale();
  const { isWalletConnected } = useChain(chainName);
  const { openConnectWalletModal } = useModal();

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
        {/* <SidebarNavItem title={t('Bridge')} href={`/${locale}/bridge`} /> */}
        <SidebarNavItem title={t('Staking')} href={`/${locale}/staking`}  />
        <SidebarNavItem title={t('Governance')} href={`/${locale}/governance`}  />
        <SidebarNavItem title={t('FAQ')} href={`/${locale}/faq`} />

        {/* Welcome block */}
        <SidebarWelcomeAxoneBox handleClick={openInNewTab(GET_STARTED_URL)} />

        <div className='px-5'>
          <Button
            className='w-full font-bold'
            variant={'rounded'}
            onClick={openInNewTab(EXPLORE_URL)}
          >
            {t('Explore')}
          </Button>
        </div>
      </Column>

      {/* Bottom part of sidebar */}
      <div className='px-5 mb-14'>
        {/* TODO: Here is Light/Dark mode switch */}

        {/* <Row className='justify-center items-center mb-10'>
          <Text className='text-base text-axone-khaki mb-0 mr-3 uppercase'>{t('Light')}</Text>
          <Switch className='w-16 h-8' checked={true} onCheckedChange={() => null} id='airplane-mode' />
          <Text className='text-base text-axone-khaki mb-0 ml-3 uppercase'>{t('Dark')}</Text>
        </Row> */}
      </div>
    </Column>
  );
};

export default Sidebar;
