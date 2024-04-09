'use client';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

const ConnectWalletModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'rounded'} className='px-10'>
          Connect
        </Button>
      </DialogTrigger>
      <DialogContent className='text-white'>
        <DialogHeader>
          <DialogTitle>Connect to Wallet</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );};

export default ConnectWalletModal;