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
  setGiveCategorySelectedItem,
  setReceiveCategoryDirection,
  setReceiveCategoryItems,
  setReceiveCategorySelectedItem,
} from "@app/store/slices/filterSlice"
import type {DirectionType} from "@app/store/slices/filterSlice"

export const Calculator = () => {
  const dispatch = useAppDispatch()

  const directions = useAppSelector(state => state.filter.directions)

  const giveCategoryDirection = useAppSelector(state => state.filter.giveCategory.direction)
  const giveCategorySelectedItem = useAppSelector(state => state.filter.giveCategory.selectedItem)

  const receiveCategoryDirection = useAppSelector(state => state.filter.receiveCategory.direction)
  const receiveCategorySelectedItem = useAppSelector(state => state.filter.receiveCategory.selectedItem)
  const receiveCategoryItems = useAppSelector(state => state.filter.receiveCategory.items)

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
  }

  useEffect(() => {
    dispatch(fetchFilterData())
    dispatch(fetchDirectionsData())
  }, [dispatch])

  return (
    <div className={styles.main}>
      <Categories
        selectedCurrency={giveCategorySelectedItem}
        directions={directions}
        filterCategoryItems={directionsItems}
        currentDirection={giveCategoryDirection}
        title="Отдаёте"
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
        selectedCurrency={receiveCategorySelectedItem}
        directions={directions}
        currentDirection={receiveCategoryDirection}
        filterCategoryItems={receiveCategoryItems}
        onChangeSelectedDirection={handleChangeReceiveDirection}
        onChangeCurrentDirection={handleChangeReceiveCategoryDirection}
        title="Получаете"
      />
    </div>
  )
}
