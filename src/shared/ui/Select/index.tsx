import styles from "./Select.module.scss"

import {FC, useEffect, useRef, useState} from "react"

import cn from "classnames"

import {useOutsideClick} from "@app/shared/hooks"
import {isObjectEqual} from "@app/shared/lib"

export interface selectItem {
  code: string
  name: string
}

interface SelectProps {
  data: selectItem[]
  onChange?: (value: selectItem) => void
  defaultValue?: selectItem
}

export const Select: FC<SelectProps> = ({data, onChange, defaultValue}) => {
  const [selected, setSelected] = useState<selectItem>(data[0])

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  const mappedItems = data.map((el, index) => {
    const handleClickItem = () => {
      if (onChange) {
        onChange(el)
      }
      setSelected(el)
      setIsOpen(prevState => !prevState)
    }

    const mainClasses = cn(styles.item, {
      [styles.active]: isObjectEqual(el, selected),
    })

    return (
      <button type="button" key={index} onClick={handleClickItem} className={mainClasses}>
        {el.name}
      </button>
    )
  })

  const handleClickHeader = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  const mainRef = useRef<HTMLDivElement | null>(null)

  useOutsideClick(mainRef, handleCloseMenu)
  return (
    <div className={styles.main} ref={mainRef}>
      <button type="button" onClick={handleClickHeader} className={styles.header} disabled={data.length === 0}>
        {selected?.name || "Выбрать"}
        {isOpen ? "▲" : " ▼ "}
      </button>
      {isOpen && <div className={styles.cards}>{mappedItems}</div>}
    </div>
  )
}
