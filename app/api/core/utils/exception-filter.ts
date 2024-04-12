/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { HttpErrorMessage } from '@core/enums/http-error-message.enum';
import { HttpStatus } from '@core/enums/http-status.enum';

export async function exceptionFilter (fn: any) {
  try {
    return await fn(); // just to catch all error at this step
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e?.message || HttpErrorMessage.INTERNAL_SERVER_ERROR,
        status: e?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: e?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
