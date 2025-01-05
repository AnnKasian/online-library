// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { apiClient } from '#/providers/client';
// import { BookCreateDto, BooksService } from '#/services/books';

// import { bookQueryKeys } from './book-query-keys';

// const booksService = new BooksService(apiClient);

// const useDeleteBook = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) => {
//       return booksService.d;
//     },
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: bookQueryKeys.all });
//     },
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
//     },
//     onSettled: async () => {
//       await queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
//     },
//   });
// };
// export { useDeleteBook };
