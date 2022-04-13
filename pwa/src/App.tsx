import React from 'react'
import { Search } from '@sbc/Search/Search'
import { ListItem } from '@sbc/ListItem/ListItem'
import { Flex, Grid, GridItem } from '@chakra-ui/react'

const App = () => {
  return (
    <Flex h="100vh" direction="column">
      <Search/>
      <Grid
        h="100%"
        templateColumns="repeat(2, 1fr)"
      >
        <GridItem>
          <ListItem/>
        </GridItem>
        <GridItem padding={5} bg="gray.900">
          pw contents
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default App
