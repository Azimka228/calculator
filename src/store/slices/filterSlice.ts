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
  }
  receiveCategory: {
    direction?: DirectionType
    selectedItem?: SelectItem
    items?: SelectItem[]
  }
}

interface FetchFilterDataPayload {
  data: FilterDataItem[]
}

interface fetchDirectionsDataPayload {
  data: SelectItem[]
}

export const fetchFilterData = createAsyncThunk<FetchFilterDataPayload, void, {}>(
  "filter/fetchFilterData",
  async () => {
    const response = await fetch("/src/assets/filter.json")
    const data: FilterDataItem[] = await response.json()
    return {data}
  }
)

export const fetchDirectionsData = createAsyncThunk<fetchDirectionsDataPayload, void, {}>(
  "filter/fetchDirectionsData",
  async () => {
    const response = await fetch("/src/assets/directions.json")
    const data: SelectItem[] = await response.json()
    return {data}
  }
)

const initialState: IFilter = {
  filterData: [],
  directionsData: [],
  directions: ["Все", "Криптовалюты", "Банки", "Наличные"],
  status: "idle",
  error: null,
  giveCategory: {
    direction: "Все",
  },
  receiveCategory: {
    direction: "Все",
  },
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGiveCategoryDirection: (state: IFilter, action: PayloadAction<DirectionType>) => {
      state.giveCategory.direction = action.payload
    },
    setGiveCategorySelectedItem: (state: IFilter, action: PayloadAction<SelectItem>) => {
      state.giveCategory.selectedItem = action.payload
    },
    setReceiveCategoryDirection: (state: IFilter, action: PayloadAction<DirectionType>) => {
      state.receiveCategory.direction = action.payload
    },
    setReceiveCategorySelectedItem: (state: IFilter, action: PayloadAction<SelectItem>) => {
      state.receiveCategory.selectedItem = action.payload
    },
    setReceiveCategoryItems: (state: IFilter, action: PayloadAction<SelectItem[]>) => {
      state.receiveCategory.items = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilterData.pending, (state: IFilter) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchFilterData.fulfilled, (state: IFilter, action) => {
        state.status = "succeeded"
        state.filterData = action.payload.data
      })
      .addCase(fetchFilterData.rejected, (state: IFilter) => {
        state.status = "failed"
        state.error = "fetch Filter Error"
      })
      .addCase(fetchDirectionsData.pending, (state: IFilter) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchDirectionsData.fulfilled, (state: IFilter, action) => {
        state.status = "succeeded"
        state.directionsData = action.payload.data
      })
      .addCase(fetchDirectionsData.rejected, (state: IFilter) => {
        state.status = "failed"
        state.error = "fetch Directions Error"
      })
  },
})

export const {
  setGiveCategoryDirection,
  setReceiveCategoryDirection,
  setGiveCategorySelectedItem,
  setReceiveCategorySelectedItem,
  setReceiveCategoryItems,
} = filterSlice.actions

export default filterSlice
