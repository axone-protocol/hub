import { CircleCheckBig } from 'lucide-react';
import Row from '@/components/ui/row';

const SuccessToast = ({ message }: { message: string }) => {
  return (
    <Row className='items-center -ml-2'>
      <CircleCheckBig className='mr-3 text-axone-orange' />
      {message}
    </Row>
  );
};

export { SuccessToast };