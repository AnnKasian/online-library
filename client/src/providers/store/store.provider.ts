import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useUserStore = create(
  combine({ users: 0 }, (set) => ({
    increase: (by: number) => {
      set((state) => ({ users: state.users + by }));
    },
  })),
);

export { useUserStore };
