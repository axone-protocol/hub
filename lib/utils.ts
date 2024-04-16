import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChartDate (unixTime: number, fullYear = false) {
  const date = new Date(unixTime * 1000);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = !fullYear ? date.getFullYear().toString().substr(-2) : date.getFullYear().toString();
  return `${month} ${day}${'/'}${year}`;
}
