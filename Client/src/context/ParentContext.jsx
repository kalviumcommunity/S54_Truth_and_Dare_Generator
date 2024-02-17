import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({ children }) => {
  const [search, setSearch] = useState('')
  const [signup,setSignup]=useState(false)

  const [category,setCategory]=useState('')

  return <AppContext.Provider value={{ category,setCategory }}>
    {children}
  </AppContext.Provider>
}

export default ParentContext