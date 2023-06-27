import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {SelectItem} from "@app/shared/ui/Select"

interface FilterDataItem {
  from: SelectItem
  to: SelectItem[]
}

export type DirectionType = "Все" | "Криптовалюты" | "Банки" | "Наличные"

interface IFilter {
  filterData: FilterDataItem[]
  directionsData: SelectItem[]
  directions: DirectionType[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  giveCategory: {
    direction?: DirectionType
    selectedItem?: SelectItem
    inputValue?: string
  }
  receiveCategory: {
    direction?: DirectionType
    selectedItem?: SelectItem
    items?: SelectItem[]
    inputValue?: string
  }
}

export const fetchFilterData = createAsyncThunk("filter/fetchFilterData", async () => {
  const response = await fetch("/src/assets/filter.json")
  const data: FilterDataItem[] = await response.json()
  return {data}
})

export const fetchDirectionsData = createAsyncThunk("filter/fetchDirectionsData", async () => {
  const response = await fetch("/src/assets/directions.json")
  const data: SelectItem[] = await response.json()
  return {data}
})

const initialState: IFilter = {
  filterData: [],
  directionsData: [],
  directions: ["Все", "Криптовалюты", "Банки", "Наличные"],
  status: "idle",
  error: null,
  giveCategory: {
    direction: "Все",
    inputValue: "",
  },
  receiveCategory: {
    direction: "Все",
    inputValue: "",
  },
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGiveCategoryDirection: (state, action: PayloadAction<DirectionType>) => {
      state.giveCategory.direction = action.payload
    },
    setGiveCategorySelectedItem: (state, action: PayloadAction<SelectItem>) => {
      state.giveCategory.selectedItem = action.payload
    },
    setGiveCategoryInputValue: (state, action: PayloadAction<string>) => {
      state.giveCategory.inputValue = action.payload
    },
    setReceiveCategoryDirection: (state, action: PayloadAction<DirectionType>) => {
      state.receiveCategory.direction = action.payload
    },
    setReceiveCategorySelectedItem: (state, action: PayloadAction<SelectItem>) => {
      state.receiveCategory.selectedItem = action.payload
    },
    setReceiveCategoryItems: (state, action: PayloadAction<SelectItem[]>) => {
      state.receiveCategory.items = action.payload
    },
    setReceiveCategoryInputValue: (state, action: PayloadAction<string>) => {
      state.receiveCategory.inputValue = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilterData.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchFilterData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.filterData = action.payload.data
      })
      .addCase(fetchFilterData.rejected, state => {
        state.status = "failed"
        state.error = "fetch Filter Error"
      })
      .addCase(fetchDirectionsData.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchDirectionsData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.directionsData = action.payload.data
      })
      .addCase(fetchDirectionsData.rejected, state => {
        state.status = "failed"
        state.error = "fetch Directions Error"
      })
  },
})

export const {
  setGiveCategoryDirection,
  setGiveCategorySelectedItem,
  setGiveCategoryInputValue,
  setReceiveCategoryDirection,
  setReceiveCategorySelectedItem,
  setReceiveCategoryItems,
  setReceiveCategoryInputValue,
} = filterSlice.actions

export default filterSlice
