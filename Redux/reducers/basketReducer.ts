import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Product } from "../../types";

const initialState: Product[] = [];
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (item: Product) => item.id === action.payload.id
      );
      if (index !== -1) {
        if (state[index].amount) {
          state[index].amount += 1;
        } else {
          state[index].amount = 1;
        }
      } else {
        const newItem = { ...action.payload, amount: 1 };
        state.push(newItem);
      }
    },
    decrement: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (item: Product) => item.id === action.payload.id
      );
      if (index !== -1 && state[index].amount === 1) {
        state.splice(index, 1);
      } else {
        state[index].amount -= 1;
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {},
    clearBasket: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { increment, decrement, incrementByAmount,clearBasket } = basketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.basket;

export default basketSlice.reducer;
