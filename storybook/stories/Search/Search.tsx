import React, { useRef } from 'react'
import { Box, Button, ButtonGroup, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useHotkeys } from 'react-hotkeys-hook'

interface ISearchProps {
  value: string
  onValueChange: (value: string) => void
}

export const Search: React.FC<ISearchProps> = ({ value, onValueChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useHotkeys('ctrl+space', () => {
    inputRef.current?.focus()
  })

  return (
    <Box>
      {/* Input */}
      <InputGroup>
        <InputLeftElement pointerEvents="none" h="100%">
          <SearchIcon/>
        </InputLeftElement>
        <Input onFocus={onOpen} onBlur={onClose} ref={inputRef} size="lg" variant="filled" placeholder="Search Passwords" borderRadius={0} value={value} onChange={e => onValueChange(e.target.value)}/>
        <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" pr="30px" opacity=".35">
          <Box>press <Kbd>ctrl</Kbd> + <Kbd>space</Kbd> to search</Box>
        </InputRightElement>
      </InputGroup>
      {/* Popover */}
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
            <PopoverCloseButton/>
            <PopoverBody>
              navigate with <Kbd>↓</Kbd> and <Kbd>↑</Kbd>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>

  )
}

Search.defaultProps = {

}
