import { useCallback } from 'react'
import { createMetaStore } from './meta'

const [StorageProvider, useStorage] = createMetaStore(() => {
  const writePersistentData = useCallback((key: string, data: string) => {
    localStorage.setItem(key, data) // TODO: change to indexedDB later
    console.log('written to localStorage', key)
  }, [])

  const readPresistentData = useCallback((key: string) => {
    return localStorage.getItem(key)
  }, [])

  return {
    writePersistentData,
    readPresistentData,
  }
})

export {
  StorageProvider,
  useStorage,
}
