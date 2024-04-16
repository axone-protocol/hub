import { SafeParseError, ZodSchema } from 'zod';

import { BadRequestException } from '@core/utils/bad-request-exception';

export function schemaValidate (schema: ZodSchema, value: unknown) {
  const res = schema.safeParse(value);

  if (res.success) {
    return res.data;
  }

  throw new BadRequestException(errorView(res));
}

function errorView<T> (value: SafeParseError<T>): string {
  const flattenErrors = value.error.flatten();
  let message = 'Passed fields didn\'t match current schema:';

  for (const [key, value] of Object.entries(flattenErrors.fieldErrors)) {
    message += ` ${key} - [${value?.toString()}]`;
  }

  return message;
}
