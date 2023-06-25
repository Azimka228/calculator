import styles from "./Input.module.scss"

import React, {FC, InputHTMLAttributes} from "react"

import cn from "classnames"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string
}

export const Input: FC<InputProps> = ({className, ...rest}) => {
  const mainClasses = cn(className, styles.main)
  return <input {...rest} className={mainClasses} />
}
