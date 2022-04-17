import { Box, Button, Center, Flex, Icon, PinInput, PinInputField, Stack } from '@chakra-ui/react'
import React from 'react'
import { useCrypto } from '../../hooks/crypto'
import { FaFingerprint, FaKey } from 'react-icons/fa'
import FocusLock from '@chakra-ui/focus-lock'

interface ICryptoLockProps {

}

export const CryptoLock: React.FC<ICryptoLockProps> = ({ children }) => {
  const { registerBiometricAsync, biometricId, encryptedKey, keyHash, key } = useCrypto()
  const [pin, setPin] = React.useState('')

  if (!encryptedKey && key) {
    return (
      <Center height="100%">
        <FocusLock>
          <Stack spacing="5">
            <Stack direction="row">
              <PinInput variant="filled" type="alphanumeric" placeholder="●" size="xl" value={pin} onChange={setPin}>
                <PinInputField bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
                <PinInputField bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
                <PinInputField bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
                <PinInputField bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
                <PinInputField bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
                <PinInputField bg="primary.500" _hover={{ bg: 'primary.400' }} _placeholderShown={{ bg: 'whiteAlpha.50' }}/>
              </PinInput>
            </Stack>
            <Flex justify="space-between">
              <Button isDisabled={Boolean(biometricId)} color={biometricId ? 'green.500' : 'inherit'} variant="ghost" onClick={() => registerBiometricAsync?.(key)}>
                <Stack direction="row">
                  <FaFingerprint/>
                  <Box>Register Biometric</Box>
                </Stack>
              </Button>
              <Button disabled={pin.length < 6}>
                <Stack direction="row">
                  <FaKey/>
                  <Box>Save Pin</Box>
                </Stack>
              </Button>
            </Flex>
          </Stack>
        </FocusLock>
      </Center>
    )
  }

  if (!key) {
    return (
      <Box>
        no enterance for you buddy. use biometric or input pin
      </Box>
    )
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

CryptoLock.defaultProps = {

}
