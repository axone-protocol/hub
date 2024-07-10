'use client';
import { Asset } from '@chain-registry/types';
import { StdFee } from '@cosmjs/amino';
import { ExtendedHttpEndpoint } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import BigNumber from 'bignumber.js';
import { TextProposal, VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { cosmos } from 'juno-network';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
import { useEnvironment } from '@/context/environment-context';
import { assetList, chainName } from '@/core/chain';
import { useAxoneToasts } from '../use-axone-toasts';
import Long from 'long';
import { useTransactionStore } from '../use-transaction-store';


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
  setBalance: (balance: BigNumber, isFetchingBalance: boolean) => void;
  balanceDenom: string;
  setBalanceDenom: (denom: string) => void;
  isFetchingBalance: boolean;
  transactionResponse: string;
  isTransactionPending: boolean;
  isUnboningPending: boolean;
  isDelegatingPending: boolean;
  isClaimingRewardsPending: boolean;
  isSubmittingProposalPending: boolean;
  isVotingProposalPending: boolean;
  setIsClaimingRewardsPending: (isPending: boolean) => void;
  setIsUnbondingPending: (isPending: boolean) => void;
  setIsDelegatingPending: (isPending: boolean) => void;
  setIsTransactionPending: (isPending: boolean) => void;
  setTransactionResponse: (response: string) => void;
  setIsSubmittingProposalPending: (isPending: boolean) => void;
  setIsVotingProposalPending: (isPending: boolean) => void;
};

const useAxoneWalletStore = create<AxoneWalletState>((set) => ({
  balance: new BigNumber(0),
  setBalance: (balance: BigNumber, isFetchingBalance: boolean) => set({ balance, isFetchingBalance }),
  balanceDenom: 'uknow',
  setBalanceDenom: (denom: string) => set({ balanceDenom: denom }),
  isFetchingBalance: false,
  transactionResponse: '',
  isTransactionPending: false,
  isUnboningPending: false,
  isDelegatingPending: false,
  isClaimingRewardsPending: false,
  isSubmittingProposalPending: false,
  isVotingProposalPending: false,
  setIsClaimingRewardsPending: (isPending: boolean) => set({ isClaimingRewardsPending: isPending }),
  setIsUnbondingPending: (isPending: boolean) => set({ isUnboningPending: isPending }),
  setIsDelegatingPending: (isPending: boolean) => set({ isDelegatingPending: isPending }),
  setIsTransactionPending: (isPending: boolean) => set({ isTransactionPending: isPending }),
  setTransactionResponse: (response: string) => set({ transactionResponse: response }),
  setIsSubmittingProposalPending: (isPending: boolean) => set({ isSubmittingProposalPending: isPending }),
  setIsVotingProposalPending: (isPending: boolean) => set({ isVotingProposalPending: isPending }),
}));

