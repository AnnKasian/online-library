import { create } from 'zustand';

import { StorageKey, StorageService } from '#/services/storage';

type State = { theme: 'light' | 'dark' };

const userTheme = StorageService.getInstance()
  .get(StorageKey.THEME)
  ?.valueOf()
  .toString() as State['theme'];

type Action = {
  changeTheme: (theme: State['theme']) => void;
};

const useThemeStore = create<State & Action>((set) => {
  return {
    theme: userTheme,
    changeTheme: (theme) => {
      set(() => ({ theme }));
      StorageService.getInstance().set(StorageKey.THEME, theme);
    },
  };
});

export { useThemeStore };
