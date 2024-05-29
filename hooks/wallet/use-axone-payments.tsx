'use client';
import { Asset } from '@chain-registry/types';
import { StdFee } from '@cosmjs/amino';
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import BigNumber from 'bignumber.js';
import { cosmos } from 'juno-network';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { create } from 'zustand';
import Row from '@/components/ui/row';
import { assetList, chainName } from '@/core/chain';
import { useToast } from '../use-toast';

const chainDenom = 'uknow';

// TODO: will be needed later
// const chainAssets: AssetList = assets.find(
//   (chain) => chain.chain_name === chainName
// ) as AssetList;

const coin: Asset = assetList?.assets.find(
  (asset) => asset.base === chainDenom
) as Asset;

type AxoneWalletState = {
  balance: BigNumber;
  balanceDenom: string;
  isFetchingBalance: boolean;
  transactionResponse: string;
  isTransactionPending: boolean;
  setIsTransactionPending: (isPending: boolean) => void;
  setTransactionResponse: (response: string) => void;
  getBalance: (address: string | undefined) => void;
};

const useAxoneWalletStore = create<AxoneWalletState>((set) => ({
  balance: new BigNumber(0),
  balanceDenom: 'uknow',
  isFetchingBalance: false,
  transactionResponse: '',
  isTransactionPending: false,
  setIsTransactionPending: (isPending: boolean) => set({ isTransactionPending: isPending }),
  setTransactionResponse: (response: string) => set({ transactionResponse: response }),
  getBalance: async (address: string | undefined) => {
    if (!address) {
      console.info('no address');
      set({
        balance: new BigNumber(0),
        isFetchingBalance: false
      });
      return;
    }

    // let rpcEndpoint = await getRpcEndpoint(); // prod from useChain()
    let rpcEndpoint = 'https://api.drunemeton.okp4.network:443/rpc'; // dev okp4 testnet rpc

    if (!rpcEndpoint) {
      console.info('no rpc endpoint — using a fallback');
      rpcEndpoint = `https://rpc.cosmos.directory/${chainName}`; // production endpoint
    }

    const client = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint:
        typeof rpcEndpoint === 'string'
          ? rpcEndpoint
          : (rpcEndpoint as ExtendedHttpEndpoint).url,
    });
    const balance = await client.cosmos.bank.v1beta1.balance({
      address,
      denom: assetList?.assets[0].base as string,
    });

    const exp = coin.denom_units.find((unit) => unit.denom === 'uknow')
      ?.exponent as number;

    const a = new BigNumber(balance.balance?.amount || 0);
    const amount = a.multipliedBy(10 ** -exp);

    set({
      balance: amount,
      balanceDenom: balance.balance?.denom || 'inj',
      isFetchingBalance: false
    });
  }
}));

export const useAxonePayments = () => {
  const { getBalance, setIsTransactionPending } = useAxoneWalletStore();
  const { address, getSigningStargateClient } =
    useChain(chainName);
  const { toast } = useToast();

  const makeTransaction = async ({ amount, destination, memo }: { amount: number, destination: string, memo: string}) => {
    setIsTransactionPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }

    const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

    const msg = send({
      amount: [
        {
          denom: coin.base,
          amount: new BigNumber(amount).multipliedBy(1 ** 6).toString(),
        },
      ],
      toAddress: destination,
      fromAddress: address,
    });
  
    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: '1000',
        },
      ],
      gas: '86364',
    };
    try {
      await stargateClient.signAndBroadcast(
        address,
        [msg],
        fee,
        memo
      );
      toast({
        action: (
          <Row className='items-center -ml-2'>
            <CircleCheckBig className='mr-3 text-axone-orange' />
            {'Payment successful!'}
          </Row>
        )
      });
      // setTransactionResponse(JSON.stringify(response));
    } catch (error) {
      toast({
        action: (
          <Row className='items-center -ml-2'>
            <CircleX className='mr-3 text-axone-red' />
            {`Something went wrong: ${error}`}
          </Row>
        )
      });
    } finally {
      setIsTransactionPending(false);
      getBalance(address);
    }
  };

  useEffect(() => {
    getBalance(address);
  }, [address, getBalance]);

  return useAxoneWalletStore(state => ({
    balance: state.balance,
    balanceDenom: state.balanceDenom,
    isFetchingBalance: state.isFetchingBalance,
    isTransactionPending: state.isTransactionPending,
    makeTransaction
  }));
};