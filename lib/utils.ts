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

  // Handle negative numbers by working with their absolute value and adding the sign back at the end.
  const sign = num < 0 ? '-' : '';
  let value = Math.abs(num);
  let suffix = '';

  if (value >= 1e12) {
    const trillions = value / 1e12;
    const roundedTrillions = Math.round(trillions * 100) / 100; // Rounds to two decimal places
    suffix = 'T'; // Trillions
    value = roundedTrillions;
  } else if (value >= 1e9) {
    value /= 1e9;
    suffix = 'B'; // Billions
  } else if (value >= 1e6) {
    value /= 1e6;
    suffix = 'M'; // Millions
  } else if (value >= 1e3) {
    value /= 1e3;
    suffix = 'K'; // Thousands
  }

  // Improved rounding and formatting
  const roundedValue = Math.round(value * 100) / 100; // Rounds to two decimal places
  const formattedValue = roundedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `${sign}${formattedValue}${suffix}`;
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
