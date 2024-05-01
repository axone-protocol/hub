'use client';
import { BarChart2, Copy, LogOut, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { Text } from '@/components/typography';
import { Button } from '@/components/ui/button';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';

type MobileMenuAuthorizedProps = {
  logo: string;
  address: string | undefined;
  shortenedAddress: string;
  copyToClipboard: (address: string | undefined) => () => void;
  disconnect: () => void;
  prettyName: string | undefined;
  openMobileMenu?: () => void;
};

const MobileMenuAuthorized: FC<MobileMenuAuthorizedProps> = ({
  logo,
  address,
  shortenedAddress,
  copyToClipboard,
  disconnect,
  prettyName,
  openMobileMenu,
}) => {
  const [mobileAuthenticatedOpen, setMobileAuthenticatedOpen] = useState<boolean>(false);
  const t = useTranslations('Index');

  const logoutMobile = useCallback((): void => {
    disconnect();
    setMobileAuthenticatedOpen(false);
  }, [disconnect]);

  const closeAuthModal = useCallback((): void => {
    setMobileAuthenticatedOpen(false);
  }, []);

  const openAuthModal = useCallback((): void => {
    setMobileAuthenticatedOpen(true);
  }, []);

  return(
    <>
      <div className='md:hidden flex'>
        <div className='cursor-pointer mr-6' onClick={openAuthModal}>
          <Image src={logo} alt={`${prettyName}`} width={20} height={20} />
        </div>
        <div onClick={openMobileMenu} className='cursor-pointer'>
          <BarChart2 className='text-axone-grey rotate-90' />
        </div>
      </div>

      <div className={cn('hidden fixed z-20 overflow-y-auto top-0 left-0 right-0 bottom-0 bg-axone-bg-dark p-6', { 'flex flex-col': mobileAuthenticatedOpen })}>
        <div className='flex flex-row w-full border-b-2 border-axone-box-border justify-between items-center pb-6 text-white'>
          <LogoDarkMobile />
          <X className='cursor-pointer' onClick={closeAuthModal} />
        </div>
        <div className='py-6 border-b-2 border-axone-box-border'>
          <div className='flex items-center text-axone-khaki'>
            <Copy width={20} height={20} className='mr-4' />
            <Text className='mb-0 text-axone-khaki uppercase'>{t('Copy')}</Text>
          </div>
          <Row className='pt-6'>
            <Image src={logo} alt={`${prettyName}`} width={20} height={20} />
            <Text className='mb-0 mx-2 select-none uppercase'>{`${shortenedAddress}`}</Text>
          </Row>
          <Button
            variant='rounded'
            className='mt-4 w-full bg-transparent'
            onClick={copyToClipboard(address)}
          >
            {t('MakeACopy')}
          </Button>
        </div>
        <div className='py-6 border-b-2 border-axone-box-border'>
          <div className='flex items-center text-axone-khaki'>
            <LogOut width={20} height={20} className='mr-4' />
            <Text className='mb-0 text-axone-khaki uppercase'>{t('Logout')}</Text>
          </div>
          <Button
            variant='rounded'
            className='mt-4 w-full bg-transparent'
            onClick={logoutMobile}
          >
            {t('Logout')}
          </Button>
        </div>
      </div>
    </>
  );
};

export { MobileMenuAuthorized };