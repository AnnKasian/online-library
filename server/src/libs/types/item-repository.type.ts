abstract class ItemRepository<Item extends { id: number }> {
  abstract find(filters: Partial<Item>): Promise<Item | null>;

  abstract findAll(filters: unknown): Promise<Item[]>;

  abstract create(data: Item): Promise<Item>;

  abstract createAll(data: Partial<Item>[]): Promise<number>;

  abstract update(id: Item['id'], data: Partial<Item>): Promise<Item>;

  abstract delete(id: Item['id']): Promise<Item>;
}

export { ItemRepository };
