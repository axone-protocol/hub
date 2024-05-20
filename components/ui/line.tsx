import { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type LineProps = HTMLAttributes<HTMLDivElement>;

const Line: FC<LineProps> = ({ className, ...rest }) => (<div className={cn('w-full border-b-2 border-b-axone-box-border', className)} {...rest}></div>);

export { Line };