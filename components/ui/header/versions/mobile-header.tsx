'use client';
import { useCallback, useState } from 'react';
import { ConnectWallet } from '@/components/ui/header/connect-wallet';
import { MobileMenuModal } from '@/components/ui/header/mobile-menu/mobile-menu';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';

const MobileHeader = (): JSX.Element => {
  const [mobileMenuOpened, openMobileMenu] = useState<boolean>(false);

  const openMenu = useCallback((): void => {
    openMobileMenu(true);
  }, []);

  const closeMenu = useCallback((): void => {
    openMobileMenu(false);
  }, []);

  return (
    <div className={'flex lg:hidden fixed top-0 left-0 right-0 z-10 items-center justify-between p-6 flex-1 h-20 bg-axone-dark-blue border border-axone-box-border border-t-0 border-r-0 border-l-0'}>
      <div className='flex'>
        <LogoDarkMobile />
      </div>
      <div className='flex'>
        <ConnectWallet openMobileMenu={openMenu} />
        <MobileMenuModal isOpen={mobileMenuOpened} close={closeMenu} />
      </div>
    </div>
  );
};

export { MobileHeader };