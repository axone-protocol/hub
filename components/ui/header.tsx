import ConnectWalletModal from './connect-wallet-modal';
import CurrencySelect from './select-currency';
import LanguageSelect from './select-language';

const positionLeft = 'left-[15.625rem]';

const Header = () => {

  return (
    <div className={`flex fixed top-0 ${positionLeft} right-0 z-10 items-center justify-between p-6 flex-1 h-20 bg-axone-dark-blue border border-axone-box-border border-t-0 border-r-0 border-l-0`}>
      <div className='flex'>
        <LanguageSelect />
        <CurrencySelect />
      </div>
      <div className='flex'>
        <ConnectWalletModal />
      </div>
    </div>
  );
};

export default Header;