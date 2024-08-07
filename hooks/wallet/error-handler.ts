/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const errorMessages: { [key: number]: string } = {
  2: 'tx parse error',
  3: 'invalid sequence',
  4: 'unauthorized',
  5: 'insufficient funds',
  6: 'unknown request',
  7: 'invalid address',
  8: 'invalid pubkey',
  9: 'unknown address',
  10: 'invalid coins',
  11: 'out of gas',
  12: 'memo too large',
  13: 'insufficient fee',
  14: 'maximum number of signatures exceeded',
  15: 'no signatures supplied',
  16: 'failed to marshal JSON bytes',
  17: 'failed to unmarshal JSON bytes',
  18: 'invalid request',
  19: 'tx already in mempool',
  20: 'mempool is full',
  21: 'tx too large',
  22: 'key not found',
  23: 'invalid account password',
  24: 'tx intended signer does not match the given signer',
  25: 'invalid gas adjustment',
  26: 'invalid height',
  27: 'invalid version',
  28: 'invalid chain-id',
  29: 'invalid type',
  30: 'tx timeout height',
  31: 'unknown extension options',
  32: 'incorrect account sequence',
  33: 'failed packing protobuf message to Any',
  34: 'failed unpacking protobuf message from Any',
  35: 'internal logic error',
  36: 'conflict',
  37: 'feature not supported',
  38: 'not found',
  39: 'Internal IO error',
  40: 'error in app.toml',
  41: 'invalid gas limit',
  42: 'panic',
};

// Error handler function
const handleError = ({ error, showToast }: { error: any, showToast(msg: any): void}) => {
  const errorCode = error?.code;
  const errorMessage = errorMessages[errorCode] || `Something went wrong: ${error.message || error}`;
  showToast(errorMessage);
};