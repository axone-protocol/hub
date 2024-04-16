/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */
import { GetHistoricalChartDto } from '@/app/api/historical-price/dtos/get-historical-chart.dto';
import { config } from '@core/config/config';
import { Endpoints } from '@core/services/osmosis/enums/endpoints.enum';
import { RouteParam } from '@core/services/osmosis/enums/route-param.enum';
import { FailedResponse } from '@core/services/osmosis/responses/failed.response';
import { GSFResponse } from '@core/services/osmosis/responses/generic-success-failed.response';
import { BadRequestException } from '@core/utils/bad-request-exception';
import { createUrlParams } from '@core/utils/create-url-params';
import { HttpRequester } from '@core/utils/http-requester';
import { HistoricalChartRes } from './responses/historical-chart.response';

export namespace OsmosisService {
    const BASE_URL = config.osmosis.url;

    function constructUrl (endpoint: string, params?: string): string {
      return `${BASE_URL}/${endpoint}${params ? `?${params}` : ''}`;
    }

    export async function getHistoricalChart (
      payload: GetHistoricalChartDto
    ): Promise<HistoricalChartRes> {
      const endpoint = Endpoints.HISTORICAL_PRICE.replace(
        RouteParam.SYMBOL,
        payload.symbol
      );

      return errorHandleWrapper(
        HttpRequester.get.bind(
          null,
          constructUrl(endpoint, createUrlParams({ tf: payload.range.toString() }))
        )
      );
    }

    async function errorHandleWrapper<T> (fn: any): Promise<T> {
      try {
        const response: GSFResponse<T> = await fn();

        if (isFailedResponse(response)) {
          throw new BadRequestException(response.message);
        }

        return response as T;
      } catch (e: any) {
        throw new BadRequestException(e.message);
      }
    }

    function isFailedResponse<T> (
      response: GSFResponse<T>
    ): response is FailedResponse {
      return (response as FailedResponse).message !== undefined;
    }
}
