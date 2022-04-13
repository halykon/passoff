import React from 'react'
import { Search } from '@sbc/Search/Search'
import { ListItem } from '@sbc/ListItem/ListItem'
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react'
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook'

const exampleList = [
  {
    name: 'Google.com',
    username: 'johann@objekt.stream',
  },
  {
    name: 'Facebook.com',
    username: 'johann@objekt.stream',
  },
  {
    name: 'Twitter.com',
    username: 'johann@objekt.stream',
  },
  {
    name: 'Instagram.com',
    username: 'johann@objekt.stream',
  },
]

const App = () => {
  const parentRef = useArrowKeyNavigationHook({ selectors: 'button,input' })
  const [selectedItem, setSelectedItem] = React.useState<typeof exampleList[0] | null>(null)

  return (
    <Flex h="100vh" direction="column" ref={parentRef}>
      <Search/>
      <Grid
        h="100%"
        templateColumns="repeat(2, 1fr)"
      >
        <GridItem>
          {exampleList.map((item, index) => (
            <ListItem key={`pw-list-item-${index}`} onSelect={() => setSelectedItem(item)}/>
          ))}
        </GridItem>
        <GridItem padding={5} bg="gray.900">
          {selectedItem?.name}
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default App
