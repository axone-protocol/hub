import { z } from 'zod';

export const getHistoricalChartSchema = z.object({
  symbol: z.string(),
  range: z.string().transform((val) => {
    const parsedNumber = parseFloat(val);
    if (isNaN(parsedNumber)) {
      throw new Error('Invalid number format');
    }
    return parsedNumber;
  }),
});
