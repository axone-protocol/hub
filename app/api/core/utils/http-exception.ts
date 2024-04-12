import { HttpStatus } from '@core/enums/http-status.enum';

export class HttpException extends Error {
  private statusCode: HttpStatus;

  constructor (message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = statusCode;
  }
}
