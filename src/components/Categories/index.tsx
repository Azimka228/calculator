import styles from "./Categories.module.scss"

import {FC, useEffect, useState} from "react"

import {Input, RadioSelect, Select} from "@app/shared/ui"
import {SelectItem} from "@app/shared/ui/Select"

interface CategoriesProps {
  title: string
  filterCategoryItems?: SelectItem[]
  selectedCurrency?: SelectItem
  directions: string[]
  currentDirection?: string
  onChangeCurrentDirection?: (value: string) => void
  onChangeSelectedDirection?: (value: SelectItem) => void
}

type CurrenciesInCategoryType = Record<string, string[]>

const currenciesInCategory: CurrenciesInCategoryType = {
  Все: [],
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
  const [currentFilterCategoryItems, setCurrentFilterCategoryItems] = useState<SelectItem[]>()

  const handleSelectedDirectionChange = (value: string) => {
    const newSelectedDirections = filterCategoryItems?.filter(
      currency =>
        value === "Все" || currenciesInCategory[value as keyof CurrenciesInCategoryType].includes(currency.code)
    )
    setCurrentFilterCategoryItems(newSelectedDirections ?? [])
    if (onChangeCurrentDirection) {
      onChangeCurrentDirection(value)
    }
  }

  const handleChangeSelectedFilter = (value: SelectItem) => {
    if (onChangeSelectedDirection) {
      onChangeSelectedDirection(value)
    }
  }

  useEffect(() => {
    if (currentDirection) {
      handleSelectedDirectionChange(currentDirection)
    }
  }, [currentDirection])

  useEffect(() => {
    if (filterCategoryItems) {
      setCurrentFilterCategoryItems(filterCategoryItems)
    }
  }, [filterCategoryItems])

  return (
    <div className={styles.main}>
      <span className={styles.title}>{title}</span>
      <RadioSelect data={directions} onChange={handleSelectedDirectionChange} defaultValue={currentDirection} />
      <div className={styles.categories}>
        <Input type="number" placeholder="0 - 999999" />
        <Select
          data={currentFilterCategoryItems}
          onChange={handleChangeSelectedFilter}
          defaultValue={selectedCurrency}
        />
      </div>
    </div>
  )
}
