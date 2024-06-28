import { create } from 'zustand';

export enum TimeFrameEnum {
  ALL = 'all',
  YEAR = 'year',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

type TimeFrameState = {
  timeFrame: TimeFrameEnum;
  setTimeFrame: (timeFrame: TimeFrameEnum) => void;
};

export const useTimeFrameStore = create<TimeFrameState>((set) => ({
  timeFrame: TimeFrameEnum.DAY,
  setTimeFrame: (timeFrame) => set({ timeFrame }),
}));