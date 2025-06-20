import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createItem, getAllItems, getItem, sendingEnquiry } from './../utils/apiCalls';

// Async thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await getAllItems();
    return response;
  }
);

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (id) => {
    const response = await getItem(id);
    return response;
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async (itemData) => {
    const response = await createItem(itemData);
    return response;
  }
);

export const sendEnquiry = createAsyncThunk(
  'items/sendEnquiry',
  async (enquiryData) => {
    const response = await sendingEnquiry(enquiryData);
    return response;
  }
);

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  addItemLoading: false,
  enquiryLoading: false,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch item
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add item
      .addCase(addItem.pending, (state) => {
        state.addItemLoading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.addItemLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.addItemLoading = false;
        state.error = action.error.message;
      })
      // Send enquiry
      .addCase(sendEnquiry.pending, (state) => {
        state.enquiryLoading = true;
        state.error = null;
      })
      .addCase(sendEnquiry.fulfilled, (state) => {
        state.enquiryLoading = false;
      })
      .addCase(sendEnquiry.rejected, (state, action) => {
        state.enquiryLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentItem, clearError, setCurrentItem } = itemSlice.actions;
export default itemSlice.reducer;