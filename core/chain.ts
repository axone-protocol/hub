import { AssetList, Chain } from '@chain-registry/types';

const chainName = 'okp4';

const okp4Chain = {
  'chainId': 'okp4-drunemeton-1',
  'chainName': 'OKP4',
  'rpc': 'https://api.drunemeton.okp4.network:443/rpc',
  'rest': 'https://api.drunemeton.okp4.network',
  'bip44': {
    'coinType': 118
  },
  'coinType': 118,
  'bech32Config': {
    'bech32PrefixAccAddr': 'okp4',
    'bech32PrefixAccPub': 'okp4pub',
    'bech32PrefixValAddr': 'okp4valoper',
    'bech32PrefixValPub': 'okp4valoperpub',
    'bech32PrefixConsAddr': 'okp4valcons',
    'bech32PrefixConsPub': 'okp4valconspub'
  },
  'currencies': [
    {
      'coinDenom': 'KNOW',
      'coinMinimalDenom': 'uknow',
      'coinDecimals': 6,
      'coinGeckoId': 'unknown'
    }
  ],
  'feeCurrencies': [
    {
      'coinDenom': 'KNOW',
      'coinMinimalDenom': 'uknow',
      'coinDecimals': 6,
      'coinGeckoId': 'unknown',
      'gasPriceStep': {
        'low': 0.01,
        'average': 0.025,
        'high': 0.03
      }
    }
  ],
  'gasPriceStep': {
    'low': 0.01,
    'average': 0.025,
    'high': 0.03
  },
  'stakeCurrency': {
    'coinDenom': 'KNOW',
    'coinMinimalDenom': 'uknow',
    'coinDecimals': 6,
    'coinGeckoId': 'unknown'
  },
  'features': []
};

const chainRPC = okp4Chain.rpc;

const assetList: AssetList = {
  chain_name: 'okp4',
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
  chain_name: 'okp4',
  status: 'live',
  network_type: 'mainnet',
  pretty_name: 'OKP4 Network',
  chain_id: okp4Chain.chainId,
  bech32_prefix: 'okp4',
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: 'okp4',
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
        denom: 'okp4',
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

export { chain, chainName, chainRPC, assetList };
