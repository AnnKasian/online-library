const bookQueryKeys = {
  all: ['books'],
  detail: (id: number) => [...bookQueryKeys.all, id],
};

export { bookQueryKeys };
