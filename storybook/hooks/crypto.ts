import { useEffect, useState } from 'react'
import useAsync from 'react-use/lib/useAsync'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { decrypt, encrypt, generateCryptoKey, getBiometric, registerBiometric } from '../helper/crypto'
import { createMetaStore } from './meta'
import { useStorage } from './storage'

const [CryptoProvider, useCrypto] = createMetaStore(() => {
  const { readPresistentData, writePersistentData } = useStorage()

  const [key, setKey] = useState<string>()
  const [keyHash, setKeyHash] = useState<string>()
  const [biometricId, setBiometricId] = useState<string>()

  useEffect(() => {
    const keyHash = readPresistentData?.('keyHash') // this will be async in the future
    if (keyHash) setKeyHash(keyHash)

    const biometricId = readPresistentData?.('biometricId')
    if (biometricId) setBiometricId(biometricId)
  }, [readPresistentData])

  const useGenerateCryptoKey = useAsyncFn(async () => {
    const { key, keyHash } = await generateCryptoKey()
    writePersistentData?.('keyHash', keyHash)
    setKeyHash(keyHash)
    setKey(key)
    return { key, keyHash }
  })

  const useRegisterBiometric = useAsyncFn(async (secret: string) => {
    const biometricId = await registerBiometric(secret)
    if (biometricId) writePersistentData?.('biometricId', biometricId)
    setBiometricId(biometricId)
    return biometricId
  })

  useAsync(async () => {
    if (biometricId && !key) {
      const key = await getBiometric(biometricId)
      setKey(key)
    }
  }, [biometricId, key])

  const useEncrypt = useAsyncFn(encrypt)
  const useDecrypt = useAsyncFn(decrypt)

  // let encrypted = readPresistentData?.('encrypted')
  // let biometricId = readPresistentData?.('biometricId')
  // if (!encrypted || !biometricId) {
  //   if (!generateCryptoKey || !encrypt || !registerBiometric) return
  //   const { key, keyHash } = await generateCryptoKey()
  //   console.log({ key, keyHash })
  //   encrypted = await encrypt(key, 'test data to be encrypted')
  //   writePersistentData?.('keyHash', keyHash)
  //   writePersistentData?.('encrypted', encrypted)

  //   biometricId = await registerBiometric(key)
  //   writePersistentData?.('biometricId', biometricId ?? '')
  // }

  // const key = await getBiometric?.(biometricId ?? '')
  // const decrypted = await decrypt?.(key ?? '', encrypted)
  // console.log({ decrypted })

  return {
    useGenerateCryptoKey,
    useRegisterBiometric,
    useEncrypt,
    useDecrypt,
    keyHash,
    biometricId,
    getBiometric,
    key,
  }
})

export {
  CryptoProvider,
  useCrypto,
}
