import { Box } from '@chakra-ui/react'
import { MainGrid } from '@sbc/MainGrid/MainGrid'
import React from 'react'

const App = () => {
  return (
    <Box h="100vh">
      <MainGrid {...{} as any}/>
    </Box>
  )
}

export default App
