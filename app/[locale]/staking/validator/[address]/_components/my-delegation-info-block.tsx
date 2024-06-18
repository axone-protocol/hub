'use client';
import { useChain } from '@cosmos-kit/react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import Row from '@/components/ui/row';
import { useModal } from '@/context';
import { chainName } from '@/core/chain';
import { useMyDelegationsOverview } from '@/hooks/use-my-delegations-overview';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';

const MyDelegationInfoBlock = () => {
  const t = useTranslations('Staking');
  const { openDelegateModal } = useModal();
  const { address: validatorAddress } = useParams();
  const { isWalletConnected } = useChain(chainName);
  const locale = useLocale();
  const router = useRouter();
  const { data } = useMyDelegationsOverview(validatorAddress);
  const {
    unbondFromValidator,
    claimRewards,
    isClaimingRewardsPending,
    isDelegatingPending,
    isUnboningPending
  } = useAxonePayments();

  const navigateToWallet = () => {
    router.push(`/${locale}/wallet`);
  };

  const onUnbond = () => unbondFromValidator({ amount: Number(data?.delegation)/1000000, validatorAddress: `${validatorAddress}`, memo: '' });
  const onClaimRewards = () => claimRewards(`${validatorAddress}`);

  return (
    <Box className='w-full lg:w-[380px] m-0 relative'>
      <Title className='mb-6'>{t('MyDelegationInfo')}</Title>
      {
        isWalletConnected
          ? (
            <>
              <Row className='gap-2'>
                <Text>{t('MyDelegation')}</Text>
                <AxoneTooltip iconColor='text-axone-khaki' content='My Delegation' />
              </Row>
              <Row className='gap-2 mb-4'>
                <p className='text-40 text-white'>{Number(data?.delegation)/1000000 || '0.00'}</p>
                <p className='text-40 text-axone-khaki'>AXONE</p>
              </Row>
              <Row className='gap-4'>
                <Button disabled={isDelegatingPending} onClick={openDelegateModal({})} className='w-1/2' variant={'rounded'}>{t('Delegate')}</Button>
                {
                  !!Number(data?.delegation) ? (
                    <Button disabled={isUnboningPending} onClick={onUnbond} className='w-1/2 border-axone-khaki text-axone-khaki' variant={'rounded'}>
                      {isUnboningPending ? t('Unbonding') : t('Unbond')}
                    </Button>
                  ) : null
                }
              </Row>

              <div className='w-full border-b-2 border-b-axone-box-border my-8'></div>

              <Row className='gap-2'>
                <Text>My Earnings</Text>
                <AxoneTooltip iconColor='text-axone-khaki' content='My Earnings' />
              </Row>
              <Row className='gap-2 mb-4'>
                <p className='text-40 text-white'>{data?.earnings || '0.00'}</p>
                <p className='text-40 text-axone-khaki'>AXONE</p>
              </Row>
              { !!Number(data?.delegation) ? (
                <Row className='gap-4'>
                  <Button
                    disabled={isClaimingRewardsPending}
                    onClick={onClaimRewards}
                    className='w-1/2 border-axone-khaki text-axone-khaki'
                    variant={'rounded'}
                  >
                    {isClaimingRewardsPending ? t('Claiming') : t('Claim')}
                  </Button>
                </Row>
              ) : null}

              <div className='w-full border-b-2 border-b-axone-box-border mt-8 mb-10'></div>

              <ButtonWithIcon onClick={navigateToWallet} variant='rounded' className=' absolute bottom-8 left-6 right-6'>{t('ViewMyWallet')}</ButtonWithIcon>
            </>
          )
          : (
            <div className='flex flex-col h-full gap-4 justify-center items-center pb-20'>
              <p className='text-[14px] text-axone-grey text-center'>{t('ConnectWalletToDelegate')}</p>
              <svg width='234' height='158' viewBox='0 0 234 158' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_674_4915)'>
                  <path d='M186.026 48.534C181.228 32.8741 139.758 12.6623 106.996 37.788C91.7591 49.4745 96.4888 57.8612 87.7155 74.4178C82.486 84.2859 73.2231 93.6951 73.842 105.024C74.3738 114.804 79.4909 123.649 86.4133 128.084C101.982 138.057 126.648 139.75 139.543 110.311C152.438 80.8712 198.395 88.9235 186.026 48.534Z' fill='#00243F'/>
                  <path d='M91.0225 40.2424C85.5549 54.8209 80.0827 70.225 70.0725 79.7721C59.7483 89.623 56.4262 86.1469 53.8533 79.8946C51.2807 73.6427 50.9009 57.2975 65.0681 44.1437C79.2389 30.9862 96.1375 26.5984 91.0225 40.2424Z' fill='#00243F'/>
                  <path d='M61.4641 63.075L66.2764 58.2627C66.4517 58.0874 66.4517 57.8032 66.2764 57.628C66.1011 57.4527 65.817 57.4527 65.6417 57.628L60.8294 62.4403C60.6541 62.6155 60.6541 62.8997 60.8294 63.075C61.0047 63.2502 61.2888 63.2502 61.4641 63.075Z' fill='#17354C'/>
                  <path d='M61.9354 59.6271L63.3233 58.2392C63.4985 58.064 63.4985 57.7798 63.3233 57.6045C63.148 57.4293 62.8638 57.4293 62.6886 57.6045L61.3007 58.9924C61.1254 59.1677 61.1254 59.4518 61.3007 59.6271C61.476 59.8024 61.7601 59.8024 61.9354 59.6271Z' fill='#17354C'/>
                  <path d='M150.794 126.988L145.981 131.8C145.806 131.975 145.806 132.259 145.981 132.435C146.157 132.61 146.441 132.61 146.616 132.435L151.428 127.622C151.604 127.447 151.604 127.163 151.428 126.988C151.253 126.812 150.969 126.812 150.794 126.988Z' fill='#17354C'/>
                  <path d='M150.322 130.435L148.935 131.823C148.759 131.999 148.759 132.283 148.935 132.458C149.11 132.633 149.394 132.633 149.569 132.458L150.957 131.07C151.132 130.895 151.132 130.611 150.957 130.435C150.782 130.26 150.498 130.26 150.322 130.435Z' fill='#17354C'/>
                  <path d='M187.347 35.2312L192.159 30.4189C192.334 30.2436 192.334 29.9595 192.159 29.7842C191.984 29.6089 191.7 29.6089 191.525 29.7842L186.712 34.5965C186.537 34.7718 186.537 35.0559 186.712 35.2312C186.887 35.4065 187.172 35.4065 187.347 35.2312Z' fill='#17354C'/>
                  <path d='M187.826 31.7833L189.214 30.3955C189.389 30.2202 189.389 29.936 189.214 29.7608C189.039 29.5855 188.754 29.5855 188.579 29.7608L187.191 31.1486C187.016 31.3239 187.016 31.6081 187.191 31.7833C187.367 31.9586 187.651 31.9586 187.826 31.7833Z' fill='#17354C'/>
                  <path d='M186.409 47.3723V115.793C186.409 119.536 183.374 122.571 179.631 122.571H80.2319C76.4888 122.571 73.4531 119.536 73.4531 115.793V47.3723C73.4531 43.6295 76.4888 40.5938 80.2319 40.5938H179.627C183.374 40.5938 186.409 43.6295 186.409 47.3723Z' fill='#66777E'/>
                  <path d='M174.706 45.9922H84.9152C81.9159 45.9922 79.4844 48.4237 79.4844 51.423V111.492C79.4844 114.491 81.9159 116.923 84.9152 116.923H174.706C177.706 116.923 180.137 114.491 180.137 111.492V51.423C180.137 48.4237 177.706 45.9922 174.706 45.9922Z' stroke='#17354C' strokeWidth='0.278386' strokeDasharray='1.95 3.34'/>
                  <path opacity='0.3' d='M112.325 83.6328C112.325 83.6328 112.348 87.5195 111.175 89.8712C110.001 92.2227 109.604 93.1245 107.136 94.0301C104.668 94.9358 73.3516 98.368 73.3516 98.368V87.7917L112.325 83.6328Z' fill='black'/>
                  <path d='M74.3747 93.431H106.752C109.827 93.431 112.314 90.9393 112.314 87.8687V73.3747C112.314 70.3 109.823 67.8125 106.752 67.8125H74.3747C71.3003 67.8125 68.8125 70.3039 68.8125 73.3747V87.8687C68.8125 90.9393 71.3042 93.431 74.3747 93.431Z' fill='#66777E'/>
                  <path d='M80.1954 84.8554C82.7368 84.8554 84.7971 82.8381 84.7971 80.3496C84.7971 77.861 82.7368 75.8438 80.1954 75.8438C77.654 75.8438 75.5938 77.861 75.5938 80.3496C75.5938 82.8381 77.654 84.8554 80.1954 84.8554Z' fill='#002131' fillOpacity='0.2'/>
                  <path d='M196.312 62.105C196.312 62.105 192.725 61.1423 191.488 69.3651C190.252 77.5876 190.243 82.0917 190.243 82.0917C190.243 82.0917 189.789 83.8796 188.455 83.2537C187.122 82.6277 184.827 80.3608 183.271 81.4249C181.657 82.5294 181.735 84.7148 183.05 87.5268C184.365 90.339 187.018 96.6003 187.257 97.1693C187.491 97.725 187.443 98.6783 186.467 98.3965C185.49 98.1148 179.226 94.5514 177.714 97.6238C176.199 100.697 181.15 107.927 181.676 108.726C182.201 109.526 182.156 109.96 181.812 110.317C181.468 110.674 179.474 109.277 177.652 108.335C175.83 107.393 173.55 106.624 172.825 108.47C172.101 110.316 173.713 116.441 182.667 124.276L187.053 127.634L192.212 125.59C202.985 120.544 206.233 115.104 206.047 113.13C205.861 111.156 203.459 111.264 201.446 111.664C199.432 112.064 197.13 112.852 196.898 112.414C196.666 111.975 196.741 111.548 197.468 110.924C198.195 110.3 204.954 104.727 204.35 101.353C203.747 97.9818 196.741 99.6696 195.724 99.6667C194.709 99.667 194.929 98.7392 195.307 98.2696C195.694 97.7906 199.981 92.5083 202.022 90.1701C204.064 87.8351 204.744 85.7545 203.499 84.2465C202.301 82.7903 199.465 84.3368 198.011 84.5691C196.558 84.8014 196.617 82.9547 196.617 82.9547C196.617 82.9547 197.859 78.6242 198.947 70.3806C200.035 62.137 196.232 62.087 196.232 62.087' fill='#17354C'/>
                  <path d='M186.953 126.468C187.774 120.417 188.98 112.066 190.346 102.847C191.71 93.6321 192.935 85.2873 193.793 79.2401C194.218 76.2228 194.56 73.7783 194.799 72.0801C194.917 71.2405 195.01 70.5862 195.074 70.1327C195.106 69.917 195.132 69.7489 195.15 69.6264C195.17 69.5137 195.182 69.4531 195.182 69.4531C195.182 69.4531 195.18 69.5111 195.168 69.6285C195.154 69.7502 195.135 69.9199 195.111 70.1371C195.054 70.5922 194.972 71.247 194.869 72.09C194.658 73.784 194.335 76.234 193.923 79.2588C193.102 85.3104 191.895 93.6573 190.532 102.876C189.169 112.094 187.941 120.44 187.087 126.486' fill='#00213A'/>
                  <path d='M186.344 84.719C186.356 84.7123 186.443 84.8213 186.599 85.0297C186.754 85.235 186.967 85.5389 187.226 85.9166C187.744 86.6753 188.433 87.7386 189.171 88.9318C189.889 90.1049 190.542 91.1672 191.044 91.9873C191.27 92.3489 191.46 92.6556 191.617 92.9101C191.754 93.1273 191.823 93.252 191.811 93.2587C191.798 93.2657 191.708 93.1575 191.553 92.9522C191.402 92.7462 191.188 92.4423 190.932 92.0604C190.42 91.2968 189.746 90.2222 189.012 89.0314L187.118 85.9921C186.892 85.6307 186.699 85.3247 186.542 85.0703C186.404 84.8497 186.335 84.725 186.344 84.719ZM192.321 93.1898C192.292 93.1476 194.424 91.629 197.085 89.8039C199.745 87.9754 201.928 86.5288 201.957 86.571C201.987 86.6134 199.854 88.1286 197.194 89.9571C194.53 91.7864 192.35 93.2322 192.321 93.1898ZM189.589 107.252C189.585 107.239 189.722 107.188 189.967 107.101C190.252 107.006 190.604 106.891 191.017 106.751C191.904 106.457 193.13 106.042 194.464 105.538C195.8 105.037 196.994 104.542 197.858 104.178C198.26 104.01 198.6 103.865 198.88 103.747C199.121 103.647 199.258 103.599 199.264 103.608C199.271 103.621 199.143 103.691 198.912 103.813C198.582 103.983 198.249 104.145 197.912 104.299C196.804 104.813 195.676 105.284 194.533 105.713C193.389 106.142 192.23 106.53 191.058 106.876C190.607 107.008 190.24 107.106 189.989 107.17C189.734 107.234 189.593 107.265 189.589 107.252ZM182.498 100.778C182.506 100.768 182.613 100.847 182.804 101C182.992 101.153 183.259 101.378 183.588 101.658C184.443 102.392 185.292 103.134 186.133 103.883C186.976 104.632 187.813 105.387 188.643 106.15C188.895 106.382 189.144 106.616 189.389 106.855C189.563 107.023 189.655 107.123 189.646 107.133C189.638 107.142 189.531 107.064 189.34 106.911C189.152 106.757 188.885 106.532 188.556 106.252C187.701 105.518 186.852 104.776 186.011 104.027C185.025 103.151 184.138 102.348 183.505 101.76C183.252 101.528 183.004 101.293 182.758 101.055C182.581 100.888 182.486 100.788 182.498 100.778ZM178.508 112.885C178.517 112.875 178.655 112.978 178.897 113.174C179.164 113.396 179.503 113.676 179.905 114.016C180.752 114.733 181.913 115.73 183.188 116.844C184.462 117.958 185.61 118.973 186.435 119.714C186.759 120.009 187.082 120.305 187.405 120.602C187.63 120.813 187.753 120.938 187.745 120.947C187.737 120.957 187.598 120.854 187.356 120.658C187.089 120.436 186.749 120.155 186.347 119.816C185.247 118.881 184.152 117.938 183.065 116.988C181.791 115.874 180.643 114.859 179.818 114.118C179.494 113.822 179.17 113.526 178.847 113.23C178.62 113.019 178.5 112.894 178.508 112.885ZM187.576 120.692C187.573 120.678 187.743 120.608 188.051 120.49C188.396 120.361 188.838 120.197 189.368 120.001C190.48 119.585 192.017 119.009 193.692 118.324C195.125 117.739 196.547 117.132 197.96 116.501C198.478 116.273 198.909 116.082 199.245 115.931C199.549 115.8 199.719 115.729 199.726 115.741C199.733 115.754 199.571 115.844 199.277 115.998C198.859 116.214 198.438 116.422 198.014 116.622C196.616 117.289 195.199 117.914 193.764 118.498C192.33 119.082 190.878 119.625 189.412 120.125C188.849 120.315 188.391 120.463 188.073 120.559C187.759 120.654 187.582 120.701 187.576 120.692Z' fill='#00213A'/>
                  <path fillRule='evenodd' clipRule='evenodd' d='M139.127 32.3368H139.721C139.865 32.3368 139.981 32.4539 139.981 32.5965V33.191C139.981 33.3348 139.864 33.4506 139.721 33.4506H139.127C138.984 33.4506 138.867 33.3335 138.867 33.191V32.5965C138.867 32.5624 138.874 32.5286 138.887 32.497C138.9 32.4655 138.919 32.4368 138.943 32.4127C138.967 32.3886 138.996 32.3695 139.027 32.3564C139.059 32.3434 139.092 32.3367 139.127 32.3368ZM141.188 32.3368H141.783C141.925 32.3368 142.042 32.4539 142.042 32.5965V33.191C142.042 33.3348 141.925 33.4506 141.783 33.4506H141.188C141.046 33.4506 140.929 33.3335 140.929 33.191V32.5965C140.929 32.4539 141.046 32.3368 141.188 32.3368ZM143.251 32.3368H143.846C143.988 32.3368 144.105 32.4539 144.105 32.5965V33.191C144.105 33.2598 144.078 33.3258 144.029 33.3745C143.98 33.4232 143.914 33.4505 143.846 33.4506H143.251C143.109 33.4506 142.991 33.3335 142.991 33.191V32.5965C142.991 32.5623 142.998 32.5285 143.011 32.497C143.024 32.4655 143.043 32.4368 143.067 32.4127C143.091 32.3886 143.12 32.3695 143.152 32.3564C143.183 32.3434 143.217 32.3367 143.251 32.3368ZM145.313 32.3368H145.907C146.05 32.3368 146.167 32.4539 146.167 32.5965V33.191C146.167 33.2598 146.14 33.3258 146.091 33.3745C146.042 33.4232 145.976 33.4505 145.907 33.4506H145.313C145.169 33.4506 145.052 33.3335 145.052 33.191V32.5965C145.053 32.5276 145.081 32.4619 145.129 32.4133C145.178 32.3648 145.244 32.3373 145.313 32.3368ZM147.374 32.3368H147.969C148.113 32.3368 148.23 32.4539 148.23 32.5965V33.191C148.23 33.2251 148.223 33.259 148.21 33.2905C148.197 33.3221 148.177 33.3507 148.153 33.3749C148.129 33.399 148.1 33.4181 148.069 33.4311C148.037 33.4441 148.003 33.4507 147.969 33.4506H147.374C147.232 33.4506 147.115 33.3335 147.115 33.191V32.5965C147.115 32.4539 147.232 32.3368 147.374 32.3368ZM141.264 34.585H141.858C142.001 34.585 142.118 34.7018 142.118 34.8444V35.4402C142.118 35.5827 142.001 35.6998 141.858 35.6998H141.264C141.195 35.6997 141.129 35.6724 141.08 35.6237C141.032 35.575 141.004 35.509 141.004 35.4402V34.8457C141.004 34.8115 141.011 34.7776 141.024 34.7459C141.037 34.7143 141.056 34.6855 141.08 34.6613C141.104 34.6371 141.133 34.6179 141.164 34.6048C141.196 34.5917 141.23 34.5849 141.264 34.585ZM143.326 34.585H143.92C144.063 34.585 144.18 34.7018 144.18 34.8444V35.4402C144.18 35.5827 144.063 35.6998 143.92 35.6998H143.326C143.183 35.6998 143.066 35.5827 143.066 35.4402V34.8457C143.066 34.8115 143.072 34.7776 143.085 34.7459C143.098 34.7143 143.117 34.6855 143.141 34.6613C143.166 34.6371 143.194 34.6179 143.226 34.6048C143.257 34.5917 143.291 34.5849 143.326 34.585ZM145.387 34.585H145.982C146.125 34.585 146.242 34.7018 146.242 34.8444V35.4402C146.242 35.5827 146.125 35.6998 145.982 35.6998H145.387C145.244 35.6998 145.127 35.5827 145.127 35.4402V34.8457C145.127 34.7018 145.244 34.585 145.387 34.585ZM143.251 29.9219H143.846C143.988 29.9219 144.105 30.039 144.105 30.1815V30.776C144.105 30.8448 144.078 30.9108 144.029 30.9595C143.98 31.0082 143.914 31.0356 143.846 31.0357H143.251C143.109 31.0357 142.991 30.9186 142.991 30.776V30.1815C142.991 30.1474 142.998 30.1136 143.011 30.0821C143.024 30.0505 143.043 30.0219 143.067 29.9978C143.091 29.9736 143.12 29.9545 143.152 29.9415C143.183 29.9285 143.217 29.9218 143.251 29.9219ZM145.313 29.9219H145.907C146.05 29.9219 146.167 30.039 146.167 30.1815V30.776C146.167 30.8448 146.14 30.9108 146.091 30.9595C146.042 31.0082 145.976 31.0356 145.907 31.0357H145.313C145.169 31.0357 145.052 30.9186 145.052 30.776V30.1815C145.053 30.1127 145.081 30.0469 145.129 29.9984C145.178 29.9498 145.244 29.9223 145.313 29.9219Z' fill='#17354C'/>
                  <path d='M55.7571 100.663C52.2789 104.246 53.1843 110.771 53.1843 110.771C53.1843 110.771 59.7289 111.482 63.2051 107.896C66.6833 104.313 65.7803 97.7919 65.7803 97.7919C65.7803 97.7919 59.2354 97.0803 55.7571 100.663Z' fill='#17354D'/>
                  <path d='M64.2919 119.31C54.5991 108.845 51.5759 94.2227 50.7465 83.8002C49.846 72.4842 51.2647 63.5329 51.2788 63.4447L50.645 63.3828C50.6302 63.4723 49.2 72.4891 50.1041 83.8801C50.9401 94.4061 53.9955 109.177 63.8082 119.773L64.2919 119.31Z' fill='#17354D'/>
                  <path d='M55.383 58.1989C55.0307 62.0911 53.1517 65.5451 50.4701 67.8521C48.2162 65.4458 46.9669 61.9272 47.3207 58.036C47.673 54.1438 49.552 50.6898 52.2336 48.3828C54.4885 50.7873 55.7353 54.3064 55.383 58.1989ZM46.8415 68.7276C49.3287 71.551 50.3627 75.1752 49.9826 78.6152C46.5909 78.6342 43.1691 77.1994 40.6819 74.376C38.1949 71.5523 37.161 67.9281 37.54 64.4899C40.9327 64.4691 44.3545 65.9039 46.8415 68.7276ZM40.5068 88.0358C45.449 89.7499 50.0635 89.3833 50.8136 87.2171C51.5634 85.0506 48.165 81.9049 43.2227 80.1908C38.2805 78.4765 33.666 78.8431 32.9162 81.0096C32.1661 83.1758 35.5645 86.3215 40.5068 88.0358ZM43.0916 101.545C48.0339 103.259 52.6483 102.892 53.3984 100.726C54.1482 98.5596 50.7498 95.4138 45.8076 93.6998C40.8653 91.9855 36.2509 92.3521 35.5011 94.5186C34.751 96.6848 38.1494 99.8305 43.0916 101.545Z' fill='#17354D'/>
                  <path d='M52.1994 77.5404C54.0469 74.3954 56.9043 72.1671 59.9229 71.1953C60.7013 74.0354 60.2483 77.4468 58.4009 80.5917C56.5536 83.737 53.6961 85.9651 50.6776 86.9368C49.8971 84.096 50.3519 80.6857 52.1994 77.5404ZM54.8781 91.551C56.6785 88.3792 59.5079 86.1053 62.5144 85.0823C63.3415 87.9023 62.9404 91.3135 61.14 94.4852C59.3398 97.6568 56.5104 99.9309 53.502 100.953C52.6776 98.1365 53.0769 94.7243 54.8781 91.551ZM53.992 109.319C55.61 109.303 57.0204 110.001 57.938 111.12C56.896 112.258 55.4063 112.986 53.7898 113.003C52.1718 113.018 50.7614 112.32 49.8438 111.201C50.8839 110.062 52.3737 109.334 53.992 109.319Z' fill='#17354D'/>
                  <path d='M76.2097 119.692C78.4815 124.979 76.0317 131.108 70.7302 133.388C65.4325 135.666 59.2943 133.227 57.0188 127.941C54.748 122.657 57.2007 116.524 62.4983 114.245C67.7996 111.965 73.9381 114.405 76.2097 119.692Z' fill='url(#paint0_linear_674_4915)'/>
                  <path d='M73.9331 120.669C75.6637 124.697 73.7972 129.371 69.7594 131.108C65.7204 132.842 61.0412 130.985 59.3105 126.957C57.5788 122.926 59.4456 118.252 63.4842 116.519C67.5221 114.781 72.1977 116.639 73.9331 120.669Z' fill='#00213A'/>
                  <path d='M69.2752 127.772L69.8539 129.047L68.6779 129.568L68.1164 128.325C66.9212 128.773 65.6474 128.912 64.7797 128.705L64.7966 127.031C65.5756 127.192 66.5603 127.126 67.4415 126.832L66.5806 124.929C65.1382 125.196 63.4895 125.42 62.7529 123.792C62.2055 122.586 62.6411 121.149 64.4043 120.122L63.8327 118.857L65.0086 118.336L65.5701 119.579C66.4817 119.257 67.4439 119.106 68.2689 119.218L68.3162 120.879C67.5669 120.812 66.8681 120.888 66.251 121.078L67.1291 123.014C68.5676 122.731 70.1905 122.523 70.9169 124.129C71.4513 125.318 71.0244 126.74 69.2752 127.772ZM65.8227 123.253L65.0893 121.636C64.5276 122.05 64.4331 122.486 64.6023 122.865C64.7841 123.26 65.2329 123.325 65.8227 123.253ZM69.0861 125.109C68.9068 124.709 68.4671 124.645 67.8838 124.695L68.5972 126.268C69.1285 125.883 69.251 125.471 69.0861 125.109Z' fill='#17354C'/>
                  <path d='M204.432 46.0485C204.939 49.5414 202.514 52.7831 199.012 53.292C195.512 53.8009 192.263 51.3816 191.754 47.889C191.248 44.3988 193.674 41.1547 197.174 40.6458C200.676 40.1366 203.926 42.556 204.432 46.0485Z' fill='url(#paint1_linear_674_4915)'/>
                  <path d='M202.93 46.2705C203.316 48.931 201.468 51.4035 198.801 51.7916C196.133 52.1777 193.656 50.3349 193.27 47.6744C192.884 45.0115 194.731 42.5391 197.399 42.1533C200.067 41.7648 202.542 43.6076 202.93 46.2705Z' fill='#00213A'/>
                  <path d='M199.042 49.7512L199.182 50.5988L198.403 50.7206L198.268 49.8948C197.489 49.9702 196.712 49.8511 196.231 49.5904L196.507 48.6015C196.943 48.8208 197.537 48.9376 198.105 48.9035L197.897 47.6396C197 47.5688 195.988 47.4398 195.81 46.3585C195.677 45.5572 196.164 44.7754 197.371 44.4465L197.233 43.6061L198.012 43.4844L198.148 44.3102C198.739 44.2639 199.333 44.3271 199.804 44.5243L199.568 45.5158C199.135 45.3574 198.709 45.2915 198.313 45.3061L198.526 46.5921C199.423 46.653 200.418 46.787 200.593 47.8537C200.721 48.6431 200.242 49.4174 199.042 49.7512ZM197.714 46.5266L197.537 45.4523C197.138 45.6082 197.013 45.8517 197.053 46.1028C197.098 46.3658 197.354 46.4753 197.714 46.5266ZM199.353 48.1436C199.31 47.8782 199.06 47.771 198.707 47.7078L198.879 48.7526C199.255 48.6088 199.393 48.3847 199.353 48.1436Z' fill='#17354C'/>
                  <path d='M163.695 68.3551C147.245 55.642 124.286 55.642 107.836 68.3551M119.478 85.3257C129.075 77.9182 142.462 77.9182 152.059 85.3257M135.766 100.837C136.097 100.85 136.416 100.959 136.685 101.151C136.954 101.344 137.161 101.611 137.279 101.92C137.397 102.229 137.421 102.566 137.349 102.889C137.278 103.211 137.112 103.506 136.874 103.735C136.636 103.965 136.336 104.119 136.01 104.179C135.685 104.239 135.349 104.202 135.045 104.073C134.741 103.944 134.481 103.728 134.298 103.452C134.116 103.176 134.019 102.852 134.019 102.522C134.028 102.067 134.217 101.634 134.545 101.319C134.872 101.003 135.311 100.83 135.766 100.837Z' stroke='#4E626B' strokeWidth='7.584' strokeLinecap='round' strokeLinejoin='round'/>
                  <g filter='url(#filter0_f_674_4915)'>
                    <ellipse cx='154.061' cy='85.5' rx='19.0606' ry='18.5' fill='#4E626B'/>
                  </g>
                  <circle cx='154.064' cy='84.9394' r='16.2576' fill='#4E626B' stroke='#66777E' strokeWidth='3.36364'/>
                  <path d='M148.453 79.3359L159.669 90.552M148.453 90.552L159.669 79.3359' stroke='#66777E' strokeWidth='3.36364' strokeLinecap='round' strokeLinejoin='round'/>
                </g>
                <defs>
                  <filter id='filter0_f_674_4915' x='130.515' y='62.5152' width='47.0947' height='45.9697' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix'/>
                    <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/>
                    <feGaussianBlur stdDeviation='2.24242' result='effect1_foregroundBlur_674_4915'/>
                  </filter>
                  <linearGradient id='paint0_linear_674_4915' x1='72.766' y1='145.054' x2='57.8602' y2='91.9019' gradientUnits='userSpaceOnUse'>
                    <stop offset='0.305364' stopColor='#071622'/>
                    <stop offset='0.579542' stopColor='#17354C'/>
                  </linearGradient>
                  <linearGradient id='paint1_linear_674_4915' x1='201.867' y1='59.9874' x2='192.735' y2='27.4024' gradientUnits='userSpaceOnUse'>
                    <stop offset='0.305364' stopColor='#071622'/>
                    <stop offset='0.579542' stopColor='#17354C'/>
                  </linearGradient>
                  <clipPath id='clip0_674_4915'>
                    <rect width='234' height='158' fill='white'/>
                  </clipPath>
                </defs>
              </svg>

            </div>
          )
      }
    </Box>
  );
};

export { MyDelegationInfoBlock };