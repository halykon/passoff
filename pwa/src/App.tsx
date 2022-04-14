import { Box } from '@chakra-ui/react'
import { MainGrid } from '@sbc/MainGrid/MainGrid'
import { useData } from '@sbhooks/data'
import React from 'react'

const App = () => {
  const { data } = useData()
  return (
    <Box h="100vh">
      <MainGrid list={data ?? []}/>
    </Box>
  )
}

export default App
