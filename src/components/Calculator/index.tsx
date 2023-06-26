import styles from "./Calculator.module.scss"

import {useState} from "react"

import {Categories} from "../Categories/index"

import directionsItems from "@app/assets/directions.json"
import filterItems from "@app/assets/filter.json"
import {isObjectEqual} from "@app/shared/lib"
import {selectItem} from "@app/shared/ui/Select"

const directions: string[] = ["Все", "Криптовалюты", "Банки", "Наличные"]

export const Calculator = () => {
  const [giveCategorySelectedItem, setGiveCategorySelectedItem] = useState<selectItem>()
  const [giveCategoryDirection, setGiveCategoryDirection] = useState<string>(directions[0])

  const [receiveCategoryItems, setReceiveCategoryItems] = useState<selectItem[]>(directionsItems)
  const [receiveCategoryDirection, setReceiveCategoryDirection] = useState<string>(directions[0])
  const [receiveCategorySelectedItem, setReceiveCategorySelectedItem] = useState<selectItem>()

  const handleChangeGiveDirection = (value: selectItem) => {
    const currentObj = filterItems.find(el => isObjectEqual(el.from, value))

    if (currentObj) {
      setReceiveCategoryItems(currentObj.to)
    }

    setReceiveCategoryDirection("Все")
    setGiveCategorySelectedItem(value)
  }

  const [disalbedChangeDirectionButton, setDisabledChangeDirectionButton] = useState(true)

  const handleChangeReceiveDirection = (value: selectItem) => {
    const currentObj = filterItems.find(el => isObjectEqual(el.from, value))
    if (currentObj) {
      setDisabledChangeDirectionButton(false)
    } else {
      setDisabledChangeDirectionButton(true)
    }
    setReceiveCategorySelectedItem(value)
  }

  const handleChangeReceiveCategoryDirection = (value: string) => {
    setReceiveCategoryDirection(value)
  }
  const handleChangeGiveCategoryDirection = (value: string) => {
    setGiveCategoryDirection(value)
  }

  const handleSwapDirection = () => {
    if (receiveCategorySelectedItem) {
      setGiveCategorySelectedItem(receiveCategorySelectedItem)
      handleChangeGiveDirection(receiveCategorySelectedItem)
      setReceiveCategorySelectedItem(giveCategorySelectedItem)
      setReceiveCategoryDirection("Все")
      setGiveCategoryDirection("Все")
    }
  }

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
      <button type="button" onClick={handleSwapDirection} disabled={disalbedChangeDirectionButton}>
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
