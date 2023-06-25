import styles from "./Select.module.scss"

import React, {FC} from "react"

interface selectItem {
  code: string
  name: string
}

interface SelectProps {
  data: selectItem[]
}

export const Select: FC<SelectProps> = () => <div className={styles.main} />
