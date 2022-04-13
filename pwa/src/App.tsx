import React, { useMemo, useState } from 'react'
import { Search } from '@sbc/Search/Search'
import { ListItem } from '@sbc/ListItem/ListItem'
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react'
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook'

const exampleList = [
  {
    name: 'Google',
    username: 'johann@objekt.stream',
  },
  {
    name: 'Facebook',
    username: 'johann@objekt.stream',
  },
  {
    name: 'Twitter',
    username: 'johann@objekt.stream',
  },
  {
    name: 'Instagram',
    username: 'johann@objekt.stream',
  },
]

const App = () => {
  const parentRef = useArrowKeyNavigationHook({ selectors: 'button,input' })
  const [selectedItem, setSelectedItem] = useState<typeof exampleList[0] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const filteredList = useMemo(() => exampleList.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.username.toLowerCase().includes(searchValue.toLowerCase())), [searchValue])

  return (
    <Flex h="100vh" direction="column">
      <Grid h="100%" templateColumns="repeat(2, 1fr)">
        <GridItem ref={parentRef}>
          <Search value={searchValue} onValueChange={setSearchValue}/>
          {filteredList.map((item, index) => (
            <ListItem key={`pw-list-item-${item.name}`} onSelect={() => setSelectedItem(item)} name={item.name} username={item.username}/>
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
