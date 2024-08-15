import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface searchSliceType {
  search: boolean;
  searchKeyWord: string;
}
const initialState: searchSliceType = {
  search: false,
  searchKeyWord: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearchModal: (state) => {
      return { ...state, search: true };
    },
    closeSearchModal: (state) => {
      return { ...state, search: false };
    },
    putSearchKeyWord: (state, { payload }) => {
      return { ...state, searchKeyWord: payload };
    },
  },
});
export const selectSearch = (state: RootState) => state.search;

export const { openSearchModal, closeSearchModal, putSearchKeyWord } =
  searchSlice.actions;
export default searchSlice.reducer;
export type { searchSliceType };
