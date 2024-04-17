import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChartDate (unixTime: number) {
  const date = new Date(unixTime * 1000);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear().toString();
  return `${month} ${day}${'/'}${year}`;
}
