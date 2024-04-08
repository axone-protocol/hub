'use client';

import { useState } from 'react';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';
import CurrencySelect from './select-currency';
import LanguageSelect from './select-language';

const positionLeft = 'left-[15.625rem]';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex fixed top-0 ${positionLeft} right-0 z-10 items-center justify-between p-6 flex-1 h-20 bg-axone-dark-blue border border-axone-box-border border-t-0 border-r-0 border-l-0`}>
      <div className='flex'>
        <LanguageSelect />
        <CurrencySelect />
      </div>
      <div className='flex'>
        <Button onClick={() => setOpen(true)} variant={'rounded'} className='px-10'>
          Connect
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
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
      </div>
    </div>
  );
};

export default Header;