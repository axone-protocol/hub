import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { CurrentSupplyDTO } from './dto/current-supply.dto';

const getCurrentSupplyFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<CurrentSupplyDTO>(baseUrl + '/supply');

  const formattedData = {
    ...data,
    supply: parseFloat(data.supply) / 1000000,
  };

  return formattedData;
};

export const useCurrentSupplyQueryKey = ['current-supply'];

export const useCurrentSupply = () => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    refetchOnMount: true,
    queryKey: useCurrentSupplyQueryKey,
    queryFn: () => getCurrentSupplyFn(baseUrl),
  });

  return query;
};