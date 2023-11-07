import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface BasketItem {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string,
    amount?: number
}
export interface BasketState {
        basket: BasketItem[]
}

// Define the initial state using that type
const initialState : BasketState = {
  basket: []
}

export const basketSlice = createSlice({
  name: 'basket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<BasketItem>) => {
        const index = state.basket.findIndex((item:BasketItem) => item.id === action.payload.id)
        if (index !== -1) {
            // add some if else logic here 
            // {...state }
            if (state.basket[index].amount) {
                // If the 'amount' property exists, increment it
                state.basket[index].amount += 1;
              } else {
                // If the 'amount' property does not exist, add it and set it to 1
                state.basket[index].amount = 1;
              }
        } else {
            const newItem = {...action.payload, amount : 1}
            state.basket.push(newItem)
        }
    },
    decrement:  (state, action: PayloadAction<BasketItem>) => {
        const index = state.basket.findIndex((item:BasketItem) => item.id === action.payload.id)
        if (index !== -1) {
            state.basket.splice(index, 1);
        }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = basketSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.basket.value

export default basketSlice.reducer