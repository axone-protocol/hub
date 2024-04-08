'use client';
import { Info } from 'lucide-react';
import { useState } from 'react';
import Text from '@/components/typography/text';
import Title from '@/components/typography/title';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import Column from '@/components/ui/column';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import CurrencySelect from '@/components/ui/select-currency';
import LanguageSelect from '@/components/ui/select-language';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Home () {
  const [checked, setChecked] = useState(false);
  return (
    <PageContainer>

      {/* Box with Buttons */}
      <Box>
        <div className='w-full'>
          <Row>
            <Column>
              <h1 className='text-center text-white mb-5 text-3xl'>Button</h1>
              <Row className='justify-around'>
                <Button>Default</Button>
                <ButtonWithIcon variant={'noBorder'}>No Border</ButtonWithIcon>
                <ButtonWithIcon variant={'link'} className='text-axone-orange'>Link</ButtonWithIcon>
                <Button variant={'rounded'}>Rounded</Button>
                <ButtonWithIcon>With icon</ButtonWithIcon>
              </Row>
            </Column>
            <Column className='justify-center items-center'>
              <h1 className='text-center text-white mb-5 text-3xl'>Tooltip</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-axone-orange' size={24} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Column>
          </Row>
        </div>
      </Box>

      {/* Box with Selects */}
      <Box>
        <Row>
          <Column>
            <h1 className='text-center text-white mb-5 text-3xl'>Select</h1>
            <Row className='justify-center'>
              <LanguageSelect />
              <CurrencySelect />
            </Row>
          </Column>

          <Column>
            <h1 className='text-center text-white mb-5 text-3xl'>Switch</h1>
            <Row className='justify-center'>
              <Switch className='w-[68px] h-[32px]' checked={checked} onCheckedChange={() => {
                setChecked(prev => !prev);
              }} id='airplane-mode' />
            </Row>
          </Column>
        </Row>
      </Box>

      {/* Box */}
      <Box>
        <Title className='mb-[20px]'>This is Title component</Title>
        <Text>This is general Text component</Text>
        <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam facere dicta, tenetur blanditiis dolorum, quo sapiente unde ut esse reprehenderit nisi maiores assumenda qui dignissimos non quidem omnis voluptates atque!</Text>
        <ButtonWithIcon className='w-[160px] mt-6'>FAQ</ButtonWithIcon>
      </Box>

      {/* Box With inputs */}
      <Box>
        <h1 className='text-center text-white mb-5 text-3xl'>Input</h1>
        <div className='grid w-full max-w-sm items-center gap-1.5 m-[20px]'>
          <Label className='text-white' htmlFor='email'>Label</Label>
          <Input type='email' id='email' placeholder='Email' />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 m-[20px]'>
          <Label className='text-white' htmlFor='email'>Label for required input</Label>
          <Input isRequired={true} type='email' id='email' placeholder='Email' />
        </div>
      </Box>

      {/* Box with Accordion */}
      <Box>
        <h1 className='text-center text-white mb-5 text-3xl'>Accordion</h1>
        <Accordion type='single' collapsible className='m-[20px]'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Which wallets are supported for interacting with axone?</AccordionTrigger>
            <AccordionContent>
              <Text className='ml-[20px]'>You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Which wallets are supported for interacting with axone?</AccordionTrigger>
            <AccordionContent>
              <Text className='ml-[20px]'>You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Which wallets are supported for interacting with axone?</AccordionTrigger>
            <AccordionContent>
              <Text className='ml-[20px]'>You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>
    </PageContainer>
  );
}
