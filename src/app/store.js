import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import  ProductSlice  from '../features/ProductList/ProductListSlice';
import  authSlice  from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice'
import orderSlice from '../features/order/orderSlice';
import userSlice from '../features/User/userSlice';
export const store = configureStore({
  reducer: {
    product: ProductSlice,
    auth:authSlice,
    cart:cartSlice,
    order:orderSlice,
    user:userSlice
  },
});
