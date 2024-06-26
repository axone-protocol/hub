'use client';
import { useChain } from '@cosmos-kit/react';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';
import Row from '@/components/ui/row';
import { chainName } from '@/core/chain';
import { useAxoneWalletBalances } from '@/hooks/use-axone-wallet-balances';

const BalancesBlock = () => {
  const t = useTranslations('Wallet');
  const { address } = useChain(chainName);
  const { data, showMore } = useAxoneWalletBalances(address || '');

  return (
    <Box className='w-full lg:w-2/3 m-0'>
      <div className='flex flex-row justify-between mb-6 lg:items-center'>
        <Title>
          {t('Balances')}
        </Title>
      </div>

      <Row className='justify-between'>
        <Text>{t('Asset')}</Text>
        <Text>{t('Balance')}</Text>
      </Row>

      <BoxInner className='flex-col mb-4'>
        {
          data.balances.map((balance, index) => (
            <Row key={index} className='justify-between p-4  group'>
              <div className='flex flex-row gap-4 w-1/4'>
                <LogoDarkMobile className='w-8 h-8' />
                <div className='flex flex-col'>
                  <Text className='mb-0'>Axone</Text>
                  <Text className='mb-0 text-axone-khaki'>AXONE</Text>
                </div>
              </div>
              <div className='flex flex-row gap-4 w-1/4 justify-end items-center'>
                {/* <Button variant={'link'} className='mb-0 mr-4 text-axone-orange hidden group-hover:flex'>Convert</Button> */}
                <Text className='mb-0'>{(Number(balance.amount)/1000000).toFixed(3)}</Text>
                <Text className='mb-0 text-axone-khaki'>AXONE</Text>
              </div>
            </Row>
          ))
        }
      </BoxInner>
      { Number(data.pagination.total) > 1 ? (
        <Button
          onClick={showMore}
          variant={'rounded'}
          className='px-12'
        >
          {t('ShowMore')}
        </Button>
      ) : null
      }
    </Box>
  );
};

export { BalancesBlock };