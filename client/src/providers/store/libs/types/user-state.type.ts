type State = {
  deep: {
    nested: {
      obj: { count: number };
      arr: string[];
    };
  };
  normalInc: () => void;
  immerInc: () => void;
  opticsInc: () => void;
  ramdaInc: () => void;
  normalSetText: (s: string, i: number) => void;
  immerSetText: (s: string, i: number) => void;
  opticsSetText: (s: string, i: number) => void;
  ramdaSetText: (s: string, i: number) => void;
};

export type { State };
