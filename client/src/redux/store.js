import { configureStore } from '@reduxjs/toolkit'
import bubbleBackgroundReducer from '@/redux/slices/bubbleBackgroundSlice'
import avatarDataReducer from '@/redux/slices/avatarDataSlice'

export default configureStore({
  reducer: {
    bubbleBackground: bubbleBackgroundReducer,
    avatarData: avatarDataReducer
  }
})
