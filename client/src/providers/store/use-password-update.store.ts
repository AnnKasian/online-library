import { create } from 'zustand';

type State = {
  isPasswordChange: boolean;
};

type Action = {
  updateIsPasswordChange: (isPasswordChange: State['isPasswordChange']) => void;
};

const usePasswordUpdateStore = create<State & Action>((set) => ({
  isPasswordChange: false,
  updateIsPasswordChange: (isPasswordChange) => {
    set(() => ({ isPasswordChange: isPasswordChange }));
  },
}));

export { usePasswordUpdateStore };
