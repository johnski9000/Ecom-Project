import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./Redux/store";
import { decrement, increment } from "./Redux/reducers/basketReducer";
import { useCallback } from "react";
import { Product } from "./types";


export async function useGetItems() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=10");
    if (!response.ok) {
      // Check if the response was successful
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json(); // Parse the JSON response and return it
  } catch (error) {
    console.error("Fetching error:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
}
export function useAddItem() {
  const dispatch = useAppDispatch();

  const addItem = useCallback(
    (item: Product) => {
      console.log(item);
      dispatch(increment(item)); // Call the dispatch function with the increment action
    },
    [dispatch]
  ); // useCallback ensures the function is memoized and only changes if dispatch changes

  return addItem;
}

export function useRemoveItem() {
  const dispatch = useAppDispatch();

  const removeItem = useCallback(
    (item: Product) => {
      console.log(item);
      dispatch(decrement(item)); // Call the dispatch function with the decrement action
    },
    [dispatch]
  ); // useCallback ensures the function is memoized and only changes if dispatch changes

  return removeItem;
}


// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
