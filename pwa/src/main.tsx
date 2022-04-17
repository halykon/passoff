import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { PwaProviders } from '@sbh/providers'
import { defaultTheme, GlobalStyle } from '@sbh/theme'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const theme = extendTheme(defaultTheme)

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <ChakraProvider theme={theme}>
      <PwaProviders>
        <App/>
      </PwaProviders>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
