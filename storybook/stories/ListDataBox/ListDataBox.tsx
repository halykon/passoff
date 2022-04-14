import React, { useRef } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Stack, useBoolean, useToast } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import copy from 'copy-to-clipboard'

export interface IListData {
  id: string
  name: string
  username: string
}

interface IListDataBoxProps {
  listData: IListData
}

export const ListDataBox: React.FC<IListDataBoxProps> = ({ listData }) => {
  const [isEditing, setIsEditing] = useBoolean()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const toast = useToast()

  useHotkeys('right', () => buttonRef.current?.focus())
  useHotkeys('u', () => {
    copy(listData.username)
    toast({
      title: 'Copied!',
      description: 'Username copied to clipboard',
    })
  }, [listData.username])

  return (
    <Stack spacing={5}>
      <Stack direction="row" justify="end">
        <Button className="selectable" ref={buttonRef} onClick={setIsEditing.toggle}>Edit</Button>
        <Button colorScheme="red">Delete</Button>
      </Stack>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup>
          <Input disabled={!isEditing} cursor="text !important" variant="filled" id="name" type="text" value={listData.name}/>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <InputGroup>
          <Input disabled={!isEditing} cursor="text !important" variant="filled" id="username" type="text" value={listData.username}/>
          <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" pr="15px" opacity=".35">
            <Box>copy <Kbd>U</Kbd></Box>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Stack>
  )
}

ListDataBox.defaultProps = {
  listData: {
    id: '',
    name: 'Twitter',
    username: 'undefined_prop',
  },
}
