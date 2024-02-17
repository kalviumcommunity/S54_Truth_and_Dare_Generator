import { React, useState } from 'react'
import './App.css'
import ParentContext, { AppContext } from './context/ParentContext'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<h1>PAGE NOT FOUND</h1>}></Route>
      </Routes>
      <ParentContext />
    </>
  )
}

export default App