abstract class ItemController {
  useRoutes(): void {
    this.get?.();
    this.getAll?.();
    this.post?.();
    this.put?.();
    this.delete?.();
  }

  abstract get?(): void;

  abstract getAll?(): void;

  abstract post?(): void;

  abstract put?(): void;

  abstract delete?(): void;
}

export { ItemController };
