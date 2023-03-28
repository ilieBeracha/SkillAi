import { configureStore } from '@reduxjs/toolkit'
import interviewSlice from './interviewSlice'

export const Store = configureStore({
    reducer: {
        interview: interviewSlice
    }
})