import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';

const NoVotersFound = ({ title }: { title: string }) => (
  <Box className='w-full lg:w-1/2 m-0'>
    <Title className='mb-6'>{title}</Title>
    <BoxInner className='flex-col h-[500px] overflow-y-auto scrollbar scrollbar-thin'>
      <div className='flex flex-col justify-center items-center h-full'>
        <svg width='62' height='52' viewBox='0 0 62 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect width='62' height='52' fill='#071622'/>
          <path d='M47.807 41.3155H5.6639C3.02028 41.3155 2.02702 39.0804 1.87226 37.9006L1.86719 22.9447C1.86764 22.8657 1.88225 22.7875 1.91032 22.7138L7.82548 7.50664C8.12791 6.74518 8.65836 6.09584 9.34417 5.64756C10.03 5.19929 10.8376 4.974 11.6564 5.00256H41.7942C42.6199 4.97298 43.4345 5.20009 44.1258 5.65263C44.8171 6.10517 45.3511 6.76088 45.6543 7.52948L51.5593 22.7138C51.5874 22.7875 51.602 22.8657 51.6025 22.9447V37.8182C51.4439 39.0816 50.4519 41.3155 47.807 41.3155ZM3.13572 23.0639V37.8182C3.16236 37.9691 3.51755 40.0483 5.6639 40.0483H47.807C50.0117 40.0483 50.3263 37.8309 50.339 37.737L50.3339 23.0652L44.4632 7.96966C44.4315 7.88213 43.8264 6.27363 41.8158 6.27363H11.6793C9.61284 6.27363 9.02297 7.92779 9.01663 7.94429L3.13572 23.0639Z' fill='#66777E'/>
          <path d='M35.8284 26.4696H17.6504C17.5615 26.4691 17.4738 26.4501 17.3928 26.4138C17.3117 26.3774 17.2392 26.3245 17.1798 26.2584C17.1204 26.1924 17.0755 26.1146 17.048 26.0302C17.0204 25.9457 17.0109 25.8564 17.0199 25.7681C17.1747 24.308 16.9793 23.2247 16.4503 22.6373C15.9277 22.0563 15.126 22.1007 15.0537 22.1058L7.98417 22.1122C7.88097 22.1119 7.7794 22.0864 7.68826 22.038C7.59712 21.9896 7.51917 21.9197 7.46118 21.8343C7.40319 21.7489 7.3669 21.6507 7.35547 21.5482C7.34403 21.4456 7.3578 21.3418 7.39557 21.2457L11.8215 10.0649C11.8683 9.94667 11.9495 9.84521 12.0547 9.77373C12.1599 9.70225 12.2842 9.66404 12.4113 9.66406H41.0649C41.1921 9.66404 41.3163 9.70225 41.4215 9.77373C41.5267 9.84521 41.608 9.94667 41.6548 10.0649L46.0198 21.0948C46.0914 21.1888 46.1354 21.301 46.1466 21.4187C46.1579 21.5364 46.1361 21.6549 46.0835 21.7608C46.031 21.8668 45.95 21.9559 45.8495 22.0182C45.749 22.0805 45.6331 22.1135 45.5149 22.1134H38.5076C38.4099 22.1058 38.3617 22.102 38.2906 22.102C37.9976 22.102 37.4458 22.1718 37.0259 22.6386C36.4982 23.2272 36.3016 24.308 36.4576 25.7693C36.4677 25.8577 36.4588 25.9472 36.4318 26.032C36.4047 26.1167 36.3599 26.1947 36.3005 26.2609C36.241 26.3271 36.1682 26.3799 36.0868 26.4159C36.0054 26.4518 35.9174 26.4701 35.8284 26.4696ZM18.3328 25.201H35.1447C35.0838 23.6965 35.3984 22.5511 36.0821 21.7912C37.116 20.6419 38.5989 20.8525 38.5976 20.8512L44.5559 20.8462L40.6323 10.9326H12.8426L8.91908 20.8462H14.9433C14.9624 20.8424 15.0575 20.8347 15.1869 20.8347C15.6905 20.8347 16.6444 20.9591 17.3941 21.7912C18.0779 22.5511 18.3937 23.6965 18.3328 25.201Z' fill='#66777E'/>
          <circle cx='46.5' cy='35.5' r='9.5' fill='#071622'/>
          <path d='M60 49L54.4507 43.4507M54.4507 43.4507C55.3999 42.5014 56.1529 41.3745 56.6666 40.1343C57.1803 38.8941 57.4447 37.5648 57.4447 36.2224C57.4447 34.8799 57.1803 33.5507 56.6666 32.3104C56.1529 31.0702 55.3999 29.9433 54.4507 28.9941C53.5014 28.0448 52.3745 27.2919 51.1343 26.7781C49.8941 26.2644 48.5648 26 47.2224 26C45.8799 26 44.5507 26.2644 43.3104 26.7781C42.0702 27.2919 40.9433 28.0448 39.9941 28.9941C38.077 30.9111 37 33.5112 37 36.2224C37 38.9335 38.077 41.5336 39.9941 43.4507C41.9111 45.3677 44.5112 46.4447 47.2224 46.4447C49.9335 46.4447 52.5336 45.3677 54.4507 43.4507Z' stroke='#66777E' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round'/>
          <path d='M43.5859 32.5859L50.9193 39.9193M43.5859 39.9193L50.9193 32.5859' stroke='#66777E' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
        <Text className='text-axone-khaki mt-2'>There are no results found</Text>
      </div>
    </BoxInner>
  </Box>
);

export { NoVotersFound };