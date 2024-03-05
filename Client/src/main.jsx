import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ParentContext from './context/ParentContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ChakraProvider>
      <ParentContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ParentContext>
    </ChakraProvider>
  </>
)
