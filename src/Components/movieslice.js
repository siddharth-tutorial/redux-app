// src/Components/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchmovie = createAsyncThunk(
  'movie/fetchmovie',
  async () => {
    const res = await fetch('https://jsonfakery.com/movies/random');
    const data = await res.json();
    console.log(data)
    return data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movie: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchmovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchmovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(fetchmovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
