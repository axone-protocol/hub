'use client';
import { FC, useEffect, useState } from 'react';
import Text from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';
import { ConfirmTransactionStep } from './confirm-transaction-step';
import { BoxInner } from '../../boxes';
import { CheckMarkIcon } from '../../checkmark-icon';

type DelegateModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

type ProgressBarProps = {
  step: number;
  setStep: (step: number) => void;
};

const ProgressBar: FC<ProgressBarProps> = ({ step, setStep }) => {

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setStep((prevStep: number) => (prevStep < 4 ? prevStep + 1 : prevStep));
    }, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [setStep]);

  return (
    <div className='relative w-full h-[4px] bg-axone-bg-dark rounded-full my-6'>
      <div
        className={cn('absolute left-0 top-0 h-[4px] rounded-full bg-axone-orange transition-all duration-500 ease-in-out', {
          'w-0': step === 1,
          'w-1/3': step === 2,
          'w-2/3': step === 3,
          'w-full': step === 4
        })}
      ></div>
      <div className='absolute z-50 -top-[4px] flex justify-between w-full'>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={cn('w-3 h-3 rounded-full bg-axone-bg-dark border-2 border-axone-bg-dark cursor-pointer', { 'bg-axone-orange border-2 border-axone-orange': item <= step })}
            onClick={() => setStep(item)}
          ></div>
        ))}
      </div>
    </div>
  );
};


const ConfirmTransactionModal = ({ isOpen, setOpen }: DelegateModalProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [step, setStep] = useState<number>(2);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIsConfirmed(false), 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='text-white w-[85%] lg:w-1/3 max-h-3/4 p-10'>
        {
          !isConfirmed ? <ConfirmTransactionStep onConfirm={() => setIsConfirmed(true)} />
            : (
              <>
                <DialogHeader>
                  <DialogTitle className='text-left text-20'>Transaction in Progress</DialogTitle>
                </DialogHeader>
                <div className='overflow-y-auto scrollbar-none h-full'>
                  <BoxInner className='p-3 w-full justify-between items-center gap-2'>
                    <Text className='mb-0'>Transfer Amount</Text>
                    <Text className='mb-0'>0.10 Axone</Text>
                  </BoxInner>
                  <div className='flex flex-col justify-center items-center gap-4 mt-4 pt-4'>
                    {
                      step !== 4 ? (
                        <svg width='62' height='62' viewBox='0 0 62 62' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path className='spin' d='M61 31C61 36.9334 59.2405 42.7336 55.9441 47.6671C52.6476 52.6006 47.9623 56.4458 42.4805 58.7164C36.9987 60.987 30.9667 61.5811 25.1473 60.4236C19.3279 59.266 13.9824 56.4088 9.7868 52.2132C5.59122 48.0176 2.734 42.6721 1.57644 36.8527C0.418885 31.0333 1.01298 25.0013 3.28361 19.5195C5.55424 14.0377 9.39942 9.35235 14.3329 6.05591C19.2664 2.75947 25.0666 1 31 1' stroke='url(#paint0_linear_599_4703)' strokeWidth='2' strokeLinecap='round'/>
                          <path d='M25.4539 30.8593L36.2265 41.7931L47.1199 31.0205L36.3474 20.0867L25.4539 30.8593ZM36.1862 45.6364L21.5703 30.819L32.6974 19.845L36.3796 16.2031L50.9955 31.0527L36.1782 45.6283L36.1862 45.6364Z' fill='white'/>
                          <path d='M36.4213 36.6957L34.5037 34.7297L38.1456 31.1281L34.3828 27.2929L36.3085 25.3672L42.0292 31.1684L36.4213 36.6957Z' fill='#FF9500'/>
                          <path d='M25.6562 45.8014L11 30.9518L25.8173 16.3359L29.2578 19.8247L27.2999 21.7424L25.8173 20.2115L14.8836 30.9921L25.6562 41.9259L27.0662 40.5481L28.9839 42.514L25.6562 45.8014Z' fill='white'/>
                          <defs>
                            <linearGradient id='paint0_linear_599_4703' x1='31' y1='1' x2='61' y2='31' gradientUnits='userSpaceOnUse'>
                              <stop stop-color='#FF9500'/>
                              <stop offset='1' stop-color='white'/>
                            </linearGradient>
                          </defs>
                        </svg>
                      ) : <CheckMarkIcon width={67} height={67} active />
                    }

                    <Text className='mb-0 text-axone-khaki'>Elapsed time:6 seconds</Text>
                  </div>
                  <ProgressBar step={step} setStep={setStep} />
                  <div className='flex justify-between items-center mt-6'>
                    <Text className='mb-0'>Submitted</Text>
                    <Text className='mb-0'>Axone Confirming</Text>
                    <Text className='mb-0'>Completed</Text>
                  </div>
                  <Row>
                    <Text className='mb-0 text-center mt-6'>Your transfer is now processing and you are welcome to close this window. Feel free to check back at any time to track the progress of the transfer.</Text>
                  </Row>
                  <Button onClick={onClose} className='w-full mt-6' variant={'rounded'}>Close</Button>
                  <Button className='w-full mt-2 text-axone-orange pb-0' variant={'link'}>View on Axone Explorer</Button>
                </div>
              </>
            )
        }
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmTransactionModal };