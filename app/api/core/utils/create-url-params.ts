// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUrlParams (params: any): string {
  const url = new URLSearchParams(params);
  return url.toString();
}
