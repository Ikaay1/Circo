import { CategoriesInterface } from '@constants/interface';
import { createSlice } from '@reduxjs/toolkit';

type StateType = {
  categories: CategoriesInterface[];
};

const initialState: StateType = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
    setCat: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
});

export const {setCat} = categorySlice.actions;

export default categorySlice.reducer;
