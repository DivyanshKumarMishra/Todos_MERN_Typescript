import protectedAxios from '@/services/axios'
import type { User, UserStateType } from '../../types'
import {createSlice} from '@reduxjs/toolkit'
import {type PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import { GET_USER, LOGOUT_URL } from '@/utils/constants'
import { toast } from 'sonner'

const initialState: UserStateType = {
  userInfo: null,
  isUserLoading: false,
}

const getUserInfo = createAsyncThunk('/user/getUserInfo', async () => {
    const userInfo = await protectedAxios.get(GET_USER, {withCredentials: true})
    return userInfo.data
})

const logout = createAsyncThunk('/user/logout', async () => {
  const response = await protectedAxios.post(LOGOUT_URL, {withCredentials: true})
  return response.data
})

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>): void => {
      state.userInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.isUserLoading = true
    })
    builder.addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
      state.isUserLoading = false
      state.userInfo = action.payload
    })
    builder.addCase(getUserInfo.rejected, (state) => {
      state.isUserLoading = false
    })
    builder.addCase(logout.pending, (state) => {
      state.isUserLoading = true
    })
    builder.addCase(logout.fulfilled, (state, action: PayloadAction<{message: string}>) => {
      state.isUserLoading = false
      state.userInfo = null
      toast.success(action.payload.message)
    })
    builder.addCase(logout.rejected, (state) => {
      state.isUserLoading = false
      toast.error('Failed to logout')
    })
  }
})

export const {setUserInfo} = userSlice.actions
export {getUserInfo, logout}
export default userSlice.reducer

