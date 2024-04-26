import LanguageSelect from '@/components/ui//select-language';
import CurrencySelect from '@/components/ui/select-currency';
import { ConnectWallet } from './connect-wallet';

const POSITION_LEFT = 'left-[15.625rem]';

const Header = () => {
  return (
    <div className={`flex fixed top-0 ${POSITION_LEFT} right-0 z-10 items-center justify-between p-6 flex-1 h-20 bg-axone-dark-blue border border-axone-box-border border-t-0 border-r-0 border-l-0`}>
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

export default Header;