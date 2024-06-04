import { CircleX } from 'lucide-react';
import Row from '@/components/ui/row';

const ErrorToast = ({ message }: { message: string }) => {
  return (
    <Row className='items-center -ml-2'>
      <CircleX className='mr-3 text-axone-red' />
      {message}
    </Row>
  );
};

export { ErrorToast };