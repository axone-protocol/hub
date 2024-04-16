import { NextRequest, NextResponse } from 'next/server';

import { OsmosisService } from '@core/services/osmosis/osmosis.service';
import { HistoricalChartRes } from '@core/services/osmosis/responses/historical-chart.response';
import { exceptionFilter } from '@core/utils/exception-filter';
import { parseUrlParams } from '@core/utils/parse-url-params';
import { schemaValidate } from '@core/utils/schema-validate';
import { GetHistoricalChartDto } from '@historical-price/dtos/get-historical-chart.dto';
import { getHistoricalChartSchema } from '@historical-price/schemas/get-historical-chart.schema';

export async function GET (request: NextRequest) {
  return exceptionFilter(getHistoricalPrice.bind(null, request));
}

async function getHistoricalPrice (request: NextRequest) {
  const dto: GetHistoricalChartDto = schemaValidate(
    getHistoricalChartSchema,
    parseUrlParams(request)
  );
  const historicalChart = await OsmosisService.getHistoricalChart(dto);
  return NextResponse.json(historicalPriceView(historicalChart));
}

function historicalPriceView (res: HistoricalChartRes) {
  return res.map((item) => ({
    time: item.time,
    price: item.close,
  }));
}
