import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({ children }) => {
  const [search, setSearch] = useState('')
  const [signin,setSignin]=useState(false)

  const [category,setCategory]=useState('')

  return <AppContext.Provider value={{ category,setCategory,signin,setSignin }}>
    {children}
  </AppContext.Provider>
}

export default ParentContext