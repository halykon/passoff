import React, { useRef } from 'react'
import { Box, Button, FormControl, FormLabel, Input, Stack, useBoolean } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'

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
  useHotkeys('right', () => buttonRef.current?.focus())

  return (
    <Stack spacing={5}>
      <Stack direction="row" justify="end">
        <Button className="selectable" ref={buttonRef} onClick={setIsEditing.toggle}>Edit</Button>
        <Button colorScheme="red">Delete</Button>
      </Stack>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input disabled={!isEditing} cursor="text !important" variant="filled" id="name" type="text" value={listData.name}/>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input disabled={!isEditing} cursor="text !important" variant="filled" id="username" type="text" value={listData.username}/>
      </FormControl>
    </Stack>
  )
}

ListDataBox.defaultProps = {

}
