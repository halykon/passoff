import { useEffect, useState } from 'react'
import { generateCryptoKey, getBiometric, registerBiometric, passphraseEncrypt, passphraseDecrypt, getHash, encrypt, decrypt } from '../helper/crypto'
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

  useEffect(() => {
    if (!presistentLoaded) return
    if (!encryptedKey && !key) {
      generateCryptoKey().then(({ key, keyHash }) => {
        setKeyHash(keyHash)
        setKey(key)

        // clear old key data if exists
        deletePersistentData?.('encryptedKey')
        setEncryptedKey(undefined)
        deletePersistentData?.('biometricId')
        setBiometricId(undefined)
      })
    }
  }, [keyHash, key, presistentLoaded, encryptedKey, deletePersistentData])

  useEffect(() => {
    if (!presistentLoaded) return
    if (biometricId && encryptedKey && !key) {
      getBiometric(biometricId).then(key => {
        setKey(key)
      })
    }
  }, [biometricId, key, presistentLoaded, encryptedKey])

  useEffect(() => {
    if (key && keyHash) {
      getHash(key).then(hash => {
        console.log('key hash valid', hash === keyHash)
      })
    }
  }, [key, keyHash])

  return {
    registerBiometric,
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
    encrypt,
    decrypt,
  }
})

export {
  CryptoProvider,
  useCrypto,
}
