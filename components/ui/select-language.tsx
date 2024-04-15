'use client';
import { ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const LanguageSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const localeActive = useLocale();
  const path = usePathname();

  const onOpen = useCallback(() => setOpen(prev => !prev), []);

  const onSelectChange = useCallback((value: string) => {
    router.replace(`/${value}${path.replace(`/${localeActive}`, '/')}`);
  }, [path, router, localeActive]);

  return (
    <Select defaultValue={localeActive} onOpenChange={onOpen} onValueChange={onSelectChange}>
      <SelectTrigger className={cn('mr-16', { 'bg-axone-bg-dark': open })}>
        <Languages className='w-5 h-5 text-axone-khaki' /> <SelectValue placeholder='EN' />
        <SelectIcon asChild>
          {!open ? <ChevronDown className='h-4 w-4 text-axone-khaki' /> : <ChevronUp className='h-4 w-4 text-axone-khaki' />}
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value='en'>EN</SelectItem>
          <SelectItem value='fr'>FR</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;