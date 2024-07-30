import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Text,Title } from '@/components/typography';
import { ColorBadge } from '@/components/ui/color-badge';
import Row from '@/components/ui/row';
import { Proposal } from '@/hooks/dto/proposals-list.dto';
import { formatDate } from '@/lib/utils';
import { GaugeChart } from './gauge-chart';

type ProposalsListItemProps = {
  item: Proposal;
  goToDetails: () => void;
};

const ProposalsListItem: FC<ProposalsListItemProps> = ({ item, goToDetails }) => {
  const t = useTranslations('Governance');
  return (
    <Row onClick={goToDetails} className='h-[140px] cursor-pointer group p-4 items-center relative justify-between even:bg-axone-dark-blue-3'>
      <Text className='mb-0 w-[80px]'>{item.id}</Text>
      <div className='flex flex-col items-start w-[300px]'>
        <div className='flex flex-row items-center gap-4 mb-4'>
          <ColorBadge
            backgroundColor='#292929'
            textColor='#ffffff'
            text={item.status.replace('PROPOSAL_STATUS_', '')}
            className='px-2'
          />
        </div>
        <Title>{item.title}</Title>
      </div>
      <GaugeChart val={Number(item.turnout) % 1 === 0 ? Number(item.turnout) + 0.01 : Number(item.turnout)} />
      <Text className='w-1/6 mb-0 break-words mr-3 pr-5 lg:mr-0'>{item.messages['0']['@type']}</Text>
      <div className='flex w-1/6 flex-col'>
        <Text className='mb-0'>{formatDate(item.voting_end_time, false, true)}</Text>
        <Text className='mb-0'>{formatDate(item.voting_end_time, true, false)}</Text>
      </div>
      <div className='w-[200px] flex flex-row items-center gap-6'>
        <Text className='mb-0'>{t('Proposed')} {formatDate(item.submit_time)}</Text>
        <ArrowUpRight className='h-12 w-12 text-axone-khaki group-hover:text-axone-orange' />
      </div>
    </Row>
  );
};

export { ProposalsListItem };