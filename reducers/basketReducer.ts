import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface BasketItem {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  amount?: number;
}
export interface BasketState {
  basket: BasketItem[];
}

// Define the initial state using that type
const initialState: BasketState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<BasketItem>) => {
      const index = state.basket.findIndex(
        (item: BasketItem) => item.id === action.payload.id
      );
      if (index !== -1) {
        if (state.basket[index].amount) {
          state.basket[index].amount += 1;
        } else {
          state.basket[index].amount = 1;
        }
      } else {
        const newItem = { ...action.payload, amount: 1 };
        state.basket.push(newItem);
      }
    },
    decrement: (state, action: PayloadAction<BasketItem>) => {
      const index = state.basket.findIndex(
        (item: BasketItem) => item.id === action.payload.id
      );
      if (index !== -1 && state.basket[index].amount === 1) {
        state.basket.splice(index, 1);
      } else {
        state.basket[index].amount -= 1;
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

export const { increment, decrement, incrementByAmount } = basketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.basket.value;

export default basketSlice.reducer;
