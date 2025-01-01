import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

async function fetchConvertedCurrency({ amount, from, to }) {
  const response = await fetch(
    `http://localhost:5000/convert?amount=${amount}&from=${from}&to=${to}`
  );
  const data = await response.json();
  return data;
}

/**
 * createAsyncThunk lets us handle async logic (like fetching from our
 * server) in a Redux-friendly way. The first argument is a 'type string',
 * and the second is an async function that returns data (or throws an error).
 */
export const convertCurrency = createAsyncThunk(
  'currency/convertCurrency',
  async ({ amount, from, to }, thunkAPI) => {
    try {
      const data = await fetchConvertedCurrency({ amount, from, to });
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    loading: false,
    error: null,
    result: null,
  },
  reducers: {
    //local state
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(convertCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      // Fulfilled (success) state
      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.loading = false;
        // e.g. action.payload = { amount, from, to, converted }
        state.result = action.payload;
      })
      // Rejected (error) state
      .addCase(convertCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;
