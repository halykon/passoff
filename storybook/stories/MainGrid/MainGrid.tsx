import { Center, Grid, GridItem, Heading } from '@chakra-ui/react'
import type { MutableRefObject } from 'react'
import React, { useMemo, useState } from 'react'
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook'
import { useHotkeys } from 'react-hotkeys-hook'
import type { IListData } from '../ListDataBox/ListDataBox'
import { ListDataBox } from '../ListDataBox/ListDataBox'
import { ListItem } from '../ListItem/ListItem'
import { Search } from '../Search/Search'

interface IMainGridProps {
  list: IListData[]
}

export const MainGrid: React.FC<IMainGridProps> = ({ list }) => {
  const listArrowNavRef: MutableRefObject<HTMLDivElement> = useArrowKeyNavigationHook({ selectors: 'button,input' })
  const itemArrowNavRef: MutableRefObject<HTMLDivElement> = useArrowKeyNavigationHook({ selectors: '.selectable,input' })

  const [selectedItem, setSelectedItem] = useState<IListData | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const filteredList = useMemo(() => list.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.username.toLowerCase().includes(searchValue.toLowerCase())), [searchValue, list])

  useHotkeys('left', () => {
    const activeListItem = listArrowNavRef.current.querySelector<HTMLButtonElement>('[data-active]')
    if (activeListItem) return activeListItem.focus()

    const searchInput = listArrowNavRef.current.querySelector<HTMLInputElement>('input')
    if (searchInput) return searchInput.focus()
  })

  return (
    <Grid h="100%" templateColumns="repeat(2, 1fr)">
      <GridItem ref={listArrowNavRef}>
        <Search value={searchValue} onValueChange={setSearchValue}/>
        {filteredList.map(item => (
          <ListItem
            key={`pw-list-item-${item.id}`}
            onSelect={() => setSelectedItem(item)}
            isActive={selectedItem?.id === item.id}
            name={item.name}
            username={item.username}
          />
        ))}
      </GridItem>
      <GridItem padding={5} bg="blackAlpha.400" ref={itemArrowNavRef}>
        {selectedItem
          ? (
            <ListDataBox key={selectedItem.id} listData={selectedItem} onUnselect={() => setSelectedItem(null)}/>
            )
          : (
            <Center h="100%">
              <Heading size="xl" opacity={0.1}>No item selected</Heading>
            </Center>
            )}
      </GridItem>
    </Grid>
  )
}

MainGrid.defaultProps = {
  list: [
    {
      id: '1',
      name: 'Google',
      username: 'johann@objekt.stream',
      password: 'supersecret42',
    },
    {
      id: '2',
      name: 'Facebook',
      username: 'johann@objekt.stream',
      password: 'supersecret42',
    },
    {
      id: '3',
      name: 'Twitter',
      username: 'undefined_prop',
      password: 'supersecret42',
    },
    {
      id: '4',
      name: 'Instagram',
      username: 'johann@objekt.stream',
      password: 'supersecret42',
    },
  ],
}
