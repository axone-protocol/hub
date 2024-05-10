'use client';
import Text from '@/components/typography/text';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Row from '@/components/ui/row';

type DelegateModalProps = {
  isOpen: boolean;
  setOpen: () => void;
};

const DelegateModal = ({ isOpen, setOpen }: DelegateModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='text-white w-[85%] lg:w-1/3 max-h-3/4 p-10'>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>Delegate to Black Panther</DialogTitle>
        </DialogHeader>
        <div className='overflow-y-auto scrollbar-none h-full'>
          <Column className='justify-center items-center'>
            <Row className='justify-center items-center mb-2 gap-4'>
              <Text className='uppercase mb-0 text-axone-grey'>Available for delegation</Text>
              <AxoneTooltip content='Your available amount to transfer to a different address on Axone' />
            </Row>
            <Text className='uppercase'>0.00 <span className='uppercase text-axone-khaki'>Axone</span></Text>
          </Column>
          <div className='grid w-full items-center gap-1.5 my-10'>
            <Label className='text-white mb-2' htmlFor='amount'>Amount</Label>
            <div className='relative'>
              <Input type='text' id='amount' placeholder='Enter your amount to be delegated' />
              <Text className='uppercase absolute right-2.5 top-2.5 bottom-0'>Axone</Text>
            </div>
          </div>
          <Button className='w-full' variant={'rounded'}>Delegate</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { DelegateModal };