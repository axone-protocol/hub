import { FailedResponse } from '@core/services/osmosis/responses/failed.response';

export type GSFResponse<T> = T | FailedResponse; // Generic Success / Failed Response for Osmosis
