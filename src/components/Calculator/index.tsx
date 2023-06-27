import styles from "./Calculator.module.scss"

import {useEffect, useState} from "react"

import {Categories} from "../Categories/index"

import directionsItems from "@app/assets/directions.json"
import filterItems from "@app/assets/filter.json"
import {isObjectEqual} from "@app/shared/lib"
import {SelectItem} from "@app/shared/ui/Select"
import {useAppDispatch, useAppSelector} from "@app/store/hooks"
import {
  fetchDirectionsData,
  fetchFilterData,
  setGiveCategoryDirection,
  setGiveCategoryInputValue,
  setGiveCategorySelectedItem,
  setReceiveCategoryDirection,
  setReceiveCategoryInputValue,
  setReceiveCategoryItems,
  setReceiveCategorySelectedItem,
} from "@app/store/slices/filterSlice"
import type {DirectionType} from "@app/store/slices/filterSlice"

const CURRENCY_COEFFICIENT = 1.3

export const Calculator = () => {
  const dispatch = useAppDispatch()

  const directions = useAppSelector(state => state.filter.directions)
  const allDirections = useAppSelector(state => state.filter.directionsData)

  const giveCategoryDirection = useAppSelector(state => state.filter.giveCategory.direction)
  const giveCategorySelectedItem = useAppSelector(state => state.filter.giveCategory.selectedItem)
  const giveCategoryInputValue = useAppSelector(state => state.filter.giveCategory.inputValue)

  const receiveCategoryDirection = useAppSelector(state => state.filter.receiveCategory.direction)
  const receiveCategorySelectedItem = useAppSelector(state => state.filter.receiveCategory.selectedItem)
  const receiveCategoryItems = useAppSelector(state => state.filter.receiveCategory.items)
  const receiveCategoryInputValue = useAppSelector(state => state.filter.receiveCategory.inputValue)

  const handleChangeGiveDirection = (value: SelectItem) => {
    const currentObj = filterItems.find(el => isObjectEqual(el.from, value))

    if (currentObj) {
      dispatch(setReceiveCategoryItems(currentObj.to))
    }

    dispatch(setReceiveCategoryDirection("Все"))
    dispatch(setGiveCategorySelectedItem(value))
  }

  const [disalbedChangeDirectionButton, setDisabledChangeDirectionButton] = useState(true)

  const handleChangeReceiveDirection = (value: SelectItem) => {
    const currentObj = filterItems.find(el => isObjectEqual(el.from, value))
    if (currentObj) {
      setDisabledChangeDirectionButton(false)
    } else {
      setDisabledChangeDirectionButton(true)
    }
    dispatch(setReceiveCategorySelectedItem(value))
  }

  const handleChangeReceiveCategoryDirection = (value: string) => {
    dispatch(setReceiveCategoryDirection(value as DirectionType))
  }
  const handleChangeGiveCategoryDirection = (value: string) => {
    dispatch(setGiveCategoryDirection(value as DirectionType))
  }

  const handleSwapDirection = () => {
    if (receiveCategorySelectedItem && giveCategorySelectedItem) {
      handleChangeGiveDirection(receiveCategorySelectedItem)

      dispatch(setGiveCategorySelectedItem(receiveCategorySelectedItem))
      dispatch(setReceiveCategorySelectedItem(giveCategorySelectedItem))

      dispatch(setReceiveCategoryDirection("Все"))
      dispatch(setGiveCategoryDirection("Все"))
    }

    if (giveCategoryInputValue && receiveCategoryInputValue) {
      dispatch(setReceiveCategoryInputValue(giveCategoryInputValue))
      dispatch(setGiveCategoryInputValue(receiveCategoryInputValue))
    }
  }

  useEffect(() => {
    dispatch(fetchFilterData())
    dispatch(fetchDirectionsData())
  }, [dispatch])

  const handleChangeGiveInputValue = (value: string) => {
    const convertedValue = String((Number(value) * CURRENCY_COEFFICIENT).toFixed(2))

    dispatch(setGiveCategoryInputValue(value))
    dispatch(setReceiveCategoryInputValue(convertedValue))
  }
  const handleChangeReceiveInputValue = (value: string) => {
    const convertedValue = String((Number(value) / CURRENCY_COEFFICIENT).toFixed(2))

    dispatch(setReceiveCategoryInputValue(value))
    dispatch(setGiveCategoryInputValue(convertedValue))
  }

  return (
    <div className={styles.main}>
      <Categories
        allDirections={allDirections}
        selectedCurrency={giveCategorySelectedItem}
        directions={directions}
        filterCategoryItems={directionsItems}
        currentDirection={giveCategoryDirection}
        inputValue={giveCategoryInputValue}
        title="Отдаёте"
        onChangeInputValue={handleChangeGiveInputValue}
        onChangeSelectedDirection={handleChangeGiveDirection}
        onChangeCurrentDirection={handleChangeGiveCategoryDirection}
      />
      <button
        type="button"
        onClick={handleSwapDirection}
        disabled={disalbedChangeDirectionButton}
        className={styles.swapButton}
      >
        ⇅ - Поменять местами
      </button>
      <Categories
        allDirections={allDirections}
        selectedCurrency={receiveCategorySelectedItem}
        directions={directions}
        inputValue={receiveCategoryInputValue}
        currentDirection={receiveCategoryDirection}
        filterCategoryItems={receiveCategoryItems}
        onChangeInputValue={handleChangeReceiveInputValue}
        onChangeSelectedDirection={handleChangeReceiveDirection}
        onChangeCurrentDirection={handleChangeReceiveCategoryDirection}
        title="Получаете"
      />
    </div>
  )
}
