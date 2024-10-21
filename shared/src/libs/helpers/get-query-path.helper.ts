import { ExtractParams } from '../types';

const getEndpoint = <Path extends string>(
  path: Path,
  query: Record<ExtractParams<Path>, string | number>,
): string => {
  return Object.keys(query).reduce<string>((path, key) => {
    const keyTyped = key as ExtractParams<Path>;

    return path.replace(`:${keyTyped}`, query[keyTyped].toString());
  }, path);
};

export { getEndpoint };
