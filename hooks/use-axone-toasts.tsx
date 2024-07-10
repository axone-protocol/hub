import { ErrorToast, SuccessToast } from '@/components/ui/toasts';
import { useToast } from './use-toast';

const useAxoneToasts = () => {
  const { toast } = useToast();

  const showSuccessToast = (message: string) => {
    toast({
      action: (<SuccessToast message={message} />),
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      variant: 'destructive',
      action: (<ErrorToast message={message} />),
    });
  };
  return { showErrorToast, showSuccessToast };
};

export { useAxoneToasts };