/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type ClassValue, clsx } from 'clsx';
import { differenceInSeconds, format, formatDistanceToNow, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { okp4Chain } from '@/core/chain';

export const EXPLORE_URL = 'https://docs.axone.xyz';
export const GET_STARTED_URL = 'https://axone.xyz';

export const DEFAULT_TOKEN_DENOM = 'AXONE';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const suggestTestNetToKeplr = () => {
  // @ts-expect-error
  if (window.keplr) {
    // @ts-expect-error
    window.keplr.experimentalSuggestChain(okp4Chain)
      .then(() => {
        console.log('Chain suggested successfully');
      })
      .catch(() => {
        console.error('Failed to suggest the chain');
      });
  } else {
    console.error('Keplr is not installed');
  }
};

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
  return `${integerPart.toLocaleString('en-US')}.${decimalPart}${suffix}`;
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

export const openInNewTab = (url: string) => () => window.open(url, '_blank');