// TODO: change setting amount from micro (unknow) to base (know) eg. proper multiplying in funcs, now it's just for testing purposes using small amounts
export const useAxonePayments = () => {
  const {
    setIsTransactionPending,
    setBalance,
    setBalanceDenom,
    setIsDelegatingPending,
    setIsUnbondingPending,
    setIsClaimingRewardsPending,
    setIsSubmittingProposalPending,
    setIsVotingProposalPending
  } = useAxoneWalletStore();
  const { setTransactionCompleted } = useTransactionStore();
  const { address, getSigningStargateClient, getRpcEndpoint } =
    useChain(chainName);
  const { showSuccessToast, showErrorToast } = useAxoneToasts();
  const { isDev } = useEnvironment();

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
          amount: new BigNumber(amount).multipliedBy(10 ** 6).toString(),
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
      showSuccessToast('Transaction successful!');
      // setTransactionResponse(JSON.stringify(response));
    } catch (error) {
      showErrorToast(`Something went wrong: ${error}`);
    } finally {
      setIsTransactionPending(false);
      getBalance(address);
      setTransactionCompleted(true);
    }
  };

  const getBalance = useCallback(async (address: string | undefined) => {
    if (!address) {
      console.info('no address');

      setBalance(new BigNumber(0), false);
      return;
    }

    let rpcEndpoint = isDev ? 'https://api.drunemeton.okp4.network:443/rpc' : await getRpcEndpoint();

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

    setBalanceDenom(balance.balance?.denom || 'know');
    setBalance(amount, false);
  }, [getRpcEndpoint, isDev, setBalance, setBalanceDenom]);

  const delegateToValidator = async ({ amount, validatorAddress, memo }: { amount: number, validatorAddress: string, memo: string}) => {
    setIsDelegatingPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }

    const { delegate } = cosmos.staking.v1beta1.MessageComposer.withTypeUrl;

    const msg = delegate({
      delegatorAddress: address,
      validatorAddress: validatorAddress,
      amount: {
        denom: coin.base,
        amount: new BigNumber(amount).multipliedBy(10 ** 6).toString(),
      }
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: '1000',
        },
      ],
      gas: '200000',
    };

    try {
      await stargateClient.signAndBroadcast(
        address,
        [msg],
        fee,
        memo
      );
      showSuccessToast('Delegation successful!');
    } catch (error) {
      showErrorToast(`Something went wrong: ${error}`);
    } finally {
      setIsDelegatingPending(false);
      getBalance(address);
    }
  };

  const unbondFromValidator = async ({ amount, validatorAddress, memo }: { amount: number, validatorAddress: string, memo: string}) => {
    setIsUnbondingPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }

    const { undelegate } = cosmos.staking.v1beta1.MessageComposer.withTypeUrl;

    const msg = undelegate({
      delegatorAddress: address,
      validatorAddress: validatorAddress,
      amount: {
        denom: coin.base,
        amount: new BigNumber(amount).multipliedBy(10 ** 6).toString(), // Correct exponent for atom
      }
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: '1000',
        },
      ],
      gas: '200000',
    };

    try {
      await stargateClient.signAndBroadcast(
        address,
        [msg],
        fee,
        memo
      );
      showSuccessToast('Unbonding successful!');
    } catch (error) {
      showErrorToast(`Something went wrong: ${error}`);
    } finally {
      setIsUnbondingPending(false);
      getBalance(address);
    }
  };

  const claimRewards = async (validatorAddress: string) => {
    setIsClaimingRewardsPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }

    const { withdrawDelegatorReward } = cosmos.distribution.v1beta1.MessageComposer.withTypeUrl;

    const msg = withdrawDelegatorReward({
      delegatorAddress: address,
      validatorAddress: validatorAddress,
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: '1000',
        },
      ],
      gas: '200000',
    };

    try {
      await stargateClient.signAndBroadcast(
        address,
        [msg],
        fee,
      );
      showSuccessToast('Rewards claimed successfully!');
    } catch (error) {
      showErrorToast(`Something went wrong: ${error}`);
    } finally {
      setIsClaimingRewardsPending(false);
      getBalance(address);
    }
  };

  const claimAllDelegatorsRewards = async () => {
    setIsClaimingRewardsPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }

    try {
      // Fetch delegations
      const rpcEndpoint = isDev ? 'https://api.drunemeton.okp4.network:443/rpc' : await getRpcEndpoint();

      const client = await cosmos.ClientFactory.createRPCQueryClient({ rpcEndpoint  });
      const delegations = await client.cosmos.staking.v1beta1.delegatorDelegations({ delegatorAddr: address });

      const messages = delegations.delegationResponses.map((delegation) => {
        const { withdrawDelegatorReward } = cosmos.distribution.v1beta1.MessageComposer.withTypeUrl;
        return withdrawDelegatorReward({
          delegatorAddress: address,
          validatorAddress: delegation!.delegation!.validatorAddress || '',
        });
      });

      const fee: StdFee = {
        amount: [{ denom: coin.base, amount: '1000' }],
        gas: '200000',
      };

      await stargateClient.signAndBroadcast(address, messages, fee);
      showSuccessToast('All rewards claimed successfully!');

    } catch (error) {
      showErrorToast(`Something went wrong: ${error}`);
    } finally {
      setIsClaimingRewardsPending(false);
      getBalance(address);
    }
  };

  const submitProposal = async ({ title, description, amount, depositDenom }: { title: string, description: string, amount: number, depositDenom: string }) => {
    setIsSubmittingProposalPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }

    // Create the TextProposal message
    const proposalContent = TextProposal.fromPartial({
      title: title,
      description: description,
    });

    // Serialize the proposal content
    const proposalContentAny: Any = {
      typeUrl: '/cosmos.gov.v1beta1.TextProposal',
      value: TextProposal.encode(proposalContent).finish(),
    };

    const { submitProposal } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;

    const msg = submitProposal({
      content: proposalContentAny,
      initialDeposit: [
        {
          denom: depositDenom,
          amount: new BigNumber(amount).multipliedBy(10 ** 6).toString(),
        },
      ],
      proposer: address,
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: '1000',
        },
      ],
      gas: '200000',
    };

    try {
      const resp = await stargateClient.signAndBroadcast(
        address,
        [msg],
        fee,
      );
      console.log('Create proposal response ', resp);
      if (resp.code === 0) {
        showSuccessToast('Proposal submitted successfully!');
      } else {
        showErrorToast(`Failed to submit proposal. Code: ${resp.code}`);
      }
    } catch (error) {
      showErrorToast(`Something went wrong: ${error}`);
    } finally {
      setIsSubmittingProposalPending(false);
    }
  };

  const voteProposal = async ({ proposalId, option }: { proposalId: string, option: VoteOption }) => {
    setIsVotingProposalPending(true);
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error('stargateClient undefined or address undefined.');
      return;
    }
  
    const { vote } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;
  
    const msg = vote({
      proposalId: Long.fromString(proposalId),
      voter: address,
      option: option,
    });
  
    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: '1000',
        },
      ],
      gas: '200000',
    };
  
    try {
      const response = await stargateClient.signAndBroadcast(address, [msg], fee);
      if (response.code === 0) {
        showSuccessToast(`Proposal vote result: ${response.rawLog}`);
      } else {
        showErrorToast(`Failed to vote on proposal. Code: ${response.code}`);
      }
    } catch (error) {
      showErrorToast(`Failed to vote on proposal. Error: ${error}`);
    }
    setIsVotingProposalPending(false);
  };

  useEffect(() => {
    getBalance(address);
  }, [address, getBalance]);

  return useAxoneWalletStore(state => ({
    balance: state.balance,
    balanceDenom: state.balanceDenom,
    isFetchingBalance: state.isFetchingBalance,
    isTransactionPending: state.isTransactionPending,
    isUnboningPending: state.isUnboningPending,
    isDelegatingPending: state.isDelegatingPending,
    isClaimingRewardsPending: state.isClaimingRewardsPending,
    isSubmittingProposalPending: state.isSubmittingProposalPending,
    isVotingProposalPending: state.isVotingProposalPending,
    makeTransaction,
    delegateToValidator,
    unbondFromValidator,
    claimRewards,
    claimAllDelegatorsRewards,
    submitProposal,
    voteProposal
  }));
};