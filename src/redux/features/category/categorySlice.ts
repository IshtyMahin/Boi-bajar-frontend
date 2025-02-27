import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCategory = {
  _id: string;
  name: string;
  __v?: number;
};

interface CategoryState {
  categories: TCategory[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<TCategory[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<TCategory>) => {
      state.categories.push(action.payload);
    },
  },
});

export const { setCategories, addCategory } = categorySlice.actions;

export default categorySlice.reducer;
