import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateProduct, UpdateProduct, fetchAllBrands, fetchAllCategorys, fetchAllProduct ,fetchProductByFilter,fetchProductById} from './ProductListAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0,
  categorys:[],
  brands:[],
  selectedProduct:null
};

export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchCount',
  async () => {
    const response = await fetchAllProduct();
    // console.log(response)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchProductByFiltertAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({filter,sort,pagination,admin}) => {
    // console.log(filter)
    const response = await fetchProductByFilter(filter,sort,pagination,admin);
    // console.log(response.data)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchAllCategorysAsync = createAsyncThunk(
  'product/fetchCategorys',
  async () => {
    const response = await fetchAllCategorys()
    return response.data;
  }
);



export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchAllBrands()
    return response.data;
  }
);


export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id)
    return response.data;
  }
);

export const CreateProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await CreateProduct(product)
    return response.data;
  }
);
export const UpdateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await UpdateProduct(update)
    return response.data;
  }
);







export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct =null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFiltertAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFiltertAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItem
      })
      .addCase(fetchAllCategorysAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategorysAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categorys = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(CreateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(UpdateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex(item=>item.id===action.payload.id)
        state.products[index]=action.payload
        state.selectedProduct = action.payload;

        
      })
  },
});

export const { clearSelectedProduct} = ProductSlice.actions;

export const selectAllProduct = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categorys;
export const selectBrands = (state) => state.product.brands;
export const selectedProduct= (state) => state.product.selectedProduct;
export const selectProductListStatus=(state)=>state.product.status;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default ProductSlice.reducer;
