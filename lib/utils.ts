import { type ClassValue, clsx } from 'clsx';
import { differenceInSeconds, format, formatDistanceToNow, parseISO } from 'date-fns';
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

export function formatNumber (num: number | undefined): string {
  if (num === undefined) {
    return '0';
  }
  let value = num;
  let suffix = '';

  if (num >= 1e6) {
    value = num / 1e6;
    suffix = 'M';
  } else if (num >= 1e3) {
    value = num / 1e3;
    suffix = 'K';
  }

  const integerPart: number = Math.floor(value);
  const decimalPart: string = (value - integerPart).toFixed(2).slice(2);
  return `${integerPart.toLocaleString('de-DE')}.${decimalPart}${suffix}`;
}

export function formatTimestamp (timestamp: string): string {
  const date = new Date(timestamp);
  const secondsAgo = differenceInSeconds(new Date(), date);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDate = (date: string | undefined): string => {
  if (!date) {
    return '';
  }
  const timestamp = date;
  const parsedDate = parseISO(timestamp);
  const formattedDate = format(parsedDate, 'MMM dd yyyy HH:mm:ss');

  return formattedDate;
};

export const formatNumberToLocale = (num: number | undefined): string => {
  if (num === undefined || isNaN(num)) {
    return '0.00';
  }
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
