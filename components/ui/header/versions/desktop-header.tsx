import LanguageSelect from '@/components/ui//select-language';
import CurrencySelect from '@/components/ui/select-currency';
import { ConnectWallet } from './../connect-wallet';

const DesktopHeader = (): JSX.Element => {
  return (
    <div className={'hidden lg:flex fixed top-0 left-[15.625rem] right-0 z-10 items-center justify-between p-6 flex-1 h-20 bg-axone-dark-blue border border-axone-box-border border-t-0 border-r-0 border-l-0'}>
      <div className='flex'>
        <LanguageSelect />
        <CurrencySelect />
      </div>
      <div className='flex'>
        <ConnectWallet />
      </div>
    </div>
  );
};

export { DesktopHeader };