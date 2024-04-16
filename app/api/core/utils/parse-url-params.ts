import { NextRequest } from 'next/server';

type QueryParams<T> = {
    [key: string]: T;
}

export function parseUrlParams (request: NextRequest) {
  const url = new URL(request.url);
  const queryParamsObject: QueryParams<string> = {};

  url.searchParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

  return queryParamsObject;
}
