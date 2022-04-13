import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface ISearchProps {

}

export const Search: React.FC<ISearchProps> = () => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon/>
      </InputLeftElement>
      <Input variant="filled" placeholder="Search Passwords" borderRadius={0}/>
    </InputGroup>
  )
}

Search.defaultProps = {

}
