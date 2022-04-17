import { Box } from '@chakra-ui/react'
import { CryptoLock } from '@sbc/CryptoLock/CryptoLock'
import { MainGrid } from '@sbc/MainGrid/MainGrid'
import React from 'react'

const App = () => {
  return (
    <Box h="100vh">
      <CryptoLock>
        <MainGrid/>
      </CryptoLock>
    </Box>
  )
}

export default App
