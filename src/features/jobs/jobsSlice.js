import { createSlice } from '@reduxjs/toolkit';
import jobsData from '../../data/jobs.json';

const initialState = {
  jobs: jobsData,
  searchQuery: '',
  filters: {
    company: '',
    location: '',
  },
  sort: 'date', 
  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
  }
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.pagination.currentPage = 1; 
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; 
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.pagination.currentPage = 1;
    },
    toggleBookmark: (state, action) => {
      const jobId = action.payload;
      if (state.bookmarks.includes(jobId)) {
        state.bookmarks = state.bookmarks.filter(id => id !== jobId);
      } else {
        state.bookmarks.push(jobId);
      }
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  }
});

export const { setSearchQuery, setFilter, setSort, toggleBookmark, setPage } = jobsSlice.actions;

export default jobsSlice.reducer;
