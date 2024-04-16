/* eslint-disable @typescript-eslint/no-namespace */

export namespace HttpRequester {
    const enum HttpMethod {
        GET = 'get',
        POST = 'post',
        PUT = 'put',
        PATCH = 'patch',
        DELETE = 'delete',
        HEAD = 'head',
        OPTIONS = 'options',
    }

    export async function get<T> (
      url: string,
      headers?: HeadersInit,
      revalidate?: number
    ): Promise<T> {
      const res = await fetch(url, {
        method: HttpMethod.GET,
        headers,
        next: {
          revalidate,
        },
      });

      return res.json();
    }

    export async function post<T> (
      url: string,
      body: BodyInit,
      headers?: HeadersInit
    ): Promise<T> {
      const res = await fetch(url, {
        method: HttpMethod.POST,
        body,
        headers,
      });

      return res.json();
    }
}
