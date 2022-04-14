import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Show, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

interface ISearchProps {
  value: string
  onValueChange: (value: string) => void
}

export const Search: React.FC<ISearchProps> = ({ value, onValueChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
          <Input onFocus={onOpen} onBlur={onClose} ref={inputRef} size="lg" variant="filled" placeholder="Search Passwords" borderRadius={0} value={value} onChange={e => onValueChange(e.target.value.trimStart())}/>
          <Show above="lg">
            <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" pr="15px" opacity=".35">
              <Box>press <Kbd>space</Kbd> to search</Box>
            </InputRightElement>
          </Show>
        </InputGroup>
        <IconButton borderRadius="none" size="lg" aria-label="add" icon={<AddIcon/>}/>
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
