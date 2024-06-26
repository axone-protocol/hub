import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';
import { cn } from '@/lib/utils';

type SidebarNavItemProps = {
  title: string;
  firstItem?: boolean;
  href?: string;
  beforeNavigation?: () => void;
};

const SidebarNavItem = ({ title, href='/', firstItem=false, beforeNavigation }: SidebarNavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive: boolean = pathname.startsWith(href);
  const className: string = cn('text-base uppercase text-axone-khaki p-4 pl-10 cursor-pointer hover:text-white hover:z-20', {
    'bg-axone-bg-dark border-r-4 border-r-axone-bg-dark border-l-4 border-l-axone-orange -mr-1 pl-9 text-white sidebar-item-active': isActive,
    'sidebar-item-active-first': (firstItem && isActive),
  });
  const navigateToRoute = () => {
    if (beforeNavigation) {
      beforeNavigation();
    } else {
      router.push(href);
    }
  };
  return (
    <div onClick={navigateToRoute} className={className}>
      {title}
    </div>
  );
};

export default memo<typeof SidebarNavItem>(SidebarNavItem);