const OrderType = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

type OrderType = (typeof OrderType)[keyof typeof OrderType];

export { OrderType };
