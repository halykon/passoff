import { useEffect, useState } from 'react'
import useAsync from 'react-use/lib/useAsync'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { decrypt, encrypt, generateCryptoKey, getBiometric, registerBiometric } from '../helper/crypto'
import { createMetaStore } from './meta'
import { useStorage } from './storage'

const [CryptoProvider, useCrypto] = createMetaStore(() => {
  const { readPresistentData, writePersistentData, deletePersistentData } = useStorage()

  const [key, setKey] = useState<string>()
  const [keyHash, setKeyHash] = useState<string>()
  const [biometricId, setBiometricId] = useState<string>()
  const [encryptedKey, setEncryptedKey] = useState<string>()
  const [presistentLoaded, setPresistentLoaded] = useState(false)

  useEffect(() => {
    const keyHash = readPresistentData?.('keyHash') // this will be async in the future
    if (keyHash) setKeyHash(keyHash)

    const biometricId = readPresistentData?.('biometricId')
    if (biometricId) setBiometricId(biometricId)

    const encryptedKey = readPresistentData?.('encryptedKey')
    if (encryptedKey) setEncryptedKey(encryptedKey)

    setPresistentLoaded(true)
  }, [readPresistentData])

  useAsync(async () => {
    if (!presistentLoaded) return
    if (!encryptedKey && !key) {
      const { key, keyHash } = await generateCryptoKey()
      writePersistentData?.('keyHash', keyHash)
      setKeyHash(keyHash)
      setKey(key)

      // clear old key data if exists
      deletePersistentData?.('encryptedKey')
      setEncryptedKey(undefined)
      deletePersistentData?.('biometricId')
      setBiometricId(undefined)
    }
  }, [keyHash, key, presistentLoaded])

  useAsync(async () => {
    if (!presistentLoaded) return
    if (biometricId && encryptedKey && !key) {
      const key = await getBiometric(biometricId)
      setKey(key)
    }
  }, [biometricId, key, presistentLoaded])

  const [registerBiometricResult, registerBiometricAsync] = useAsyncFn(async (secret: string) => {
    const biometricId = await registerBiometric(secret)
    if (biometricId) writePersistentData?.('biometricId', biometricId)
    setBiometricId(biometricId)
    return biometricId
  })

  return {
    registerBiometricResult,
    registerBiometricAsync,

    keyHash,
    biometricId,
    encryptedKey,
    key,
  }
})

export {
  CryptoProvider,
  useCrypto,
}
