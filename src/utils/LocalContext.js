import React, { useState, useContext } from "react"

export const LocalContext = React.createContext({})
export const LocalProvider = LocalContext.Provider
export const LocalConsumer = LocalContext.Consumer

export default ({ children }) => {
  const [localState, setLocalState] = useState({
    isSideBarOpen: false,
  })
  return (
    <LocalProvider value={{ localState, setLocalState }}>
      {children}
    </LocalProvider>
  )
}
