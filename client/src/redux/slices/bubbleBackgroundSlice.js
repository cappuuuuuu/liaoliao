import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'activeBubbleBackground',
  initialState: {
    status: true
  },
  reducers: {
    toggle: state => {
      state.status = !state.status
    }
  }
})

export const { toggle } = slice.actions
export const activeBubbleBackground = state => state.bubbleBackground.status
export default slice.reducer
