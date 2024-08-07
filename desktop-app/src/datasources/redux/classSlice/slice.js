import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  list: [],      
  selected: null,
  classDetails: null, 
  files: [],       
  error: null,
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    fetchingClasses: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadClasses: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addClass: (state, action) => {
      state.list.push(action.payload);
    },
    errorOccured: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeClass: (state, action) => {
      state.list = state.list.filter((cls) => cls._id !== action.payload);
    },
    selectClass: (state, action) => {
      state.selected = state.list.find((cls) => cls._id === action.payload);
      state.files = []; // Clear files when a new class is selected
    },
    fetchingFiles: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadFiles: (state, action) => {
      state.files = action.payload;
      state.loading = false;
    },
    fileUploadSuccess: (state, action) => {
      if (state.classDetails) {
        state.classDetails.files.push(action.payload);
      }
      state.loading = false;
    },
    clearFiles: (state) => {
      state.files = [];
    },
    fetchingClassDetails: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadClassDetails: (state, action) => {
      state.classDetails = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchingClasses,
  loadClasses,
  addClass,
  errorOccured,
  removeClass,
  selectClass,
  fetchingFiles,
  loadFiles,
  fileUploadSuccess,
  clearFiles,
  fetchingClassDetails,
  loadClassDetails,
} = classSlice.actions;

export const classReducer = classSlice.reducer;
