import Fuse from 'fuse.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCrypto } from './crypto'
import { createMetaStore } from './meta'
import { useStorage } from './storage'

export interface IData {
  id: string
  name: string
  username: string
  password: string
  url?: string
  color?: string
  image?: string
  deleted?: boolean
}

const [DataProvider, useData] = createMetaStore(() => {
  const { readPresistentData, writePersistentData, deletePersistentData } = useStorage()
  const { key, encrypt, decrypt } = useCrypto()
  const [data, setData] = useState<IData[]>([])
  const fuse = useMemo(() => new Fuse(data, { keys: ['name', 'username'] }), [data])

  useEffect(() => {
    if (!key) return
    const encryptedData = readPresistentData?.('data')
    if (!encryptedData) return
    decrypt?.(key, encryptedData).then(dataStr => {
      setData(JSON.parse(dataStr))
    })
  }, [key, decrypt, readPresistentData])

  useEffect(() => {
    if (!key) return
    if (!data.length) return
    const dataStr = JSON.stringify(data)
    encrypt?.(key, dataStr).then(encryptedData => {
      writePersistentData?.('data', encryptedData)
    })
  }, [key, encrypt, writePersistentData, data])

  const genId = useCallback((): string => {
    const id = Math.random().toString(36).slice(2)
    if (data.find(item => item.id === id)) {
      return genId()
    }
    return id
  }, [data])

  const addData = useCallback((data: IData) => {
    const id = genId()
    setData(prev => [...prev, { ...data, id }])
    return id
  }, [genId])

  const setDataById = useCallback((id: string, data: Partial<IData>) => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)))
  }, [])

  const getDataById = useCallback((id: string) => data.find(item => item.id === id), [data])

  const delDataById = useCallback((id: string) => {
    setData(prev => prev.filter(item => item.id !== id))
  }, [])

  const searchData = useCallback((query: string) => {
    return fuse.search(query).map(i => i.item)
  }, [fuse])

  return {
    data,
    setData,
    setDataById,
    getDataById,
    delDataById,
    addData,
    searchData,
  }
})

export {
  DataProvider,
  useData,
}
