import { HTMLAttributes, ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const PageContainer = ({ children, ...props }: PageContainerProps) => {
  return(
    <div className='pt-20 w-full desktop:w-[1200px] mobile:w-full' {...props}>
      {children}
    </div>
  );
};

export default PageContainer;