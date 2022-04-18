import { useEffect, useState } from 'react'
import useAsync from 'react-use/lib/useAsync'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { generateCryptoKey, getBiometric, registerBiometric, passphraseEncrypt, passphraseDecrypt, getHash } from '../helper/crypto'
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

  useEffect(() => {
    // make sure persistent data is synced with state
    if (keyHash) writePersistentData?.('keyHash', keyHash)
    if (biometricId) writePersistentData?.('biometricId', biometricId)
    if (encryptedKey) writePersistentData?.('encryptedKey', encryptedKey)
  }, [keyHash, biometricId, encryptedKey, writePersistentData])

  useAsync(async () => {
    if (!presistentLoaded) return
    if (!encryptedKey && !key) {
      const { key, keyHash } = await generateCryptoKey()
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

  useAsync(async () => {
    if (key && keyHash) {
      const hash = await getHash(key)
      console.log('key hash valid', hash === keyHash)
    }
  }, [key, keyHash])

  const [registerBiometricResult, registerBiometricAsync] = useAsyncFn(async (secret: string) => {
    const biometricId = await registerBiometric(secret)
    setBiometricId(biometricId)
    return biometricId
  })

  return {
    registerBiometricResult,
    registerBiometricAsync,

    keyHash,
    setKeyHash,
    biometricId,
    setBiometricId,
    encryptedKey,
    setEncryptedKey,
    key,
    setKey,
    passphraseEncrypt,
    passphraseDecrypt,
  }
})

export {
  CryptoProvider,
  useCrypto,
}
