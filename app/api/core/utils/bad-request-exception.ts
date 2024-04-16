import { HttpStatus } from '@core/enums/http-status.enum';
import { HttpException } from '@core/utils/http-exception';

export class BadRequestException extends HttpException {
  constructor (message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
