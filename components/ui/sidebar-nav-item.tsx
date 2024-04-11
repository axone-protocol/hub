import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import { cn } from '@/lib/utils';

type SidebarNavItemProps = {
  title: string;
  firstItem?: boolean;
  href?: string;
};

const SidebarNavItem = ({ title, href='/', firstItem=false }: SidebarNavItemProps) => {
  const pathname = usePathname();
  const isActive: boolean = firstItem ? pathname === '/' : pathname === href;
  const className: string = cn('text-base uppercase text-axone-khaki p-4 pl-10 cursor-pointer hover:text-white hover:z-20', {
    'bg-axone-bg-dark border-r-4 border-r-axone-bg-dark border-l-4 border-l-axone-orange -mr-1 pl-9 text-white font-bold sidebar-item-active': isActive,
    'sidebar-item-active-first': (firstItem && isActive),
  });
  return (
    <Link href={href} className={className}>
      {title}
    </Link>
  );
};

export default memo<typeof SidebarNavItem>(SidebarNavItem);