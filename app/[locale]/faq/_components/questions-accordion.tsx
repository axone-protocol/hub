import { motion } from 'framer-motion';
import { FC, memo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ColorBadge } from '@/components/ui/color-badge';
import Column from '@/components/ui/column';
import { FAQDataType } from '../data';

const ACCORDION_ANIMATION_CONFIG = {
  className: 'even:bg-axone-dark-blue-3',
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay: 0.2 },
};

type QuestionsAccordionProps = { questions: FAQDataType[] };

const QuestionsAccordion: FC<QuestionsAccordionProps> = memo(({ questions }) => {
  return (
    <Accordion type='single' collapsible className='mt-5'>
      {
        questions.map((item) => {
          return (
            <motion.div
              key={item.id}
              {...ACCORDION_ANIMATION_CONFIG}
            >
              <AccordionItem  value={`item-${item.id}`}>
                <Column className='py-2'>
                  <ColorBadge
                    backgroundColor={item.categoryBgColor}
                    textColor={item.categoryTextColor}
                    text={item.category}
                  />
                  <AccordionTrigger className='w-full pt-2 pb-5 text-left'>{item.question}</AccordionTrigger>
                </Column>
                <AccordionContent>
                  <p className='ml-6' dangerouslySetInnerHTML={{ __html :item.answer }} />
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
    </Accordion>
  );
});

QuestionsAccordion.displayName = 'QuestionsAccordion';

export { QuestionsAccordion };