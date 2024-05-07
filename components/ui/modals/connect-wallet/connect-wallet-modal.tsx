import { WalletModalProps } from '@cosmos-kit/core';
import { BoxInner } from '@/components/ui/boxes';
import Column from '@/components/ui/column';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WalletsList } from './wallets-list';

const ConnectWalletModal = ({ isOpen, setOpen, walletRepo }: WalletModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='text-white w-[85%] lg:w-1/3 max-h-3/4 p-10'>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>Connect to Wallet</DialogTitle>
        </DialogHeader>
        <div className='overflow-y-auto scrollbar-none h-full'>
          <BoxInner>
            <Column>
              <WalletsList wallets={walletRepo} />
            </Column>
          </BoxInner>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ConnectWalletModal };