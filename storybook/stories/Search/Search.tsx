import React, { useRef } from 'react'
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Kbd } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useHotkeys } from 'react-hotkeys-hook'

interface ISearchProps {
  value: string
  onValueChange: (value: string) => void
}

export const Search: React.FC<ISearchProps> = ({ value, onValueChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useHotkeys('ctrl+space', () => {
    inputRef.current?.focus()
  })

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" h="100%">
        <SearchIcon/>
      </InputLeftElement>
      <Input ref={inputRef} size="lg" variant="filled" placeholder="Search Passwords" borderRadius={0} value={value} onChange={e => onValueChange(e.target.value)}/>
      <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" pr="30px" opacity=".35">
        <Box>press <Kbd>ctrl</Kbd> + <Kbd>space</Kbd> to search</Box>
      </InputRightElement>
    </InputGroup>
  )
}

Search.defaultProps = {

}
