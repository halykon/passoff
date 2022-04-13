import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { defaultTheme, GlobalStyle } from '@sbh/theme'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme(defaultTheme)

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
