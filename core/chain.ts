import { AssetList, Chain } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';
import { SignerOptions } from '@cosmos-kit/core';
import { getSigningCosmosClientOptions } from 'osmojs';

const chainName = 'okp4';

const okp4Chain = {
  chainId: 'okp4-drunemeton-1',
  chainName: 'okp4',
  rpc: 'https://api.drunemeton.okp4.network:443/rpc',
  rest: 'https://api.drunemeton.okp4.network',
  bip44: {
    coinType: 118
  },
  coinType: 118,
  bech32Config: {
    bech32PrefixAccAddr: 'okp4',
    bech32PrefixAccPub: 'okp4pub',
    bech32PrefixValAddr: 'okp4valoper',
    bech32PrefixValPub: 'okp4valoperpub',
    bech32PrefixConsAddr: 'okp4valcons',
    bech32PrefixConsPub: 'okp4valconspub'
  },
  currencies: [
    {
      coinDenom: 'KNOW',
      coinMinimalDenom: 'uknow',
      coinDecimals: 6,
      coinGeckoId: 'unknown'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'KNOW',
      coinMinimalDenom: 'uknow',
      coinDecimals: 6,
      coinGeckoId: 'unknown',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03
      }
    }
  ],
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03
  },
  stakeCurrency: {
    coinDenom: 'KNOW',
    coinMinimalDenom: 'uknow',
    coinDecimals: 6,
    coinGeckoId: 'unknown'
  },
  features: []
};

const chainRPC = okp4Chain.rpc;
const chanREST = okp4Chain.rest;

const assetList: AssetList = {
  chain_name: chainName,
  assets: [
    {
      base: 'uknow',
      name: 'UKNOW',
      display: 'KNOW',
      symbol: 'KNOW',
      denom_units: [
        {
          denom: 'uknow',
          exponent: 6,
          aliases: []
        }
      ]
    }
  ],
};

const chain: Chain = {
  chain_name: chainName,
  status: 'live',
  network_type: 'mainnet',
  pretty_name: 'OKP4 Network',
  chain_id: okp4Chain.chainId,
  bech32_prefix: 'okp4pub',
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: 'KNOW',
        fixed_min_gas_price: 0.01,
        low_gas_price: 0.01,
        average_gas_price: 0.02,
        high_gas_price: 0.03,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: 'KNOW',
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: okp4Chain.rpc,
      },
    ],
    rest: [
      {
        address: okp4Chain.rest,
      },
    ],
  },
};

const signerOptions: SignerOptions = {
  signingStargate: (_chain: Chain) => {
    return getSigningCosmosClientOptions();
  },
  signingCosmwasm: (chain: Chain) => {
    switch (chain.chain_name) {
    case 'okp4':
      return {
        gasPrice: GasPrice.fromString('0.0025uknow')
      };
    }
  }
};

export { chain, chainName, chainRPC, chanREST, assetList, signerOptions };
