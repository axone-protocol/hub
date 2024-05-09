'use client';
import { Languages, Moon, PanelsTopLeft, Wallet, X } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import { Text } from '@/components/typography';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';
import { cn } from '@/lib/utils';

type MobileMenuModalProps = {
  isOpen: boolean;
  close: () => void;
};

type MobileMenuItemProps = {
  navItem?: boolean;
  href?: string;
  onPress?: () => void;
  close: () => void;
  className?: string;
  children: ReactNode;
};

const MobileMenuItem: FC<MobileMenuItemProps> = ({ navItem = false, href = '', className='', onPress = () => null, close, children }): JSX.Element => {
  const pathname: string = usePathname();
  const isActivePath: boolean = href === pathname;

  if (navItem) {
    return (
      <Link href={href} onClick={close}>
        <div
          className={cn('flex items-center py-2 text-18 text-axone-khaki hover:text-white', { 'text-white': isActivePath })}>
          <span className='text-10 pr-2'>⚈</span>
          {children}
        </div>
      </Link>
    );
  }
  return(
    <div
      onClick={onPress}
      className={cn('flex items-center py-2 text-18 text-axone-khaki hover:text-white', className)}>
      <span className='text-10 pr-2'>⚈</span>
      {children}
    </div>
  );
};

const MobileMenuModal: FC<MobileMenuModalProps> = ({ isOpen,close }) => {
  const locale: string = useLocale();
  const router: AppRouterInstance = useRouter();
  const localeActive: string = useLocale();
  const path: string = usePathname();
  const t = useTranslations('Index');


  const onLanguageChange = (value: string) => () => router.replace(`/${value}${path.replace(`/${localeActive}`, '/')}`);

  const closeAfterNav = (): void => {
    setTimeout(() => {
      close();
    }, 800);
  };

  return(
    <div
      className={
        cn('hidden fixed z-20 top-0 left-0 right-0 bottom-0 bg-axone-bg-dark p-6',
          { 'flex flex-col': isOpen })
      }>
      <div className='flex flex-row w-full border-b-2 border-axone-box-border justify-between items-center pb-6 text-white'>
        <LogoDarkMobile />
        <X className='cursor-pointer' onClick={close} />
      </div>
      <div className='overflow-y-auto'>
        <div className='py-6 border-b-2 border-axone-box-border'>
          <div className='flex items-center text-axone-khaki'>
            <Languages width={20} height={20} className='mr-4' />
            <Text className='mb-0 text-axone-khaki uppercase'>{t('Languages')}</Text>
          </div>
          <div className='flex flex-col pl-10 mt-3'>
            <MobileMenuItem
              className={localeActive === 'en' ? 'text-white' : ''}
              onPress={onLanguageChange('en')}
              close={closeAfterNav}
            >
              English
            </MobileMenuItem>
            <MobileMenuItem
              className={localeActive === 'fr' ? 'text-white' : ''}
              onPress={onLanguageChange('fr')}
              close={closeAfterNav}
            >
              French
            </MobileMenuItem>
          </div>
        </div>
        <div className='py-6 border-b-2 border-axone-box-border'>
          <div className='flex items-center text-axone-khaki'>
            <Wallet width={20} height={20} className='mr-4' />
            <Text className='mb-0 text-axone-khaki uppercase'>{t('Funds')}</Text>
          </div>
          <div className='flex flex-col pl-10 mt-3'>
            <MobileMenuItem className={'text-white'}  close={closeAfterNav}>USD</MobileMenuItem>
            <MobileMenuItem  close={closeAfterNav}>EUR</MobileMenuItem>
          </div>
        </div>

        <div className='py-6 border-b-2 border-axone-box-border'>
          <div className='flex items-center text-axone-khaki'>
            <PanelsTopLeft width={20} height={20} className='mr-4' />
            <Text className='mb-0 text-axone-khaki uppercase'>{t('Pages')}</Text>
          </div>
          <div className='flex flex-col pl-10 mt-3'>
            <MobileMenuItem navItem href={`/${locale}/dashboard`} close={closeAfterNav}>{t('Dashboard')}</MobileMenuItem>
            <MobileMenuItem navItem href={`/${locale}/wallet`} close={closeAfterNav}>{t('Wallet')}</MobileMenuItem>
            <MobileMenuItem navItem href={`/${locale}/bridge`} close={closeAfterNav}>{t('Bridge')}</MobileMenuItem>
            <MobileMenuItem navItem href={`/${locale}/staking`} close={closeAfterNav}>{t('Staking')}</MobileMenuItem>
            <MobileMenuItem navItem href={`/${locale}/governance`} close={closeAfterNav}>{t('Governance')}</MobileMenuItem>
            <MobileMenuItem navItem href={`/${locale}/faq`} close={closeAfterNav}>{t('FAQ')}</MobileMenuItem>
          </div>
        </div>

        <div className='py-6 border-b-2 border-axone-box-border'>
          <div className='flex items-center text-axone-khaki'>
            <Moon width={20} height={20} className='mr-4' />
            <Text className='mb-0 text-axone-khaki'>{t('Modes')}</Text>
          </div>
          <div className='flex flex-col pl-10 mt-3'>
            <MobileMenuItem className={'text-white'}  close={closeAfterNav}>{t('Dark')}</MobileMenuItem>
            <MobileMenuItem  close={closeAfterNav}>{t('Light')}</MobileMenuItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobileMenuModal };