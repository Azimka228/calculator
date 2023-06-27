import {configureStore} from "@reduxjs/toolkit"

import {filterSlice} from "@app/store/slices/filterSlice"

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
