import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateOrder, createOrder, fetchAllOrders, fetchCount } from './orderAPI';

const initialState = {
  orders:[],
  status: 'idle',
  cunnentOrder:null,
  totalOrders:0,
};
// we may need more info of current order

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchAllOrdersAsync=createAsyncThunk(
  'order/fetchAllOrders',
  async({sort,pagination})=>{
    const response=await fetchAllOrders(sort,pagination)
    return response.data
  }
)

export const UpdateOrdersAsync=createAsyncThunk(
  'order/UpdateOrders',
  async(update)=>{
    const response=await UpdateOrder(update)
    return response.data
  }
)

export const orderSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetCart: (state) => {
      state.cunnentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.cunnentOrder=action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
        state.totalOrders=action.payload.Totalorders;
      })
      .addCase(UpdateOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index]=action.payload;
        // state.totalOrders=
      })
  },
});

export const { resetCart} = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.cunnentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrderStatus=(state)=>state.order.status;

// export const selectCurrentOrder = (state) => state.order.cunnentOrder;


// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default orderSlice.reducer;
