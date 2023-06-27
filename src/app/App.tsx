import styles from "./App.module.scss"

import {Calculator} from "../components"

export const App = () => (
  <div className={styles.main}>
    <Calculator />
  </div>
)
