import React, { useMemo, useState } from 'react'
import { Search } from '@sbc/Search/Search'
import { ListItem } from '@sbc/ListItem/ListItem'
import { Box, Button, Center, Divider, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Input, Stack } from '@chakra-ui/react'
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook'

const exampleList = [
  {
    id: '1',
    name: 'Google',
    username: 'johann@objekt.stream',
  },
  {
    id: '2',
    name: 'Facebook',
    username: 'johann@objekt.stream',
  },
  {
    id: '3',
    name: 'Twitter',
    username: 'johann@objekt.stream',
  },
  {
    id: '4',
    name: 'Instagram',
    username: 'johann@objekt.stream',
  },
]

const App = () => {
  const listArrowNavRef = useArrowKeyNavigationHook({ selectors: 'button,input' })
  const itemArrowNavRef = useArrowKeyNavigationHook({ selectors: 'input' })

  const [selectedItem, setSelectedItem] = useState<typeof exampleList[0] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const filteredList = useMemo(() => exampleList.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.username.toLowerCase().includes(searchValue.toLowerCase())), [searchValue])

  return (
    <Flex h="100vh" direction="column">
      <Grid h="100%" templateColumns="repeat(2, 1fr)">
        <GridItem ref={listArrowNavRef}>
          <Search value={searchValue} onValueChange={setSearchValue}/>
          {filteredList.map((item, index) => (
            <ListItem key={`pw-list-item-${item.id}`} onSelect={() => setSelectedItem(item)} isActive={selectedItem?.id === item.id} name={item.name} username={item.username}/>
          ))}
        </GridItem>
        <GridItem padding={5} bg="blackAlpha.400" ref={itemArrowNavRef}>
          {selectedItem
            ? (
              <Stack spacing={5}>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input variant="filled" id="name" type="text" value={selectedItem.name}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input variant="filled" id="username" type="text" value={selectedItem.username}/>
                </FormControl>
              </Stack>
              )
            : (
              <Center h="100%">
                <Heading size="xl" opacity={0.1}>No item selected</Heading>
              </Center>
              )}
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default App
