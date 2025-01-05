const copyQueryKeys = {
  all: ['copies'],
  detail: (id: number) => [...copyQueryKeys.all, id],
};

export { copyQueryKeys };
