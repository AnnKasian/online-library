type ExtractParams<T extends string> = T extends
  | `${string}/:${infer U}/${string}`
  | `${string}/:${infer U}`
  | `/:${infer U}/${string}`
  ? ExtractParams<U>
  : T;

export type { ExtractParams };
