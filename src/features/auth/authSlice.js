import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser, fetchCount ,LoginUser, SighOut,CheckAuthUser} from './authAPI';
import { UpdateUser } from '../User/userAPI';
import { act } from 'react-dom/test-utils';

const initialState = {
  loggedInUserToken:null,
  status: 'idle',
  error:null,
  userChecked:false
};

export const CreateUserAsync = createAsyncThunk(
  'user/createuser',
  async (userData) => {
    // console.log(userData)
    const response = await CreateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const LoginUserAsync = createAsyncThunk(
  'user/Loginuser',
  async (LoginInfo,{rejectWithValue}) => {
    // console.log()
    try{
    const response = await LoginUser(LoginInfo);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response)
    return response.data;
    }catch(error){
      console.log(error)
      // console.log(error.massage)
      return rejectWithValue(error)
    }
  }
);

export const CheckAuthUserAsync = createAsyncThunk(
  'user/CheckAuthUser',
  async () => {
    // console.log()
    try{
    const response = await CheckAuthUser();
    // The value we return becomes the `fulfilled` action payload
    // console.log(response)
    return response.data;
    }catch(error){
      console.log(error)
      // console.log(error.massage)
    }
  }
);



export const SignOutAsync = createAsyncThunk(
  'user/SighOut',
  async () => {
    // console.log(user)
    const response = await SighOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
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
      .addCase( CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase( LoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase( LoginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.error=action.payload
      })
      
      .addCase( SignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( SignOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
     
      .addCase( CheckAuthUserAsync.pending, (state) => {
        state.status = 'loading';
        state.userChecked=false
      })
      .addCase( CheckAuthUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked=true
      })
      .addCase( CheckAuthUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked=true
      })
  },
});

// export const { increment} = userSlice.actions;

export const selectUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectuserChecked=(state)=>state.auth.userChecked;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default authSlice.reducer;
