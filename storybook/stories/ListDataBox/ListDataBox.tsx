import { RepeatIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Center, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Kbd, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Stack, Tooltip, useBoolean, useToast } from '@chakra-ui/react'
import copy from 'copy-to-clipboard'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import type { IData } from '../../hooks/data'
import { useData } from '../../hooks/data'

export interface IListData extends IData {}

interface IListDataBoxProps {
  listData: IListData
  onUnselect?: () => void
  onReselect?: (id: string) => void
}

export const ListDataBox: React.FC<IListDataBoxProps> = ({ listData, onUnselect, onReselect }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const toast = useToast()
  const { setDataById, delDataById, addData, getDataById } = useData()
  const [edited, setEdited] = useState<IListData>(listData)
  const [showPassword, setShowPassword] = useBoolean(false)
  const isNewEntry = useMemo(() => !edited.id && !listData.id, [listData, edited])
  const [isEditing, setIsEditing] = useBoolean(isNewEntry)

  const onEdit = useCallback((key: keyof IListData) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setEdited({ ...edited, [key]: event.target.value })
    }
  }, [edited, setEdited])

  const onCancel = useCallback(() => {
    setIsEditing.off()
    if (listData.id) {
      setEdited(listData)
    }

    const data = getDataById?.(edited.id)
    if (data) setEdited(data)
  }, [setIsEditing, setEdited, listData, getDataById, edited.id])

  const onSave = useCallback(() => {
    setIsEditing.off()

    if (isNewEntry) {
      const id = addData?.(edited)
      if (id) setEdited({ ...edited, id })
    } else {
      setDataById?.(listData.id, edited)
    }

    toast({
      title: 'Saved',
      description: 'Your changes have been saved',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }, [edited, listData, setDataById, toast, setIsEditing, addData, isNewEntry])

  const copyData = useCallback((key: keyof IListData) => {
    return () => {
      const data = edited[key]
      if (data) {
        copy(data)
        toast({
          description: `${key} copied to clipboard`,
          status: 'success',
        })
      }
    }
  }, [edited, toast])

  const onDelete = useCallback(() => {
    if (!isNewEntry) delDataById?.(listData.id)
    onUnselect?.()
    toast({
      title: 'Deleted',
      description: 'Your item has been deleted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }, [toast, listData, delDataById, onUnselect, isNewEntry])

  useHotkeys('right', () => buttonRef.current?.focus())
  useHotkeys('u', copyData('username'), [copyData])
  useHotkeys('p', copyData('password'), [copyData])

  return (
    <Box>
      <Center w="100%" h="150px" bg="primary.600">
        <Avatar size="xl" name={edited.name}/>
      </Center>
      <Stack spacing={5} padding={5}>
        <Stack direction="row" justify="space-between">
          <Stack direction="row">
            {isEditing && <Button className="selectable" disabled={!edited.name} onClick={onSave}>Save</Button>}
            {!isNewEntry && <Button className="selectable" ref={buttonRef} variant={isEditing ? 'ghost' : 'solid'} onClick={isEditing ? onCancel : setIsEditing.on}>{isEditing ? 'Cancel' : 'Edit'}</Button>}
          </Stack>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow/>
                <PopoverHeader fontWeight="bold">Are you sure?</PopoverHeader>
                <PopoverCloseButton/>
                <PopoverBody>
                  <Box>Are you sure about this?</Box>
                  <Box>This action cannot be undone.</Box>
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="end"><Button colorScheme="red" onClick={onDelete}>Yes, I am sure.</Button></PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        </Stack>
        <FormControl bg="gray.800" p="5px" borderRadius="md">
          <FormLabel pl="4px" htmlFor="name">Name</FormLabel>
          <InputGroup>
            <Input className="selectable" disabled={!isEditing} cursor="text !important" variant="filled" id="name" type="text" onChange={onEdit('name')} value={edited.name}/>
          </InputGroup>
        </FormControl>
        <FormControl bg="gray.800" p="5px" borderRadius="md">
          <FormLabel pl="4px" htmlFor="username">Username</FormLabel>
          <InputGroup>
            <Input className="selectable" disabled={!isEditing} cursor="text !important" variant="filled" id="username" type="text" onChange={onEdit('username')} value={edited.username}/>
            <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" opacity=".35">
              {!isNewEntry && <Button pointerEvents="all" onClick={copyData('username')} variant="ghost" fontWeight="normal" gap="5px">copy <Kbd>U</Kbd></Button>}
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl bg="gray.800" p="5px" borderRadius="md">
          <FormLabel pl="4px" htmlFor="password">
            <Stack direction="row" spacing="1">
              <Box>Password</Box>
              {isEditing && (
                <Popover placement="top">
                  <PopoverTrigger>
                    <IconButton variant="ghost" size="xs" aria-label="regenerate password" icon={<RepeatIcon/>}/>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                    <PopoverHeader>Generate New Password</PopoverHeader>
                    <PopoverBody>This ui is not done yet.</PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            </Stack>
          </FormLabel>
          <InputGroup>
            <Input className="selectable" disabled={!isEditing} cursor="text !important" variant="filled" id="password" onFocus={setShowPassword.on} onBlur={setShowPassword.off} type={showPassword ? 'text' : 'password'} onChange={onEdit('password')} value={edited.password}/>
            <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" opacity=".35">
              {!isNewEntry && <Button pointerEvents="all" onClick={copyData('password')} variant="ghost" fontWeight="normal" gap="5px">copy <Kbd>P</Kbd></Button>}
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Stack>
    </Box>
  )
}

ListDataBox.defaultProps = {
  listData: {
    id: '',
    name: 'Twitter',
    username: 'undefined_prop',
    password: 'supersecret42',
  },
}
