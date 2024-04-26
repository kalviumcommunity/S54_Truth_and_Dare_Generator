import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({ children }) => {
  const [userData,setUserData] = useState({})
  const [signin,setSignin]=useState(false)
  const [userId,setUserId]=useState(null)
  const [category,setCategory]=useState('')

  return <AppContext.Provider value={{ userId,setUserId,category,setCategory,signin,setSignin,setUserData,userData }}>
    {children}
  </AppContext.Provider>
}

export default ParentContext