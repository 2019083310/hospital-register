import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'

export const fetchHomeData = createAsyncThunk('fetch/homeData', (info, {
  dispatch
}) => {

})

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    name: "coderyliu",
  },
  reducers: {
    changeNameAction(state, {
      payload
    }) {
      state.name = payload
    }
  }
})

export const {
  changeNameAction
} = homeSlice.actions

export default homeSlice.reducer