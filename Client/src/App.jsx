import { React, useState } from 'react'
import './App.css'
import ParentContext, { AppContext } from './context/ParentContext'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<h1>PAGE NOT FOUND</h1>}></Route>
        {/* <ChakraProvider> */}
          <Route path='/signup' element={<Signup />}></Route>
        {/* </ChakraProvider> */}
      </Routes>
      <ParentContext />
    </>
  )
}

export default App