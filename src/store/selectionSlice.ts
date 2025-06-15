import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Fragment {
  pageNumber: number;
  base64: string;
}
export interface SelectionState {
  fragments: Fragment[];
}

const initialState: SelectionState = { fragments: [] };

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    addFragment: (state, action: PayloadAction<Fragment>) => {
      state.fragments.push(action.payload);
    }
  }
});

export const { addFragment } = selectionSlice.actions;
export default selectionSlice.reducer;
