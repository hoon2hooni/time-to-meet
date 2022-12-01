import create from "zustand";

interface CounterObjectState {
  number: number;
  numberTwo: number;
}

interface Counter {
  count: number;
  counterObject: CounterObjectState;
  increase: () => void;
  increaseCounterObject: () => void;
}

const useCounterStore = create<Counter>((set) => ({
  count: 1,
  counterObject: { number: 1, numberTwo: 2 },
  increase: () => set((state) => ({ count: state.count + 1 })),
  increaseCounterObject: () =>
    set((state) => ({
      counterObject: {
        ...state.counterObject,
        number: state.counterObject.number + 1,
      },
    })),
}));

export default useCounterStore;
