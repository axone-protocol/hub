'use client';
import { Asset } from '@chain-registry/types';
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import BigNumber from 'bignumber.js';
import { cosmos } from 'juno-network';
import { useCallback, useEffect, useState } from 'react';
import { assetList, chainName, chainRPC } from '@/core/chain';

const chainDenom = 'uknow';

// TODO: will be needed later
// const chainAssets: AssetList = assets.find(
//   (chain) => chain.chain_name === chainName
// ) as AssetList;

const coin: Asset = assetList?.assets.find(
  (asset) => asset.base === chainDenom
) as Asset;

export const useBallance = () => {
  const { address } =
    useChain(chainName);

  const [balance, setBalance] = useState(new BigNumber(0));
  const [balanceDenom, setBalanceDenom] = useState<string>('uknow');
  const [isFetchingBalance, setFetchingBalance] = useState(false);

  const getBalance = useCallback(async () => {
    if (!address) {
      console.info('no address');
      setBalance(new BigNumber(0));
      setFetchingBalance(false);
      return;
    }

    // let rpcEndpoint = await getRpcEndpoint(); // prod from useChain()
    let rpcEndpoint = chainRPC; // dev okp4 testnet rpc

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

    const a = new BigNumber(0);
    const amount = a.multipliedBy(10 ** -exp);

    setBalance(amount);
    setBalanceDenom(balance.balance?.denom || 'inj');
    setFetchingBalance(false);
  }, [address]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, balanceDenom, isFetchingBalance };
};