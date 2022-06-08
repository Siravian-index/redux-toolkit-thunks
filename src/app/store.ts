import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { postSlice } from '../features/postSlice'

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
  },
})

// ts types
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
