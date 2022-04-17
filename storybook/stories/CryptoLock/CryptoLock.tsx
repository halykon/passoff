import React, { useEffect, useMemo } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useCrypto } from '../../hooks/crypto'
import { getBiometric } from '../../helper/crypto'
import { useAsync } from 'react-use'

interface ICryptoLockProps {

}

export const CryptoLock: React.FC<ICryptoLockProps> = ({ children }) => {
  const { useGenerateCryptoKey, useRegisterBiometric, biometricId, keyHash, key } = useCrypto()
  const [, generateCryptoKey] = useGenerateCryptoKey ?? []
  const [biometric, registerBiometric] = useRegisterBiometric ?? []

  if (!keyHash && !key) {
    return (
      <Button onClick={generateCryptoKey}>generate crypto key</Button>
    )
  }

  if (biometric?.loading) {
    return (
      <Box>
        registering biometric...
      </Box>
    )
  }

  if (!biometricId && key) {
    return (
      <Button onClick={() => registerBiometric?.(key)}>register biometric</Button>
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
