import { useCallback } from 'react'
import { createMetaStore } from './meta'

const [StorageProvider, useStorage] = createMetaStore(() => {
  const writePersistentData = useCallback((key: string, data: string) => {
    localStorage.setItem(key, data) // TODO: change to indexedDB later
    console.log('written to localStorage', key)
  }, [])

  const readPresistentData = useCallback((key: string) => {
    console.log('read from localStorage', key)
    return localStorage.getItem(key)
  }, [])

  const deletePersistentData = useCallback((key: string) => {
    localStorage.removeItem(key)
  }, [])

  return {
    writePersistentData,
    readPresistentData,
    deletePersistentData,
  }
})

export {
  StorageProvider,
  useStorage,
}
