'use client';
import { FC } from 'react';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box } from '@/components/ui/boxes';
import { BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';
import { useValidatorDelegations, ValidatorDelegation } from '@/hooks/use-validator-delegations';

type ValidatorDelegationsBlockProps = {
  address: string | string[];
};

const ValidatorDelegationsBlock: FC<ValidatorDelegationsBlockProps> = ({ address = '' }) => {
  const { data } = useValidatorDelegations(address);

  const shortenedAddress = (address = ''): string => `${address?.slice(0, 8)}...${address?.slice(-4)}`;

  return (
    <Box className='m-0'>
      <Title className='mb-6'>Validator Delegations</Title>

      <div className='w-full overflow-auto'>
        <Row className='px-6 justify-between mb-3 w-[600px] lg:w-full overflow-auto'>
          <Text className='w-1/3 text-white mb-0 text-left'>Delegator</Text>
          <div className='flex w-1/3 ml-4 gap-2 items-center justify-start'>
            <Text className=' text-white mb-0'>Delegated Amount</Text>
            <AxoneTooltip iconColor='text-axone-khaki' content='Delegated Amount' />
          </div>
          <Text className='w-1/3 text-white mb-0 text-right'>Commission</Text>
        </Row>
        <BoxInner className='flex flex-col w-[600px] lg:w-full h-[140px] overflow-y-auto scrollbar scrollbar-thin'>
          {
            data?.validatorDelegations.map((delegation: ValidatorDelegation, index: number) => (
              <Row key={delegation.delegator + index} className='p-6 justify-between even:bg-axone-dark-blue-3'>
                <Text className='w-1/3 text-axone-khaki mb-0 text-left'>{shortenedAddress(delegation.delegator)}</Text>
                <Text className='w-1/3 ml-4 text-axone-khaki mb-0 text-left'>{Number(delegation.delegatedAmount).toFixed(2) || 0.00} AXONE</Text>
                <Text className='w-1/3 text-axone-khaki mb-0 text-right'>{Number(delegation.commission).toFixed(2) || 0.00}%</Text>
              </Row>
            ))
          }
        </BoxInner>
      </div>

      <Button variant='rounded' className='px-8 mt-8'>Show More</Button>
    </Box>
  );
};

export { ValidatorDelegationsBlock };