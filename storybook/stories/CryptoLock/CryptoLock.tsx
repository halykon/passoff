import { Box, Button, Center, Divider, Flex, Heading, Icon, PinInput, PinInputField, Stack } from '@chakra-ui/react'
import React from 'react'
import { useCrypto } from '../../hooks/crypto'
import { FaFingerprint, FaKey } from 'react-icons/fa'
import FocusLock from '@chakra-ui/focus-lock'
import useAsync from 'react-use/lib/useAsync'

interface ICryptoLockProps {

}

export const CryptoLock: React.FC<ICryptoLockProps> = ({ children }) => {
  const { registerBiometricAsync, biometricId, encryptedKey, setEncryptedKey, key, setKey, keyHash, passphraseDecrypt, passphraseEncrypt } = useCrypto()
  const [pin, setPin] = React.useState('')

  useAsync(async () => {
    if (!encryptedKey) return
    if (pin.length < 6) return
    if (!passphraseDecrypt) return

    const decryptedKey = await passphraseDecrypt(pin, encryptedKey).catch(() => null)
    if (decryptedKey) {
      setKey?.(decryptedKey)
    }
  }, [encryptedKey, pin, passphraseDecrypt, setKey])

  const pinInput = (
    <Stack direction="row">
      <PinInput variant="filled" type="alphanumeric" placeholder="●" size="xl" value={pin} onChange={setPin}>
        <PinInputField fontSize="2xl" bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
        <PinInputField fontSize="2xl" bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
        <PinInputField fontSize="2xl" bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
        <PinInputField fontSize="2xl" bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
        <PinInputField fontSize="2xl" bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
        <PinInputField fontSize="2xl" bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
      </PinInput>
    </Stack>
  )

  if (!encryptedKey && key) {
    return (
      <Center height="100%">
        <FocusLock>
          <Stack spacing="5">
            <Heading size="md" textAlign="center">Create New Pin</Heading>
            {pinInput}
            <Flex justify="space-between">
              <Button isDisabled={Boolean(biometricId)} color={biometricId ? 'primary.500' : 'inherit'} variant="ghost" onClick={() => registerBiometricAsync?.(key)}>
                <Stack direction="row">
                  <FaFingerprint/>
                  <Box>{biometricId ? 'Registered' : 'Register'} Biometric</Box>
                </Stack>
              </Button>
              <Button
                disabled={pin.length < 6 || !key}
                onClick={async () => {
                  const encrypted = await passphraseEncrypt?.(pin, key)
                  setEncryptedKey?.(encrypted)
                }}
              >
                <Stack direction="row">
                  <FaKey/>
                  <Box>Save Pin</Box>
                </Stack>
              </Button>
            </Flex>
            <Divider/>
            <Stack align="center">
              <Box>or</Box>
              <Button>Import Backup</Button>
            </Stack>
          </Stack>
        </FocusLock>
      </Center>
    )
  }

  if (!key) {
    return (
      <Center height="100%">
        <FocusLock>
          {pinInput}
        </FocusLock>
      </Center>
    )
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

CryptoLock.defaultProps = {

}
