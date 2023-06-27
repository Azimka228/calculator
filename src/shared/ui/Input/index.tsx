import styles from "./Input.module.scss"

import {FC, InputHTMLAttributes, memo} from "react"

import cn from "classnames"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input: FC<InputProps> = memo(({className, ...rest}) => {
  const mainClasses = cn(className, styles.main)

  return <input {...rest} className={mainClasses} />
})

Input.displayName = "Input"
