import { createSlice } from "@reduxjs/toolkit"

export const adminProductSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  //更新值的方法(Actions)
  reducers: {
    setAdminProducts: (state, action) => {
      state.products = action.payload;
      console.log("這是SetProducts", state.products);
    }
  }
})
export const getAdminProducts = (state) => state.adminProduct.products;

export default adminProductSlice.reducer;
export const { setAdminProducts } = adminProductSlice.actions;
