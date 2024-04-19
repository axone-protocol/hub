'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-axone-bg-dark data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-axone-bg-dark dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-axone-bg-dark',
      className
    )}
    {...props}
    onCheckedChange={onCheckedChange}
    checked={checked}
    ref={ref}
  >
    <div className={`transform transition-transform ${checked ? 'translate-x-10' : 'translate-x-0'}`}>
      {checked ? <Moon className='w-5 h-5 text-axone-orange pointer-events-none block rounded-full' /> : <Sun className='w-5 h-5 text-axone-bg-dark pointer-events-none block rounded-full' />}
    </div>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };