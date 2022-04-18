import { Center, Grid, GridItem, Heading, Show } from '@chakra-ui/react'
import type { MutableRefObject } from 'react'
import React, { useCallback, useMemo, useState } from 'react'
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook'
import { useHotkeys } from 'react-hotkeys-hook'
import { useData } from '../../hooks/data'
import type { IListData } from '../ListDataBox/ListDataBox'
import { ListDataBox } from '../ListDataBox/ListDataBox'
import { ListItem } from '../ListItem/ListItem'
import { Search } from '../Search/Search'

interface IMainGridProps {

}

export const MainGrid: React.FC<IMainGridProps> = () => {
  const { data: list = [], searchData } = useData()

  const listArrowNavRef: MutableRefObject<HTMLDivElement> = useArrowKeyNavigationHook({ selectors: '.selectable' })
  const itemArrowNavRef: MutableRefObject<HTMLDivElement> = useArrowKeyNavigationHook({ selectors: '.selectable' })

  const [selectedItem, setSelectedItem] = useState<IListData | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const filteredList = useMemo(() => searchValue && searchData ? searchData(searchValue) : list, [list, searchValue, searchData])

  const onCreateNew = useCallback(() => {
    setSelectedItem({
      id: '',
      name: '',
      username: '',
      password: '',
    })
  }, [setSelectedItem])

  useHotkeys('left', () => {
    const activeListItem = listArrowNavRef.current.querySelector<HTMLButtonElement>('[data-active]')
    if (activeListItem) return activeListItem.focus()

    const searchInput = listArrowNavRef.current.querySelector<HTMLInputElement>('input')
    if (searchInput) return searchInput.focus()
  })

  return (
    <Grid h="100%" templateColumns="repeat(2, 1fr)">
      <GridItem ref={listArrowNavRef} colSpan={[2, 2, 1]}>
        <Search value={searchValue} onValueChange={setSearchValue} onCreateNew={onCreateNew}/>
        {filteredList.map(item => (
          <ListItem
            key={`pw-list-item-${item.id}`}
            onSelect={() => setSelectedItem(item)}
            isActive={selectedItem?.id === item.id}
            name={item.name}
            username={item.username}
            image={item.image}
          />
        ))}
      </GridItem>
      <Show above="md">
        <GridItem bg="blackAlpha.400" ref={itemArrowNavRef}>
          {selectedItem
            ? (
              <ListDataBox key={selectedItem.id} listData={selectedItem} onUnselect={() => setSelectedItem(null)}/>
              )
            : (
              <Center h="100%">
                <Heading size="xl" opacity={0.1}>Oi. No item selected</Heading>
              </Center>
              )}
        </GridItem>
      </Show>
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
