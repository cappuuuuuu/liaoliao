import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getAvatars from '@/services/avatarServices'

export const getAvatarDataThunk = createAsyncThunk(
  'avatarData/getAvatarData',
  async () => {
    const response = await getAvatars()
    return response
  }
)

export const slice = createSlice({
  name: 'avatarData',
  initialState: {
    data: []
  },
  reducers: {
  },
  extraReducers: {
    [getAvatarDataThunk.fulfilled]: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { getAvatarDataReducer } = slice.actions
export const avatarData = state => state.avatarData.data
export default slice.reducer
