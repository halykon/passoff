import { AddIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Show, useDisclosure } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React, { useRef } from 'react'
import CSVReader from 'react-csv-reader'
import { useHotkeys } from 'react-hotkeys-hook'
import type { MykiExportPassword, MykiExportPaymentCard } from '../../types/imports/myki'

interface ISearchProps {
  value: string
  onValueChange: (value: string) => void
  onCreateNew: () => void
  // TODO: Add more password sources
  onImport: (data: MykiExportPassword[]) => void
}

export const Search: React.FC<ISearchProps> = ({ value, onValueChange, onCreateNew, onImport }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const importRef = useRef<HTMLInputElement>(null)

  useHotkeys('space', () => inputRef.current?.focus(), { keyup: true })
  useHotkeys('ctrl+space', () => inputRef.current?.focus())

  return (
    <Box>
      {/* Input */}
      <Flex>
        <InputGroup>
          <InputLeftElement pointerEvents="none" h="100%">
            <SearchIcon/>
          </InputLeftElement>
          <Input className="selectable" onFocus={onOpen} onBlur={onClose} ref={inputRef} size="lg" variant="filled" placeholder="Search Passwords" borderRadius={0} value={value} onChange={e => onValueChange(e.target.value.trimStart())}/>
          <Show above="lg">
            <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" pr="15px" opacity=".35">
              <Box>press <Kbd>space</Kbd> to search</Box>
            </InputRightElement>
          </Show>
        </InputGroup>
        <IconButton onClick={onCreateNew} borderRadius="none" size="lg" aria-label="add" icon={<AddIcon/>}/>
        <Menu>
          <MenuButton as={IconButton} borderRadius="none" aria-label="menu" size="lg" icon={<HamburgerIcon/>}/>
          <MenuList>
            <MenuItem cursor="pointer" as="label" htmlFor="csv-input" icon={<AddIcon/>}>
              Import from CSV
              <CSVReader
                strict
                inputRef={importRef}
                inputId="csv-input"
                inputStyle={{ display: 'none', pointerEvents: 'all' }}
                parserOptions={{ header: true }}
                onFileLoaded={(data: MykiExportPassword[]) => {
                  onImport(data)
                  if (importRef.current?.value) {
                    importRef.current.value = ''
                  }
                }}
              />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* Popover */}
      <Show above="lg">
        <Popover
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom-end"
          closeOnBlur={false}
          returnFocusOnClose={false}
          initialFocusRef={inputRef}
        >
          <PopoverTrigger>
            <Box/>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow/>
              <PopoverBody textAlign="center">
                navigate with <Kbd>⬇︎</Kbd> and <Kbd>⬆︎</Kbd>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Show>
    </Box>

  )
}

Search.defaultProps = {

}
