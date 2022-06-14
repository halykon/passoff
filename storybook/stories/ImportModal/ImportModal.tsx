import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useData } from '../../hooks/data'
import type { MykiExportPassword } from '../../types/imports/myki'

interface IImportModalProps {
  data: MykiExportPassword[]
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const ImportModal: React.FC<IImportModalProps> = ({ data, isOpen, onClose, onOpen }) => {
  const [importing, setImporting] = useState(false)
  const { addBatch } = useData()
  const toast = useToast()

  const handleImport = useCallback(() => {
    setImporting(true)
    addBatch?.(data.map(({ nickname, password, url, username }) => ({ name: nickname, password, url, username })))
    setImporting(false)
    onClose()
    toast({
      title: 'Imported',
      description: `${data.length} items have been imported.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }, [data, onClose, toast])

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalContent>
        <ModalHeader>Importing from CSV</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          {importing
            ? (
              <Flex align="center">
                <Spinner mr="3"/>Importing {data.length} items.
              </Flex>
              )
            : (
              <Text>This action will import {data.length} items, do you want to proceed?</Text>
              )}
        </ModalBody>
        <ModalFooter>
          <Button disabled={importing} onClick={onClose} mr="3">Cancel</Button>
          <Button disabled={importing} colorScheme="teal" onClick={() => { setImporting(true); handleImport() }}>Proceed</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
