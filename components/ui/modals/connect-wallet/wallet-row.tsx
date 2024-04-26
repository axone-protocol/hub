import { capitalize } from 'lodash';
import { ArrowUpRight } from 'lucide-react';
import { Download } from 'lucide-react';
import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Text, Title } from '@/components/typography';
import Row from '../../row';

type ConnectWalletRowProps = {
  wallet: string;
  onClick: () => void;
  logo: string;
  link: string | undefined;
  isInstalled: boolean;
  isWalletConnected: boolean;
  isWalletConnecting: boolean;
};

const WalletRow: FC<ConnectWalletRowProps> = ({ wallet, onClick, logo, link, isInstalled, isWalletConnected, isWalletConnecting }) => {

  const onDownload = (): void => {
    window.open(link, '_blank');
  };

  if (isInstalled) {
    return(
      <Row onClick={onDownload} className='p-4 justify-between items-center cursor-pointer border-b border-axone-dark-blue group'>
        <Image className='mr-4' src={logo} alt='Metamask' width={40} height={40} />
        <div className='flex-grow flex flex-col'>
          <Title className='mb-0'>{capitalize(wallet)}</Title>
          <Text className='mb-0'>Connect using browser extension</Text>
        </div>
        <Download className='ml-4 h-8 w-8 mb-0.5 text-axone-khaki group-hover:text-axone-orange' />
      </Row>
    );
  }
  return (
    <Row onClick={onClick} className='p-4 justify-between items-center cursor-pointer border-b border-axone-dark-blue group'>
      <Image className='mr-4' src={logo} alt='Metamask' width={40} height={40} />
      <div className='flex-grow flex flex-col'>
        <Title className='mb-0'>{capitalize(wallet)}</Title>
        <Text className={`mb-0 ${isWalletConnected ? 'text-axone-orange' : ''}`}>
          {
            isWalletConnecting
              ? 'Connecting to wallet...'
              : isWalletConnected
                ? 'Connected'
                : 'Connect using browser wallet'}
        </Text>
      </div>
      <ArrowUpRight className='ml-4 h-8 w-8 mb-0.5 text-axone-khaki group-hover:text-axone-orange' />
    </Row>
  );
};

export { WalletRow };