'use client';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Text, Title } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Row from '@/components/ui/row';

type TermsModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openWalletModal: () => void;
};

const TermsModal: FC<TermsModalProps> = ({ open, setOpen, openWalletModal }) => {
  const t  = useTranslations('Dashboard');

  const acceptTerms = async () => {
    localStorage.setItem('termsAccepted', 'true');
    await cancel();
    openWalletModal();
  };

  const cancel = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className='text-white p-6 lg:p-8 w-[85vw] lg:w-[50vw] h-[75vh]'>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>{t('TermsAndConditions')}</DialogTitle>
        </DialogHeader>

        <Column className='overflow-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-axone-bg-dark scrollbar-track-axone-box-border'>

          {/* !TODO: Replace to the data from backend */}
          <Title>Terms of Service</Title>
          <Text className='text-axone-grey mb-4'>
            Welcome to https://hub.axone.xyz/, a site (the “Site”) provided by The OKP4 Association (Switzerland), which together with all of OKP4 Association’s respective officers, directors, employees, contractors, consultants, agents, subsidiaries, affiliates, predecessors, and successors are collectively referred to in these Terms of Service hereafter as “we”, “our”, or “us”.
            The Site provides access to the Axone Blockchain (“Axone”) for users who want to interact with Axone for purposes including, but not limited to, participating in governance, staking, and bridging assets. The Site is not the only means of accessing Axone and users are free to access Axone in whatever manner they choose.
            This Terms of Service Agreement (the “Agreement”) explains the terms and conditions by which you may access and use the Site. You must read this Agreement carefully. By accessing or using the Site, you signify that you have read, understand, and agree to be bound by this Agreement in its entirety. If you do not agree, you are not authorized to access or use the Site.
          </Text>

          <Title>1. Modification of this Agreement</Title>
          <Text>We reserve the right, in our sole discretion, to modify this Agreement from time to time. If we make any modifications, we will notify you by updating the date at the top of the Agreement and by maintaining a current version of the Agreement or a link at https://hub.axone.xyz. All modifications will be effective when they are posted, and your continued use of the Site will serve as confirmation of your acceptance of those modifications. If you do not agree with any modifications to this Agreement, you must immediately stop accessing and using the Site.</Text>

          <Title>2. Eligibility</Title>
          <Text>To access or use the Site, you must be able to form a legally binding contract with us. Accordingly, you represent that you are at least eighteen years old and have the full right, power, and authority to enter into and comply with the terms and conditions of this Agreement on behalf of yourself and any company or legal entity for which you may access or use the Site. You further represent that you are not a citizen, resident, or member of any jurisdiction or group that is subject to economic sanctions by the United States, or where your use of the Site would be illegal or otherwise violate any applicable law. You further represent that your access and use of the Site will fully comply with all applicable laws and regulations, and that you will not access or use the Site to conduct, promote, or otherwise facilitate any illegal activity.</Text>

          <Title>3. Privacy</Title>
          <Text>We care about your privacy. We use commercially reasonable safeguards to preserve the integrity and security of your personally identifiable information (“PII”) and aggregate data. However, we cannot guarantee that unauthorized third parties will never be able to obtain or use your PII or aggregate data for improper purposes. You acknowledge that you provide your PII and aggregate data at your own risk. By accessing and using the Site, you understand and consent to our collection, use, and disclosure of your PII and aggregate data.</Text>

          <Title>4. Prohibited Activity</Title>
          <Text>
            You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activity in relation to your access and use of the Site:
            Intellectual Property Infringement. Activity that infringes on or violates any copyright, trademark, service mark, patent, right of publicity, right of privacy, or other proprietary or intellectual property rights under the law.
            Cyberattack. Activity that seeks to interfere with or compromise the integrity, security, or proper functioning of any computer, server, network, personal device, or other information technology system, including (but not limited to) the deployment of viruses and denial of service attacks.
            Fraud and Misrepresentation. Activity that seeks to defraud any person or entity, including (but not limited to) providing any false, inaccurate, or misleading information in order to unlawfully obtain the property of another.
            Market Manipulation. Activity that violates any applicable law, rule, or regulation concerning the integrity of trading markets, including (but not limited to) the manipulative tactics commonly known as spoofing and wash trading.
            Any Other Unlawful Conduct. Activity that violates any applicable law, rule, or regulation of the United States or another relevant jurisdiction, including (but not limited to) the restrictions and regulatory requirements imposed by U.S. law.
          </Text>

          <Title>5. No Professional Advice</Title>
          <Text>All information provided by the Site is for informational purposes only and should not be construed as professional advice. You should not take, or refrain from taking, any action based on any information contained in the Site. Before you make any financial, legal, or other decisions involving the Site, you should seek independent professional advice from an individual who is licensed and qualified in the area for which such advice would be appropriate.</Text>

          <Title>6. No Warranties</Title>
          <Text>The Site is provided on an “AS IS” and “AS AVAILABLE” basis. To the fullest extent permitted by law, we disclaim any representations and warranties of any kind, whether express, implied, or statutory, including (but not limited to) the warranties of merchantability and fitness for a particular purpose. You acknowledge and agree that your use of the Site is at your own risk. We do not represent or warrant that access to the Site will be continuous, uninterrupted, timely, or secure; that the information contained in the Site will be accurate, reliable, complete, or current; or that the Site will be free from errors, defects, viruses, or other harmful elements. No advice, information, or statement that we make should be treated as creating any warranty concerning the Site. We do not endorse, guarantee, or assume responsibility for any advertisements, offers, or statements made by third parties concerning the Site.</Text>

          <Title>7. No Fiduciary Duties</Title>
          <Text>This Agreement is not intended to, and does not, create or impose any fiduciary duties on us. To the fullest extent permitted by law, you acknowledge and agree that we owe no fiduciary duties or liabilities to you or any other party, and that to the extent any such duties or liabilities may exist at law or in equity, those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated. You further agree that the only duties and obligations that we owe you are those set out expressly in this Agreement.</Text>

          <Title>8. Assumption of Risk</Title>
          <Text>By accessing and using the Site, you represent that you understand the inherent risks associated with using cryptographic and blockchain-based systems, and that you have a working knowledge of the usage and intricacies of digital assets. You further acknowledge that we are not responsible for any of these variables or risks, do not own or control Axone, and cannot be held liable for any resulting losses that you experience while accessing or using the Site. Accordingly, you understand and agree to assume full responsibility for all of the risks of accessing and using the Site and interacting with Axone.</Text>

          <Title>9. Third-Party Resources and Promotions</Title>
          <Text>The Site may contain references or links to third-party resources, including (but not limited to) information, materials, products, or services, that we do not own or control. In addition, third parties may offer promotions related to your access and use of the Site. We do not endorse or assume any responsibility for any such resources or promotions. If you access any such resources or participate in any such promotions, you do so at your own risk, and you understand that this Agreement does not apply to your dealings or relationships with any third parties. You expressly relieve us of any and all liability arising from your use of any such resources or participation in any such promotions.</Text>

          <Title>10. Release of Claims</Title>
          <Text>You expressly agree that you assume all risks in connection with your access and use of the Site and your interaction with Axone. You further expressly waive and release us from any and all liability, claims, causes of action, or damages arising from or in any way relating to your use of the Site and your interaction with Axone through the Site.</Text>

          <Title>11. Indemnity</Title>
          <Text>You agree to hold harmless, release, defend, and indemnify us and our officers, directors, employees, contractors, agents, affiliates, and subsidiaries from and against all claims, damages, obligations, losses, liabilities, costs, and expenses arising from: (a) your access and use of the Site; (b) your violation of any term or condition of this Agreement, the right of any third party, or any other applicable law, rule, or regulation; and (c) any other party’s access and use of the Site with your assistance or using any device or account that you own or control.</Text>

          <Title>12. Limitation of Liability</Title>
          <Text>Under no circumstances shall we be liable to you for any indirect, punitive, incidental, special, consequential, or exemplary damages, including (but not limited to) damages for loss of profits, goodwill, use, data, or other intangible property, arising out of or relating to any access or use of the Site, nor will we be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access or use of the Site or the information contained within it. We assume no liability or responsibility for any: (a) errors, mistakes, or inaccuracies of content; (b) personal injury or property damage, of any nature whatsoever, resulting from any access or use of the Site; (c) unauthorized access or use of any secure server or database in our control, or the use of any information or data stored therein; (d) interruption or cessation of function related to the Site; (e) bugs, viruses, trojan horses, or the like that may be transmitted to or through the Site; (f) errors or omissions in, or loss or damage incurred as a result of the use of, any content made available through the Site; and (g) the defamatory, offensive, or illegal conduct of any third party. Under no circumstances shall we or any of our officers, directors, employees, contractors, consultants, agents, affiliates, predecessors, successors, or subsidiaries be liable to you for any claims, proceedings, liabilities, obligations, damages, losses, or costs. This limitation of liability applies regardless of whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, and even if we have been advised of the possibility of such liability. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of certain liabilities and damages. Accordingly, some of the disclaimers and limitations set forth in this Agreement may not apply to you. This limitation of liability shall apply to the fullest extent permitted by law.</Text>

          <Title>13. Dispute Resolution</Title>
          <Text>Any claim or controversy arising out of or relating to the Site, this Agreement, or any other acts or omissions for which you may contend that we are liable, including (but not limited to) any claim or controversy as to arbitrability (“Dispute”), shall be finally and exclusively settled by arbitration. You understand that you are required to resolve all Disputes by binding arbitration. The arbitration will be held in Neûchatel (Switzerland) unless you and we both agree to hold it elsewhere. Unless we agree otherwise, the arbitrator may not consolidate your claims with those of any other party. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.</Text>

          <Title>14. Class Action and Jury Trial Waiver</Title>
          <Text>You must bring any and all Disputes against us in your individual capacity and not as a plaintiff in or member of any purported class action, class arbitration, collective action, private attorney general action, or other representative proceeding. This provision prohibits you from consolidating or having your claim consolidated with others in arbitration. The arbitration of any Dispute shall be on individual basis only. You and we both agree to waive the right to demand a trial by jury. Notwithstanding the foregoing, either you or we may bring an individual action in small claims court.</Text>

          <Title>15. Governing Law</Title>
          <Text>You agree that the laws of Switzerland, without regard to principles of conflict of laws, govern this Agreement and any Dispute between you and us.</Text>
        </Column>
        <DialogFooter className='relative pt-4'>
          <svg className='absolute -top-20 -lg:top-24 left-0 right-0 w-full h-28' viewBox='0 0 798 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='798' height='68' fill='url(#paint0_linear_968_6695)'/>
            <defs>
              <linearGradient id='paint0_linear_968_6695' x1='399' y1='0' x2='399' y2='68' gradientUnits='userSpaceOnUse'>
                <stop stop-color='#00213A' stop-opacity='0'/>
                <stop offset='0.889326' stop-color='#00213A'/>
              </linearGradient>
            </defs>
          </svg>

          <Row className='gap-4 lg:gap-8'>
            <Button onClick={acceptTerms} className='w-full' variant={'rounded'}>Confirm</Button>
            <Button onClick={cancel} className='w-full' variant={'rounded'}>Cancel</Button>
          </Row>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );};

export default TermsModal;