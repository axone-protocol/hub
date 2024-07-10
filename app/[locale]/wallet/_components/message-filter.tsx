'use client';
import { useTranslations } from 'next-intl';
import { FC, memo, useCallback, useState } from 'react';
import { Text } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedItems } from '@/hooks/use-wallet-history';

type MessageFilterProps = {
  checkedItems: CheckedItems;
  handleCheckboxChange: (key: string) => () => void;
  onApply: () => void;
};

const MessageFilter: FC<MessageFilterProps> = memo(({ checkedItems, handleCheckboxChange, onApply }) => {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations('Wallet');

  const close = useCallback(() => setOpen(false), []);

  const handleApply = () => {
    onApply();
    close();
  };

  const toggle = useCallback(() => setOpen(prev => !prev), []);

  return (
    <div className='relative w-1/6 flex items-center gap-2 cursor-pointer'>
      <Text onClick={toggle}>{t('Message')}</Text>
      <svg onClick={toggle} className='mb-2' width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M4.66667 3.97656H15.3333C15.5101 3.97656 15.6797 4.0468 15.8047 4.17182C15.9298 4.29685 16 4.46642 16 4.64323V5.70056C16 5.87736 15.9297 6.0469 15.8047 6.1719L11.5287 10.4479C11.4036 10.5729 11.3334 10.7424 11.3333 10.9192V15.1226C11.3333 15.2239 11.3102 15.3239 11.2658 15.415C11.2213 15.506 11.1567 15.5858 11.0768 15.6481C10.9969 15.7105 10.9039 15.7538 10.8047 15.7748C10.7056 15.7957 10.603 15.7939 10.5047 15.7692L9.17133 15.4359C9.02717 15.3998 8.89921 15.3165 8.80777 15.1994C8.71634 15.0822 8.66667 14.9378 8.66667 14.7892V10.9192C8.66663 10.7424 8.59637 10.5729 8.47133 10.4479L4.19533 6.1719C4.0703 6.0469 4.00004 5.87736 4 5.70056V4.64323C4 4.46642 4.07024 4.29685 4.19526 4.17182C4.32029 4.0468 4.48986 3.97656 4.66667 3.97656Z' stroke='#66777E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
      </svg>
      {
        open
          ? (
            <div className='flex flex-col gap-4 absolute top-8 rounded-md bg-axone-dark-blue p-4 z-10'>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.all} onCheckedChange={handleCheckboxChange('all')} />
                <Text className='mb-0'>
                  {t('All')}
                </Text>
              </div>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.send} onCheckedChange={handleCheckboxChange('send')} />
                <Text className='mb-0'>
                  {t('Send')}
                </Text>
              </div>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.delegate} onCheckedChange={handleCheckboxChange('delegate')} />
                <Text className='mb-0'>
                  {t('Delegate')}
                </Text>
              </div>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.redelegate} onCheckedChange={handleCheckboxChange('redelegate')} />
                <Text className='mb-0'>
                  {t('Redelegate')}
                </Text>
              </div>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.undelegate} onCheckedChange={handleCheckboxChange('undelegate')} />
                <Text className='mb-0'>
                  {t('Undelegate')}
                </Text>
              </div>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.claimRewards} onCheckedChange={handleCheckboxChange('claimRewards')} />
                <Text className='mb-0'>
                  {t('ClaimRewards')}
                </Text>
              </div>
              <div className='w-full flex items-center gap-2'>
                <Checkbox checked={checkedItems.ibcTransfer} onCheckedChange={handleCheckboxChange('ibcTransfer')} />
                <Text className='mb-0'>
                  {t('IbcTransfer')}
                </Text>
              </div>

              <div className='flex items-center justify-start gap-2'>
                <Button
                  onClick={handleApply}
                  variant={'rounded'}
                >
                  {t('Apply')}
                </Button>
                <Button
                  onClick={close}
                  className='border-axone-khaki text-axone-grey'
                  variant={'rounded'}
                >
                  {t('Cancel')}
                </Button>
              </div>
            </div>
          ) : null
      }
    </div>
  );
});

MessageFilter.displayName = 'MessageFilter';

export { MessageFilter };