"use client"

import styles from "./RadioSelect.module.scss"

import React, {FC, useEffect, useState} from "react"

import cn from "classnames"

interface iRadioSelectProps {
  data: string[]
  onChange?: (value: string) => void
  defaultValue?: string
}

export const RadioSelect: FC<iRadioSelectProps> = ({data, onChange, defaultValue}) => {
  const [selected, setSelected] = useState<string>()

  useEffect(() => {
    if (defaultValue && data.includes(defaultValue)) {
      setSelected(defaultValue)
    }
  }, [defaultValue, data])

  const mappedItems = data.map((el, index) => {
    const handleSetSelected = () => {
      setSelected(el)
      if (onChange) {
        onChange(el)
      }
    }
    const buttonClasses = cn(styles.item, {[styles.active]: selected === el})

    return (
      <button type="button" key={index} className={buttonClasses} onClick={handleSetSelected}>
        {el}
      </button>
    )
  })
  const mainClasses = cn(styles.main)

  return <div className={mainClasses}>{mappedItems}</div>
}
