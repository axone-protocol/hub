import { Asset, AssetList } from '@chain-registry/types';
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import BigNumber from 'bignumber.js';
import { assets } from 'chain-registry';
import { cosmos } from 'juno-network';
import { useCallback, useEffect, useState } from 'react';
import { chainName } from '@/core/config';

const chainAssets: AssetList = assets.find(
  (chain) => chain.chain_name === chainName
) as AssetList;

const coin: Asset = chainAssets.assets.find(
  (asset) => asset.base === 'inj'
) as Asset;

export const useBallance = () => {
  const { address, getRpcEndpoint } =
    useChain(chainName);

  const [balance, setBalance] = useState(new BigNumber(0));
  const [balanceDenom, setBalanceDenom] = useState<string>('inj');
  const [isFetchingBalance, setFetchingBalance] = useState(false);

  const getBalance = useCallback(async () => {
    if (!address) {
      console.info('no address');
      setBalance(new BigNumber(0));
      setFetchingBalance(false);
      return;
    }

    let rpcEndpoint = await getRpcEndpoint();

    if (!rpcEndpoint) {
      console.info('no rpc endpoint — using a fallback');
      rpcEndpoint = `https://rpc.cosmos.directory/${chainName}`;
    }

    // get RPC client
    const client = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint:
        typeof rpcEndpoint === 'string'
          ? rpcEndpoint
          : (rpcEndpoint as ExtendedHttpEndpoint).url,
    });

    // fetch balance
    const balance = await client.cosmos.bank.v1beta1.balance({
      address,
      denom: chainAssets?.assets[0].base as string,
    });

    // Get the display exponent
    // we can get the exponent from chain registry asset denom_units
    const exp = coin.denom_units.find((unit) => unit.denom === coin.display)
      ?.exponent as number;
    // show balance in display values by exponentiating it
    const a = new BigNumber(balance.balance?.amount || 0);
    const amount = a.multipliedBy(10 ** -exp);

    setBalance(amount);
    setBalanceDenom(balance.balance?.denom || 'inj');
    setFetchingBalance(false);
  }, [address, getRpcEndpoint]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, balanceDenom, isFetchingBalance };
};