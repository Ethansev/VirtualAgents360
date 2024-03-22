import { create } from 'zustand';

type State = {
  bears: number;
};

type Action = {
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useRealEstateStore = create<State & Action>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
