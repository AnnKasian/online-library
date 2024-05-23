const CopyStatus = {
  FREE: 'FREE',
  RESERVED: 'RESERVED',
} as const;

type CopyStatus = (typeof CopyStatus)[keyof typeof CopyStatus];

export { CopyStatus };
