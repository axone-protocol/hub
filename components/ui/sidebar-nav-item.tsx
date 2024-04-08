import Link from 'next/link';
import { memo } from 'react';
import { cn } from '@/lib/utils';

type SidebarNavItemProps = {
  title: string;
  isActive?: boolean;
  firstItem?: boolean;
  href?: string;
};

const SidebarNavItem = ({ title, isActive=false, href='/', firstItem=false }: SidebarNavItemProps) => {
  const className = cn('text-base text-axone-khaki p-4 pl-10 cursor-pointer hover:text-white hover:z-20', {
    'bg-axone-bg-dark  border-r-4 border-r-axone-bg-dark border-l-4 border-l-axone-orange -mr-1 pl-9 text-white font-bold sidebar-item-active': isActive,
    'sidebar-item-active-first': (firstItem && isActive),
  });
  return (
    <Link href={href} className={className}>
      {title.toUpperCase()}
    </Link>
  );
};

export default memo<typeof SidebarNavItem>(SidebarNavItem);