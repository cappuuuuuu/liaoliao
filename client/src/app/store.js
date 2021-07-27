import { configureStore } from '@reduxjs/toolkit'
import bubbleBackgroundReducer from '../features/bubbleBackground/bubbleBackgroundSlice';

export default configureStore({
  reducer: {
    bubbleBackground: bubbleBackgroundReducer,
  }
})