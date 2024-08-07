import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteCart, fetchCount, fetchitemsByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  value: 0,
  items:[],
  status:'idle',
  cartLoader:false
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchitemsByUserIdAsync= createAsyncThunk(
  'cart/fetchitemByUserIdAsync',
  async () => {
    const response = await fetchitemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartByAsync= createAsyncThunk(
  'cart/updateCartByAsync',
  async (update) => {
    const response = await updateCart(update)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const deleteCartByAsync= createAsyncThunk(
  'cart/deleteCartByAsync',
  async (itemId) => {
    const response = await deleteCart(itemId)
    // The value we return becomes the `fulfilled` action payload
        return response.data;
  }
);

export const resetCartByAsync= createAsyncThunk(
  'cart/resetCartByAsync',
  async () => {
    const response = await resetCart()
    // The value we return becomes the `fulfilled` action payload
        return response.data;
  }
);


export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchitemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchitemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
        state.cartLoader=true;
      })
      .addCase(fetchitemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoader=false;
      })
      .addCase(updateCartByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteCartByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(resetCartByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[]
      })
      
  },
});

export const { increment} = cartSlice.actions;

// export const selectCount = (state) => state.counter.value;
export const selectCart = (state) => state.cart.items;
export const selectCartStatus=(state)=>state.cart.status;
export const selectCartLoader=(state)=>state.cart.cartLoader;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default cartSlice.reducer;
