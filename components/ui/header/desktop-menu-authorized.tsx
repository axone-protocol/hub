'use client';
import { Copy, LogOut } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { Text } from '@/components/typography';
import Row from '../row';

type DesktopMenuAuthorizedProps = {
  logo: string;
  address: string | undefined;
  shortenedAddress: string;
  copyToClipboard: (address: string | undefined) => () => void;
  disconnect: () => void;
  prettyName: string | undefined;
};

const DesktopMenuAuthorized: FC<DesktopMenuAuthorizedProps> = ({
  logo,
  address,
  shortenedAddress,
  copyToClipboard,
  disconnect,
  prettyName
}) => {
  return(
    <Row className='hidden md:flex items-center'>
      <Row className='items-center border-r-2 border-axone-box-border'>
        <Image src={logo} alt={`${prettyName}`} width={20} height={20} />
        <Text className='mb-0 mx-2 select-none'>{`${shortenedAddress}`}</Text>
        <Copy
          className='mx-2 cursor-pointer hover:bg-axone-bg-dark'
          width={20}
          onClick={copyToClipboard(address)}
          stroke='white'
          strokeWidth={2}
          absoluteStrokeWidth
        />
      </Row>
      <LogOut
        className='mx-4 cursor-pointer hover:bg-axone-bg-dark'
        width={20}
        onClick={() => disconnect()}
        stroke='white'
        strokeWidth={2}
        absoluteStrokeWidth
      />
    </Row>
  );
};

export { DesktopMenuAuthorized };