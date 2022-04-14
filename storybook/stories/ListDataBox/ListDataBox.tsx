import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Stack, useBoolean, useToast } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import copy from 'copy-to-clipboard'
import type { IData } from '../../hooks/data'
import { useData } from '../../hooks/data'

export interface IListData extends IData {}

interface IListDataBoxProps {
  listData: IListData
}

export const ListDataBox: React.FC<IListDataBoxProps> = ({ listData }) => {
  const [isEditing, setIsEditing] = useBoolean()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const toast = useToast()
  const { setDataById } = useData()
  const [edited, setEdited] = useState<Partial<IListData>>(listData)
  const [showPassword, setShowPassword] = useBoolean(false)

  const onEdit = useCallback((key: keyof IListData) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setEdited({ ...edited, [key]: event.target.value })
    }
  }, [edited, setEdited])

  const onCancel = useCallback(() => {
    setIsEditing.off()
    setEdited(listData)
  }, [setIsEditing, setEdited, listData])

  const onSave = useCallback(() => {
    setIsEditing.off()
    setDataById?.(listData.id, edited)
    toast({
      title: 'Saved',
      description: 'Your changes have been saved',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }, [edited, listData, setDataById, toast, setIsEditing])

  useHotkeys('right', () => buttonRef.current?.focus())

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

  useHotkeys('u', copyData('username'), [listData.username])
  useHotkeys('p', copyData('password'), [listData.password])

  return (
    <Stack spacing={5}>
      <Stack direction="row" justify="space-between">
        <Stack direction="row">
          {isEditing && <Button className="selectable" onClick={onSave}>Save</Button>}
          <Button className="selectable" ref={buttonRef} variant={isEditing ? 'ghost' : 'solid'} onClick={isEditing ? onCancel : setIsEditing.on}>{isEditing ? 'Cancel' : 'Edit'}</Button>
        </Stack>
        <Button colorScheme="red">Delete</Button>
      </Stack>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup>
          <Input disabled={!isEditing} cursor="text !important" variant="filled" id="name" type="text" onChange={onEdit('name')} value={edited.name}/>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <InputGroup>
          <Input disabled={!isEditing} cursor="text !important" variant="filled" id="username" type="text" onChange={onEdit('username')} value={edited.username}/>
          <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" opacity=".35">
            <Button pointerEvents="all" onClick={copyData('username')} variant="ghost" fontWeight="normal" gap="5px">copy <Kbd>U</Kbd></Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="username">Password</FormLabel>
        <InputGroup>
          <Input disabled={!isEditing} cursor="text !important" variant="filled" id="username" onFocus={setShowPassword.on} onBlur={setShowPassword.off} type={showPassword ? 'text' : 'password'} onChange={onEdit('password')} value={edited.password}/>
          <InputRightElement pointerEvents="none" h="100%" w="100%" justifyContent="flex-end" opacity=".35">
            <Button pointerEvents="all" onClick={copyData('password')} variant="ghost" fontWeight="normal" gap="5px">copy <Kbd>P</Kbd></Button>
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
    password: 'supersecret42',
  },
}
