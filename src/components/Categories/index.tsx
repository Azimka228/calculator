import styles from "./Categories.module.scss"

import {FC, useEffect, useState} from "react"

import {Input, RadioSelect, Select} from "@app/shared/ui"
import {selectItem} from "@app/shared/ui/Select"

interface CategoriesProps {
  title: string
  filterCategoryItems: selectItem[]
  selectedCurrency?: selectItem
  directions: string[]
  currentDirection?: string
  onChangeCurrentDirection?: (value: string) => void
  onChangeSelectedDirection?: (value: selectItem) => void
}

type CurrenciesInCategoryType = Record<string, string[]>

const currenciesInCategory: CurrenciesInCategoryType = {
  Все: ["BTC", "ETH", "CASHUSD", "CASHRUB", "ACRUB", "SBERRUB", "TCSBRUB", "USDTTRC"],
  Криптовалюты: ["BTC", "ETH", "USDTTRC"],
  Банки: ["ACRUB", "SBERRUB", "TCSBRUB"],
  Наличные: ["CASHUSD", "CASHRUB"],
}

export const Categories: FC<CategoriesProps> = ({
  title,
  directions,
  filterCategoryItems,
  selectedCurrency,
  onChangeSelectedDirection,
  currentDirection,
  onChangeCurrentDirection,
}) => {
  const [currentFilterCategoryItems, setCurrentFilterCategoryItems] = useState<selectItem[]>(filterCategoryItems)

  const handleChangeSelectedDirections = (value: string) => {
    const newSelectedDirections = filterCategoryItems.filter(currency =>
      currenciesInCategory[value as keyof CurrenciesInCategoryType].includes(currency.code)
    )
    setCurrentFilterCategoryItems(newSelectedDirections)
    if (onChangeCurrentDirection) {
      onChangeCurrentDirection(value)
    }
  }

  const handleChangeSelectedFilter = (value: selectItem) => {
    if (onChangeSelectedDirection) {
      onChangeSelectedDirection(value)
    }
  }

  useEffect(() => {
    if (currentDirection) {
      handleChangeSelectedDirections(currentDirection)
    }
  }, [currentDirection])

  useEffect(() => {
    setCurrentFilterCategoryItems(filterCategoryItems)
  }, [filterCategoryItems])

  return (
    <div className={styles.main}>
      <span className={styles.title}>{title}</span>
      <RadioSelect data={directions} onChange={handleChangeSelectedDirections} defaultValue={currentDirection} />
      <div className={styles.categories}>
        <Input type="number" />
        <Select
          data={currentFilterCategoryItems}
          onChange={handleChangeSelectedFilter}
          defaultValue={selectedCurrency}
        />
      </div>
    </div>
  )
}
