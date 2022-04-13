import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {defaultTheme, GlobalStyle} from '../../storybook/helper/theme'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme(defaultTheme)

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
