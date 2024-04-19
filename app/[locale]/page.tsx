import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function Home () {
  const locale = useLocale();

  return redirect(`/${locale}/dashboard`);
}