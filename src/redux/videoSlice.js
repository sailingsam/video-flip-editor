import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cropperActive: false,
  playing: false,
  playbackRate: 1.0,
  volume: 1,
  currentPosition: 0,
  cropperDimensions: { width: 0, height: 0 },
};
  // Add to initialState


// Add reducers

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    toggleCropper(state) {
      state.cropperActive = !state.cropperActive;
    },
    setPlaying(state, action) {
      state.playing = action.payload;
    },
    setPlaybackRate(state, action) {
      state.playbackRate = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setCurrentPosition(state, action) {
      state.currentPosition = action.payload;
    },
    setCropperDimensions(state, action) {
      state.cropperDimensions = action.payload;
    },
  },
});

export const { toggleCropper, setPlaying, setPlaybackRate, setVolume, setCurrentPosition, setCropperDimensions } = videoSlice.actions;

export default videoSlice.reducer;
