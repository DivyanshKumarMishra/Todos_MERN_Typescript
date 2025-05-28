import protectedAxios from '@/services/axios'
import type { User, UserStateType } from '../../types'
import {createSlice} from '@reduxjs/toolkit'
import {type PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import { GET_USER } from '@/utils/constants'

const initialState: UserStateType = {
  userInfo: null,
  isUserLoading: false,
  isUserError: false,
}

const getUserInfo = createAsyncThunk('/user/getUserInfo', async () => {
  try {
    const userInfo = await protectedAxios.get(GET_USER, {withCredentials: true})
    return userInfo.data
  } catch (error) {
    return error
  }
})

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>): void => {
      state.userInfo = action.payload
    },
    logout: (state): void => {
      state.userInfo = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.isUserLoading = true
      state.isUserError = false
    })
    builder.addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
      state.isUserLoading = false
      state.userInfo = action.payload
    })
    builder.addCase(getUserInfo.rejected, (state) => {
      state.isUserLoading = false
      state.isUserError = true
    })
  }
})

export const {setUserInfo, logout} = userSlice.actions
export {getUserInfo}
export default userSlice.reducer

